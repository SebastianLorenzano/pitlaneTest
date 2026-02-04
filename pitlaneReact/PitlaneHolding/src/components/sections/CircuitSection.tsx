import { HiLocationMarker, HiClock, HiCheckCircle } from "react-icons/hi"
import { FaFlagCheckered, FaMapMarkedAlt, FaChartLine } from "react-icons/fa"
import { GiRaceCar, GiProcessor } from "react-icons/gi"
import { useTranslation } from "react-i18next"

import FeatureCard from "../cards/FeatureCard"
import CircuitAnimation from "../animation/circuit_animation/CircuitAnimation"
import backgroundImage from "../../assets/img/background2.png"

import { type } from "../../ui/typography"
import { surface } from "../../ui/surfaces"

function CircuitSection(): React.JSX.Element {
  const { t } = useTranslation("circuit")

  const detailRow =
    "group grid grid-cols-[50px_220px] md:grid-cols-[50px_280px] lg:grid-cols-[50px_auto] items-center gap-4"

  const detailIcon =
    "text-[var(--color-primary-neon)] text-4xl group-hover:text-[var(--color-secondary)] transition-colors duration-400"

  const detailText = type.cardText

  return (
    <section
      id="project"
      className="
        relative overflow-hidden font-orbitron px-4 py-20 min-h-screen
        flex flex-col justify-center items-center text-center
      "
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-[-20] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/80 z-[-10]" />

      {/* Title */}
      <h2 className={`${type.sectionTitleStrong} mb-12 drop-shadow-lg z-10`}>
        {t("title")}
      </h2>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-10 items-center sm:items-start max-w-6xl w-full z-10">
        {/* Circuit Animation Frame */}
        <div
          className="
            rounded-2xl border border-[var(--color-primary-neon)]
            transition-colors duration-400 hover:border-[var(--color-secondary)]
            overflow-hidden shadow-xl z-10
            w-full max-w-[380px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px]
            aspect-[16/9] mx-auto lg:mx-0
          "
          style={{
            ["--dot-color" as any]: "var(--color-primary-neon)",
          }}
          onMouseEnter={(e) =>
            e.currentTarget.style.setProperty("--dot-color", "var(--color-secondary)")
          }
          onMouseLeave={(e) =>
            e.currentTarget.style.setProperty("--dot-color", "var(--color-primary-neon)")
          }
        >
          <CircuitAnimation speed={1000} className="w-full" />
        </div>

        {/* Circuit Details */}
        <div className="grid justify-items-center lg:justify-items-start self-center gap-5 text-center lg:text-left text-sm sm:text-base">
          {/* Location */}
          <div className={detailRow}>
            <HiLocationMarker className={detailIcon} />
            <p className={detailText}>
              <span className="text-[var(--color-text)]">{t("locationLabel")}</span>{" "}
              {t("locationValue")}
            </p>
          </div>

          {/* Surface */}
          <div className={detailRow}>
            <HiClock className={detailIcon} />
            <p className={detailText}>
              <span className="text-[var(--color-text)]">{t("surfaceLabel")}</span>{" "}
              {t("surfaceValue")}
            </p>
          </div>

          {/* Homologation */}
          <div className={detailRow}>
            <HiCheckCircle className={detailIcon} />
            <p className={detailText}>
              <span className="text-[var(--color-text)]">
                {t("homologationLabel")}
              </span>{" "}
              {t("homologationValue")}
            </p>
          </div>

          {/* High Performance Center */}
          <div className={`${detailRow} cursor-pointer`}>
            <FaFlagCheckered className={detailIcon} />
            <p className={detailText}>
              <span className="text-[var(--color-text)]">{t("performanceCenter")}</span>
            </p>
          </div>

          {/* Zones */}
          <div className={detailRow}>
            <GiRaceCar className="text-[var(--color-primary-neon)] text-5xl group-hover:text-[var(--color-secondary)] transition-colors duration-300" />
            <p className={detailText}>
              <span className="text-[var(--color-text)]">{t("zonesLabel")}</span>{" "}
              {t("zonesValue")}
            </p>
          </div>
        </div>
      </div>

      {/* Lower Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16 text-center z-10 w-full max-w-5xl">
        <FeatureCard
          className={`group flex flex-col items-center ${surface.featureCard}`}
          Icon={GiProcessor}
          text={
            <p className={type.cardTitle}>
              <span className={type.cardTitleHover}>
                {t("features.structure")}
              </span>
            </p>
          }
          details={t("features.structureDesc")}
        />

        <FeatureCard
          className={`group flex flex-col items-center ${surface.featureCard}`}
          Icon={FaChartLine}
          text={
            <p className={type.cardTitle}>
              <span className={type.cardTitleHover}>
                {t("features.business")}
              </span>
            </p>
          }
          details={t("features.businessDesc")}
        />

        <FeatureCard
          className={`group flex flex-col items-center ${surface.featureCard}`}
          Icon={FaMapMarkedAlt}
          text={
            <p className={type.cardTitle}>
              <span className={type.cardTitleHover}>
                {t("features.location")}
              </span>
            </p>
          }
          details={t("features.locationDesc")}
        />
      </div>

    </section>
  )
}

export default CircuitSection
