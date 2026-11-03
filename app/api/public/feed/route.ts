import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { parseFrontmatter } from "@/lib/frontmatter";

const CONTENT_DIR = path.join(process.cwd(), ".", "content");

type PublicItem = {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  publish_date: string;
  platform?: string;
  content_type?: string;
  tags: string[];
};

function makeSlug(filePath: string) {
  return filePath
    .replace(/\.md$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function firstParagraph(body: string) {
  const paragraph = body
    .split(/\n\s*\n/)
    .map((part) => part.replace(/^#+\s+/, "").replace(/[*_`]/g, "").trim())
    .find((part) => part.length > 30 && !part.startsWith("-"));
  return (paragraph || "A practical piece from the Niniwise content library.").slice(0, 220);
}

function collectPublished(dirPath: string, relativePath = ""): PublicItem[] {
  const items: PublicItem[] = [];
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dirPath, entry.name);
    const filePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      items.push(...collectPublished(fullPath, filePath));
      continue;
    }
    if (!entry.name.endsWith(".md") || entry.name.toLowerCase() === "readme.md") continue;
    const raw = fs.readFileSync(fullPath, "utf8");
    const { metadata, body } = parseFrontmatter(raw);
    if (metadata.stage !== "posted" || !metadata.publish_date) continue;
    items.push({
      slug: makeSlug(filePath),
      path: filePath,
      title: metadata.title || entry.name.replace(/\.md$/, ""),
      excerpt: firstParagraph(body),
      publish_date: metadata.publish_date,
      platform: metadata.platform,
      content_type: metadata.content_type,
      tags: metadata.tags || [],
    });
  }
  return items;
}

export async function GET() {
  try {
    const items = collectPublished(CONTENT_DIR)
      .sort((a, b) => b.publish_date.localeCompare(a.publish_date))
      .slice(0, 24);
    return NextResponse.json({ items }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Error building public content feed:", error);
    return NextResponse.json({ error: "Failed to read published content" }, { status: 500 });
  }
}
