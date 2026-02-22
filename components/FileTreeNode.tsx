"use client";

import { useState } from "react";
import { FileNode } from "@/types";

const STATUS_LABELS: Record<string, string> = {
  draft: "draft",
  "in-progress": "in-progress",
  done: "done",
};

const PRIORITY_SYMBOLS: Record<string, string> = {
  high: "↑",
  medium: "→",
  low: "↓",
};

interface FileTreeNodeProps {
  node: FileNode;
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
  onFolderSelect?: (path: string) => void;
  level: number;
}

export default function FileTreeNode({
  node,
  selectedFile,
  onFileSelect,
  onFolderSelect,
  level,
}: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const indent = level * 16;
  const isSelected = selectedFile === node.path;

  if (node.type === "folder") {
    return (
      <div>
        <div
          style={{
            cursor: "pointer",
            padding: "6px 8px",
            paddingLeft: `${indent + 8}px`,
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
          onDoubleClick={() => onFolderSelect?.(node.path)}
          title="Double-click to view folder index"
        >
          <span>{isExpanded ? "📂" : "📁"}</span>
          <span>{node.name}</span>
        </div>
        {isExpanded && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeNode
                key={child.path}
                node={child}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
                onFolderSelect={onFolderSelect}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const { metadata } = node;

  return (
    <div
      style={{
        padding: "5px 8px",
        paddingLeft: `${indent + 8}px`,
        cursor: "pointer",
        backgroundColor: isSelected ? "#e9ecef" : "transparent",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
      onClick={() => onFileSelect(node.path)}
    >
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {node.name}
      </span>
      {metadata?.priority && (
        <span style={{ fontSize: "11px", color: metadata.priority === "high" ? "#555" : "#999", flexShrink: 0 }}>
          {PRIORITY_SYMBOLS[metadata.priority]}
        </span>
      )}
      {metadata?.status && (
        <span style={{
          fontSize: "10px",
          padding: "1px 5px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          color: metadata.status === "done" ? "#999" : "#555",
          background: metadata.status === "done" ? "#f5f5f5" : "white",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}>
          {STATUS_LABELS[metadata.status]}
        </span>
      )}
    </div>
  );
}
