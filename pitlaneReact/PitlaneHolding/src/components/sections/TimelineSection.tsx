import React, { useState } from "react";
import Timeline, { type TimelineStage } from "../Timeline";
import backgroundImage from "../../assets/img/background6.png";

export default function TimelineSection(): React.ReactElement {
  var stages: TimelineStage[] = [
    {
      id: "discover",
      label: "Discovery",
      title: "Discovery & Research",
      description:
        "We define the problem, gather requirements, and validate the opportunity with quick research and user input."
    },
    {
      id: "plan",
      label: "Plan",
      title: "Planning & Milestones",
      description:
        "We break the project into stages, define goals, scope, risks, and set measurable deliverables."
    },
    {
      id: "build",
      label: "Build",
      title: "Build the MVP",
      description:
        "We develop the core features first, focusing on usability and speed of iteration."
    },
    {
      id: "launch",
      label: "Launch",
      title: "Launch & Feedback",
      description:
        "We release, observe usage, collect feedback, and patch the biggest friction points."
    },
    {
      id: "scale",
      label: "Scale",
      title: "Scale & Optimize",
      description:
        "We refine performance, polish UX, and expand features based on real user behavior."
    }
  ];

  var [activeIndex, setActiveIndex] = useState<number>(0);
  var activeStage = stages[activeIndex];

  return (
    <section
      id="timeline"
      className="relative w-full py-24 font-orbitron overflow-hidden"
    >
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
            Project Timeline
          </h2>
          <p className="mt-3 text-[var(--color-text-muted)]/70">
            Click each stage to explore goals, deliverables, and progression.
          </p>
        </div>

        {/* Glass container */}
        <div
          className="rounded-2xl border-2 border-[var(--color-primary-neon)]/40
                     bg-[var(--color-primary)]/20 backdrop-blur-md
                     p-6 sm:p-8 shadow-lg"
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
                STAGE {activeIndex + 1} / {stages.length}
              </div>
            </div>

            <h3 className="mt-4 text-2xl sm:text-3xl font-semibold text-[var(--color-text-muted)]">
              {activeStage.title}
            </h3>

            <p className="mt-3 text-[var(--color-text-muted)]/75 leading-relaxed">
              {activeStage.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
