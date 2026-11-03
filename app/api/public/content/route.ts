import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import { parseFrontmatter } from "@/lib/frontmatter";

const CONTENT_DIR = path.join(process.cwd(), ".", "content");

function slugFor(filePath: string) {
  return filePath.replace(/\.md$/, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
}

function findPublishedFile(dirPath: string, slug: string, relativePath = ""): string | null {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dirPath, entry.name);
    const filePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      const match = findPublishedFile(fullPath, slug, filePath);
      if (match) return match;
    } else if (entry.name.endsWith(".md") && slugFor(filePath) === slug) {
      const { metadata } = parseFrontmatter(fs.readFileSync(fullPath, "utf8"));
      if (metadata.stage === "posted" && metadata.publish_date) return fullPath;
    }
  }
  return null;
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "A valid slug is required" }, { status: 400 });
  }
  const fullPath = findPublishedFile(CONTENT_DIR, slug);
  if (!fullPath) return NextResponse.json({ error: "Published content not found" }, { status: 404 });
  const raw = fs.readFileSync(fullPath, "utf8");
  const { metadata, body } = parseFrontmatter(raw);
  return NextResponse.json({ content: body, metadata }, { headers: { "Cache-Control": "no-store" } });
}
