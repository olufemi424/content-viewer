"use client";

import { useState } from "react";
import { FileNode } from "@/types";

interface NewFileFormProps {
  folders: string[];
  onClose: () => void;
  onSuccess: (path: string) => void;
}

export default function NewFileForm({
  folders,
  onClose,
  onSuccess,
}: NewFileFormProps) {
  const [filename, setFilename] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
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

    try {
      const response = await fetch("/api/files/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: filename.trim(),
          folder: selectedFolder,
          content: "# " + filename.replace(".md", "") + "\n\n",
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
    } catch (err) {
      setError("Failed to create file");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <h2
          style={{
            margin: "0 0 20px 0",
            fontSize: "1.25em",
            fontWeight: "bold",
          }}
        >
          New File
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
              }}
            >
              Filename:
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="my-file.md"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
              autoFocus
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontSize: "14px",
              }}
            >
              Folder:
            </label>
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Root (content/)</option>
              {folders.map((folder) => (
                <option key={folder} value={folder}>
                  {folder}/
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div
              style={{
                color: "#d00",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: "8px 16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "white",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "14px",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "8px 16px",
                border: "1px solid #000",
                borderRadius: "4px",
                backgroundColor: "#000",
                color: "white",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontSize: "14px",
              }}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
