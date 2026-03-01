"use client";

import { useMemo, useState } from "react";
import { ContentPriority, ContentStage, ContentStatus } from "@/types";

interface NewFileFormProps {
  allTags?: string[];
  onClose: () => void;
  onSuccess: (path: string) => void;
}

const MONTHS = [
  "01-january",
  "02-february",
  "03-march",
  "04-april",
  "05-may",
  "06-june",
  "07-july",
  "08-august",
  "09-september",
  "10-october",
  "11-november",
  "12-december",
];

export default function NewFileForm({
  allTags = [],
  onClose,
  onSuccess,
}: NewFileFormProps) {
  const now = new Date();
  const currentYear = String(now.getFullYear());
  const currentMonth = MONTHS[now.getMonth()];

  const [filename, setFilename] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [week, setWeek] = useState("week-01");
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [priority, setPriority] = useState<ContentPriority | "">("");
  const [stage, setStage] = useState<ContentStage>("idea");
  const [ctaKeyword, setCtaKeyword] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedFolder = useMemo(() => `${year}/${month}/${week}`, [year, month, week]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!filename.trim()) {
      setError("Filename is required");
      return;
    }

    setIsSubmitting(true);

    const tags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const response = await fetch("/api/files/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: filename.trim(),
          folder: selectedFolder,
          metadata: {
            title: title.trim() || filename.trim().replace(/\.md$/, ""),
            status,
            stage,
            priority: priority || undefined,
            tags: tags.length ? tags : undefined,
            cta_keyword: ctaKeyword.trim() || undefined,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create file");
        setIsSubmitting(false);
        return;
      }

      onSuccess(data.path);
      onClose();
    } catch {
      setError("Failed to create file");
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box" as const,
  };
  const labelStyle = { display: "block", marginBottom: "6px", fontSize: "14px" };
  const fieldStyle = { marginBottom: "14px" };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "4px",
          width: "520px",
          maxWidth: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", fontSize: "1.25em", fontWeight: "bold" }}>
          New Post
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Year:</label>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Month:</label>
              <select value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle}>
                {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Week:</label>
              <input type="text" value={week} onChange={(e) => setWeek(e.target.value)} placeholder="week-09" style={inputStyle} />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Target folder:</label>
            <code style={{ fontSize: "12px", color: "#555" }}>{selectedFolder}</code>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My content idea"
              style={inputStyle}
              autoFocus
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Filename:</label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="2026-03-02-my-topic.md"
              style={inputStyle}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Status:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as ContentStatus)} style={inputStyle}>
                <option value="draft">draft</option>
                <option value="in-progress">in-progress</option>
                <option value="done">done</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Stage:</label>
              <select value={stage} onChange={(e) => setStage(e.target.value as ContentStage)} style={inputStyle}>
                <option value="idea">idea</option>
                <option value="drafted">drafted</option>
                <option value="recorded">recorded</option>
                <option value="posted">posted</option>
                <option value="analyzed">analyzed</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Priority:</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as ContentPriority | "")} style={inputStyle}>
                <option value="">—</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>CTA keyword:</label>
              <input
                type="text"
                value={ctaKeyword}
                onChange={(e) => setCtaKeyword(e.target.value)}
                placeholder="PLAN"
                style={inputStyle}
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Tags <span style={{ color: "#999" }}>(comma-separated)</span>:</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="facebook, talking-head, authority"
              style={inputStyle}
              list="known-tags"
            />
            {allTags.length > 0 && (
              <datalist id="known-tags">
                {allTags.map(t => <option key={t} value={t} />)}
              </datalist>
            )}
          </div>

          {error && (
            <div style={{ color: "#d00", marginBottom: "16px", fontSize: "14px" }}>{error}</div>
          )}

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button type="button" onClick={onClose} disabled={isSubmitting}
              style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "4px", backgroundColor: "white", cursor: isSubmitting ? "not-allowed" : "pointer", fontSize: "14px" }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}
              style={{ padding: "8px 16px", border: "1px solid #000", borderRadius: "4px", backgroundColor: "#000", color: "white", cursor: isSubmitting ? "not-allowed" : "pointer", fontSize: "14px" }}>
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
