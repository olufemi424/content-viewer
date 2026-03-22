"use client";

import ReactMarkdown from "react-markdown";
import { Metadata, FileNode } from "@/types";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";

interface ContentViewerProps {
  content: string;
  filename: string;
  filePath?: string;
  metadata?: Metadata;
  prev?: FileNode | null;
  next?: FileNode | null;
  onOpenSidebar?: () => void;
  onNavigate?: (path: string) => void;
  onStageUpdate?: (stage: "idea" | "drafted" | "recorded" | "posted" | "analyzed") => void;
}

export default function ContentViewer({
  content,
  filename,
  filePath,
  metadata,
  prev,
  next,
  onOpenSidebar,
  onNavigate,
  onStageUpdate,
}: ContentViewerProps) {
  if (!content) {
    return (
      <div
        style={{
          padding: "48px 24px",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          marginTop: "200px",
          background:
            "radial-gradient(circle at 20% 20%, #fafafa 0%, #fff 40%)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "820px",
            textAlign: "center",
            color: "#333",
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
            }}
          >
            Content Viewer
          </h1>
          <p
            style={{
              marginTop: 8,
              marginBottom: 24,
              color: "#666",
            }}
          >
            Select a file from the sidebar to view its content.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <button
              onClick={() => onOpenSidebar && onOpenSidebar()}
              style={{
                padding: "10px 14px",
                border: "1px solid #ccc",
                borderRadius: 6,
                backgroundColor: "white",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              ☰ Browse files
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", padding: "40px 40px 40px 40px", gap: "32px", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {filePath && onNavigate && (
          <Breadcrumbs path={filePath} onNavigate={onNavigate} />
        )}
        {metadata && (metadata.status || metadata.priority || metadata.tags?.length || metadata.stage) && (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid #e5e5e5",
          alignItems: "center",
        }}>
          {metadata.status && (
            <span style={{
              fontSize: "12px",
              padding: "2px 8px",
              border: "1px solid #ccc",
              borderRadius: "12px",
              background: metadata.status === 'done' ? '#f0f0f0' : metadata.status === 'in-progress' ? '#fafafa' : 'white',
              color: metadata.status === 'done' ? '#666' : '#333',
            }}>
              {metadata.status}
            </span>
          )}
          {metadata.priority && (
            <span style={{
              fontSize: "12px",
              padding: "2px 8px",
              border: "1px solid #ccc",
              borderRadius: "12px",
              color: metadata.priority === 'high' ? '#333' : '#555',
              fontWeight: metadata.priority === 'high' ? 600 : 400,
            }}>
              ↑ {metadata.priority}
            </span>
          )}
          {metadata.tags?.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: "12px",
              padding: "2px 8px",
              background: "#f5f5f5",
              borderRadius: "12px",
              color: "#555",
            }}>
              #{tag}
            </span>
          ))}
          {(metadata.tags?.length || 0) > 3 && (
            <span style={{ fontSize: "12px", color: "#777" }}>+{(metadata.tags?.length || 0) - 3} tags</span>
          )}
          {metadata.stage && (
            <span style={{
              fontSize: "12px",
              padding: "2px 8px",
              border: "1px solid #ccc",
              borderRadius: "12px",
              background: "#fff",
            }}>
              stage: {metadata.stage}
            </span>
          )}
          {metadata.modified && (
            <span style={{ fontSize: "12px", color: "#999", marginLeft: "auto" }}>
              modified {metadata.modified}
            </span>
          )}
        </div>
      )}

      {filePath && onStageUpdate && (
        <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
          {(["idea", "drafted", "recorded", "posted", "analyzed"] as const).map((stage) => (
            <button
              key={stage}
              onClick={() => onStageUpdate(stage)}
              style={{
                fontSize: "11px",
                padding: "4px 8px",
                border: "1px solid",
                borderColor: metadata?.stage === stage ? "#111" : "#ddd",
                borderRadius: "10px",
                background: metadata?.stage === stage ? "#111" : "#fff",
                color: metadata?.stage === stage ? "#fff" : "#444",
                cursor: "pointer",
              }}
            >
              {stage}
            </button>
          ))}
        </div>
      )}
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: "2em",
                fontWeight: "bold",
                marginBottom: "0.5em",
                marginTop: "0.5em",
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                fontSize: "1.5em",
                fontWeight: "bold",
                marginBottom: "0.5em",
                marginTop: "1em",
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                fontSize: "1.25em",
                fontWeight: "bold",
                marginBottom: "0.5em",
                marginTop: "1em",
              }}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p
              style={{
                marginBottom: "1em",
                lineHeight: "1.6",
              }}
            >
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul
              style={{
                marginBottom: "1em",
                paddingLeft: "2em",
              }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              style={{
                marginBottom: "1em",
                paddingLeft: "2em",
              }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ marginBottom: "0.25em" }}>{children}</li>
          ),
          code: ({ inline, children }: any) => {
            if (inline) {
              return (
                <code
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "2px 6px",
                    borderRadius: "3px",
                    fontSize: "0.9em",
                  }}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                style={{
                  display: "block",
                  backgroundColor: "#f5f5f5",
                  padding: "16px",
                  borderRadius: "4px",
                  marginBottom: "1em",
                  overflowX: "auto",
                  fontSize: "0.9em",
                  lineHeight: "1.4",
                }}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre style={{ marginBottom: "1em" }}>{children}</pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              style={{
                color: "#000",
                textDecoration: "underline",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote
              style={{
                borderLeft: "4px solid #e5e5e5",
                paddingLeft: "16px",
                marginLeft: "0",
                marginBottom: "1em",
                color: "#666",
              }}
            >
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <table
              style={{
                borderCollapse: "collapse",
                marginBottom: "1em",
                width: "100%",
              }}
            >
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid #e5e5e5",
                padding: "8px",
                textAlign: "left",
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                border: "1px solid #e5e5e5",
                padding: "8px",
              }}
            >
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "48px",
          paddingTop: "24px",
          borderTop: "1px solid #e5e5e5",
          gap: "12px",
        }}>
          {prev ? (
            <button onClick={() => onNavigate?.(prev.path)} style={navBtnStyle("left")}>
              <span style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "2px" }}>← Previous</span>
              <span style={{ fontSize: "14px" }}>{prev.metadata?.title || prev.name.replace(/\.md$/, '')}</span>
            </button>
          ) : <div />}
          {next ? (
            <button onClick={() => onNavigate?.(next.path)} style={navBtnStyle("right")}>
              <span style={{ fontSize: "12px", color: "#999", display: "block", marginBottom: "2px" }}>Next →</span>
              <span style={{ fontSize: "14px" }}>{next.metadata?.title || next.name.replace(/\.md$/, '')}</span>
            </button>
          ) : <div />}
        </div>
      )}
      </div>

      {/* Table of Contents (right panel) */}
      <TableOfContents content={content} />
    </div>
  );
}

const navBtnStyle = (align: "left" | "right"): React.CSSProperties => ({
  padding: "12px 16px",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  background: "white",
  cursor: "pointer",
  textAlign: align,
  maxWidth: "45%",
});
