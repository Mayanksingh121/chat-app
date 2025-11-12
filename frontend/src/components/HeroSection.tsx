const HeroSection = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center py-10 gap-2">
        <h1 className="text-center text-white font-alt text-5xl font-extrabold">
          Real Time Messaging That <br /><span className="bg-linear-to-r from-[#2498e8]  via-[#67b3e6] to-[#7dbbe4] bg-clip-text text-transparent">Just Works</span>
        </h1>
        <p className="text-center text-[#b3bcca] font-body text-sm">Powered by cutting-edge tech for flawless real-time chat</p>
      </div>
    </div>
  );
};

export default HeroSection;
