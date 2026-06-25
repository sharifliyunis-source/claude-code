import Parser from "rss-parser";
import crypto from "crypto";
import { NEWS_SOURCES, MIDDLE_CORRIDOR_KEYWORDS } from "@/data/sources";
import type { Article, FeedResult } from "./types";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent":
      "MiddleCorridorNews/1.0 (+https://middlecorridornews.com/about)",
  },
});

function isMiddleCorridorRelated(title: string, summary: string): boolean {
  const text = `${title} ${summary}`.toLowerCase();
  return MIDDLE_CORRIDOR_KEYWORDS.some((kw) => text.includes(kw));
}

function makeId(url: string): string {
  return crypto.createHash("sha256").update(url).digest("hex").slice(0, 16);
}

function extractImage(item: Parser.Item): string | undefined {
  // Try media:content or enclosure
  const media = (item as Record<string, unknown>)["media:content"] as
    | { $?: { url?: string } }
    | undefined;
  if (media?.$?.url) return media.$.url;

  const enclosure = item.enclosure;
  if (enclosure?.url && enclosure.type?.startsWith("image/"))
    return enclosure.url;

  // Try to pull first img from content
  const content =
    (item as Record<string, unknown>)["content:encoded"] as string | undefined;
  if (content) {
    const match = content.match(/<img[^>]+src="([^"]+)"/);
    if (match) return match[1];
  }

  return undefined;
}

async function fetchSource(source: (typeof NEWS_SOURCES)[number]): Promise<Article[]> {
  try {
    const feed = await parser.parseURL(source.rssUrl);
    const articles: Article[] = [];

    for (const item of feed.items.slice(0, 30)) {
      const title = item.title ?? "";
      const summary =
        item.contentSnippet ?? item.summary ?? item.content ?? "";

      if (!isMiddleCorridorRelated(title, summary)) continue;

      articles.push({
        id: makeId(item.link ?? item.guid ?? title),
        title: title.trim(),
        summary: summary.replace(/<[^>]+>/g, "").trim().slice(0, 400),
        url: item.link ?? "#",
        source: source.url,
        sourceName: source.name,
        category: source.category,
        publishedAt: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
        imageUrl: extractImage(item),
        country: source.country,
      });
    }

    return articles;
  } catch {
    return [];
  }
}

export async function fetchAllFeeds(): Promise<FeedResult> {
  const results = await Promise.allSettled(
    NEWS_SOURCES.map((s) => fetchSource(s))
  );

  const articles: Article[] = [];
  let errorCount = 0;

  for (const result of results) {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    } else {
      errorCount++;
    }
  }

  // Deduplicate by id
  const seen = new Set<string>();
  const unique = articles.filter((a) => {
    if (seen.has(a.id)) return false;
    seen.add(a.id);
    return true;
  });

  // Sort newest first
  unique.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return {
    articles: unique,
    fetchedAt: new Date().toISOString(),
    errorCount,
  };
}
