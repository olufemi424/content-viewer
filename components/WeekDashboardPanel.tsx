"use client";

import { WeekDashboardSummary } from "@/lib/weekDashboard";

interface WeekDashboardPanelProps {
  summary: WeekDashboardSummary;
  onOpenFile: (path: string) => void;
  onNavigate?: (path: string) => void;
}

export default function WeekDashboardPanel({ summary, onOpenFile, onNavigate }: WeekDashboardPanelProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid #e5e5e5",
        background: "#fff",
        padding: "10px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: "13px", fontWeight: 600 }}>
          Week Dashboard {summary.weekPath ? `· ${summary.weekPath}` : ""}
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {summary.weekPath && onNavigate && (
            <button
              onClick={() => onNavigate(summary.weekPath || "")}
              style={{ border: "1px solid #ddd", background: "white", borderRadius: 4, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}
            >
              Open week
            </button>
          )}
          {onNavigate && (
            <button
              onClick={() => onNavigate("")}
              style={{ border: "1px solid #ddd", background: "white", borderRadius: 4, padding: "3px 8px", fontSize: 11, cursor: "pointer" }}
            >
              Root
            </button>
          )}
          <div style={{ fontSize: "12px", color: "#666" }}>
            {summary.completionRate}% complete
          </div>
        </div>
      </div>

      <div style={{ fontSize: "12px", color: "#444" }}>
        total: {summary.total} · idea: {summary.idea} · drafted: {summary.drafted} · recorded: {summary.recorded} · posted: {summary.posted} · analyzed: {summary.analyzed}
      </div>

      {summary.dueThisWeek.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {summary.dueThisWeek.map((file) => (
            <button
              key={file.path}
              onClick={() => onOpenFile(file.path)}
              style={{
                border: "1px solid #ddd",
                background: "#fafafa",
                borderRadius: "12px",
                padding: "4px 8px",
                fontSize: "11px",
                cursor: "pointer",
              }}
              title={file.path}
            >
              {(file.metadata?.title || file.name).replace(/\.md$/, "")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
