"use client";

import { useState } from "react";
import { ContentStatus, ContentPriority } from "@/types";

interface NewFileFormProps {
  folders: string[];
  allTags?: string[];
  onClose: () => void;
  onSuccess: (path: string) => void;
}

export default function NewFileForm({
  folders,
  allTags = [],
  onClose,
  onSuccess,
}: NewFileFormProps) {
  const [filename, setFilename] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [priority, setPriority] = useState<ContentPriority | "">("");
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            priority: priority || undefined,
            tags: tags.length ? tags : undefined,
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
          width: "440px",
          maxWidth: "90%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0", fontSize: "1.25em", fontWeight: "bold" }}>
          New File
        </h2>

        <form onSubmit={handleSubmit}>
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
              placeholder="my-file.md"
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
              <label style={labelStyle}>Priority:</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as ContentPriority | "")} style={inputStyle}>
                <option value="">—</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Tags <span style={{ color: "#999" }}>(comma-separated)</span>:</label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="youtube, tutorial, react"
              style={inputStyle}
              list="known-tags"
            />
            {allTags.length > 0 && (
              <datalist id="known-tags">
                {allTags.map(t => <option key={t} value={t} />)}
              </datalist>
            )}
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Folder:</label>
            <select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)} style={inputStyle}>
              <option value="">Root (content/)</option>
              {folders.map((folder) => (
                <option key={folder} value={folder}>{folder}/</option>
              ))}
            </select>
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
