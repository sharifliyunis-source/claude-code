import { fetchAllFeeds } from "@/lib/feed";
import HeroCard from "@/components/HeroCard";
import NewsCard from "@/components/NewsCard";
import CategoryFilterBar from "@/components/CategoryFilterBar";
import SearchBar from "@/components/SearchBar";

export const revalidate = 1800; // 30 minutes ISR

export default async function HomePage() {
  const { articles, fetchedAt, errorCount } = await fetchAllFeeds();

  const hero = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Middle Corridor News
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Trans-Caspian International Transport Route · Auto-aggregated
          </p>
        </div>
        <SearchBar />
      </div>

      {/* Category filter */}
      <div className="mb-6">
        <CategoryFilterBar />
      </div>

      {/* Hero */}
      {hero && (
        <div className="mb-8">
          <HeroCard article={hero} />
        </div>
      )}

      {/* Grid */}
      {rest.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">No Middle Corridor articles found yet.</p>
          <p className="text-sm mt-2">
            Add RSS sources in <code>data/sources.ts</code> and redeploy.
          </p>
        </div>
      )}

      {/* Meta */}
      <p className="text-xs text-slate-300 text-center mt-12">
        Last fetched:{" "}
        {new Date(fetchedAt).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
        {errorCount > 0 && ` · ${errorCount} source(s) unreachable`}
      </p>
    </div>
  );
}
