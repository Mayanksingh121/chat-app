"use client";
import { login, signup } from "@/services/apis";
import { IdCardLanyard, LockKeyhole, Mail } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const LoginCard = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserSignin = async()=>{
    if(!email?.trim() || !password?.trim()){
      return;
    }

    if(isSignup){
      if(!name?.trim()){
        return;
      }
      const singupReq = {
        name,
        email: email?.trim()?.toLowerCase(),
        password: password?.trim()?.toLowerCase()
      }
      const response = await signup(singupReq);
      if(response){
        redirect("/home");
      }
    }else{
      const loginReq = {
        email: email?.trim()?.toLowerCase(),
        password: email?.trim()?.toLowerCase(),
      }
      const response = await login(loginReq);
    }
  }

  return (
    //offset-x offset-y blur spread color;
    <div className="h-[40%] md:h-[50%] w-[45%]  md:w-[36%] bg-[#060810] z-10 p-10 rounded-xl shadow-[0_0_30px_5px_rgba(255,255,255,0.15)]">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-white text-2xl">{isSignup? "Get Started" : "Welcome Back"}</h2>
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
              onChange={(e)=>setName(e.target.value)}
              autoComplete="off"
              type="text"
              className="text-[15px] p-[6px] w-[100%] outline-none text-white"
              placeholder="Enter full name"
            />
          </div>
        : null}
        <div className="bg-[#111111] rounded-md border-[#1e1e1e] border-1 flex gap-1 items-center px-2 py-1">
          <Mail color="#7a7a7a" size={18} />
          <input
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            className="text-[15px] p-[6px] w-[100%] outline-none text-white"
            placeholder="Enter password"
          />
        </div>
        <div>
          <button onClick={handleUserSignin} className="bg-[#2a61d7] w-[100%] p-2 rounded-md text-white font-semibold">
            {isSignup? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
