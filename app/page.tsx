"use client";

import { useEffect, useMemo, useState } from "react";
import FolderTree from "@/components/FolderTree";
import ContentViewer from "@/components/ContentViewer";
import FolderIndex from "@/components/FolderIndex";
import FontSwitcher from "@/components/FontSwitcher";
import FilterPanel from "@/components/FilterPanel";
import { FileNode, FileContent } from "@/types";
import { flattenFileList, getPrevNext, getFolderChildren } from "@/lib/fileList";

export default function Home() {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  // Start closed so server HTML and first client render match (no hydration
  // mismatch); open on wide screens after mount.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [stageFilter, setStageFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>("");

  const flatFiles = useMemo(() => flattenFileList(fileTree), [fileTree]);
  const { prev, next } = useMemo(
    () => selectedFile ? getPrevNext(flatFiles, selectedFile) : { prev: null, next: null },
    [flatFiles, selectedFile]
  );

  // Load file tree
  const loadFileTree = async () => {
    try {
      const response = await fetch("/data/tree.json");
      const data = await response.json();
      setFileTree(data.tree || []);
      setAllTags(data.allTags || []);

    } catch (error) {
      console.error("Failed to load file tree:", error);
    }
  };

  // Load file content
  const loadFileContent = async (path: string) => {
    try {
      const response = await fetch(
        `/data/files/${path.split("/").map(encodeURIComponent).join("/")}.json`
      );
      const data = await response.json();
      setFileContent(data);
    } catch (error) {
      console.error("Failed to load file:", error);
    }
  };

  // Handle file selection
  const handleFileSelect = (path: string) => {
    setSelectedFile(path);
    setSelectedFolder(null);
    loadFileContent(path);
  };

  // Handle navigation from breadcrumbs, prev/next, or folder index
  const handleNavigate = (path: string) => {
    if (!path) {
      // root
      setSelectedFolder('');
      setSelectedFile(null);
      setFileContent(null);
      return;
    }
    // Determine if path is a file or folder
    const isFile = flatFiles.some(f => f.path === path);
    if (isFile) {
      handleFileSelect(path);
    } else {
      setSelectedFolder(path);
      setSelectedFile(null);
      setFileContent(null);
    }
  };

  const handleCopyFooterLink = async () => {
    if (!selectedFile) return;
    try {
      await navigator.clipboard.writeText(selectedFile);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 640) setIsSidebarOpen(true);
  }, []);

  // Escape closes the drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Load once (static site)
  useEffect(() => {
    loadFileTree();
  }, []);

  return (
    <div className="app-shell">
      {/* Header */}
      <div className="app-header">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setIsSidebarOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-pressed={isSidebarOpen}
            className="touch-target"
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
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>
            Content OS
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <FontSwitcher />
        </div>
      </div>

      {/* Main content */}
      <div className="app-body">
        {/* Mobile overlay — tapping it closes the sidebar */}
        {isSidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left sidebar */}
        <div className={`app-sidebar${isSidebarOpen ? "" : " closed"}`}>
          {isSidebarOpen && (
            <>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="sidebar-close"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close navigation"
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: "8px 10px", borderBottom: "1px solid #e5e5e5" }}>
                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <input
                    type="search"
                    placeholder="Search filename, title, tags…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setSearchQuery("");
                    }}
                    aria-label="Search files"
                    style={{
                      width: "100%",
                      padding: "6px 28px 6px 8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "13px",
                      boxSizing: "border-box",
                      background: "white",
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                      title="Clear search"
                      style={{
                        position: "absolute",
                        right: 6,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: "#777",
                        fontSize: 14,
                        padding: 2,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
                {searchQuery && (
                  <div style={{ marginTop: 6, fontSize: 11, color: "#888" }}>
                    Press Esc to clear search
                  </div>
                )}
              </div>
              <FilterPanel
                allTags={allTags}
                priorityFilter={priorityFilter}
                tagFilter={tagFilter}
                stageFilter={stageFilter}
                onPriorityChange={setPriorityFilter}
                onStageChange={setStageFilter}
                onTagChange={setTagFilter}
              />
              <div style={{ flex: 1, overflow: "auto" }}>
                <FolderTree
                  tree={fileTree}
                  selectedFile={selectedFile}
                  onFileSelect={(path) => {
                    handleFileSelect(path);
                    if (window.innerWidth <= 640) setIsSidebarOpen(false);
                  }}
                  onFolderSelect={(path) => {
                    handleNavigate(path);
                    if (window.innerWidth <= 640) setIsSidebarOpen(false);
                  }}
                  searchQuery={searchQuery}
                  priorityFilter={priorityFilter}
                  tagFilter={tagFilter}
                  stageFilter={stageFilter}
                />
              </div>
            </>
          )}
        </div>

        {/* Right panel */}
        <div className="app-content">
          {selectedFolder !== null ? (
            <FolderIndex
              folderPath={selectedFolder}
              children={getFolderChildren(fileTree, selectedFolder)}
              onFileSelect={handleFileSelect}
              onFolderSelect={(path) => handleNavigate(path)}
            />
          ) : (
            <ContentViewer
              content={fileContent?.content || ""}
              filename={fileContent?.name || ""}
              filePath={selectedFile || undefined}
              metadata={fileContent?.metadata}
              prev={prev}
              next={next}
              onOpenSidebar={() => setIsSidebarOpen(true)}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      {selectedFile && (
        <div className="app-footer">
          <div className="footer-path">
            <span title={selectedFile}>{selectedFile}</span>
            <button
              onClick={handleCopyFooterLink}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 14,
                color: "#444",
                padding: 2,
                flexShrink: 0,
              }}
              className="touch-target"
              aria-label="Copy file path to clipboard"
              title="Copy path"
            >
              {copied ? "✓" : "⧉"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
