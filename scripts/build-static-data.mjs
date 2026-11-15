// Generates public/data/{tree.json,files/<path>.json} from content/*.md so the
// site can be exported statically (no server filesystem, no write routes).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(root, "content");
const OUT = path.join(root, "public", "data");

const FM = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parse(raw) {
  const m = raw.match(FM);
  if (!m) return { metadata: {}, body: raw };
  const metadata = {};
  const lines = m[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const k = lines[i].match(/^(\w+):\s*(.*)/);
    if (!k) continue;
    let v = k[2].trim();
    if (v === "") {
      const items = [];
      while (i + 1 < lines.length && /^\s+-\s+/.test(lines[i + 1])) {
        items.push(lines[++i].replace(/^\s+-\s+/, "").trim().replace(/^["']|["']$/g, ""));
      }
      metadata[k[1]] = items;
    } else if (v.startsWith("[") && v.endsWith("]")) {
      metadata[k[1]] = v.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else {
      metadata[k[1]] = v.replace(/^["']|["']$/g, "");
    }
  }
  return { metadata, body: raw.slice(m[0].length) };
}

const tags = new Set();
function walk(dir, rel = "") {
  const items = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    const p = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      const children = walk(full, p);
      if (children.length) items.push({ name: e.name, path: p, type: "folder", children });
    } else if (e.name.endsWith(".md")) {
      const { metadata, body } = parse(fs.readFileSync(full, "utf8"));
      (Array.isArray(metadata.tags) ? metadata.tags : []).forEach((t) => tags.add(t));
      items.push({ name: e.name, path: p, type: "file", metadata });
      const dest = path.join(OUT, "files", `${p}.json`);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, JSON.stringify({ path: p, name: e.name, content: body, metadata }));
    }
  }
  items.sort((a, b) => (a.type !== b.type ? (a.type === "folder" ? -1 : 1) : a.name.localeCompare(b.name)));
  return items;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const tree = walk(CONTENT);
fs.writeFileSync(path.join(OUT, "tree.json"), JSON.stringify({ tree, allTags: [...tags].sort() }));
console.log(`static data: ${tree.length} top-level nodes, ${tags.size} tags`);
