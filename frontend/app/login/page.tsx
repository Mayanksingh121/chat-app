import LoginCard from "@/components/LoginCard";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen justify-center content-center items-center w-[100%]">
      <BackgroundRippleEffect />
      <LoginCard/>
    </div>
  );
};

export default page;
