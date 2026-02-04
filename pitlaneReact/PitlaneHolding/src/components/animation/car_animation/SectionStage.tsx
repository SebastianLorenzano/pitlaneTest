// SectionStage.tsx
import { useTranslation } from "react-i18next"
import SectionBase from "../../SectionBase"

interface SectionStageProps {
  visible: boolean
  animation?: "pop" | "fade" | "none"
  animation_duration?: number
}

export default function SectionStage({
  visible,
  animation = "none",
  animation_duration = 0.45
}: SectionStageProps) {

  const { t } = useTranslation("download")

  return (
    <div
      className={`
        absolute inset-0 flex items-center justify-center
        transition-all duration-700
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
        ${visible && animation === "pop" ? "animate-pop-in" : ""}
        ${visible && animation === "fade" ? "animate-fade" : ""}
      `}
      style={{
        animationDuration: `${animation_duration}s`,
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)"
      }}
    >
      <SectionBase
        title={t("title")}
        buttonText={t("button")}
        buttonLink="/api/files/PitlaneProject.pdf"
      />
    </div>
  )
}
