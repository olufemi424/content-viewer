"use client";

import { useState } from "react";
import { FileNode } from "@/types";

interface FolderTreeProps {
  tree: FileNode[];
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
}

interface TreeNodeProps {
  node: FileNode;
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
  level: number;
}

function TreeNode({ node, selectedFile, onFileSelect, level }: TreeNodeProps) {
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
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span style={{ marginRight: "6px" }}>{isExpanded ? "📂" : "📁"}</span>
          <span>{node.name}</span>
        </div>
        {isExpanded && node.children && (
          <div>
            {node.children.map((child, index) => (
              <TreeNode
                key={child.path}
                node={child}
                selectedFile={selectedFile}
                onFileSelect={onFileSelect}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "6px 8px",
        paddingLeft: `${indent + 8}px`,
        cursor: "pointer",
        backgroundColor: isSelected ? "#e9ecef" : "transparent",
        borderRadius: "4px",
      }}
      onClick={() => onFileSelect(node.path)}
    >
      <span style={{ marginRight: "6px" }}>📝</span>
      <span>{node.name}</span>
    </div>
  );
}

export default function FolderTree({
  tree,
  selectedFile,
  onFileSelect,
}: FolderTreeProps) {
  return (
    <div
      style={{
        padding: "8px 4px",
        fontSize: "14px",
        lineHeight: "1.5",
      }}
    >
      <div
        style={{
          padding: "10px 12px",
          fontWeight: "bold",
          borderBottom: "1px solid #e5e5e5",
          marginBottom: "8px",
        }}
      >
        content/
      </div>
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          level={0}
        />
      ))}
    </div>
  );
}
