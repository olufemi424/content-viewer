"use client";

import { useMemo } from "react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface TableOfContentsProps {
  content: string;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function parseHeadings(markdown: string): Heading[] {
  const lines = markdown.split('\n');
  return lines
    .filter(line => /^#{1,3}\s/.test(line))
    .map(line => {
      const match = line.match(/^(#{1,3})\s+(.*)/);
      if (!match) return null;
      const text = match[2].trim();
      return { level: match[1].length, text, id: slugify(text) };
    })
    .filter(Boolean) as Heading[];
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = useMemo(() => parseHeadings(content), [content]);

  if (headings.length < 3) return null;

  return (
    <div style={{
      position: "sticky",
      top: "20px",
      width: "200px",
      flexShrink: 0,
      fontSize: "12px",
      lineHeight: "1.6",
      borderLeft: "1px solid #e5e5e5",
      paddingLeft: "16px",
      maxHeight: "calc(100vh - 120px)",
      overflowY: "auto",
    }}>
      <div style={{ fontWeight: 600, color: "#555", marginBottom: "8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        On this page
      </div>
      {headings.map((h, i) => (
        <a
          key={i}
          href={`#${h.id}`}
          style={{
            display: "block",
            paddingLeft: `${(h.level - 1) * 10}px`,
            color: "#666",
            textDecoration: "none",
            marginBottom: "4px",
            fontSize: "12px",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#000')}
          onMouseLeave={e => (e.currentTarget.style.color = '#666')}
        >
          {h.text}
        </a>
      ))}
    </div>
  );
}
