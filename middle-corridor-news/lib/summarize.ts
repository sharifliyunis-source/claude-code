import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SUMMARY_MODEL = "claude-opus-4-8";

// In-memory cache, keyed by article id, so warm serverless instances don't
// re-summarize the same article on every ISR revalidation.
const summaryCache = new Map<string, string>();

const SYSTEM_PROMPT = `You summarize news articles about the Middle Corridor (Trans-Caspian International Transport Route) for a news aggregation site. Given a headline and excerpt, write a neutral, factual 2-sentence summary in English, in your own words. Do not add opinions or information not present in the source. Output only the summary text, nothing else.`;

export async function summarizeArticle(
  title: string,
  excerpt: string
): Promise<string | null> {
  try {
    const response = await client.messages.create({
      model: SUMMARY_MODEL,
      max_tokens: 200,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Headline: ${title}\n\nExcerpt: ${excerpt || "(no excerpt available)"}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    return textBlock?.type === "text" ? textBlock.text.trim() : null;
  } catch {
    return null;
  }
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  );

  return results;
}

export async function summarizeArticles<
  T extends { id: string; title: string; summary: string }
>(articles: T[]): Promise<(T & { aiSummary?: string })[]> {
  if (!process.env.ANTHROPIC_API_KEY) return articles;

  return mapWithConcurrency(articles, 5, async (article) => {
    const cached = summaryCache.get(article.id);
    if (cached) return { ...article, aiSummary: cached };

    const aiSummary = await summarizeArticle(article.title, article.summary);
    if (aiSummary) summaryCache.set(article.id, aiSummary);
    return { ...article, aiSummary: aiSummary ?? undefined };
  });
}
