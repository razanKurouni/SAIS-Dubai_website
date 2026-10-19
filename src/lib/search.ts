import { PAGE_SPECS, pageDocumentId, slotLabel, specIdFromDocumentId } from "@/content/page-spec";
import { getSanityClient } from "@/lib/sanity";

export type SearchResult = {
  id: string;
  page: string;
  path: string;
  section: string;
  snippet: string;
  href: string;
};

type IndexEntry = {
  id: string;
  page: string;
  path: string;
  section: string;
  isPageEntry: boolean;
  title: string;
  text: string;
};

/** Sanity page document → route and the name shown on a result. */
const PAGE_ROUTES: Record<string, { path: string; label: string }> = Object.fromEntries(
  PAGE_SPECS.map((spec) => [pageDocumentId(spec.id), { path: spec.route, label: spec.title }]),
);

/** Keys whose values are settings, media or links rather than copy. */
const SKIP_KEYS = new Set([
  "_id", "_key", "_type", "_ref", "_rev", "_createdAt", "_updatedAt", "_system",
  "seo", "navigation", "image", "mobileImage", "icon", "logo", "logos", "badge", "video", "asset", "file", "images",
  "href", "url", "slug", "route", "slot", "iconType", "openInNewTab", "hidden", "ariaLabel", "recipientEmail",
  "submitLabel", "successMessage", "errorMessage",
]);
const SKIP_TYPES = new Set(["image", "picture", "reference", "slug", "file", "formSection"]);

function collectText(value: unknown, out: string[], key = "") {
  if (value == null) return;
  // Column / field names used by the code (e.g. fee table "tuitionFee"), not copy.
  if (key === "label" && typeof value === "string" && /^[a-z][A-Za-z0-9]*$/.test(value)) return;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length > 1 && !/^(#|https?:|mailto:|tel:|\/)/.test(trimmed) && !/^#?[0-9a-f]{3,8}$/i.test(trimmed) && !/^var\(/.test(trimmed)) out.push(trimmed);
    return;
  }
  if (Array.isArray(value)) { value.forEach((item) => collectText(item, out)); return; }
  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record._type === "string" && SKIP_TYPES.has(record._type)) return;
    if (record._type === "block" && Array.isArray(record.children)) {
      out.push((record.children as Array<{ text?: string }>).map((child) => child.text ?? "").join(""));
      return;
    }
    for (const [key, child] of Object.entries(record)) {
      if (SKIP_KEYS.has(key) || /color$/i.test(key) || /navigation/i.test(key)) continue;
      collectText(child, out, key);
    }
  }
}

function sectionTitle(value: unknown): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const record = value as Record<string, unknown>;
  const heading = record.heading as Record<string, unknown> | undefined;
  const candidates = [heading?.title, record.title, record.label, record.name, record.subtitle];
  const found = candidates.find((candidate) => typeof candidate === "string" && candidate.trim().length > 1);
  return typeof found === "string" ? found : "";
}

function firstLine(text: string) {
  return text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)[0] ?? "";
}

function cleanPageTitle(document: Record<string, unknown>, fallback: string) {
  const hero = document.hero as Record<string, unknown> | undefined;
  const seo = document.seo as Record<string, unknown> | undefined;
  const heroHeading = hero?.heading as Record<string, unknown> | undefined;
  const raw = [heroHeading?.title, seo?.title, document.title].find((candidate) => typeof candidate === "string" && candidate.trim());
  const title = typeof raw === "string" ? raw.replace(/\s*\|.*$/, "").replace(/\s+/g, " ").trim() : "";
  return title || fallback;
}

function normalize(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function buildEntries(documents: Array<Record<string, unknown>>): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const document of documents) {
    const id = String(document._id ?? "");
    const type = String(document._type ?? "");

    if (type === "newsPost") {
      const slug = (document.slug as { current?: string } | undefined)?.current;
      if (!slug) continue;
      const parts: string[] = [];
      collectText(document, parts);
      const title = String(document.title ?? "").trim() || "News";
      entries.push({ id, page: "News & Events", path: `/news-events/${slug}`, section: title, isPageEntry: true, title, text: normalize(parts.join(" ")) });
      continue;
    }

    const route = PAGE_ROUTES[id];
    if (!route) continue;
    const pageTitle = cleanPageTitle(document, route.label);

    // The page itself: its name and hero copy.
    const heroParts: string[] = [];
    collectText(document.hero, heroParts);
    entries.push({ id, page: route.label, path: route.path, section: pageTitle, isPageEntry: true, title: `${route.label} ${pageTitle}`, text: normalize(heroParts.join(" ")) });

    // Each section on the page.
    const sections = Array.isArray(document.sections) ? (document.sections as Array<Record<string, unknown>>) : [];
    sections.forEach((section, sectionIndex) => {
      if (!section || typeof section !== "object") return;
      const slot = typeof section.slot === "string" ? section.slot : String(sectionIndex);
      const cards = Array.isArray(section.cards) ? (section.cards as Array<Record<string, unknown>>) : [];
      const titledCards = cards.length > 0 && cards.every((card) => sectionTitle(card));
      const sectionHeading = normalize(sectionTitle(section)) || slotLabel(specIdFromDocumentId(id), slot);

      if (titledCards) {
        // A list of titled items (e.g. FAQ entries, team members): each is its own hit.
        cards.forEach((card, index) => {
          const title = normalize(sectionTitle(card));
          const parts: string[] = [];
          collectText(card, parts);
          entries.push({ id: `${id}:${slot}:${index}`, page: route.label, path: route.path, section: title, isPageEntry: false, title, text: normalize(parts.join(" ")) });
        });
        const { cards: _cards, ...rest } = section;
        void _cards;
        const parts: string[] = [];
        collectText(rest, parts);
        const text = normalize(parts.join(" "));
        if (text) entries.push({ id: `${id}:${slot}`, page: route.label, path: route.path, section: sectionHeading, isPageEntry: false, title: sectionHeading, text });
        return;
      }

      const parts: string[] = [];
      collectText(section, parts);
      const text = normalize(parts.join(" "));
      if (!text) return;
      const title = normalize(sectionTitle(section));
      // A section that only repeats the page title adds nothing to the page entry.
      if (!title || (title.toLowerCase() === pageTitle.toLowerCase() && text.toLowerCase() === title.toLowerCase())) {
        if (text.toLowerCase() !== pageTitle.toLowerCase()) entries.push({ id: `${id}:${slot}`, page: route.label, path: route.path, section: pageTitle, isPageEntry: true, title: pageTitle, text });
        return;
      }
      entries.push({ id: `${id}:${slot}`, page: route.label, path: route.path, section: title, isPageEntry: false, title, text });
    });
  }

  return entries;
}

let cachedEntries: { builtAt: number; entries: IndexEntry[] } | null = null;
const CACHE_MS = 60_000;

async function getEntries(): Promise<IndexEntry[]> {
  if (cachedEntries && Date.now() - cachedEntries.builtAt < CACHE_MS) return cachedEntries.entries;
  const client = getSanityClient();
  const ids = Object.keys(PAGE_ROUTES);
  const documents = await client.fetch<Array<Record<string, unknown>>>(
    `*[!(_id in path("drafts.**")) && ((_type == "page" && _id in $ids) || _type == "newsPost")]`,
    { ids },
  );
  const entries = buildEntries(documents);
  cachedEntries = { builtAt: Date.now(), entries };
  return entries;
}

function makeSnippet(text: string, query: string, tokens: string[]) {
  const lower = text.toLowerCase();
  let at = lower.indexOf(query);
  if (at < 0) for (const token of tokens) { at = lower.indexOf(token); if (at >= 0) break; }
  if (at < 0) return text.slice(0, 140) + (text.length > 140 ? "…" : "");
  const start = Math.max(0, at - 60);
  const end = Math.min(text.length, at + 110);
  let snippet = text.slice(start, end);
  if (start > 0) snippet = "…" + snippet.replace(/^\S*\s/, "");
  if (end < text.length) snippet = snippet.replace(/\s\S*$/, "") + "…";
  return snippet;
}

/**
 * A link that opens the page and lands on the section: the hash names the
 * section's title and the page's SearchJump component scrolls to the heading
 * that carries it (works in every browser, unlike text fragments).
 */
export const SEARCH_JUMP_PARAM = "find";

function makeHref(entry: IndexEntry) {
  if (entry.isPageEntry) return entry.path;
  const target = firstLine(entry.section).slice(0, 80);
  if (!target) return entry.path;
  return `${entry.path}#${SEARCH_JUMP_PARAM}=${encodeURIComponent(target)}`;
}

function displayTitle(text: string) {
  const line = firstLine(text);
  return line.length > 90 ? line.slice(0, 88).replace(/\s\S*$/, "") + "…" : line;
}

export async function searchSite(rawQuery: string, limit = 12): Promise<SearchResult[]> {
  const query = normalize(rawQuery).toLowerCase();
  if (query.length < 2) return [];
  const tokens = query.split(" ").filter((token) => token.length > 1);
  if (tokens.length === 0) return [];

  const entries = await getEntries();
  const scored: Array<{ entry: IndexEntry; score: number; hits: number }> = [];
  // A word counts when it starts a word on the page ("ap" finds "AP Biology", not "approach").
  const wordPatterns = tokens.map((token) => new RegExp(`(^|[^\\p{L}\\p{N}])${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "u"));

  for (const entry of entries) {
    const title = entry.title.toLowerCase();
    const text = entry.text.toLowerCase();
    let score = 0;
    let hits = 0;
    for (const pattern of wordPatterns) {
      const inTitle = pattern.test(title);
      const inText = pattern.test(text);
      if (inTitle) score += 10;
      if (inText) score += 3;
      if (inTitle || inText) hits += 1;
    }
    if (hits === 0) continue;
    if (hits < tokens.length) score -= 4 * (tokens.length - hits);
    if (title.includes(query)) score += 20;
    else if (text.includes(query)) score += 8;
    if (entry.isPageEntry) score += 2;
    scored.push({ entry, score, hits });
  }

  // With several words, results that contain all of them come first and alone.
  const complete = scored.filter((item) => item.hits === tokens.length);
  const ranked = complete.length ? complete : scored;
  ranked.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  return ranked.slice(0, limit).map(({ entry }) => {
    const section = displayTitle(entry.section) || entry.page;
    const snippet = makeSnippet(entry.text, query, tokens);
    return {
      id: entry.id,
      page: entry.page,
      path: entry.path,
      section,
      // A snippet that only repeats the title adds nothing.
      snippet: normalize(snippet).toLowerCase() === normalize(section).toLowerCase() ? "" : snippet,
      href: makeHref(entry),
    };
  });
}
