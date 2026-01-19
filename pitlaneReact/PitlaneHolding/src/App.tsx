import './App.css'
import './index.css'
import Navbar from './components/Navbar'
import HeroSection from './components/sections/HeroSection'
import CircuitSection from './components/sections/CircuitSection'
import ContactSection from './components/sections/ContactSection'
import CarAnimation from './components/animation/car_animation/CarAnimation'
import CarVideoSection from "./components/sections/CarVideoSection";
import carVideo from "./assets/video/car_intro.mp4";
import AboutSection from './components/sections/AboutSection'
import ProjectDetailsSection from './components/sections/ProjectDetailsSection'
import ProjectTimelineSection from './components/sections/ProjectTimelineSection'

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CircuitSection />
      <ProjectTimelineSection/>
      <ProjectDetailsSection />
      <AboutSection />
      <ContactSection />
      <CarVideoSection videoSrc={carVideo} />
    </>
  )
}

export default App
