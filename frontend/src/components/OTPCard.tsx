import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const OTPCard = ({ email }: { email: string }) => {
  const [otp, setOtp] = useState<string | null>(null);

  return (
    <>
      <InputOTP onChange={(value)=>setOtp(value)} maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
        <InputOTPGroup>
          <InputOTPSlot className="text-white"  index={0} />;
          <InputOTPSlot className="text-white"  index={1} />;
          <InputOTPSlot className="text-white"  index={2} />;
          <InputOTPSlot className="text-white"  index={3} />;
        </InputOTPGroup>
      </InputOTP>
      <button   className="bg-linear-to-r from-[#2498e8] to-[#67b3e6] w-full py-2 md:py-3 rounded-sm md:rounded-lg font-bold font-body cursor-pointer text-white text-sm md:text-[1rem}">
        Verify OTP
      </button>
      </>
  );
};

export default OTPCard;
