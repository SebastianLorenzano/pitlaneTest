// CarAnimation.tsx
import { useState, useEffect, useRef } from "react"

import CarStage from "./CarStage" 
import SectionStage from "./SectionStage"


export default function CarAnimation() {
  const [startParallax, setStartParallax] = useState(false)
  const [carVisible, setCarVisible] = useState(true)

  const sectionRef = useRef<HTMLElement | null>(null)
  const carRef = useRef<HTMLImageElement | null>(null)

  // Detectar 25% del section
  useEffect(() => {
    if (!sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setStartParallax(true)
        }
      },
      { threshold: [0, 0.25, 1] }
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Detectar visibilidad del coche
  useEffect(() => {
    if (!carRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setCarVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )
    observer.observe(carRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] bg-[#1f2937] flex items-center justify-center overflow-hidden"
    >
      {/* Etapa 1: Coche */}
      <CarStage startParallax={startParallax} carRef={carRef} visible={carVisible} />

      {/* Etapa 2: SectionBase */}
      <SectionStage visible={!carVisible} />
    </section>
  )
}
