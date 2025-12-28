"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileNode } from "@/types";
import ContentViewer from "@/components/ContentViewer";
import FontSwitcher from "@/components/FontSwitcher";
import FolderTreeWithLinks from "@/components/FolderTreeWithLinks";
import { formatDate } from "@/lib/frontmatter";

interface ContentPageProps {
  content: string;
  filePath: string;
  fileTree: FileNode[];
  currentSlug: string;
  title: string;
  date?: string;
  readingTime: number;
  tags?: string[];
}

export default function ContentPage({
  content,
  filePath,
  fileTree,
  currentSlug,
  title,
  date,
  readingTime,
  tags,
}: ContentPageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Read sidebar state from localStorage after hydration
  useEffect(() => {
    const stored = localStorage.getItem("sidebarOpen");
    if (stored === "true") {
      setIsSidebarOpen(true);
    }
  }, []);

  // Persist sidebar state to localStorage
  const toggleSidebar = (open?: boolean) => {
    const newState = open !== undefined ? open : !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarOpen", String(newState));
  };

  const filename = filePath.split("/").pop() || "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => toggleSidebar()}
            aria-label="Toggle navigation"
            aria-pressed={isSidebarOpen}
            style={{
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "16px",
              lineHeight: 1,
            }}
          >
            ☰
          </button>
          <Link
            href="/"
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Content Viewer
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <FontSwitcher />
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Left sidebar - File tree */}
        <div
          style={{
            width: isSidebarOpen ? "260px" : "0px",
            borderRight: isSidebarOpen ? "1px solid #e5e5e5" : "none",
            overflow: "hidden",
            backgroundColor: "#fafafa",
            transition: "width 200ms ease",
          }}
        >
          {isSidebarOpen && (
            <FolderTreeWithLinks
              tree={fileTree}
              currentSlug={currentSlug}
            />
          )}
        </div>

        {/* Right panel - Content viewer */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          <ContentViewer
            content={content}
            filename={filename}
            title={title}
            date={date}
            readingTime={readingTime}
            tags={tags}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "8px 16px",
          borderTop: "1px solid #e5e5e5",
          fontSize: "12px",
          color: "#666",
          backgroundColor: "#fafafa",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flex: 1,
            minWidth: 0,
          }}
        >
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "inline-block",
            }}
            title={filePath}
          >
            {filePath}
          </span>
          <button
            onClick={handleCopyLink}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              color: "#444",
              padding: 2,
            }}
            aria-label="Copy link to clipboard"
            title="Copy link"
          >
            {copied ? "✓" : "🔗"}
          </button>
        </div>
      </div>
    </div>
  );
}
