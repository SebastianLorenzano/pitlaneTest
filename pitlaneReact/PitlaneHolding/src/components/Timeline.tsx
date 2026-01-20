import React from "react";

export type TimelineStage = {
  id: string;
  label: string;
  title: string;
  description: string;
};

type TimelineProps = {
  stages: TimelineStage[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export default function Timeline(props: TimelineProps): React.ReactElement {
  var stages = props.stages;
  var activeIndex = props.activeIndex;


  var fillPercent =
    stages.length <= 1 ? 0 : (activeIndex / (stages.length - 1)) * 100;

  return (
    <div
      role="tablist"
      aria-label="Project timeline"
      tabIndex={0}
      className="w-full outline-none font-orbitron"
    >
      <div className="relative w-full py-8">
        {/* Base line */}
        <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/10" />

        {/* Filled line */}
        <div
          className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[var(--color-primary-neon)] transition-all duration-300"
          style={{
            width: fillPercent + "%",
            boxShadow: "0 0 14px rgba(0,0,0,0.0)"
          }}
        />

        {/* Nodes */}
        <div className="relative flex items-center justify-between">
          {stages.map(function (stage, index) {
            var isActive = index === activeIndex;
            var isDone = index < activeIndex;

            return (
              <button
                key={stage.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={function () {
                  props.onChange(index);
                }}
                className="group flex flex-col items-center gap-3"
              >
                {/* Node circle */}
                <span
                  className={[
                    "relative z-10",
                    "grid place-items-center rounded-full transition-all duration-300",
                    "h-11 w-11 sm:h-12 sm:w-12 border-2",
                    "-translate-y-1/2",
                    isActive
                      ? "border-[var(--color-primary-neon)] bg-[var(--color-primary-neon)] text-[var(--color-primary)] scale-110"
                      : isDone
                      ? "border-[var(--color-primary-neon)]/70 bg-[var(--color-primary)]/20 text-[var(--color-text-muted)]"
                      : "border-[var(--color-primary-neon)]/40 bg-[var(--color-primary)]/10 text-[var(--color-text-muted)]",
                    "group-hover:scale-110 group-hover:border-[var(--color-primary-neon)]"
                  ].join(" ")}
                  style={
                    isActive
                      ? { boxShadow: "0 0 22px rgba(0, 255, 255, 0.45)" }
                      : isDone
                      ? { boxShadow: "0 0 14px rgba(0, 255, 255, 0.20)" }
                      : undefined
                  }
                >
                  {index + 1}
                </span>

                {/* Label */}
                <span
                  className={[
                    "text-[11px] sm:text-xs tracking-wide transition-colors duration-300",
                    isActive
                      ? "text-[var(--color-primary-neon)]"
                      : "text-[var(--color-text-muted)]/70",
                    "group-hover:text-[var(--color-primary-neon)]"
                  ].join(" ")}
                >
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
