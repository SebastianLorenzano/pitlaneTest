import {
  HiLocationMarker,
  HiClock,
  HiCheckCircle
} from 'react-icons/hi'
import {
  FaFlagCheckered,
  FaMapMarkedAlt,
  FaChartLine
} from 'react-icons/fa'
import { GiRaceCar, GiProcessor } from 'react-icons/gi'
import { useTranslation } from "react-i18next"

import FeatureCard from "../cards/FeatureCard";
import CircuitAnimation from "../animation/circuit_animation/CircuitAnimation";

import circuitImage from '../../assets/img/circuito.png'
import backgroundImage from '../../assets/img/background2.png'

function CircuitInfoSection(): React.JSX.Element {
  const { t } = useTranslation()

  return (
    <section
      id="project"
      className="relative text-[var(--color-text-muted)] font-orbitron px-4 py-20 min-h-screen flex 
                  flex-col justify-center items-center text-center overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-[-20] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/80 z-[-10]" />

      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-12 drop-shadow-lg z-10">
        {t("circuit.title")}
      </h1>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-10 items-center sm:items-start max-w-6xl w-full z-10">

        {/* Circuit Image */}
        {/* <div className="rounded-lg border-2 border-[var(--color-primary-neon)] hover:border-[var(--color-secondary)] 
                        transition-colors duration-400 overflow-hidden max-w-md mx-auto shadow-xl z-10">
          <img src={circuitImage} alt="Circuito" className="w-full h-auto" />
        </div> */}
<div
  className="rounded-lg border-2 border-[var(--color-primary-neon)]
             transition-colors duration-400 hover:border-[var(--color-secondary)]
             overflow-hidden shadow-xl z-10
             w-full max-w-[380px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px]
             aspect-[16/9] mx-auto lg:mx-0"
  style={{
    // color por defecto
    ["--dot-color" as any]: "var(--color-primary-neon)"
  }}
  onMouseEnter={(e) =>
    e.currentTarget.style.setProperty(
      "--dot-color",
      "var(--color-secondary)"
    )
  }
  onMouseLeave={(e) =>
    e.currentTarget.style.setProperty(
      "--dot-color",
      "var(--color-primary-neon)"
    )
  }
>

            <CircuitAnimation
              speed={1000}
              className="w-full"
            />
          </div>

        {/* Circuit Details */}
        <div className="grid justify-items-center lg:justify-items-start self-center gap-5 text-center lg:text-left text-sm sm:text-base">

          {/* Location */}
          <div className="group grid grid-cols-[50px_220px] md:grid-cols-[50px_280px] lg:grid-cols-[50px_auto] items-center gap-4">
            <HiLocationMarker className="text-[var(--color-primary-neon)] text-4xl group-hover:text-[var(--color-secondary)] 
                              transition-colors duration-400" />
            <p>
              <strong>{t("circuit.locationLabel")}</strong> {t("circuit.locationValue")}
            </p>
          </div>

          {/* Surface */}
          <div className="group grid grid-cols-[50px_220px] md:grid-cols-[50px_280px] lg:grid-cols-[50px_auto] items-center gap-4">
            <HiClock className="text-[var(--color-primary-neon)] text-4xl group-hover:text-[var(--color-secondary)] transition-colors duration-400" />
            <p>
              <strong>{t("circuit.surfaceLabel")}</strong> {t("circuit.surfaceValue")}
            </p>
          </div>

          {/* Homologation */}
          <div className="group grid grid-cols-[50px_220px] md:grid-cols-[50px_280px] lg:grid-cols-[50px_auto] items-center gap-4">
            <HiCheckCircle className="text-[var(--color-primary-neon)] text-4xl group-hover:text-[var(--color-secondary)] transition-colors duration-400" />
            <p>
              <strong>{t("circuit.homologationLabel")}</strong> {t("circuit.homologationValue")}
            </p>
          </div>

          {/* High Performance Center */}
          <div className="group grid grid-cols-[50px_220px] md:grid-cols-[50px_280px] lg:grid-cols-[50px_auto] items-center gap-4 cursor-pointer">
            <FaFlagCheckered className="text-[var(--color-primary-neon)] text-4xl transition-colors duration-400 group-hover:text-[var(--color-secondary)]" />
            <p>
              <strong>{t("circuit.performanceCenter")}</strong>
            </p>
          </div>

          {/* Zones */}
          <div className="group grid grid-cols-[50px_220px] md:grid-cols-[50px_280px] lg:grid-cols-[50px_auto] items-center gap-4">
            <GiRaceCar className="text-[var(--color-primary-neon)] text-5xl group-hover:text-[var(--color-secondary)] transition-colors duration-300" />
            <p>
              <strong>{t("circuit.zonesLabel")}</strong> {t("circuit.zonesValue")}
            </p>
          </div>

        </div>
      </div>

      {/* Lower Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-16 text-center z-10 w-full max-w-5xl">
        <FeatureCard
          className="group flex flex-col items-center p-6 rounded-xl bg-[var(--color-primary)] shadow-md border border-[var(--color-primary-neon)] transition-colors duration-400 hover:border-[var(--color-secondary)]"
          Icon={GiProcessor}
          text={t("circuit.features.structure")}
          details={t("circuit.features.structureDesc")}
        />

        <FeatureCard
          className="group flex flex-col items-center p-6 rounded-xl bg-[var(--color-primary)] shadow-md border border-[var(--color-primary-neon)] transition-colors duration-400 hover:border-[var(--color-secondary)]"
          Icon={FaChartLine}
          text={
            <>
              {t("circuit.features.business")}
            </>
          }
          details={t("circuit.features.businessDesc")}
        />

        <FeatureCard
          className="group flex flex-col items-center p-6 rounded-xl bg-[var(--color-primary)] shadow-md border border-[var(--color-primary-neon)] transition-colors duration-400 hover:border-[var(--color-secondary)]"
          Icon={FaMapMarkedAlt}
          text={t("circuit.features.location")}
          details={t("circuit.features.locationDesc")}
        />
      </div>

    </section>
  )
}

export default CircuitInfoSection
