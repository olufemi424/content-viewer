"use client";

interface BreadcrumbsProps {
  path: string;                           // e.g. "videos/mindset/quotes.md"
  onNavigate: (path: string) => void;     // called with folder path or file path
}

export default function Breadcrumbs({ path, onNavigate }: BreadcrumbsProps) {
  if (!path) return null;

  const parts = path.split('/');

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "2px",
      fontSize: "13px",
      color: "#888",
      marginBottom: "20px",
    }}>
      <button onClick={() => onNavigate('')} style={linkStyle}>
        content
      </button>
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1;
        const segmentPath = parts.slice(0, i + 1).join('/');
        return (
          <span key={segmentPath} style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <span style={{ color: "#ccc" }}>/</span>
            {isLast ? (
              <span style={{ color: "#333" }}>{part.replace(/\.md$/, '')}</span>
            ) : (
              <button onClick={() => onNavigate(segmentPath)} style={linkStyle}>
                {part}
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#888",
  fontSize: "13px",
  padding: 0,
  textDecoration: "underline",
  textDecorationStyle: "dotted",
  textUnderlineOffset: "2px",
};
