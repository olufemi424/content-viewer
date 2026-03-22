"use client";

import { useMemo, useState } from "react";
import { FileNode } from "@/types";
import FileTreeNode from "@/components/FileTreeNode";

interface FolderTreeProps {
  tree: FileNode[];
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
  onFolderSelect?: (path: string) => void;
  searchQuery?: string;
  statusFilter?: string[];
  priorityFilter?: string[];
  tagFilter?: string[];
  stageFilter?: string[];
}

/** Recursively filter tree to only include files matching all active filters. */
function filterTree(nodes: FileNode[], query: string, statusFilter: string[], priorityFilter: string[], stageFilter: string[], tagFilter: string[]): FileNode[] {
  const q = query.toLowerCase();
  return nodes.reduce<FileNode[]>((acc, node) => {
    if (node.type === "folder") {
      const filtered = filterTree(node.children || [], q, statusFilter, priorityFilter, stageFilter, tagFilter);
      if (filtered.length) acc.push({ ...node, children: filtered });
    } else {
      const m = node.metadata;
      if (q && !node.name.toLowerCase().includes(q) &&
          !m?.title?.toLowerCase().includes(q) &&
          !m?.tags?.some(t => t.toLowerCase().includes(q))) return acc;
      if (statusFilter.length && (!m?.status || !statusFilter.includes(m.status))) return acc;
      if (priorityFilter.length && (!m?.priority || !priorityFilter.includes(m.priority))) return acc;
      if (stageFilter.length && (!m?.stage || !stageFilter.includes(m.stage))) return acc;
      if (tagFilter.length && !tagFilter.every(t => m?.tags?.includes(t))) return acc;
      acc.push(node);
    }
    return acc;
  }, []);
}

function countFiles(nodes: FileNode[]): number {
  return nodes.reduce((total, node) => {
    if (node.type === "file") return total + 1;
    return total + countFiles(node.children || []);
  }, 0);
}

export default function FolderTree({
  tree,
  selectedFile,
  onFileSelect,
  onFolderSelect,
  searchQuery = "",
  statusFilter = [],
  priorityFilter = [],
  tagFilter = [],
  stageFilter = [],
}: FolderTreeProps) {
  const filtered = useMemo(
    () => filterTree(tree, searchQuery, statusFilter, priorityFilter, stageFilter, tagFilter),
    [tree, searchQuery, statusFilter, priorityFilter, stageFilter, tagFilter]
  );
  const hasActiveSearch = Boolean(
    searchQuery.trim() || statusFilter.length || priorityFilter.length || stageFilter.length || tagFilter.length
  );
  const fileCount = useMemo(() => countFiles(filtered), [filtered]);

  return (
    <div style={{ padding: "8px 4px", fontSize: "14px", lineHeight: "1.5" }}>
      <div
        style={{
          padding: "10px 12px",
          fontWeight: "bold",
          borderBottom: "1px solid #e5e5e5",
          marginBottom: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <span>content/</span>
        <span style={{ fontSize: "11px", color: "#888", fontWeight: 500 }}>
          {fileCount} result{fileCount === 1 ? "" : "s"}
        </span>
      </div>
      {filtered.length === 0 && (
        <div style={{ padding: "12px", color: "#999", fontSize: "13px" }}>
          No files found{hasActiveSearch ? " — try a shorter keyword or clear some filters." : ""}
        </div>
      )}
      {filtered.map((node) => (
        <FileTreeNode
          key={node.path}
          node={node}
          selectedFile={selectedFile}
          onFileSelect={onFileSelect}
          onFolderSelect={onFolderSelect}
          level={0}
          forceExpanded={hasActiveSearch}
        />
      ))}
    </div>
  );
}
