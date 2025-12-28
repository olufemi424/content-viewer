"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FileNode } from "@/types";
import FolderTreeWithLinks from "@/components/FolderTreeWithLinks";
import FontSwitcher from "@/components/FontSwitcher";

interface FileInfo {
  path: string;
  slug: string;
  title: string;
  folder: string;
  href: string;
}

interface HomePageProps {
  files: FileInfo[];
  grouped: Record<string, FileInfo[]>;
  fileTree: FileNode[];
}

export default function HomePage({ files, grouped, fileTree }: HomePageProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Sort folder names
  const sortedFolders = Object.keys(grouped).sort();

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
          <h1
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Content Viewer
          </h1>
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
            <FolderTreeWithLinks tree={fileTree} currentSlug="" />
          )}
        </div>

        {/* Right panel - Content listing */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "white",
            padding: "48px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            <div style={{ marginBottom: 8, fontSize: 14, color: "#888" }}>
              Simple Markdown Workspace
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                marginBottom: 8,
              }}
            >
              Content Viewer
            </h1>
            <p
              style={{
                marginTop: 0,
                marginBottom: 32,
                color: "#666",
              }}
            >
              {files.length} documents available
            </p>

            {/* Browse button for mobile */}
            <button
              onClick={() => toggleSidebar(true)}
              style={{
                padding: "10px 14px",
                border: "1px solid #ccc",
                borderRadius: 6,
                backgroundColor: "white",
                cursor: "pointer",
                fontSize: 14,
                marginBottom: 32,
              }}
            >
              ☰ Browse files
            </button>

            {/* Grouped file listing */}
            {sortedFolders.map((folder) => (
              <div key={folder} style={{ marginBottom: 32 }}>
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "#666",
                    marginBottom: 12,
                    paddingBottom: 8,
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {folder === "root" ? "Root" : folder}
                </h2>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {grouped[folder].map((file) => (
                    <li key={file.path} style={{ marginBottom: 8 }}>
                      <Link
                        href={file.href}
                        style={{
                          color: "#111",
                          textDecoration: "none",
                          display: "block",
                          padding: "8px 0",
                        }}
                      >
                        <span style={{ fontWeight: 500 }}>{file.title}</span>
                        {file.folder && (
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: 12,
                              color: "#888",
                            }}
                          >
                            {file.folder}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
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
        }}
      >
        {files.length} documents
      </div>
    </div>
  );
}
