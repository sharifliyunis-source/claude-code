import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchAllFeeds } from "@/lib/feed";
import { CATEGORIES } from "@/data/sources";
import NewsCard from "@/components/NewsCard";

export const revalidate = 1800;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { articles } = await fetchAllFeeds();
  const article = articles.find((a) => a.id === id);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const { articles } = await fetchAllFeeds();
  const article = articles.find((a) => a.id === id);

  if (!article) notFound();

  const related = articles
    .filter((a) => a.id !== id && a.category === article.category)
    .slice(0, 3);

  const categoryLabel = CATEGORIES[article.category] ?? article.category;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-amber-600">
          Home
        </Link>
        <span>›</span>
        <Link
          href={`/category/${article.category}`}
          className="hover:text-amber-600"
        >
          {categoryLabel}
        </Link>
        <span>›</span>
        <span className="text-slate-400 truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article header */}
      <article>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wide">
            {categoryLabel}
          </span>
          <span className="text-xs text-slate-400">{article.country}</span>
        </div>

        <h1 className="text-3xl font-black text-slate-900 leading-tight mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-slate-500 mb-6">
          <span className="font-semibold text-slate-700">{article.sourceName}</span>
          <span>·</span>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </time>
        </div>

        {article.imageUrl && (
          <div className="relative w-full h-72 rounded-xl overflow-hidden mb-6 bg-slate-100">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {article.summary && (
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {article.summary}
          </p>
        )}

        {/* External link */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-xl hover:bg-amber-500 transition-colors"
        >
          Read full article at {article.sourceName}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Related {categoryLabel} News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
