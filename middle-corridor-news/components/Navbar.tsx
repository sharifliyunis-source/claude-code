"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/data/sources";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-amber-400 font-black text-xl tracking-tight">
              MiddleCorridor
            </span>
            <span className="text-slate-300 font-light text-xl">News</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {(Object.entries(CATEGORIES) as [string, string][]).map(
              ([slug, label]) => (
                <Link
                  key={slug}
                  href={`/category/${slug}`}
                  className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                    pathname === `/category/${slug}`
                      ? "text-amber-400"
                      : "text-slate-300"
                  }`}
                >
                  {label}
                </Link>
              )
            )}
            <Link
              href="/search"
              className="text-slate-300 hover:text-amber-400 transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-3 flex flex-col gap-3">
          {(Object.entries(CATEGORIES) as [string, string][]).map(
            ([slug, label]) => (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className="text-slate-300 hover:text-amber-400 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            )
          )}
          <Link
            href="/search"
            className="text-slate-300 hover:text-amber-400 text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
        </div>
      )}
    </nav>
  );
}
