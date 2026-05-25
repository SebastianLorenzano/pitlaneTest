import { useEffect, useRef, useState } from 'react'
import { Parallax } from 'react-scroll-parallax'
import car from '../assets/img/car_anim.png'
import SectionBase from './SectionBase'

export default function CarAnimation() {
  const [startParallax, setStartParallax] = useState(false)
  const [carVisible, setCarVisible] = useState(true)
  const carSectionRef = useRef<HTMLElement | null>(null)
  const carRef = useRef<HTMLImageElement | null>(null)

  // Arranque al 25% del section
  useEffect(() => {
    if (!carSectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          setStartParallax(true)
        }
      },
      { threshold: [0, 0.25, 1] }
    )

    observer.observe(carSectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Visibilidad del coche
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
      ref={carSectionRef}
      className="relative w-full h-[80vh] bg-[#051733] flex items-center justify-center overflow-hidden"
    >
      {/* 🚗 Coche con Parallax */}
      <div
        className={`absolute inset-0 flex items-end justify-center transition-all duration-700 ${
          carVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <Parallax translateX={startParallax ? [-200, 500] : [0, 0]} className="z-10 relative">
          <div className="relative">
            {startParallax && (
              <div className="absolute -left-20 bottom-5 w-40 h-20 bg-gray-400/40 rounded-full blur-2xl animate-smokeFade" />
            )}
            <img
              ref={carRef}
              src={car}
              alt="Racing car"
              className="w-[70vw] md:w-[60vw] lg:w-[70vw] max-w-[90vw]"
            />
          </div>
        </Parallax>
      </div>

      {/* 📦 SectionBase, aparece cuando coche desaparece */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          carVisible ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
        }`}
      >
        <SectionBase
          title="Descarga el Plan de Proyecto Completo"
          buttonText="Descargar Proyecto"
          // buttonLink="/docs/plan-proyecto.pdf"
        />
      </div>
    </section>
  )
}
