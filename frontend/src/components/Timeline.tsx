import React from "react";

export type TimelineStage = {
  title: string;
  contentTitle: string;
  contentText: string;
  contentDetailedText: string;
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
    if (stages.length === 0) return 0;
    if (value < 0) return 0;
    if (value > stages.length - 1) return stages.length - 1;
    return value;
  }

  function changeIndex(nextIndex: number): void {
    props.onChange(clampIndex(nextIndex));

    if (containerRef.current) {
      containerRef.current.focus();
    }
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
      <div className="flex w-full items-center gap-3 sm:gap-4">
        {/* Left arrow */}
        <button
          type="button"
          tabIndex={-1}
          onMouseDown={preventFocus}
          onClick={function () {
            if (!isFirst) changeIndex(activeIndex - 1);
          }}
          disabled={isFirst}
          className="h-11 w-11 shrink-0 rounded-lg border-2
                     border-[var(--color-primary-neon)]/40
                     bg-[var(--color-primary)]/15
                     text-[var(--color-primary-neon)]
                     backdrop-blur-md
                     transition-all duration-300
                     hover:bg-[var(--color-primary-neon)]
                     hover:text-[var(--color-primary)]
                     disabled:opacity-40
                     disabled:hover:bg-[var(--color-primary)]/15
                     disabled:hover:text-[var(--color-primary-neon)]
                     sm:h-12 sm:w-12"
          aria-label="Previous stage"
        >
          ‹
        </button>

        {/* Timeline line + nodes */}
        <div className="relative min-w-0 flex-1 py-8">
          {/* Base line */}
          <div className="absolute left-0 right-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-white/10" />

          {/* Filled line */}
          <div
            className="absolute left-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[var(--color-primary-neon)] transition-all duration-300"
            style={{ width: fillPercent + "%" }}
          />

          {/* Nodes */}
          <div className="relative flex w-full items-start justify-between">
            {stages.map(function (stage, index) {
              var isActive = index === activeIndex;
              var isDone = index < activeIndex;

              return (
                <button
                  key={stage.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={-1}
                  onMouseDown={preventFocus}
                  onClick={function () {
                    changeIndex(index);
                  }}
                  className="group flex min-w-0 flex-1 basis-0 flex-col items-center gap-3"
                >
                  {/* Node circle */}
                  <span
                    className={[
                      "relative z-10",
                      "grid place-items-center rounded-full transition-all duration-300",
                      "h-11 w-11 min-h-[2.75rem] min-w-[2.75rem] shrink-0",
                      "border-2 leading-none",
                      "-translate-y-1/2",
                      "bg-[var(--color-primary)]/40 backdrop-blur-md",
                      "sm:h-12 sm:w-12 sm:min-h-[3rem] sm:min-w-[3rem]",
                      isActive
                        ? "scale-110 border-[var(--color-primary-neon)] bg-[var(--color-primary-neon)] text-[var(--color-primary)]"
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

                  {/* Label - tablet and desktop only */}
                  <span
                    className={[
                      "hidden sm:block",
                      "w-full max-w-[120px] text-center text-xs leading-tight tracking-wide transition-colors duration-300",
                      "lg:max-w-[140px]",
                      "line-clamp-2",
                      isActive
                        ? "text-[var(--color-primary-neon)]"
                        : "text-[var(--color-text-muted)]/70",
                      "group-hover:text-[var(--color-primary-neon)]"
                    ].join(" ")}
                  >
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active label - mobile only */}
          <div className="mt-1 text-center text-xs leading-tight tracking-wide text-[var(--color-primary-neon)] sm:hidden">
            {stages[activeIndex] ? stages[activeIndex].title : ""}
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
          className="h-11 w-11 shrink-0 rounded-lg border-2
                     border-[var(--color-primary-neon)]/40
                     bg-[var(--color-primary)]/15
                     text-[var(--color-primary-neon)]
                     backdrop-blur-md
                     transition-all duration-300
                     hover:bg-[var(--color-primary-neon)]
                     hover:text-[var(--color-primary)]
                     disabled:opacity-40
                     disabled:hover:bg-[var(--color-primary)]/15
                     disabled:hover:text-[var(--color-primary-neon)]
                     sm:h-12 sm:w-12"
          aria-label="Next stage"
        >
          ›
        </button>
      </div>
    </div>
  );
}