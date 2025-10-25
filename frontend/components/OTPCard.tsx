import Image from "next/image";
import React, { KeyboardEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

interface OTPCardPropsType {
  email: string;
  name: string;
  password: string;
}

const OTPCard = ({ email, name, password }: OTPCardPropsType) => {
  const ref: any = useRef([]);
  const [otpArray, setOtpArray] = useState(new Array(4).fill(""));

  const handleKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otpArray[index] == "" && index > 0) {
      ref.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      ref.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      ref.current[index + 1].focus();
    }
  };

  const handleKeyChange = (e: any, index: number) => {
    const value = e.target.value;

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setOtpArray((prev: any[]) => {
        const newArray = [...prev];
        newArray[index] = "";
        return newArray;
      });
      return;
    }

    if (value.length > 1) return;
    if (value == "") {
      return;
    }
    setOtpArray((prev: any[]) => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });

    if (index < 3) ref.current[index + 1].focus();
  };

  const handleClick = async () => {
    if (!email?.trim()) {
      toast.error("Something went wrong signup again");
      return;
    }

    const otp = otpArray.join("");
    if (!otp || otp.length < 3) {
      toast.error("OTP is not valid");
      return;
    }
  };

  return (
    <div className="flex flex-col gap-10 h-[40%] md:h-[50%] w-[45%]  md:w-[36%] bg-[#060810] z-10 p-10 rounded-xl shadow-[0_0_30px_5px_rgba(255,255,255,0.15)] overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Picture of the author"
        />
        <p className="text-white text-center font-bold text-xl">
          We have sent an otp to {email}
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center">
        <div className="flex gap-2 justify-center items-center">
          {otpArray.map((val, index) => {
            return (
              <input
                ref={(el: any) => (ref.current[index] = el)}
                onKeyDown={(e) => handleKeyPress(e, index)}
                key={index}
                min={0}
                onChange={(e: any) => handleKeyChange(e, index)}
                max={9}
                type="number"
                inputMode="numeric"
                pattern="[0-9]"
                value={val}
                className="border-[0.1] border-white outline-none text-white backgr w-10 h-10 text-center"
              />
            );
          })}
        </div>
        <div className="flex flex-col w-[100%] justify-center items-center">
          <button
            onClick={handleClick}
            className="bg-[#2a61d7] w-[60%] p-2 rounded-sm shadow-xl text-white font-semibold"
          >
            Verify OTP
          </button>
          <button  className="p-2 rounded-sm text-white font-semibold text-sm">Resend OTP</button>
        </div>
      </div>
    </div>
  );
};

export default OTPCard;
