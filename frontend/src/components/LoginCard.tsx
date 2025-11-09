import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";
import validator from "validator";
import { signup } from "@/services/apis";

const LoginCard = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [screen, setScreen] = useState<"Login" | "OTP">("Login");

  const handleSignin = async () => {
    if (isSignup) {
      handleSignup();
    } else {
    }
  };

  const handleSignup = async () => {
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      toast.error("All fields are required");
      return;
    } else if (!validator.isEmail(email?.toLowerCase()?.trim())) {
      toast.error("Email is not valid");
      return;
    }

    const response = await signup(
      name?.trim(),
      email?.trim()?.toLowerCase(),
      password?.trim()
    );
    if (response?.success) {
      toast.success(response?.message);
      setScreen("OTP");
    }else{
      toast.error(response?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-10 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-white text-center text-2xl md:text-4xl font-heading">
          Welcome Back
        </h2>
        <p className="font-body text-gray-400 text-center">
          Sign in to continue your journey
        </p>
      </div>
      <div className="bg-linear-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-3xl p-4 md:p-8 w-[90%] md:w-[60%]  lg:w-[30%]">
       {screen === "Login"? <>
       <div className="flex flex-col gap-3 md:gap-6">
          {isSignup ? (
            <div className="flex flex-col gap-2">
              <p className="text-white font-body">Name</p>
              <div className="w-full bg-white/5 border border-white/10 rounded-lg flex items-center gap-2 md:gap-4 px-2 md:px-3">
                <RxAvatar color="#9da3af" size={20} />
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="font-body outline-none text-white py-3 w-[90%] text-sm"
                  placeholder="Mayank Singh"
                />
              </div>
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <p className="text-white font-body">Email</p>
            <div className="w-full bg-white/5 border border-white/10 rounded-lg flex items-center gap-4 px-3">
              <MdEmail color="#9da3af" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="font-body outline-none text-white py-3 w-[90%] text-sm"
                placeholder="mayank@example.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-body">Password</p>
            <div className="w-full bg-white/5 border border-white/10 rounded-lg flex items-center justify-between px-3">
              <div className="flex gap-4 items-center w-full">
                <FaLock color="#9da3af" />
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-body outline-none text-white py-3 w-[90%] text-sm"
                  placeholder="**********"
                />
              </div>
              {showPassword ? (
                <IoIosEyeOff
                  onClick={() => setShowPassword(false)}
                  size={20}
                  color="#9da3af"
                />
              ) : (
                <IoMdEye
                  onClick={() => setShowPassword(true)}
                  size={20}
                  color="#9da3af"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full pt-3 gap-6">
          <p className="text-[#2498e8] text-sm  md:text-[1rem] text-end w-full cursor-pointer hover:text-blue-500">
            Forgot password?
          </p>
          <button
            onClick={handleSignin}
            className="bg-linear-to-r from-[#2498e8] to-[#67b3e6] w-full py-2 md:py-3 rounded-sm md:rounded-lg font-bold font-body cursor-pointer text-white text-sm md:text-[1rem}"
          >
            {isSignup ? "Register" : "Login"}
          </button>
          <p className="text-[#99a1af] font-body text-center w-full text-sm md:text-[1rem]">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#2498e8] cursor-pointer hover:text-blue-500"
            >
              {isSignup ? "Login" : "Sign up"}
            </span>
          </p>
        </div>
        </>:
        <>
        </>}
      </div>
    </div>
  );
};

export default LoginCard;
