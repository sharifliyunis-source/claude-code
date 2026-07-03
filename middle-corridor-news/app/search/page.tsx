import type { Metadata } from "next";
import { fetchAllFeeds } from "@/lib/feed";
import { searchArticles } from "@/lib/search";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Search",
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const { articles } = await fetchAllFeeds();
  const results = searchArticles(q, articles);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-4">Search</h1>
        <SearchBar defaultValue={q} />
      </div>

      {q ? (
        <>
          <p className="text-slate-500 text-sm mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
            <strong className="text-slate-700">&ldquo;{q}&rdquo;</strong>
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">No results found for &ldquo;{q}&rdquo;</p>
              <p className="text-sm mt-2">Try different keywords.</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p>Enter a search term above to find articles.</p>
        </div>
      )}
    </div>
  );
}
