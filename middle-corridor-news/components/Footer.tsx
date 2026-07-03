import Link from "next/link";
import { CATEGORIES } from "@/data/sources";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-black text-lg">MiddleCorridor</span>
              <span className="text-slate-300 font-light text-lg">News</span>
            </div>
            <p className="text-sm leading-relaxed">
              Aggregating news about the Trans-Caspian International Transport
              Route (TITR) — the Middle Corridor connecting Asia and Europe via
              Azerbaijan, Georgia, and Kazakhstan.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Categories
            </h3>
            <ul className="space-y-2">
              {(Object.entries(CATEGORIES) as [string, string][]).map(
                ([slug, label]) => (
                  <li key={slug}>
                    <Link
                      href={`/category/${slug}`}
                      className="text-sm hover:text-amber-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-slate-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-amber-400 transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-xs text-slate-600 text-center">
          © {new Date().getFullYear()} Middle Corridor News · Auto-aggregated
          from public RSS feeds · Content belongs to respective publishers
        </div>
      </div>
    </footer>
  );
}
