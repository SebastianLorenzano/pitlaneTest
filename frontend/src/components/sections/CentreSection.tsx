import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Flag, Activity, Calendar, Cpu } from "lucide-react"
import backgroundImage from "../../assets/img/background6.png"
import centre1 from "../../assets/img/centre/centre1.jpg"
import centre2 from "../../assets/img/centre/centre2.jpg"
import centre3 from "../../assets/img/centre/centre3.jpg"
import centre4 from "../../assets/img/centre/centre4.jpg"
import centre5 from "../../assets/img/centre/centre5.jpg"

import ImageCarousel from "../ImageCarousel"

type CentreItem = {
  key: "circuit" | "performance" | "events" | "tech"
  title: string
  text: string
}

const iconMap: Record<CentreItem["key"], React.ReactElement> = {
  circuit: <Flag size={20} />,
  performance: <Activity size={20} />,
  events: <Calendar size={20} />,
  tech: <Cpu size={20} />,
}

function CentreSection(): React.JSX.Element {
  const { t } = useTranslation("centre")

  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const images = [
  { id: "centre-1", src: centre1, alt: "Centre installations 1" },
  { id: "centre-2", src: centre2, alt: "Centre installations 2" },
  { id: "centre-3", src: centre3, alt: "Centre installations 3" },
  { id: "centre-4", src: centre4, alt: "Centre commerces" },
  { id: "centre-5", src: centre5, alt: "centre car gallery" },
]


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const rawItems = t("items", { returnObjects: true })
  const items: CentreItem[] = Array.isArray(rawItems) ? (rawItems as CentreItem[]) : []

  const paragraph1 = t("paragraph1", { defaultValue: "" })
  const paragraph2 = t("paragraph2", { defaultValue: "" })

  return (
    <section
      ref={sectionRef}
      id="centre"
      className="relative overflow-hidden font-orbitron px-6 py-16 flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-[-20] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/80 z-[-10]" />

      {/* Content */}
      <div
        className={`
          w-full max-w-6xl mx-auto transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        <div className="mb-10">
            <ImageCarousel images={images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT: Text */}
          <div className="text-left">
            <p className="text-sm tracking-[0.2em] text-[var(--color-primary-neon)]/90">
              {t("eyebrow")}
            </p>

            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-[var(--color-text)]">
              {t("title")}
            </h2>

            <p className="mt-4 text-md md:text-lg text-[var(--color-text-muted)] whitespace-pre-line">
              {t("subtitle")}
            </p>

            {(paragraph1 || paragraph2) && (
              <div className="mt-6 space-y-4">
                {paragraph1 ? (
                  <p className="text-md md:text-lg text-[var(--color-text-muted)] whitespace-pre-line">
                    {paragraph1}
                  </p>
                ) : null}

                {paragraph2 ? (
                  <p className="text-md md:text-lg text-[var(--color-text-muted)] whitespace-pre-line">
                    {paragraph2}
                  </p>
                ) : null}
              </div>
            )}

            {/* Subtle divider */}
            <div className="mt-8 h-[1px] w-48 bg-[var(--color-primary-neon)]/25" />
          </div>

          {/* RIGHT: Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {items.map((item, index) => (
              <div
                key={`${item.key}-${index}`}
                className={`
                  rounded-2xl border border-[var(--color-border)]/30
                  bg-[var(--color-panel)]/10 backdrop-blur-md
                  shadow-[0_10px_40px_rgba(0,0,0,0.25)]
                  p-6 transition-all duration-300
                  hover:translate-y-[-4px] hover:border-[var(--color-primary-neon)]/40
                `}
              >
                {/* Icon */}
                <div
                  className="
                    w-10 h-10 rounded-xl flex items-center justify-center
                    border border-[var(--color-primary-neon)]/40
                    bg-[var(--color-primary-neon)]/10
                    text-[var(--color-primary-neon)]
                    mb-4
                  "
                >
                  {iconMap[item.key]}
                </div>

                <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-[var(--color-text-muted)] whitespace-pre-line">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom spacing line (optional) */}
        <div className="mt-10 flex items-center justify-center">
          <div className="h-[1px] w-40 bg-[var(--color-primary-neon)]/20" />
        </div>
      </div>
    </section>
  )
}

export default CentreSection
