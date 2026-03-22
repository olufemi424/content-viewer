"use client";

import { useMemo, useState } from "react";

interface FilterPanelProps {
  allTags: string[];
  priorityFilter: string[];
  stageFilter: string[];
  tagFilter: string[];
  onPriorityChange: (values: string[]) => void;
  onStageChange: (values: string[]) => void;
  onTagChange: (values: string[]) => void;
}

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

export default function FilterPanel({
  allTags,
  priorityFilter,
  tagFilter,
  stageFilter,
  onPriorityChange,
  onStageChange,
  onTagChange,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeCount = priorityFilter.length + stageFilter.length + tagFilter.length;
  const hasFilters = activeCount > 0;

  const visibleTags = useMemo(() => allTags.slice(0, 8), [allTags]);
  const hiddenTagCount = Math.max(0, allTags.length - visibleTags.length);

  const chipStyle = (active: boolean): React.CSSProperties => ({
    fontSize: "11px",
    padding: "2px 7px",
    border: "1px solid",
    borderColor: active ? "#333" : "#ddd",
    borderRadius: "10px",
    background: active ? "#111" : "white",
    color: active ? "white" : "#555",
    cursor: "pointer",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ padding: "6px 10px", borderBottom: "1px solid #e5e5e5", fontSize: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <button
          onClick={() => setIsExpanded((v) => !v)}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 0,
            fontSize: "12px",
            color: "#666",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
          aria-expanded={isExpanded}
          aria-label="Toggle filters"
        >
          <span>{isExpanded ? "▾" : "▸"}</span>
          <span>Filters</span>
          <span style={{ fontSize: "11px", color: hasFilters ? "#333" : "#999" }}>
            {hasFilters ? `${activeCount} active` : "none"}
          </span>
        </button>

        {hasFilters && (
          <button
            onClick={() => {
              onPriorityChange([]);
              onStageChange([]);
              onTagChange([]);
            }}
            style={{
              fontSize: "11px",
              color: "#888",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Clear
          </button>
        )}
      </div>

      {isExpanded && (
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}>
            <span style={{ color: "#999", marginRight: "2px" }}>Priority</span>
            {(["high", "medium", "low"] as const).map((p) => (
              <button key={p} style={chipStyle(priorityFilter.includes(p))} onClick={() => onPriorityChange(toggle(priorityFilter, p))}>
                {p}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}>
            <span style={{ color: "#999", marginRight: "2px" }}>Stage</span>
            {(["idea", "drafted", "recorded", "posted", "analyzed"] as const).map((s) => (
              <button key={s} style={chipStyle(stageFilter.includes(s))} onClick={() => onStageChange(toggle(stageFilter, s))}>
                {s}
              </button>
            ))}
          </div>

          {visibleTags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}>
              <span style={{ color: "#999", marginRight: "2px" }}>Tags</span>
              {visibleTags.map((tag) => (
                <button key={tag} style={chipStyle(tagFilter.includes(tag))} onClick={() => onTagChange(toggle(tagFilter, tag))}>
                  #{tag}
                </button>
              ))}
              {hiddenTagCount > 0 && <span style={{ fontSize: "11px", color: "#999" }}>+{hiddenTagCount} more</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
