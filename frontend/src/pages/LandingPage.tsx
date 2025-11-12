import AboutSection from "@/components/AboutSection"
import Background from "@/components/Background"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
       <Background/>
       <Header/>
       <HeroSection/>
       <AboutSection/>
    </div>
  )
}

export default LandingPage