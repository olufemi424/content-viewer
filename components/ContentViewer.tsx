"use client";

import ReactMarkdown from "react-markdown";

interface ContentViewerProps {
  content: string;
  filename: string;
  onOpenSidebar?: () => void;
  onNewFile?: () => void;
}

function parseValue(raw: string): any {
  const trimmed = raw.trim();
  if (trimmed === "") return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  // JSON-like arrays, e.g., ["X","LinkedIn"]
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      // fallback: split by comma and strip quotes/spaces
      return trimmed
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
    }
  }
  return trimmed;
}

function simpleYamlParse(yamlBlock: string): Record<string, any> {
  const data: Record<string, any> = {};
  const lines = yamlBlock
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"));
  for (const line of lines) {
    const m = line.match(/^([A-Za-z0-9_]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    const value = m[2];
    data[key] = parseValue(value);
  }
  return data;
}

function normalizeFrontmatter(raw: string): { body: string; data: Record<string, any> } {
  let text = raw;
  // Unwrap code-fenced frontmatter at the very top if present
  if (text.startsWith("```")) {
    const fenced = text.match(/^```[^\n]*\n(---[\s\S]*?---)\n```[\r\n]*/);
    if (fenced) {
      text = `${fenced[1]}\n${text.slice(fenced[0].length)}`;
    }
  }
  // Extract leading --- frontmatter ---
  if (text.startsWith("---")) {
    const match = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
    if (match) {
      const yaml = match[1];
      const data = simpleYamlParse(yaml);
      const body = text.slice(match[0].length);
      return { body, data };
    }
  }
  return { body: text, data: {} };
}

export default function ContentViewer({
  content,
  filename,
  onOpenSidebar,
  onNewFile,
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
            Select a file on the left to view its content, or start by creating
            a new one.
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
            <button
              onClick={() => onNewFile && onNewFile()}
              style={{
                padding: "10px 14px",
                border: "1px solid #222",
                borderRadius: 6,
                backgroundColor: "#111",
                color: "white",
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              + New file
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { body, data } = normalizeFrontmatter(content);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {data?.title && (
        <h1
          style={{
            fontSize: "2.2em",
            fontWeight: 800,
            marginBottom: "0.25em",
            letterSpacing: "-0.02em",
          }}
        >
          {String(data.title)}
        </h1>
      )}
      {data?.date && (
        <div style={{ color: "#666", marginBottom: "1.25em", fontSize: 14 }}>
          {String(data.date)}
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
        {body}
      </ReactMarkdown>
    </div>
  );
}
