import { REASONS_TO_CHOOSE_US } from "@/lib/constants"
import AboutCard from "./AboutCard"

const AboutSection = () => {
  return (
   <div className="grid grid-cols-3 gap-4 px-10">
    <div className="flex flex-col gap-4 p-4 border  rounded-lg col-span-1 bg-blue-500/10 border-blue-100/10">
      <p className="text-center bg-linear-to-r from-[#2498e8]  via-[#67b3e6] to-[#7dbbe4]  bg-clip-text text-transparent font-alt font-bold text-2xl">{REASONS_TO_CHOOSE_US.whyLinkUp.heading}</p>
      <p className="text-[#b3bcca] font-body tracking-wider">{REASONS_TO_CHOOSE_US.whyLinkUp.description}</p>
    </div>
    <div className="grid grid-cols-2 gap-4 col-span-2">
        {REASONS_TO_CHOOSE_US.reasons.map((cardData,index)=>{
            return <AboutCard key={cardData.heading+index} data={cardData}/>
        })}
    </div>
   </div>
  )
}

export default AboutSection