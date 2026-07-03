# Deploying Middle Corridor News

## 1. Deploy to Vercel

1. Push this repository to GitHub (already done if you're reading this on GitHub).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Set **Root Directory** to `middle-corridor-news` (the app lives in a subfolder).
4. Framework preset: **Next.js** (auto-detected). No build settings need changing.
5. Click **Deploy**.

## 2. Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | Optional | Enables AI summaries via Claude (`claude-opus-4-8`). Without it the site shows raw RSS excerpts — everything else works. Get a key at [console.anthropic.com](https://console.anthropic.com). |
| `CRON_SECRET` | Recommended | Protects `/api/refresh` from public abuse. Generate any random string (e.g. `openssl rand -hex 32`). Vercel cron automatically sends it as a Bearer token. |

> **Cost note:** with `ANTHROPIC_API_KEY` set, each *new* article costs roughly a fraction of a cent to summarize (max 200 output tokens). Summaries are cached in memory per serverless instance; cold starts re-summarize. For a low-traffic site this is typically a few dollars per month at most.

## 3. Automatic refresh

Two layers keep content fresh:

- **ISR** — every page revalidates at most every 30 minutes when visited (`export const revalidate = 1800`).
- **Vercel cron** — `vercel.json` schedules `GET /api/refresh` hourly, which purges the cache for the home page, all category pages, and article pages even with zero traffic.

### GitHub Actions fallback (optional)

`.github/workflows/refresh-news.yml` (at the repository root) hits the same endpoint every 2 hours as a backup. To enable it, add two **repository secrets** (GitHub → Settings → Secrets and variables → Actions):

- `MCN_SITE_URL` — your deployed URL, e.g. `https://middle-corridor-news.vercel.app`
- `MCN_CRON_SECRET` — the same value as `CRON_SECRET` on Vercel

The workflow silently skips if `MCN_SITE_URL` is unset, so it's safe to leave as-is.

## 4. Verify the RSS sources

Several feed URLs in `data/sources.ts` (Kursiv, Kun.uz, UzDaily, Orda.kz, Report.az, Kabar, Railway Gazette, Lloyd's List) could not be verified from the development sandbox due to network restrictions. After deploying:

1. Open the home page and check the footer line — it reports how many sources were unreachable.
2. For any dead feed, find the outlet's real RSS URL (view the site's HTML source and search for `rss`/`feed`, or try `/feed/`, `/rss/`, `/rss.xml`) and update `rssUrl` in `data/sources.ts`.

A broken feed never breaks the site — it just contributes zero articles.

## 5. Local development

```bash
cd middle-corridor-news
cp .env.example .env.local   # add your ANTHROPIC_API_KEY (optional)
npm install
npm run dev
```

Open http://localhost:3000.
