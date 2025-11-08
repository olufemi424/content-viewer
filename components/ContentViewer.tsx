"use client";

import ReactMarkdown from "react-markdown";

interface ContentViewerProps {
  content: string;
  filename: string;
}

export default function ContentViewer({
  content,
  filename,
}: ContentViewerProps) {
  if (!content) {
    return (
      <div
        style={{
          padding: "40px",
          color: "#666",
          textAlign: "center",
        }}
      >
        Select a file to view its content
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
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
    </div>
  );
}
