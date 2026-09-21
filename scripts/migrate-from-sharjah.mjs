/**
 * Copies the content of the SAIS Sharjah website (old, page-specific Sanity
 * model) into this project's compact content model.
 *
 *   node --env-file=.env.local scripts/migrate-from-sharjah.mjs [--dry-run] [--skip-assets] [--in-place]
 *
 * Source (old) project:
 *   SOURCE_SANITY_PROJECT_ID  (default uwffig4f)
 *   SOURCE_SANITY_DATASET     (default sais-sharjah)
 *   SOURCE_SANITY_TOKEN       read token for the source project
 *
 * Target (this site):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_AUTH_TOKEN
 *
 * Assets (images, PDFs, videos) are downloaded from the source and uploaded to
 * the target. The old→new asset id map is cached in .migration-cache/ so the
 * script can be re-run without re-uploading.
 *
 * Only content, images and SEO are migrated. Colors, layouts and other design
 * settings are intentionally left behind: they live in src/design/.
 *
 * --in-place converts a dataset onto itself (source = target): the new
 * documents are written next to the old ones (page ids get PAGE_ID_PREFIX, see
 * src/content/page-spec.ts), assets are reused as they are, and news posts are
 * left untouched. The old documents keep the current site working until
 * scripts/remove-old-model-documents.mjs removes them.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import { PAGE_ID_PREFIX, PAGE_SPECS, pageDocumentId } from "../src/content/page-spec.ts";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const inPlace = args.has("--in-place");
const skipAssets = args.has("--skip-assets") || inPlace;

const source = createClient({
  projectId: process.env.SOURCE_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.SOURCE_SANITY_DATASET || "sais-sharjah",
  apiVersion: "2025-02-19",
  token: process.env.SOURCE_SANITY_TOKEN,
  useCdn: false,
});

const target = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_AUTH_TOKEN) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_AUTH_TOKEN for the target project (see .env.local).");
  process.exit(1);
}
const sameDataset =
  source.config().projectId === target.config().projectId && source.config().dataset === target.config().dataset;
if (sameDataset && !inPlace) {
  console.error("Source and target are the same dataset. Pass --in-place to convert it onto itself.");
  process.exit(1);
}
if (inPlace && !sameDataset) {
  console.error("--in-place requires the source and target to be the same dataset.");
  process.exit(1);
}
if (inPlace && !PAGE_ID_PREFIX) {
  console.error("--in-place requires a non-empty PAGE_ID_PREFIX in src/content/page-spec.ts so new pages do not overwrite old ones.");
  process.exit(1);
}

const cacheDir = path.join(process.cwd(), ".migration-cache");
const assetMapFile = path.join(cacheDir, `${target.config().projectId}-${target.config().dataset}-assets.json`);
fs.mkdirSync(cacheDir, { recursive: true });
const assetMap = fs.existsSync(assetMapFile) ? JSON.parse(fs.readFileSync(assetMapFile, "utf8")) : {};

/* ----------------------------------------------------------------------- */
/* Helpers                                                                  */
/* ----------------------------------------------------------------------- */

let keyCounter = 0;
const key = (existing) => existing || `k${(++keyCounter).toString(36)}${Date.now().toString(36)}`;
const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);
const str = (value) => (typeof value === "string" && value.trim() ? value : undefined);

function compact(value) {
  if (Array.isArray(value)) {
    const list = value.map(compact).filter((item) => item !== undefined);
    return list.length ? list : undefined;
  }
  if (isObject(value)) {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const cleaned = compact(v);
      if (cleaned !== undefined) out[k] = cleaned;
    }
    const meaningful = Object.keys(out).filter((k) => k !== "_type" && k !== "_key");
    return meaningful.length ? out : undefined;
  }
  if (value === null || value === undefined || value === "") return undefined;
  return value;
}

function blocksFromText(text) {
  const value = str(text);
  if (!value) return undefined;
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: line, marks: [] }],
    }));
}

function blocks(value) {
  if (Array.isArray(value)) return value.length ? value : undefined;
  return blocksFromText(value);
}

const assetRefs = new Set();
function collectAssetRefs(value) {
  if (Array.isArray(value)) return value.forEach(collectAssetRefs);
  if (!isObject(value)) return;
  if (value.asset?._ref) assetRefs.add(value.asset._ref);
  Object.values(value).forEach(collectAssetRefs);
}

function mappedRef(ref) {
  if (inPlace) return ref;
  const mapped = assetMap[ref];
  if (!mapped && !skipAssets && !dryRun) throw new Error(`Asset ${ref} was not migrated.`);
  return mapped || ref;
}

function pic(old) {
  if (!isObject(old)) return undefined;
  const inner = isObject(old.image) ? old.image : old;
  const ref = inner?.asset?._ref;
  if (!ref) return undefined;
  return {
    _type: "image",
    asset: { _type: "reference", _ref: mappedRef(ref) },
    alt: str(old.alt) || str(inner.alt),
  };
}

function file(old) {
  const ref = old?.asset?._ref;
  if (!ref) return undefined;
  return { _type: "file", asset: { _type: "reference", _ref: mappedRef(ref) } };
}

function ctaOf(old) {
  if (!isObject(old) || !(str(old.label) || str(old.href))) return undefined;
  return { _type: "cta", _key: key(old._key), label: str(old.label) || "", href: str(old.href) || "#", openInNewTab: old.openInNewTab || undefined };
}

const ctas = (list) => (Array.isArray(list) ? list.map(ctaOf).filter(Boolean) : undefined);

function headingOf(old) {
  if (!isObject(old)) return undefined;
  return {
    _type: "sectionHeading",
    eyebrow: str(old.eyebrow),
    title: str(old.title),
    accentTitle: str(old.accentTitle),
    subtitle: str(old.subtitle),
    description: blocks(old.description),
  };
}

const FEE_COLUMNS = ["tuitionFee", "books", "uniform", "total"];

function entryOf(item) {
  if (typeof item === "string") return { _type: "entry", _key: key(), text: item };
  if (!isObject(item)) return undefined;
  return {
    _type: "entry",
    _key: key(item._key),
    label: str(item.label) ?? str(item.title) ?? str(item.name),
    text: str(item.text) ?? str(item.value) ?? str(item.date) ?? str(item.description),
    href: str(item.href),
    iconType: typeof item.icon === "string" ? item.icon : str(item.iconType),
    icon: isObject(item.icon) ? pic(item.icon) : undefined,
  };
}

function cardOf(item) {
  if (!isObject(item)) return undefined;
  let entries;
  if (Array.isArray(item.rows)) entries = item.rows.map(entryOf);
  else if (Array.isArray(item.items)) entries = item.items.map(entryOf);
  else if (Array.isArray(item.panels)) entries = item.panels.map((panel) => ({ ...entryOf(panel), icon: pic(panel.image) }));
  else if (FEE_COLUMNS.some((column) => item[column] !== undefined)) {
    entries = FEE_COLUMNS.filter((column) => item[column] !== undefined).map((column) => ({
      _type: "entry",
      _key: key(),
      label: column,
      text: String(item[column]),
    }));
  }

  return {
    _type: "card",
    _key: key(item._key),
    title: str(item.name) ?? str(item.title) ?? str(item.question) ?? str(item.gradeYear),
    subtitle: str(item.role) ?? str(item.location) ?? str(item.subtitle),
    label:
      str(item.yearsOfExperience) ??
      str(item.established) ??
      (item.number !== undefined && item.number !== null ? String(item.number) : undefined) ??
      str(item.downloadLabel) ??
      str(item.label),
    description:
      str(item.hoverBio) ?? str(item.answer) ?? str(item.description) ?? str(item.intro) ?? (typeof item.body === "string" ? str(item.body) : undefined),
    body: Array.isArray(item.body) ? blocks(item.body) : undefined,
    image: pic(item.image ?? item.coverImage),
    icon: pic(item.iconImage ?? (isObject(item.icon) ? item.icon : undefined)),
    iconType: typeof item.icon === "string" ? item.icon : str(item.iconType),
    cta: ctaOf(item.cta),
    file: file(item.documentFile ?? item.file),
    entries,
  };
}

function getPath(doc, dotPath) {
  if (!dotPath || dotPath === ".") return doc;
  return dotPath.split(".").reduce((value, part) => (isObject(value) ? value[part] : undefined), doc);
}

/* ----------------------------------------------------------------------- */
/* Section converters (mirror of src/lib/adapters/common.ts)                */
/* ----------------------------------------------------------------------- */

const converters = {
  imageText: (old) => ({
    _type: "imageTextSection",
    heading: (() => {
      const heading = headingOf(old.heading) || {};
      if (str(old.policyTitle)) heading.subtitle = heading.subtitle || old.policyTitle;
      return { _type: "sectionHeading", ...heading };
    })(),
    body: blocks(old.body),
    image: pic(old.image),
    mobileImage: pic(old.mobileImage),
    icon: pic(old.badge),
    ctas: ctas(old.ctas) || (old.cta ? [ctaOf(old.cta)].filter(Boolean) : undefined),
  }),
  text: (old) => ({
    _type: "textSection",
    heading: headingOf(old.heading),
    body: blocks(old.body ?? old.bodyText),
  }),
  heading: (old) => ({ _type: "textSection", heading: headingOf(old) }),
  image: (old) => ({ _type: "imageTextSection", image: pic(old) }),
  cards: (old, spec) => {
    const list = Array.isArray(old) ? old : old[spec.items || "cards"] ?? old.items;
    let heading = headingOf(old.heading) || (str(old.title) ? { _type: "sectionHeading", title: old.title, subtitle: str(old.statement) } : undefined);
    if (spec.titleFrom && str(old[spec.titleFrom])) {
      heading = { _type: "sectionHeading", title: old[spec.titleFrom] };
    }
    if (spec.eyebrowFrom && str(old[spec.eyebrowFrom])) {
      heading = { ...(heading || { _type: "sectionHeading" }), eyebrow: old[spec.eyebrowFrom] };
    }
    return build(heading);

    function build(headingValue) {
      return {
        _type: "cardsSection",
        heading: headingValue,
        body: blocks(old.body ?? old.closingStatement),
        image: pic(old.image),
        cta: ctaOf(old.cta),
        ctas: ctas(old.ctas),
        cards: Array.isArray(list) ? list.map(cardOf).filter(Boolean) : undefined,
        entries: isObject(old.labels)
          ? Object.entries(old.labels).map(([label, text]) => ({ _type: "entry", _key: key(), label, text: String(text) }))
          : undefined,
      };
    }
  },
  entries: (old, spec) => {
    if (str(old.schoolCode) || str(old.androidUrl) || str(old.appleUrl)) {
      return {
        _type: "entriesSection",
        heading: { _type: "sectionHeading", eyebrow: str(old.eyebrow), title: str(old.title), description: blocks(old.description) },
        entries: [
          { _type: "entry", _key: key(), label: str(old.schoolCodeLabel), text: str(old.schoolCode), iconType: "schoolCode" },
          { _type: "entry", _key: key(), label: "Google Play", href: str(old.androidUrl), iconType: "android" },
          { _type: "entry", _key: key(), label: "App Store", href: str(old.appleUrl), iconType: "apple" },
        ],
      };
    }
    const list = old[spec.items || "items"];
    return {
      _type: "entriesSection",
      heading: headingOf(old.heading),
      body: blocks(old.body),
      image: pic(old.image),
      entries: Array.isArray(list) ? list.map(entryOf).filter(Boolean) : undefined,
    };
  },
  cta: (old) => ({
    _type: "ctaSection",
    heading: str(old.text) ? { _type: "sectionHeading", title: old.text } : headingOf(old.heading),
    ctas:
      ctas(old.ctas) ||
      (str(old.buttonLabel) ? [{ _type: "cta", _key: key(), label: old.buttonLabel, href: str(old.linkUrl) || "#" }] : undefined),
    file: file(old.file),
  }),
  media: (old) => ({
    _type: "mediaSection",
    heading: headingOf(old.heading),
    image: pic(old.poster ?? old.image),
    video: file(old.videoFile),
    href: str(old.videoUrl),
  }),
  form: (old) => ({
    _type: "formSection",
    recipientEmail: str(old.recipientEmail),
    submitLabel: str(old.submitLabel),
    successMessage: str(old.successMessage),
    errorMessage: str(old.errorMessage),
  }),
  news: (old) => ({
    _type: "newsSection",
    heading: headingOf(old.heading) || {
      _type: "sectionHeading",
      title: str(old.newsHeading),
      subtitle: str(old.newslettersHeading),
    },
    cta: ctaOf(old.cta) || (str(old.buttonLabel) ? { _type: "cta", _key: key(), label: old.buttonLabel, href: "#" } : undefined),
  }),
  gallery: (old) => ({
    _type: "gallerySection",
    heading: headingOf(old.heading),
    images: Array.isArray(old.images) ? old.images.map((item) => pic(item)).filter(Boolean).map((item) => ({ ...item, _key: key() })) : undefined,
    ctas: ctas(old.socialLinks ?? old.ctas),
  }),
};

function heroOf(old) {
  if (!isObject(old)) return undefined;
  const heading =
    typeof old.heading === "string"
      ? { _type: "sectionHeading", title: str(old.heading), subtitle: str(old.subtitle), description: blocks(old.description) }
      : headingOf(old.heading);
  return {
    heading,
    image: pic(old.image),
    mobileImage: pic(old.mobileImage),
    ctas: ctas(old.ctas),
    items: Array.isArray(old.valueBar) ? old.valueBar.filter((item) => typeof item === "string" && item.trim()) : undefined,
  };
}

function seoOf(old) {
  if (!isObject(old)) return undefined;
  return { _type: "seo", title: str(old.title), description: str(old.description), image: pic(old.image) };
}

function pageOf(spec, doc) {
  const sections = [];
  for (const slotSpec of spec.slots) {
    const old = getPath(doc, slotSpec.path || slotSpec.slot);
    if (old === undefined || old === null) continue;
    if (Array.isArray(old) && old.length === 0) continue;
    const converter = converters[slotSpec.kind];
    const section = compact(converter(old, slotSpec));
    if (!section) continue;
    sections.push({ ...section, _key: slotSpec.slot.replace(/\./g, "-"), slot: slotSpec.slot });
  }

  return compact({
    _id: pageDocumentId(spec.id),
    _type: "page",
    title: spec.title,
    route: spec.route,
    seo: seoOf(doc.seo),
    hero: heroOf(doc.hero),
    sections,
  });
}

function siteSettingsOf(header, footer, homepage) {
  const nav = header?.navigation ?? homepage?.navigation;
  return compact({
    _id: "site-settings",
    _type: "siteSettings",
    header: {
      logo: pic(header?.logo ?? homepage?.header?.logo),
      scrolledLogo: pic(header?.scrolledLogo),
      menuIcon: pic(header?.menuIcon),
      bookTourButton: ctaOf(header?.bookTourButton ?? homepage?.header?.bookTourButton),
      applyNowButton: ctaOf(header?.applyNowButton ?? homepage?.header?.applyNowButton),
      navigation: ctas(nav),
    },
    footer: {
      logo: pic(footer?.logo),
      logoText: str(footer?.logoText),
      contactText: blocks(footer?.contactText),
      contactItems: Array.isArray(footer?.contactItems) ? footer.contactItems.map(entryOf) : undefined,
      parentStudentLinksTitle: str(footer?.parentStudentLinksTitle),
      parentStudentLinks: ctas(footer?.parentStudentLinks),
      quickLinksTitle: str(footer?.quickLinksTitle),
      quickLinks: ctas(footer?.quickLinks),
      socialLinks: ctas(footer?.socialLinks),
      legalLinks: ctas(footer?.legalLinks),
      copyrightText: str(footer?.copyrightText),
      creditLabel: str(footer?.creditLabel),
      creditName: str(footer?.creditName),
      creditUrl: str(footer?.creditUrl),
    },
  });
}

function newsPostOf(doc) {
  return compact({
    _id: doc._id,
    _type: "newsPost",
    title: str(doc.title),
    slug: doc.slug,
    category: str(doc.category),
    featured: doc.featured || undefined,
    publishedAt: str(doc.publishedAt),
    excerpt: str(doc.excerpt),
    image: pic(doc.image),
    body: blocks(doc.body),
    seo: seoOf(doc.seo),
  });
}

/* ----------------------------------------------------------------------- */
/* Assets                                                                   */
/* ----------------------------------------------------------------------- */

async function migrateAssets() {
  const pending = [...assetRefs].filter((ref) => !assetMap[ref]);
  console.log(`Assets referenced: ${assetRefs.size}, already migrated: ${assetRefs.size - pending.length}`);
  if (!pending.length || skipAssets || dryRun) return;

  const docs = await source.fetch(`*[_id in $ids]{_id, _type, url, originalFilename, mimeType}`, { ids: pending });
  const byId = new Map(docs.map((doc) => [doc._id, doc]));
  let done = 0;

  for (const ref of pending) {
    const asset = byId.get(ref);
    if (!asset) {
      console.warn(`  ! asset ${ref} not found in source, skipping`);
      continue;
    }
    const type = asset._type === "sanity.fileAsset" ? "file" : "image";
    const response = await fetch(asset.url);
    if (!response.ok) throw new Error(`Download failed for ${asset.url}: ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const uploaded = await target.assets.upload(type, buffer, {
      filename: asset.originalFilename || ref,
      contentType: asset.mimeType,
    });
    assetMap[ref] = uploaded._id;
    done += 1;
    if (done % 25 === 0 || done === pending.length) {
      fs.writeFileSync(assetMapFile, JSON.stringify(assetMap, null, 2));
      console.log(`  uploaded ${done}/${pending.length}`);
    }
  }
  fs.writeFileSync(assetMapFile, JSON.stringify(assetMap, null, 2));
}

/* ----------------------------------------------------------------------- */
/* Main                                                                     */
/* ----------------------------------------------------------------------- */

const sourceDocs = await source.fetch(
  `*[!(_id in path('_.**')) && !(_id in path('drafts.**')) && !(_type in ['sanity.imageAsset','sanity.fileAsset'])]`,
);
const byId = new Map(sourceDocs.map((doc) => [doc._id, doc]));
console.log(`Source documents: ${sourceDocs.length}`);

const documents = [];
for (const spec of PAGE_SPECS) {
  const doc = byId.get(spec.id);
  if (!doc) {
    console.warn(`  ! no source document for ${spec.id}`);
    continue;
  }
  collectAssetRefs(doc);
  documents.push(() => pageOf(spec, doc));
}

const header = byId.get("site-header-main");
const footer = byId.get("site-footer");
const homepage = byId.get("homepage-main");
[header, footer, homepage?.header].forEach(collectAssetRefs);
documents.push(() => siteSettingsOf(header, footer, homepage));

if (!inPlace) {
  for (const doc of sourceDocs.filter((item) => item._type === "newsPost")) {
    collectAssetRefs(doc);
    documents.push(() => newsPostOf(doc));
  }
}

await migrateAssets();

const built = documents.map((build) => build()).filter(Boolean);
console.log(`Documents to write: ${built.length}`);

if (dryRun) {
  fs.writeFileSync(path.join(cacheDir, "dry-run.json"), JSON.stringify(built, null, 2));
  console.log(`Dry run: wrote ${path.join(cacheDir, "dry-run.json")}. Nothing was sent to Sanity.`);
  process.exit(0);
}

const transaction = target.transaction();
for (const doc of built) transaction.createOrReplace(doc);
await transaction.commit();
console.log("Done. Content written to", `${target.config().projectId}/${target.config().dataset}`);
