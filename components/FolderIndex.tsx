"use client";

import { FileNode } from "@/types";

interface FolderIndexProps {
  folderPath: string;
  children: FileNode[];
  onFileSelect: (path: string) => void;
  onFolderSelect: (path: string) => void;
}

const STATUS_COLOR: Record<string, string> = {
  draft: "#aaa",
  "in-progress": "#666",
  done: "#999",
};

export default function FolderIndex({ folderPath, children, onFileSelect, onFolderSelect }: FolderIndexProps) {
  const folders = children.filter(n => n.type === 'folder');
  const files = children.filter(n => n.type === 'file');

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.6em", fontWeight: 700, marginBottom: "8px" }}>
        {folderPath ? folderPath.split('/').pop() : 'content'}
      </h1>
      <div style={{ color: "#999", fontSize: "13px", marginBottom: "32px" }}>
        {folders.length} folder{folders.length !== 1 ? 's' : ''} · {files.length} file{files.length !== 1 ? 's' : ''}
      </div>

      {folders.length > 0 && (
        <>
          <div style={sectionLabel}>Folders</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px", marginBottom: "32px" }}>
            {folders.map(folder => (
              <button key={folder.path} onClick={() => onFolderSelect(folder.path)} style={folderCard}>
                <span style={{ fontSize: "18px" }}>📁</span>
                <span style={{ fontWeight: 500 }}>{folder.name}</span>
                <span style={{ fontSize: "12px", color: "#999" }}>
                  {(folder.children?.length ?? 0)} items
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {files.length > 0 && (
        <>
          <div style={sectionLabel}>Files</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {files.map(file => {
              const title = file.metadata?.title || file.name.replace(/\.md$/, '');
              const status = file.metadata?.status;
              const priority = file.metadata?.priority;
              const tags = file.metadata?.tags;
              return (
                <button key={file.path} onClick={() => onFileSelect(file.path)} style={fileRow}>
                  <span style={{ flex: 1, textAlign: "left", fontWeight: 450 }}>{title}</span>
                  <span style={{ display: "flex", gap: "6px", alignItems: "center", flexShrink: 0 }}>
                    {priority && <span style={{ fontSize: "11px", color: "#aaa" }}>{priority}</span>}
                    {tags?.slice(0, 2).map(t => (
                      <span key={t} style={{ fontSize: "10px", padding: "1px 5px", background: "#f0f0f0", borderRadius: "8px", color: "#666" }}>#{t}</span>
                    ))}
                    {status && <span style={{ fontSize: "11px", color: STATUS_COLOR[status] ?? "#aaa" }}>{status}</span>}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

const sectionLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#999",
  marginBottom: "10px",
};

const folderCard: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "14px 16px",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  background: "white",
  cursor: "pointer",
  textAlign: "left",
};

const fileRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 12px",
  border: "none",
  borderBottom: "1px solid #f0f0f0",
  background: "white",
  cursor: "pointer",
  width: "100%",
  fontSize: "14px",
};
