"use client";

import ReactMarkdown from "react-markdown";
import matter from "gray-matter";

interface ContentViewerProps {
  content: string;
  filename: string;
  onOpenSidebar?: () => void;
  onNewFile?: () => void;
}

function normalizeFrontmatter(raw: string): { body: string; data: Record<string, any> } {
  // If frontmatter is accidentally wrapped in a code fence at the very top,
  // unwrap it so the parser can detect and extract it.
  if (raw.startsWith("```")) {
    const fenced = raw.match(/^```[^\n]*\n(---[\s\S]*?---)\n```[\r\n]*/);
    if (fenced) {
      const fm = fenced[1]; // includes the --- lines
      const rest = raw.slice(fenced[0].length);
      const reconstructed = `${fm}\n${rest}`;
      const parsed = matter(reconstructed);
      return { body: parsed.content, data: parsed.data as Record<string, any> };
    }
  }
  const parsed = matter(raw);
  return { body: parsed.content, data: parsed.data as Record<string, any> };
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
