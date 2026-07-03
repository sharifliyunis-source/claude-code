import type { Metadata } from "next";
import { NEWS_SOURCES } from "@/data/sources";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Middle Corridor News — an automated aggregator for Trans-Caspian International Transport Route (TITR) news.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-6">About</h1>

      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          <strong className="text-slate-800">Middle Corridor News</strong> is an
          automated news aggregator focused on the Trans-Caspian International
          Transport Route (TITR) — the &ldquo;Middle Corridor&rdquo; linking
          China and Central Asia to Europe via Kazakhstan, the Caspian Sea,
          Azerbaijan, Georgia, and Türkiye.
        </p>
        <p>
          Headlines are pulled automatically from the public RSS feeds of the
          outlets listed below, filtered for Middle Corridor relevance, and
          refreshed throughout the day. Where enabled, each story carries a
          short AI-generated summary; the full text always lives with the
          original publisher, and every story links back to its source.
        </p>
        <p>
          All content remains the property of the respective publishers. This
          site displays only headlines, brief excerpts or summaries, and links.
        </p>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mt-10 mb-4">Sources</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {NEWS_SOURCES.map((source) => (
          <li key={source.name}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-amber-600 transition-colors text-sm"
            >
              {source.name}
              <span className="text-slate-400"> · {source.country}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
