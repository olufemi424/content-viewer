"use client";

import { useState } from "react";

interface WeekSeedFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const MONTHS = [
  "01-january","02-february","03-march","04-april","05-may","06-june",
  "07-july","08-august","09-september","10-october","11-november","12-december",
];

export default function WeekSeedForm({ onClose, onSuccess }: WeekSeedFormProps) {
  const now = new Date();
  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState(MONTHS[now.getMonth()]);
  const [week, setWeek] = useState("week-01");
  const [topics, setTopics] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const topicList = topics
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const res = await fetch('/api/files/seed-week', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year, month, week, topics: topicList }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to seed week');
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to seed week');
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <form onSubmit={submit} style={{ width: 560, maxWidth: '92%', background: '#fff', borderRadius: 6, padding: 20 }}>
        <h2 style={{ marginTop: 0 }}>Seed Weekly Plan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
          <input value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle} placeholder="2026" />
          <select value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle}>{MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}</select>
          <input value={week} onChange={(e) => setWeek(e.target.value)} style={inputStyle} placeholder="week-09" />
        </div>

        <label style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Topics (optional, one per line)</label>
        <textarea
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          rows={8}
          placeholder="How I'm building a brand with a 9-5\n3 mistakes engineers make when starting content..."
          style={{ ...inputStyle, resize: 'vertical', marginBottom: 12 }}
        />

        {error && <div style={{ color: '#c00', fontSize: 13, marginBottom: 10 }}>{error}</div>}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button type="button" onClick={onClose} style={{ padding: '8px 12px', border: '1px solid #ccc', background: '#fff', borderRadius: 4 }}>Cancel</button>
          <button type="submit" disabled={isSubmitting} style={{ padding: '8px 12px', border: '1px solid #111', background: '#111', color: '#fff', borderRadius: 4 }}>
            {isSubmitting ? 'Seeding...' : 'Seed Week'}
          </button>
        </div>
      </form>
    </div>
  );
}
