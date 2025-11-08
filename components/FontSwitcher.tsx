"use client";

import { useEffect, useState } from "react";

const FONT_OPTIONS = [
  { key: "sourceSans", label: "Source Sans 3" },
  { key: "lexend", label: "Lexend" },
  { key: "atkinson", label: "Atkinson Hyperlegible" },
  { key: "sourceSerif", label: "Source Serif 4" },
];

const STORAGE_KEY = "content-viewer:font";

export default function FontSwitcher() {
  const [value, setValue] = useState<string>("sourceSans");

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    const initial =
      saved ||
      document.documentElement.getAttribute("data-font") ||
      "sourceSans";
    setValue(initial);
    document.documentElement.setAttribute("data-font", initial);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    setValue(next);
    document.documentElement.setAttribute("data-font", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 12, color: "#666" }}>Font</span>
      <select
        value={value}
        onChange={onChange}
        style={{
          padding: "6px 8px",
          border: "1px solid #ccc",
          borderRadius: 4,
          background: "white",
          fontSize: 14,
        }}
        aria-label="Font selector"
      >
        {FONT_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
