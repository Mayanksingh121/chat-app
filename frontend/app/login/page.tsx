"use client";
import LoginCard from "@/components/LoginCard";
import OTPCard from "@/components/OTPCard";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import React, { useState } from "react";

const page = () => {
  const [isOtpScreen, setIsOtpScreen] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex min-h-screen justify-center content-center items-center w-[100%]">
      <BackgroundRippleEffect />
      {!isOtpScreen ? (
        <LoginCard setIsOtpScreen={setIsOtpScreen} name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
      ) : (
        <OTPCard email={email} name={name} password={password}/>
      )}
    </div>
  );
};

export default page;
