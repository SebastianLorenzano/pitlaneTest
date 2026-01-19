import React, { useMemo } from "react";
import { Chrono } from "react-chrono";
import type { ChronoProps, TimelineItemModel } from "react-chrono";

type TimelineNode = {
  title: string;
  contentTitle: string;
  contentText: string;
  contentDetailedText: string;
};

type SelectedShapeA = Pick<TimelineItemModel, "title" | "cardTitle" | "cardSubtitle" | "cardDetailedText"> & {
  index: number;
};

type SelectedShapeB = {
  item: Pick<TimelineItemModel, "title" | "cardTitle" | "cardSubtitle" | "cardDetailedText">;
  index: number;
};

type Props = {
  stages: TimelineNode[];
  activeIndex: number;
  onChangeActiveIndex: (index: number) => void;
};

export default function ProjectTimeline(props: Props): React.ReactElement {
  const { stages, activeIndex, onChangeActiveIndex } = props;

  const chronoItems = useMemo(() => stages.map((s) => ({ title: s.title })), [stages]);

  // ✅ EXACT signature expected by ChronoProps (union-compatible)
  const handleItemSelected: ChronoProps["onItemSelected"] = (data) => {
    if (!data) return;

    // data can be either ShapeA or { item, index }
    const index = "index" in data ? data.index : undefined;
    if (typeof index === "number") onChangeActiveIndex(index);
  };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
      <Chrono
        key={activeIndex}
        items={chronoItems}
        mode="HORIZONTAL" // locked
        disableToolbar
        activeItemIndex={activeIndex}
        focusActiveItemOnLoad
        onItemSelected={handleItemSelected}
      >
        {stages.map((s) => (
          <div key={s.title} />
        ))}
      </Chrono>
    </div>
  );
}
