import { NextResponse } from "next/server";
import { searchSite } from "@/lib/search";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  try {
    const results = await searchSite(query, 12);
    return NextResponse.json({ results }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Search failed", error);
    return NextResponse.json({ results: [], error: "Search is unavailable right now." }, { status: 500 });
  }
}
