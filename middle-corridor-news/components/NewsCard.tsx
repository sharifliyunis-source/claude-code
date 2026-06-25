import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/sources";
import type { Article } from "@/lib/types";

interface Props {
  article: Article;
  variant?: "default" | "compact";
}

const CATEGORY_COLORS: Record<string, string> = {
  trade: "bg-blue-100 text-blue-800",
  logistics: "bg-purple-100 text-purple-800",
  energy: "bg-orange-100 text-orange-800",
  politics: "bg-red-100 text-red-800",
  infrastructure: "bg-green-100 text-green-800",
  economy: "bg-amber-100 text-amber-800",
};

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function NewsCard({ article, variant = "default" }: Props) {
  const categoryLabel = CATEGORIES[article.category] ?? article.category;
  const categoryColor =
    CATEGORY_COLORS[article.category] ?? "bg-slate-100 text-slate-700";

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${article.id}`}
        className="flex gap-3 group py-3 border-b border-slate-100 last:border-0"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2">
            {article.title}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {article.sourceName} · {timeAgo(article.publishedAt)}
          </p>
        </div>
        {article.imageUrl && (
          <div className="relative w-16 h-16 shrink-0 rounded overflow-hidden bg-slate-100">
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/article/${article.id}`}
      className="group flex flex-col bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      {article.imageUrl && (
        <div className="relative h-44 w-full bg-slate-100">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor}`}
          >
            {categoryLabel}
          </span>
          <span className="text-xs text-slate-400">{article.country}</span>
        </div>
        <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-3 leading-snug">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-sm text-slate-500 line-clamp-2">{article.summary}</p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">{article.sourceName}</span>
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
