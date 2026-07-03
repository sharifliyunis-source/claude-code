import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { CATEGORIES } from "@/data/sources";

export const dynamic = "force-dynamic";

// Force-refreshes the ISR cache for all listing pages.
// Called by the Vercel cron (vercel.json) and the GitHub Actions fallback.
// If CRON_SECRET is set, callers must send it as a Bearer token or ?secret=.
// (Vercel cron automatically sends `Authorization: Bearer $CRON_SECRET`.)
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const url = new URL(request.url);
    const provided =
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
      url.searchParams.get("secret");
    if (provided !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidatePath("/");
  for (const slug of Object.keys(CATEGORIES)) {
    revalidatePath(`/category/${slug}`);
  }
  revalidatePath("/article/[id]", "page");

  return NextResponse.json({
    revalidated: true,
    at: new Date().toISOString(),
  });
}
