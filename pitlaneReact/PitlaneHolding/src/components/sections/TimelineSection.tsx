import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Timeline, { type TimelineStage } from "../Timeline";
import backgroundImage from "../../assets/img/background6.png";

export default function TimelineSection(): React.ReactElement {
  const { t, i18n } = useTranslation("timeline");

  const [stages, setStages] = useState<TimelineStage[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const raw = t("stages", { returnObjects: true });
    const safeStages: TimelineStage[] = Array.isArray(raw)
      ? (raw as TimelineStage[])
      : [];

    setStages(safeStages);

    setActiveIndex(function (prev) {
      if (safeStages.length === 0) return 0;
      if (prev < 0) return 0;
      if (prev > safeStages.length - 1) return safeStages.length - 1;
      return prev;
    });
  }, [i18n.language, t]);


  var activeStage = stages[activeIndex];

  return (
    <section id="timeline" className="relative w-full py-24 font-orbitron overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-[-20] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />
      {/* Color overlay */}
      <div className="absolute inset-0 z-[-10] bg-[var(--color-primary)]/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--color-text-muted)]">
            {t("title")}
          </h2>
          <p className="mt-3 text-[var(--color-text-muted)]/70">
            {t("subtitle")}
          </p>
        </div>

        {/* Glass container */}
        <div
          className="rounded-2xl border-2 border-[var(--color-primary-neon)]/40
                     bg-[var(--color-primary)]/20 backdrop-blur-md p-6 sm:p-8 shadow-lg"
          style={{ boxShadow: "0 0 40px rgba(0, 255, 255, 0.08)" }}
        >
          <Timeline
            stages={stages}
            activeIndex={activeIndex}
            onChange={function (i) {
              setActiveIndex(i);
            }}
          />

          {/* Content panel */}
          <div
            className="mt-8 rounded-2xl border border-[var(--color-primary-neon)]/25
                       bg-[var(--color-primary)]/25 backdrop-blur-md
                       p-6 transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs tracking-widest text-[var(--color-text-muted)]/60">
                {t("stage")} {stages.length === 0 ? 0 : activeIndex + 1} / {stages.length}
              </div>
            </div>

            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-[var(--color-text-muted)]">
              {activeStage ? activeStage.contentTitle : ""}
            </h3>
            {/* Subtitle / context */}
            <p
              className="mt-3 text-sm sm:text-base
                        tracking-wide
                        text-[var(--color-primary-neon)]/80
                        font-medium"
            >
              {activeStage ? activeStage.contentText : ""}
            </p>

            {/* Detailed body text */}
            <p
              className="mt-4 text-[var(--color-text-muted)]/75
                        leading-relaxed"
            >
              {activeStage ? activeStage.contentDetailedText : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
