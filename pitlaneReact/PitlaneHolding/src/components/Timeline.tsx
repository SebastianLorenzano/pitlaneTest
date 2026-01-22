import React from "react";

export type TimelineStage = {
  id: string;
  label: string; // node label
  title: string; // panel title
  description: string; // short text
  detailedDescription: string; // long text
};

type TimelineProps = {
  stages: TimelineStage[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export default function Timeline(props: TimelineProps): React.ReactElement {
  var stages = props.stages;
  var activeIndex = props.activeIndex;
  var containerRef = React.useRef<HTMLDivElement>(null);

  function clampIndex(value: number): number {
    if (value < 0) return 0;
    if (value > stages.length - 1) return stages.length - 1;
    return value;
  }

  function changeIndex(nextIndex: number): void {
    props.onChange(clampIndex(nextIndex));
    if (containerRef.current) containerRef.current.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      changeIndex(activeIndex - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      changeIndex(activeIndex + 1);
    }
    if (e.key === "Home") {
      e.preventDefault();
      changeIndex(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      changeIndex(stages.length - 1);
    }
  }

  function preventFocus(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
  }

  var fillPercent =
    stages.length <= 1 ? 0 : (activeIndex / (stages.length - 1)) * 100;

  var isFirst = activeIndex === 0;
  var isLast = activeIndex === stages.length - 1;

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Project timeline"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full outline-none font-orbitron"
    >
      {/* Wrapper with side arrows */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Left arrow */}
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={preventFocus}
          onClick={function () {
            if (!isFirst) changeIndex(activeIndex - 1);
          }}
          disabled={isFirst}
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg border-2
                     border-[var(--color-primary-neon)]/40
                     text-[var(--color-primary-neon)]
                     bg-[var(--color-primary)]/15 backdrop-blur-md
                     hover:bg-[var(--color-primary-neon)] hover:text-[var(--color-primary)]
                     transition-all duration-300 disabled:opacity-40 disabled:hover:bg-[var(--color-primary)]/15 disabled:hover:text-[var(--color-primary-neon)]"
          aria-label="Previous stage"
        >
          ‹
        </button>

        {/* Timeline line + nodes */}
        <div className="relative w-full py-8">
          {/* Base line */}
          <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-white/10" />

          {/* Filled line */}
          <div
            className="absolute left-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[var(--color-primary-neon)] transition-all duration-300"
            style={{ width: fillPercent + "%" }}
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
                  tabIndex={-1}
                  onMouseDown={preventFocus}
                  onClick={function () {
                    changeIndex(index);
                  }}
                  className="group flex flex-col items-center gap-3"
                >
                  {/* Node circle (lifted over the line) */}
                  <span
                    className={[
                      "relative z-10",
                      "grid place-items-center rounded-full transition-all duration-300",
                      "h-11 w-11 sm:h-12 sm:w-12 border-2",
                      "-translate-y-1/2",
                      "bg-[var(--color-primary)]/40 backdrop-blur-md",
                      isActive
                        ? "border-[var(--color-primary-neon)] bg-[var(--color-primary-neon)] text-[var(--color-primary)] scale-110"
                        : isDone
                        ? "border-[var(--color-primary-neon)]/70 text-[var(--color-text-muted)]"
                        : "border-[var(--color-primary-neon)]/40 text-[var(--color-text-muted)]",
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
                      "max-w-[90px] text-center",
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

        {/* Right arrow */}
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={preventFocus}
          onClick={function () {
            if (!isLast) changeIndex(activeIndex + 1);
          }}
          disabled={isLast}
          className="h-11 w-11 sm:h-12 sm:w-12 rounded-lg border-2
                     border-[var(--color-primary-neon)]/40
                     text-[var(--color-primary-neon)]
                     bg-[var(--color-primary)]/15 backdrop-blur-md
                     hover:bg-[var(--color-primary-neon)] hover:text-[var(--color-primary)]
                     transition-all duration-300 disabled:opacity-40 disabled:hover:bg-[var(--color-primary)]/15 disabled:hover:text-[var(--color-primary-neon)]"
          aria-label="Next stage"
        >
          ›
        </button>
      </div>
    </div>
  );
}
