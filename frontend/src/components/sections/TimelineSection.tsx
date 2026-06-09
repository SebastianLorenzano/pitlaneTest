import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Timeline, { type TimelineStage } from "../Timeline";
import backgroundImage from "../../assets/img/background6.png";

export default function TimelineSection(): React.ReactElement {
  const { t, i18n } = useTranslation("timeline");

  const [stages, setStages] = useState<TimelineStage[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const dragStartXRef = useRef<number | null>(null);
  const dragStartYRef = useRef<number | null>(null);

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

  function clampIndex(value: number): number {
    if (stages.length === 0) return 0;
    if (value < 0) return 0;
    if (value > stages.length - 1) return stages.length - 1;
    return value;
  }

  function goToPreviousStage(): void {
    setActiveIndex(function (prev) {
      return clampIndex(prev - 1);
    });
  }

  function goToNextStage(): void {
    setActiveIndex(function (prev) {
      return clampIndex(prev + 1);
    });
  }

  function handleDragStart(e: React.PointerEvent<HTMLDivElement>): void {
    dragStartXRef.current = e.clientX;
    dragStartYRef.current = e.clientY;

    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handleDragEnd(e: React.PointerEvent<HTMLDivElement>): void {
    if (dragStartXRef.current === null || dragStartYRef.current === null) {
      return;
    }

    var deltaX = e.clientX - dragStartXRef.current;
    var deltaY = e.clientY - dragStartYRef.current;

    dragStartXRef.current = null;
    dragStartYRef.current = null;

    var minimumDragDistance = 50;
    var horizontalMovement = Math.abs(deltaX);
    var verticalMovement = Math.abs(deltaY);

    if (horizontalMovement < minimumDragDistance) {
      return;
    }

    if (verticalMovement > horizontalMovement) {
      return;
    }

    if (deltaX < 0) {
      goToNextStage();
    } else {
      goToPreviousStage();
    }
  }

  function handleDragCancel(): void {
    dragStartXRef.current = null;
    dragStartYRef.current = null;
  }

  var activeStage = stages[activeIndex];

  return (
    <section
      id="timeline"
      className="relative flex w-full items-center overflow-hidden py-24 font-orbitron"
      style={{ minHeight: "calc(100vh - 7rem)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-[-20] bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />

      {/* Color overlay */}
      <div className="absolute inset-0 z-[-10] bg-[var(--color-primary)]/75" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-[var(--color-text-muted)] sm:text-4xl">
            {t("title")}
          </h2>

          <p className="mt-3 text-[var(--color-text-muted)]/70">
            {t("subtitle")}
          </p>
        </div>

        {/* Glass container */}
        <div
          className="rounded-2xl border-2 border-[var(--color-primary-neon)]/40
                     bg-[var(--color-primary)]/20 p-6 shadow-lg backdrop-blur-md sm:p-8"
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
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragCancel}
            className="mt-8 cursor-grab touch-pan-y rounded-2xl border border-[var(--color-primary-neon)]/25
                       bg-[var(--color-primary)]/25 p-6
                       backdrop-blur-md transition-all duration-300
                       active:cursor-grabbing"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs tracking-widest text-[var(--color-text-muted)]/60">
                {t("stage")} {stages.length === 0 ? 0 : activeIndex + 1} /{" "}
                {stages.length}
              </div>
            </div>

            <h3 className="mt-4 text-2xl font-semibold text-[var(--color-text-muted)] sm:text-3xl">
              {activeStage ? activeStage.contentTitle : ""}
            </h3>

            {/* Subtitle / context */}
            <p
              className="mt-3 text-sm font-medium tracking-wide
                         text-[var(--color-primary-neon)]/80 sm:text-base"
            >
              {activeStage ? activeStage.contentText : ""}
            </p>

            {/* Detailed body text */}
            <p className="mt-4 leading-relaxed text-[var(--color-text-muted)]/75">
              {activeStage ? activeStage.contentDetailedText : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}