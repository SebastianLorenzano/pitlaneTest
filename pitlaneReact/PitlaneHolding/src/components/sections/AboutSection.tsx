import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Network, Shield, CheckCircle2, Eye, BadgePercent, Gavel } from "lucide-react"
import backgroundImage from "../../assets/img/background3.png"

import { type } from "../../ui/typography"
import { surface } from "../../ui/surfaces"

type AboutCardKey = "structure" | "governance" | "execution"
type AboutListKey = "protection" | "transparency" | "economicRights"

type AboutCard = {
  key: AboutCardKey
  title: string
  text: string
}

type AboutList = {
  key: AboutListKey
  title: string
  items: string[]
}

const cardIconMap: Record<AboutCardKey, React.ReactElement> = {
  structure: <Network size={20} />,
  governance: <Gavel size={20} />,
  execution: <CheckCircle2 size={20} />,
}

const listIconMap: Record<AboutListKey, React.ReactElement> = {
  protection: <Shield size={20} />,
  transparency: <Eye size={20} />,
  economicRights: <BadgePercent size={20} />,
}

function AboutSection(): React.JSX.Element {
  const { t } = useTranslation("about")

  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)

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

  const rawCards = t("cards", { returnObjects: true })
  const cards: AboutCard[] = Array.isArray(rawCards) ? (rawCards as AboutCard[]) : []

  const rawLists = t("lists", { returnObjects: true })
  const lists: AboutList[] = Array.isArray(rawLists) ? (rawLists as AboutList[]) : []

  return (
    <section
      ref={sectionRef}
      id="about-us"
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
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className={type.sectionTitle}>{t("title")}</h2>
          <p className={type.sectionSubtitle}>{t("subtitle")}</p>
        </div>

        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <p className={type.sectionIntro}>{t("intro")}</p>
        </div>

        {/* Subtle divider */}
        <div className="mb-10 flex items-center justify-center">
          <div className="h-[1px] w-40 bg-[var(--color-primary-neon)]/25" />
        </div>

        {/* ROW 1: CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {cards.map((item, index) => (
            <div key={`${item.key}-${index}`} className={surface.glassCard}>
              <div
                className="
                  w-10 h-10 rounded-xl flex items-center justify-center
                  border border-[var(--color-primary-neon)]/40
                  bg-[var(--color-primary-neon)]/10
                  text-[var(--color-primary-neon)]
                  mb-4
                "
              >
                {cardIconMap[item.key]}
              </div>

              <h3 className={type.cardTitle}>{item.title}</h3>
              <p className={type.cardText}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* ROW 2: LISTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {lists.map((block, index) => (
            <div key={`${block.key}-${index}`} className={surface.glassCard}>
              <div
                className="
                  w-10 h-10 rounded-xl flex items-center justify-center
                  border border-[var(--color-primary-neon)]/40
                  bg-[var(--color-primary-neon)]/10
                  text-[var(--color-primary-neon)]
                  mb-4
                "
              >
                {listIconMap[block.key]}
              </div>

              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-3">
                {block.title}
              </h3>

              <ul className="space-y-2">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[0.55rem] h-2 w-2 rounded-full bg-[var(--color-primary-neon)]/90 shadow-[0_0_12px_rgba(0,255,200,0.45)]" />
                    <p className={type.listItemText}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="mt-12 flex items-center justify-center">
          <div className="h-[1px] w-40 bg-[var(--color-primary-neon)]/20" />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
