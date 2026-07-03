import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/data/sources";
import type { Article } from "@/lib/types";

interface Props {
  article: Article;
}

export default function HeroCard({ article }: Props) {
  const categoryLabel = CATEGORIES[article.category] ?? article.category;

  return (
    <Link
      href={`/article/${article.id}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl min-h-[420px] bg-slate-800"
    >
      {article.imageUrl ? (
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col gap-3">
        <span className="self-start text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-slate-900 uppercase tracking-wide">
          {categoryLabel}
        </span>
        <h2 className="text-white font-black text-2xl md:text-3xl leading-tight group-hover:text-amber-300 transition-colors">
          {article.title}
        </h2>
        {(article.aiSummary ?? article.summary) && (
          <p className="text-slate-300 text-sm line-clamp-2 max-w-2xl">
            {article.aiSummary ?? article.summary}
          </p>
        )}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-300">{article.sourceName}</span>
          <span>·</span>
          <span>{article.country}</span>
        </div>
      </div>
    </Link>
  );
}
