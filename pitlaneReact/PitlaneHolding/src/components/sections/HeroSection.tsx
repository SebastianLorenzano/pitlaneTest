import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import logo from "../../assets/img/logo_noBG.png"
import backgroundImage from "../../assets/img/background1.png"
import Lenis from "@studio-freight/lenis"

function HeroSection(): React.JSX.Element {
  const { t } = useTranslation("hero")

  // The full text now comes from translations
  const fullText = t("slogan")

  const [displayedText, setDisplayedText] = useState("")
  const [buttonsVisible, setButtonsVisible] = useState(false)

  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis()
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Smooth anchor navigation
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(link.getAttribute("href")!) as HTMLElement | null
        if (target)
          lenis.scrollTo(target, {
            offset: -120
          })
      })
    })

    return () => lenis.destroy()
  }, [])

  // Typewriter effect → depends on translated slogan
  useEffect(() => {
    indexRef.current = 0
    setDisplayedText("")
    setButtonsVisible(false)

    const typeNext = () => {
      if (indexRef.current < fullText.length) {
        setDisplayedText(fullText.slice(0, indexRef.current + 1))
        indexRef.current++
        timeoutRef.current = setTimeout(typeNext, 25)
      } else {
        setTimeout(() => setButtonsVisible(true), 200)
      }
    }

    typeNext()

    return () => clearTimeout(timeoutRef.current)
  }, [fullText]) // re-trigger animation when language changes

  return (
    <main
      className="relative overflow-hidden font-orbitron flex flex-col items-center justify-center"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-[-20] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />

      {/* Blue transparent overlay */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/70 z-[-10]" />

      {/* Content */}
      <div className="relative z-10 text-[var(--color-text-muted)] text-center px-4">
        <img
          className="h-28 sm:h-28 md:h-36 lg:h-48 mx-auto mb-4 transition-all duration-300"
          src={logo}
          alt="Logo"
        />

        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl whitespace-normal leading-tight">
          {displayedText}
        </h1>

        {/* Buttons */}
        <div
          className={`
            mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700
            ${buttonsVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
          `}
        >
          <a
            href="#about-us"
            className="px-6 py-3 rounded-lg border-2 border-[var(--color-primary-neon)] text-[var(--color-primary-neon)] 
                      font-semibold shadow-lg hover:bg-[var(--color-primary-neon)] hover:text-[var(--color-primary)] 
                      hover:scale-105 transition-all duration-300"
          >
            {t("about")}
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-lg bg-[var(--color-primary-neon)] text-[var(--color-primary)] font-semibold 
                      shadow-lg hover:scale-105 transition-all duration-300"
          >
            {t("contact")}
          </a>
        </div>
      </div>
    </main>
  )
}

export default HeroSection
