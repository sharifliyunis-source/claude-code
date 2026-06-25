import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAllFeeds } from "@/lib/feed";
import { CATEGORIES } from "@/data/sources";
import type { Category } from "@/data/sources";
import NewsCard from "@/components/NewsCard";
import CategoryFilterBar from "@/components/CategoryFilterBar";
import SearchBar from "@/components/SearchBar";

export const revalidate = 1800;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORIES[slug as Category];
  if (!label) return {};
  return {
    title: `${label} News`,
    description: `Latest Middle Corridor ${label.toLowerCase()} news`,
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const label = CATEGORIES[slug as Category];
  if (!label) notFound();

  const { articles } = await fetchAllFeeds();
  const filtered = articles.filter((a) => a.category === slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{label}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <SearchBar />
      </div>

      <div className="mb-6">
        <CategoryFilterBar />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p>No {label.toLowerCase()} articles found yet.</p>
        </div>
      )}
    </div>
  );
}
