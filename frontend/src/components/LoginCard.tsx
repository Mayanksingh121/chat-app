import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { FaLock } from "react-icons/fa";

const LoginCard = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-white text-4xl font-heading">Welcome Back</h2>
        <p className="font-body text-gray-400 text-center">
          Sign in to continue your journey
        </p>
      </div>
      <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-white font-body">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              className="outline-none w-full font-body bg-white/5 border border-white/10 rounded-lg px-12 text-white py-3.5  p-3 placeholder-gray-400 text-sm"
              placeholder="Mayank Singh"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-body">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full font-body bg-white/5 border border-white/10 rounded-lg px-12 text-white py-3.5 outline-none  p-3 text-sm"
              placeholder="mayank@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-body">Password</p>
            <div className="w-full bg-white/5 border border-white/10 rounded-l flex items-center justify-between px-3">
              <FaLock color="#9da3af"/>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                className="font-body outline-none text-white py-3 w-[70%] text-sm"
                placeholder="**********"
              />
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
      </div>
    </div>
  );
};

export default LoginCard;
