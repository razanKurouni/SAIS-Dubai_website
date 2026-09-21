/**
 * Final step of an in-place conversion (see migrate-from-sharjah.mjs --in-place):
 * removes the documents of the old page-specific content model once the site
 * has been deployed with the compact model, and normalizes news post images
 * to the new `picture` shape.
 *
 *   node --env-file=.env.local scripts/remove-old-model-documents.mjs            # report only
 *   node --env-file=.env.local scripts/remove-old-model-documents.mjs --apply    # delete
 *
 * Before deleting anything the script writes every document it is about to
 * remove to backups/<project>-<dataset>-old-model-<date>.ndjson. Restoring is
 * a single command:
 *
 *   npx sanity dataset import backups/<file>.ndjson <dataset> --replace
 *
 * Assets are never deleted: the new documents reference the same files.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-02-19",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_AUTH_TOKEN) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_AUTH_TOKEN (see .env.local).");
  process.exit(1);
}

/** Document types of the compact model. Everything else (except assets and system docs) belongs to the old model. */
const KEEP_TYPES = new Set(["page", "siteSettings", "newsPost", "sanity.imageAsset", "sanity.fileAsset"]);

const docs = await client.fetch(`*[!(_id in path("_.**"))]{_id, _type}`);
const oldDocs = docs.filter((doc) => !KEEP_TYPES.has(doc._type));
const oldTypes = [...new Set(oldDocs.map((doc) => doc._type))].sort();

console.log(`Dataset ${client.config().projectId}/${client.config().dataset}: ${docs.length} documents`);
console.log(`Old-model documents to remove: ${oldDocs.length}`);
for (const type of oldTypes) {
  console.log(`  ${String(oldDocs.filter((doc) => doc._type === type).length).padStart(4)}  ${type}`);
}

// News posts still carrying the old image shape ({ image: { image: { asset } } }).
const legacyNews = await client.fetch(`*[_type == "newsPost" && defined(image.image)]{_id, image, seo}`);
console.log(`News posts with old image shape: ${legacyNews.length}`);

if (!apply) {
  console.log("\nReport only. Re-run with --apply to remove the old documents.");
  process.exit(0);
}

const backupDir = path.join(process.cwd(), "backups");
fs.mkdirSync(backupDir, { recursive: true });
const stamp = new Date().toISOString().slice(0, 10);
const backupFile = path.join(
  backupDir,
  `${client.config().projectId}-${client.config().dataset}-old-model-${stamp}.ndjson`,
);

if (oldDocs.length) {
  const full = await client.fetch(`*[_id in $ids]`, { ids: oldDocs.map((doc) => doc._id) });
  fs.writeFileSync(backupFile, full.map((doc) => JSON.stringify(doc)).join("\n") + "\n");
  console.log(`\nBackup written: ${path.relative(process.cwd(), backupFile)} (${full.length} documents)`);
}

const toPicture = (old) =>
  old?.image?.asset
    ? { _type: "image", asset: old.image.asset, ...(old.alt ? { alt: old.alt } : {}) }
    : undefined;

let transaction = client.transaction();
for (const post of legacyNews) {
  const patch = {};
  const image = toPicture(post.image);
  if (image) patch.image = image;
  if (post.seo?.image?.image) {
    const seoImage = toPicture(post.seo.image);
    if (seoImage) patch["seo.image"] = seoImage;
  }
  if (Object.keys(patch).length) transaction = transaction.patch(post._id, { set: patch });
}
for (const doc of oldDocs) transaction = transaction.delete(doc._id);

await transaction.commit();
console.log(`Removed ${oldDocs.length} old-model documents and normalized ${legacyNews.length} news posts.`);
