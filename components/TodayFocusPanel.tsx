"use client";

import { FileNode } from "@/types";
import { TodayFocusSummary } from "@/lib/todayFocus";

interface TodayFocusPanelProps {
  summary: TodayFocusSummary;
  onOpenFile: (path: string) => void;
}

function itemLabel(node: FileNode | null, fallback: string): string {
  if (!node) return fallback;
  return node.metadata?.title || node.name.replace(/\.md$/, "");
}

function ActionRow({
  label,
  node,
  onOpenFile,
}: {
  label: string;
  node: FileNode | null;
  onOpenFile: (path: string) => void;
}) {
  if (!node) {
    return <div style={{ fontSize: "12px", color: "#999" }}>{label}: none queued</div>;
  }

  return (
    <button
      onClick={() => onOpenFile(node.path)}
      style={{
        border: "1px solid #ddd",
        background: "white",
        borderRadius: "4px",
        padding: "6px 8px",
        fontSize: "12px",
        cursor: "pointer",
        textAlign: "left",
      }}
      title={node.path}
    >
      <strong>{label}:</strong> {itemLabel(node, "Untitled")}
    </button>
  );
}

export default function TodayFocusPanel({ summary, onOpenFile }: TodayFocusPanelProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid #e5e5e5",
        background: "#fafafa",
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: "13px", fontWeight: 600 }}>Today Focus</div>
        <div style={{ fontSize: "12px", color: "#666" }}>
          Drafted {summary.drafted} · Recorded {summary.recorded} · Posted {summary.posted} · Analyzed {summary.analyzed}
        </div>
      </div>

      {summary.dueToday.length > 0 && (
        <div style={{ fontSize: "12px", color: "#333" }}>
          Due today: {summary.dueToday.map((f) => f.metadata?.title || f.name).join(" • ")}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "8px" }}>
        <ActionRow label="Draft next" node={summary.nextToDraft} onOpenFile={onOpenFile} />
        <ActionRow label="Record next" node={summary.nextToRecord} onOpenFile={onOpenFile} />
        <ActionRow label="Post next" node={summary.nextToPost} onOpenFile={onOpenFile} />
      </div>
    </div>
  );
}
