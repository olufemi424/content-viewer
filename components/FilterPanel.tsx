"use client";

interface FilterPanelProps {
  allTags: string[];
  statusFilter: string[];
  priorityFilter: string[];
  stageFilter: string[];
  tagFilter: string[];
  onStatusChange: (values: string[]) => void;
  onPriorityChange: (values: string[]) => void;
  onStageChange: (values: string[]) => void;
  onTagChange: (values: string[]) => void;
}

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

export default function FilterPanel({
  allTags,
  statusFilter,
  priorityFilter,
  tagFilter,
  stageFilter,
  onStatusChange,
  onPriorityChange,
  onStageChange,
  onTagChange,
}: FilterPanelProps) {
  const hasFilters = statusFilter.length || priorityFilter.length || stageFilter.length || tagFilter.length;

  const chipStyle = (active: boolean): React.CSSProperties => ({
    fontSize: "11px",
    padding: "2px 8px",
    border: "1px solid",
    borderColor: active ? "#333" : "#ddd",
    borderRadius: "10px",
    background: active ? "#111" : "white",
    color: active ? "white" : "#555",
    cursor: "pointer",
    whiteSpace: "nowrap",
  });

  return (
    <div style={{ padding: "8px 12px", borderBottom: "1px solid #e5e5e5", fontSize: "12px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
        <span style={{ color: "#999", marginRight: "4px", alignSelf: "center" }}>status</span>
        {(["draft", "in-progress", "done"] as const).map(s => (
          <button key={s} style={chipStyle(statusFilter.includes(s))} onClick={() => onStatusChange(toggle(statusFilter, s))}>
            {s}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: allTags.length ? "4px" : 0 }}>
        <span style={{ color: "#999", marginRight: "4px", alignSelf: "center" }}>priority</span>
        {(["high", "medium", "low"] as const).map(p => (
          <button key={p} style={chipStyle(priorityFilter.includes(p))} onClick={() => onPriorityChange(toggle(priorityFilter, p))}>
            {p}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: allTags.length ? "4px" : 0 }}>
        <span style={{ color: "#999", marginRight: "4px", alignSelf: "center" }}>stage</span>
        {(["idea", "drafted", "recorded", "posted", "analyzed"] as const).map(s => (
          <button key={s} style={chipStyle(stageFilter.includes(s))} onClick={() => onStageChange(toggle(stageFilter, s))}>
            {s}
          </button>
        ))}
      </div>
      {allTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          <span style={{ color: "#999", marginRight: "4px", alignSelf: "center" }}>tags</span>
          {allTags.map(tag => (
            <button key={tag} style={chipStyle(tagFilter.includes(tag))} onClick={() => onTagChange(toggle(tagFilter, tag))}>
              #{tag}
            </button>
          ))}
        </div>
      )}
      {hasFilters > 0 && (
        <button
          onClick={() => { onStatusChange([]); onPriorityChange([]); onStageChange([]); onTagChange([]); }}
          style={{ marginTop: "6px", fontSize: "11px", color: "#999", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          clear filters
        </button>
      )}
    </div>
  );
}
