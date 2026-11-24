// Fails loudly if the static export is missing pieces. Run after `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const fail = (m) => errors.push(m);

if (fs.existsSync(path.join(root, "app", "api"))) fail("app/api exists: API routes break `output: export`. See AGENTS.md.");
const cfg = fs.readFileSync(path.join(root, "next.config.ts"), "utf8");
if (!/output:\s*["']export["']/.test(cfg)) fail('next.config.ts must keep output: "export".');

const out = path.join(root, "out");
if (!fs.existsSync(path.join(out, "index.html"))) fail("out/index.html missing: build did not produce a static export.");

let files = [];
try {
  const { tree } = JSON.parse(fs.readFileSync(path.join(out, "data", "tree.json"), "utf8"));
  (function walk(nodes) {
    for (const n of nodes) n.type === "folder" ? walk(n.children) : files.push(n.path);
  })(tree);
} catch {
  fail("out/data/tree.json missing or invalid: is the `prebuild` script intact?");
}

if (files.length === 0) fail("tree.json lists no content files.");
const md = (function count(d) {
  let n = 0;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = path.join(d, e.name);
    n += e.isDirectory() ? count(p) : e.name.endsWith(".md") ? 1 : 0;
  }
  return n;
})(path.join(root, "content"));
if (files.length !== md) fail(`content has ${md} .md files but tree.json lists ${files.length}.`);
for (const f of files) {
  if (!fs.existsSync(path.join(out, "data", "files", `${f}.json`))) fail(`missing data file for ${f}`);
}
const total = fs.readdirSync(out, { recursive: true }).length;
if (total > 15000) fail(`out/ has ${total} entries; Cloudflare Pages limit is 20,000 files.`);

if (errors.length) {
  console.error("static build verification FAILED:\n- " + errors.join("\n- "));
  process.exit(1);
}
console.log(`static build OK: ${files.length} posts, ${total} output entries`);
