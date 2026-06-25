"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = "" }: Props) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Middle Corridor news…"
        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-sm"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-amber-400 text-slate-900 font-semibold rounded-lg hover:bg-amber-500 transition-colors text-sm"
      >
        Search
      </button>
    </form>
  );
}
