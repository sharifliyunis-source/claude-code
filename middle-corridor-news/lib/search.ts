import Fuse from "fuse.js";
import type { Article } from "./types";

let fuse: Fuse<Article> | null = null;

export function buildSearchIndex(articles: Article[]): void {
  fuse = new Fuse(articles, {
    keys: [
      { name: "title", weight: 0.6 },
      { name: "summary", weight: 0.3 },
      { name: "sourceName", weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
  });
}

export function searchArticles(query: string, articles: Article[]): Article[] {
  if (!query.trim()) return articles;

  if (!fuse) buildSearchIndex(articles);

  const results = fuse!.search(query);
  return results.map((r) => r.item);
}
