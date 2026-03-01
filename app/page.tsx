"use client";

import { useEffect, useMemo, useState } from "react";
import FolderTree from "@/components/FolderTree";
import ContentViewer from "@/components/ContentViewer";
import FolderIndex from "@/components/FolderIndex";
import NewFileForm from "@/components/NewFileForm";
import FontSwitcher from "@/components/FontSwitcher";
import FilterPanel from "@/components/FilterPanel";
import TodayFocusPanel from "@/components/TodayFocusPanel";
import { FileNode, FileContent } from "@/types";
import { flattenFileList, getPrevNext, getFolderChildren } from "@/lib/fileList";
import { getTodayFocus } from "@/lib/todayFocus";

export default function Home() {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [showNewFileForm, setShowNewFileForm] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [stageFilter, setStageFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const flatFiles = useMemo(() => flattenFileList(fileTree), [fileTree]);
  const { prev, next } = useMemo(
    () => selectedFile ? getPrevNext(flatFiles, selectedFile) : { prev: null, next: null },
    [flatFiles, selectedFile]
  );
  const todayFocus = useMemo(() => getTodayFocus(flatFiles), [flatFiles]);

  // Load file tree
  const loadFileTree = async () => {
    try {
      const response = await fetch("/api/files/list");
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
        `/api/files/read?path=${encodeURIComponent(path)}`
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

  // Handle new file creation success
  const handleNewFileSuccess = (path: string) => {
    loadFileTree();
    setTimeout(() => {
      handleFileSelect(path);
    }, 100);
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

  // Auto-refresh file tree every 2 seconds
  useEffect(() => {
    loadFileTree();
    const interval = setInterval(loadFileTree, 2000);
    return () => clearInterval(interval);
  }, []);

  // Cmd+N / Ctrl+N to open new file form
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        setShowNewFileForm(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

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
            onClick={() => setIsSidebarOpen((v) => !v)}
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
          <button
            onClick={() => setShowNewFileForm(true)}
            style={{
              padding: "6px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            + New
          </button>
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          {isSidebarOpen && (
            <>
              <div style={{ padding: "8px 10px", borderBottom: "1px solid #e5e5e5" }}>
                <input
                  type="search"
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "13px",
                    boxSizing: "border-box",
                    background: "white",
                  }}
                />
              </div>
              <FilterPanel
                allTags={allTags}
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                tagFilter={tagFilter}
                stageFilter={stageFilter}
                onStatusChange={setStatusFilter}
                onPriorityChange={setPriorityFilter}
                onStageChange={setStageFilter}
                onTagChange={setTagFilter}
              />
              <div style={{ flex: 1, overflow: "auto" }}>
                <FolderTree
                  tree={fileTree}
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  onFolderSelect={(path) => handleNavigate(path)}
                  searchQuery={searchQuery}
                  statusFilter={statusFilter}
                  priorityFilter={priorityFilter}
                  tagFilter={tagFilter}
                  stageFilter={stageFilter}
                />
              </div>
            </>
          )}
        </div>

        {/* Right panel - Content viewer or Folder index */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          <TodayFocusPanel summary={todayFocus} onOpenFile={handleFileSelect} />
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
              onNewFile={() => setShowNewFileForm(true)}
              onNavigate={handleNavigate}
            />
          )}
        </div>
      </div>

      {/* Footer */}
      {selectedFile && (
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
              title={selectedFile}
            >
              {selectedFile}
            </span>
            <button
              onClick={handleCopyFooterLink}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 14,
                color: "#444",
                padding: 2,
              }}
              aria-label="Copy file path to clipboard"
              title="Copy path"
            >
              {copied ? "✓" : "⧉"}
            </button>
          </div>
        </div>
      )}

      {/* New file modal */}
      {showNewFileForm && (
        <NewFileForm
          allTags={allTags}
          onClose={() => setShowNewFileForm(false)}
          onSuccess={handleNewFileSuccess}
        />
      )}
    </div>
  );
}
