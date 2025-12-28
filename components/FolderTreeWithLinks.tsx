"use client";

import { useState } from "react";
import Link from "next/link";
import { FileNode } from "@/types";
import { filePathToSlug } from "@/lib/content";

interface FolderTreeWithLinksProps {
  tree: FileNode[];
  currentSlug: string;
}

interface TreeNodeProps {
  node: FileNode;
  currentSlug: string;
  level: number;
}

function TreeNode({ node, currentSlug, level }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(() => {
    // Auto-expand if this folder contains the current file
    if (node.type === "folder" && node.children) {
      const checkChildren = (children: FileNode[]): boolean => {
        return children.some((child) => {
          if (child.type === "file") {
            const slug = child.path.replace(/\.md$/, "");
            return slug === currentSlug;
          }
          if (child.type === "folder" && child.children) {
            return checkChildren(child.children);
          }
          return false;
        });
      };
      return checkChildren(node.children);
    }
    return false;
  });

  const indent = level * 16;

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
            {node.children.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                currentSlug={currentSlug}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // File node - use Link for navigation
  const slug = node.path.replace(/\.md$/, "");
  const href = `/${slug}`;
  const isSelected = slug === currentSlug;

  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "6px 8px",
        paddingLeft: `${indent + 8}px`,
        cursor: "pointer",
        backgroundColor: isSelected ? "#e9ecef" : "transparent",
        borderRadius: "4px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <span style={{ marginRight: "6px" }}>📝</span>
      <span>{node.name}</span>
    </Link>
  );
}

export default function FolderTreeWithLinks({
  tree,
  currentSlug,
}: FolderTreeWithLinksProps) {
  return (
    <div
      style={{
        padding: "8px 4px",
        fontSize: "14px",
        lineHeight: "1.5",
        overflowY: "auto",
        height: "100%",
      }}
    >
      <Link
        href="/"
        style={{
          display: "block",
          padding: "10px 12px",
          fontWeight: "bold",
          borderBottom: "1px solid #e5e5e5",
          marginBottom: "8px",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        content/
      </Link>
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          currentSlug={currentSlug}
          level={0}
        />
      ))}
    </div>
  );
}
