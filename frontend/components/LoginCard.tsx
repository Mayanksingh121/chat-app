"use client";
import { IdCardLanyard, LockKeyhole, Mail } from "lucide-react";
import React, { useState } from "react";

const LoginCard = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="h-[50%] w-[32%] bg-[#181818] p-10 rounded-xl shadow-xl border-t-1 border-t-[#383737]">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-2xl">{isSignup? "Get Started" : "Welcome Back"}</h2>
        <p className="text-[#7a7a7a] text-sm">
          {isSignup? "Already have an account? " : "Don't have an account yet? "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-white cursor-pointer"
          >
            {isSignup? "Login" : "Sign up"}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-5 py-10">
        {isSignup? 
          <div className="bg-[#111111] rounded-md border-[#1e1e1e] border-1 flex gap-1 items-center px-2 py-1">
            <IdCardLanyard color="#7a7a7a" size={18} />
            <input
              autoComplete="off"
              type="text"
              className="text-[15px] p-[6px] w-[100%] outline-none"
              placeholder="Enter full name"
            />
          </div>
        : null}
        <div className="bg-[#111111] rounded-md border-[#1e1e1e] border-1 flex gap-1 items-center px-2 py-1">
          <Mail color="#7a7a7a" size={18} />
          <input
            autoCapitalize="off"
            type="text"
            className="text-[15px] p-[6px] w-[100%] outline-none"
            placeholder="Enter email"
          />
        </div>
        <div className="bg-[#111111] rounded-md border-[#1e1e1e] border-1 flex gap-1 items-center px-2 py-1">
          <LockKeyhole color="#7a7a7a" size={18} />
          <input
            autoComplete="off"
            type="password"
            className="text-[15px] p-[6px] w-[100%] outline-none"
            placeholder="Enter password"
          />
        </div>
        <div>
          <button className="bg-[#0072db] w-[100%] p-2 rounded-md text-white font-semibold">
            {isSignup? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
