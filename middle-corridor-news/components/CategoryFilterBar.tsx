"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/sources";

export default function CategoryFilterBar() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 flex-wrap">
      <Link
        href="/"
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          pathname === "/"
            ? "bg-amber-400 text-slate-900"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        All
      </Link>
      {(Object.entries(CATEGORIES) as [string, string][]).map(
        ([slug, label]) => (
          <Link
            key={slug}
            href={`/category/${slug}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              pathname === `/category/${slug}`
                ? "bg-amber-400 text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {label}
          </Link>
        )
      )}
    </div>
  );
}
