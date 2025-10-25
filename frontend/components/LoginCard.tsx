import { login, signup } from "@/services/apis";
import { IdCardLanyard, LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface LoginCardPropsType {
  setIsOtpScreen: (val: boolean)=>void,
  email: string;
  password: string;
  name: string;
  setEmail: (val: string)=>void;
  setName: (val:string)=> void;
  setPassword: (val: string) => void
}

const LoginCard = ({...props}: LoginCardPropsType) => {
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleUserSignin = async () => {
    if (!props.email?.trim() || !props.password?.trim()) {
      toast.error("All fields are required");
      return;
    }

    if (isSignup) {
      if (!props.name?.trim()) {
        toast.error("All fields are required");
        return;
      }

      const singupReq = {
        name: props.name,
        email: props.email?.trim()?.toLowerCase(),
        password: props.password?.trim()?.toLowerCase(),
      };
      toast.promise(
        async () => {
          const promise = await signup(singupReq);
          if (promise?.data) {
          }
        },
        {
          loading: "Verifying details...",
          success: <b>OTP Sent to your email</b>,
          error: <b>Check your credentials</b>,
        }
      );
    } else {
      const loginReq = {
        email: props.email?.trim()?.toLowerCase(),
        password: props.email?.trim()?.toLowerCase(),
      };

      toast.promise(
        async () => {
          const promise = await login(loginReq);
          if (promise) {
            router.replace("/home");
          }
        },
        {
          loading: "Verifying details...",
          success: <b>Welcome to Link</b>,
          error: <b>Check your credentials</b>,
        }
      );
    }
  };

  return (
    //offset-x offset-y blur spread color;
      <div className="h-[40%] md:h-[50%] w-[45%]  md:w-[36%] bg-[#060810] z-10 p-10 rounded-xl shadow-[0_0_30px_5px_rgba(255,255,255,0.15)]">
        <div className="flex flex-col items-center gap-2">
           <Image src="/logo.png" width={100} height={100} alt="Picture of the author"/>
          <h2 className="font-bold text-white text-2xl">
            {isSignup ? "Get Started" : "Welcome Back"}
          </h2>
          <p className="text-[#7a7a7a] text-sm">
            {isSignup
              ? "Already have an account? "
              : "Don't have an account yet? "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-white cursor-pointer"
            >
              {isSignup ? "Login" : "Sign up"}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-5 py-10">
          {isSignup ? (
            <div className="bg-[#111111] rounded-md border-[#1e1e1e] border-1 flex gap-1 items-center px-2 py-1">
              <IdCardLanyard color="#7a7a7a" size={18} />
              <input
                onChange={(e) => props.setName(e.target.value)}
                autoComplete="off"
                type="text"
                className="text-[15px] p-[6px] w-[100%] outline-none text-white"
                placeholder="Enter full name"
              />
            </div>
          ) : null}
          <div className="bg-[#111111] rounded-md border-[#1e1e1e] border-1 flex gap-1 items-center px-2 py-1">
            <Mail color="#7a7a7a" size={18} />
            <input
              onChange={(e) => props.setEmail(e.target.value)}
              autoCapitalize="off"
              type="text"
              className="text-[15px] p-[6px] w-[100%] outline-none text-white"
              placeholder="Enter email"
            />
          </div>
          <div className="bg-[#111111] rounded-md border-[#1e1e1e] border-1 flex gap-1 items-center px-2 py-1">
            <LockKeyhole color="#7a7a7a" size={18} />
            <input
              autoComplete="off"
              onChange={(e) => props.setPassword(e.target.value)}
              type="password"
              className="text-[15px] p-[6px] w-[100%] outline-none text-white"
              placeholder="Enter password"
            />
          </div>
          <div>
            <button
              onClick={handleUserSignin}
              className="bg-[#2a61d7] w-[100%] p-2 rounded-md text-white font-semibold"
            >
              {isSignup ? "Sign up" : "Login"}
            </button>
          </div>
        </div>
      </div>
  );
};

export default LoginCard;
