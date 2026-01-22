import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Timeline, { type TimelineStage } from "../Timeline";
import backgroundImage from "../../assets/img/background6.png";

type TimelineStageI18n = {
  title: string; // node label
  contentTitle: string;
  contentText: string;
  contentDetailedText: string;
};

export default function TimelineSection(): React.ReactElement {
  var translation = useTranslation();
  var t = translation.t;
  var i18n = translation.i18n;

  var [stages, setStages] = useState<TimelineStage[]>([]);
  var [activeIndex, setActiveIndex] = useState<number>(0);

  // Build stages from i18n (re-run on language change)
  useEffect(() => {
    var raw = t("timeline.stages", { returnObjects: true }) as TimelineStageI18n[] | undefined;

    var safeRaw: TimelineStageI18n[] = Array.isArray(raw) ? raw : [];

    var mapped: TimelineStage[] = safeRaw.map(function (s, index) {
      return {
        id: "stage-" + (index + 1),
        label: s.title,
        title: s.contentTitle,
        description: s.contentDetailedText
      };
    });

    setStages(mapped);

    // Clamp active index if language swaps and stage count changes
    setActiveIndex(function (prev) {
      if (mapped.length === 0) return 0;
      if (prev < 0) return 0;
      if (prev > mapped.length - 1) return mapped.length - 1;
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
            {t("timeline.title")}
          </h2>
          <p className="mt-3 text-[var(--color-text-muted)]/70">
            {t("timeline.subtitle")}
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
                STAGE {stages.length === 0 ? 0 : activeIndex + 1} / {stages.length}
              </div>
            </div>

            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-[var(--color-text-muted)]">
              {activeStage ? activeStage.title : ""}
            </h3>

            <p className="mt-3 text-[var(--color-text-muted)]/75 leading-relaxed">
              {activeStage ? activeStage.description : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
