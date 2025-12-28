import Link from "next/link";
import { getAllContentPaths, buildFileTree } from "@/lib/content";
import HomePage from "./HomePage";

export default function Page() {
  const allPaths = getAllContentPaths();
  const fileTree = buildFileTree();

  // Convert paths to links
  const files = allPaths.map((path) => {
    const slug = path.replace(/\.md$/, "");
    const parts = slug.split("/");
    const filename = parts[parts.length - 1];
    const folder = parts.slice(0, -1).join("/");

    // Create a readable title from filename
    const title = filename
      .replace(/-/g, " ")
      .replace(/^\d+-/, "") // Remove leading numbers
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return {
      path,
      slug,
      title,
      folder,
      href: `/${slug}`,
    };
  });

  // Group by top-level folder
  const grouped = files.reduce((acc, file) => {
    const topFolder = file.folder.split("/")[0] || "root";
    if (!acc[topFolder]) {
      acc[topFolder] = [];
    }
    acc[topFolder].push(file);
    return acc;
  }, {} as Record<string, typeof files>);

  return <HomePage files={files} grouped={grouped} fileTree={fileTree} />;
}
