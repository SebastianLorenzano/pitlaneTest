import React, { useMemo, useState } from "react";
import { Chrono } from "react-chrono";
import { useTranslation } from "react-i18next";

type TimelineNode = {
  title: string;
  contentTitle: string;
  contentText: string;
  contentDetailedText: string;
};

export default function ProjectTimelineSection(): React.ReactElement {
  const { t } = useTranslation();
  const stages = t("timeline.stages", { returnObjects: true }) as TimelineNode[];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Chrono "items" format
  const chronoItems = useMemo(() => stages.map((s) => ({ title: s.title })), [stages]);

  const activeStage = stages[activeIndex];

  function goTo(index: number): void {
    if (index < 0 || index >= stages.length) return;
    setActiveIndex(index);
  }

  return (
    <section style={{ width: "100%", padding: 24 }}>
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 28 }}>{t("timeline.title")}</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.8 }}>{t("timeline.subtitle")}</p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* LEFT: Timeline */}
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
          {/* 
            3.3.3 note:
            - activeItemIndex is "default on load" per docs.
            - using key={activeIndex} forces a remount so Chrono reliably highlights the desired item
              when you change activeIndex via external buttons.
          */}
          <Chrono
            key={activeIndex}
            items={chronoItems}
            mode="HORIZONTAL"
            disableToolbar
            activeItemIndex={activeIndex}
            focusActiveItemOnLoad
            onItemSelected={(data) =>  { setActiveIndex(data.index)}}
          >
            {/* We keep Chrono’s cards empty because we render the content panel on the right */}
            {stages.map((s) => (
              <div key={s.title} />
            ))}
          </Chrono>
        </div>

        {/* RIGHT: Content panel */}
        <article style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
          <div style={{ marginBottom: 8, opacity: 0.7, fontSize: 14 }}>
            {activeIndex + 1} / {stages.length}
          </div>

          <h3 style={{ margin: "0 0 8px 0", fontSize: 26, lineHeight: 1.2 }}>
            {activeStage?.contentTitle}
          </h3>

          <p style={{ margin: "0 0 14px 0", fontSize: 16 }}>{activeStage?.contentText}</p>

          <div style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.9 }}>
            {activeStage?.contentDetailedText}
          </div>

          {/* Navigation buttons */}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              style={{ padding: "8px 12px", borderRadius: 10 }}
            >
              Prev
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === stages.length - 1}
              style={{ padding: "8px 12px", borderRadius: 10 }}
            >
              Next
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
