"use client";

import { useEffect, useState } from "react";
import FolderTree from "@/components/FolderTree";
import ContentViewer from "@/components/ContentViewer";
import NewFileForm from "@/components/NewFileForm";
import FontSwitcher from "@/components/FontSwitcher";
import { FileNode, FileContent } from "@/types";

export default function Home() {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [showNewFileForm, setShowNewFileForm] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load file tree
  const loadFileTree = async () => {
    try {
      const response = await fetch("/api/files/list");
      const data = await response.json();
      setFileTree(data.tree || []);

      // Extract folder paths
      const folderPaths: string[] = [];
      const extractFolders = (nodes: FileNode[], prefix = "") => {
        nodes.forEach((node) => {
          if (node.type === "folder") {
            const folderPath = prefix ? `${prefix}/${node.name}` : node.name;
            folderPaths.push(folderPath);
            if (node.children) {
              extractFolders(node.children, folderPath);
            }
          }
        });
      };
      extractFolders(data.tree || []);
      setFolders(folderPaths);
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
    loadFileContent(path);
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
          }}
        >
          {isSidebarOpen && (
            <FolderTree
              tree={fileTree}
              selectedFile={selectedFile}
              onFileSelect={handleFileSelect}
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
            content={fileContent?.content || ""}
            filename={fileContent?.name || ""}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onNewFile={() => setShowNewFileForm(true)}
          />
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
          folders={folders}
          onClose={() => setShowNewFileForm(false)}
          onSuccess={handleNewFileSuccess}
        />
      )}
    </div>
  );
}
