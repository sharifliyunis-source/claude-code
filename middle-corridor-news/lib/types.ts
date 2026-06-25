import type { Category } from "@/data/sources";

export interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceName: string;
  category: Category;
  publishedAt: string;
  imageUrl?: string;
  country: string;
}

export interface FeedResult {
  articles: Article[];
  fetchedAt: string;
  errorCount: number;
}
