import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = process.argv.slice(2);
const argSet = new Set(args);
const includeAllDocs = argSet.has("--all");
const includeAssets = argSet.has("--include-assets");
const showPaths = argSet.has("--paths");
const showTopLevelFields = argSet.has("--top-level");
const showFieldCounts = argSet.has("--field-counts");
const showFrequency = !argSet.has("--no-frequency");
const summaryOnly = argSet.has("--summary-only");
const omitPathArgIndex = args.findIndex((arg) => arg === "--omit-paths");
const omittedPaths =
  omitPathArgIndex >= 0 && args[omitPathArgIndex + 1]
    ? args[omitPathArgIndex + 1].split(",").map((item) => item.trim()).filter(Boolean)
    : [];
const omitDocumentArgIndex = args.findIndex((arg) => arg === "--omit-docs");
const omittedDocuments =
  omitDocumentArgIndex >= 0 && args[omitDocumentArgIndex + 1]
    ? args[omitDocumentArgIndex + 1].split(",").map((item) => item.trim()).filter(Boolean)
    : [];
const limitArgIndex = args.findIndex((arg) => arg === "--limit");
const limit =
  limitArgIndex >= 0 && args[limitArgIndex + 1]
    ? Number(args[limitArgIndex + 1])
    : 30;

function loadEnvFile(fileName) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) {
      continue;
    }

    const equalIndex = line.indexOf("=");
    const key = line.slice(0, equalIndex).trim();
    let value = line.slice(equalIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] ||= value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_AUTH_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "Missing Sanity token. Set SANITY_AUTH_TOKEN, SANITY_API_TOKEN, or SANITY_WRITE_TOKEN.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-02-19",
  token,
  useCdn: false,
});

const singletonDocumentIds = [
  "homepage",
  "about-page",
  "academics-page",
  "academics-elementary-page",
  "academics-kindergarten-page",
  "academics-middle-school-page",
  "academics-high-school-page",
  "our-team-page",
  "our-community-page",
  "our-campus-page",
  "student-staff-wellbeing-page",
  "student-inclusion-page",
  "parent-involvement-page",
  "school-calendar-page",
  "school-policies-page",
  "student-life-page",
  "student-programs-page",
  "extra-curricular-activities-page",
  "health-safety-page",
  "food-services-nutrition-page",
  "medical-services-page",
  "school-supplies-uniform-page",
  "transportation-safety-page",
  "careers-page",
  "contact-page",
  "site-header-main",
  "site-footer",
];

const draftIds = singletonDocumentIds.map((id) => `drafts.${id}`);
const pageIds = new Set([...singletonDocumentIds, ...draftIds]);

function typeName(value) {
  if (Array.isArray(value)) {
    return "array";
  }
  if (value === null) {
    return "null";
  }
  return typeof value;
}

function walk(value, pathName = "$", pairs = new Set()) {
  pairs.add(`${pathName}:${typeName(value)}`);

  if (!value || typeof value !== "object") {
    return pairs;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      walk(item, `${pathName}[]`, pairs);
    }
    return pairs;
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    walk(nestedValue, `${pathName}.${key}`, pairs);
  }

  return pairs;
}

function collectPathFrequency(value, pathName = "$", frequency = new Map()) {
  const key = `${pathName}:${typeName(value)}`;
  frequency.set(key, (frequency.get(key) || 0) + 1);

  if (!value || typeof value !== "object") {
    return frequency;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectPathFrequency(item, `${pathName}[]`, frequency);
    }
    return frequency;
  }

  for (const [nestedKey, nestedValue] of Object.entries(value)) {
    collectPathFrequency(nestedValue, `${pathName}.${nestedKey}`, frequency);
  }

  return frequency;
}

function omitPathsFromDocument(doc, pathsToOmit) {
  if (!pathsToOmit.length) {
    return doc;
  }

  const nextDoc = structuredClone(doc);
  for (const pathToOmit of pathsToOmit) {
    const parts = pathToOmit.split(".").filter(Boolean);
    let currentValue = nextDoc;
    for (const part of parts.slice(0, -1)) {
      currentValue = currentValue?.[part];
      if (!currentValue || typeof currentValue !== "object") {
        break;
      }
    }

    if (currentValue && typeof currentValue === "object") {
      delete currentValue[parts.at(-1)];
    }
  }

  return nextDoc;
}

function countPairsForValue(value) {
  return walk(value).size;
}

const allDocumentsFilter = includeAssets
  ? "!(_id in path('_.**'))"
  : "!(_id in path('_.**')) && !(_type in ['sanity.imageAsset', 'sanity.fileAsset'])";
const query = includeAllDocs
  ? `*[${allDocumentsFilter}]{_id,_type,...}`
  : "*[_id in $ids]{_id,_type,...}";
const params = includeAllDocs ? {} : { ids: [...pageIds] };

const docs = (await client.fetch(query, params))
  .filter((doc) => !omittedDocuments.includes(doc._id))
  .map((doc) => omitPathsFromDocument(doc, omittedPaths));
const rows = docs
  .map((doc) => {
    const pairs = walk(doc);
    return {
      id: doc._id,
      type: doc._type,
      isDraft: doc._id.startsWith("drafts."),
      pairCount: pairs.size,
      pairs,
    };
  })
  .sort((a, b) => b.pairCount - a.pairCount);

const datasetPairs = new Set();
const pathFrequency = new Map();
const typeCounts = new Map();

for (const row of rows) {
  for (const pair of row.pairs) {
    datasetPairs.add(pair);
  }

  typeCounts.set(row.type, (typeCounts.get(row.type) || 0) + 1);
}

for (const doc of docs) {
  collectPathFrequency(doc, "$", pathFrequency);
}

console.log(`Sanity dataset: ${projectId}/${dataset}`);
console.log(`Mode: ${includeAllDocs ? "all documents" : "known site singleton documents"}`);
console.log(`Assets included: ${includeAllDocs && includeAssets ? "yes" : "no"}`);
console.log(`Documents scanned: ${docs.length}`);
console.log(`Approx unique attribute/datatype pairs in scanned set: ${datasetPairs.size}`);

if (omittedDocuments.length) {
  console.log(`Simulated omitted documents: ${omittedDocuments.join(", ")}`);
}

if (omittedPaths.length) {
  console.log(`Simulated omitted top-level paths: ${omittedPaths.join(", ")}`);
}

if (summaryOnly) {
  console.log("\nRead-only report complete. No Sanity content was changed.");
  process.exit(0);
}

if (showTopLevelFields) {
  console.log("\nTop-level fields by largest documents:");
  for (const row of rows.slice(0, limit)) {
    const doc = docs.find((item) => item._id === row.id);
    const fields = Object.keys(doc || {}).sort();
    console.log(`\n${row.id} (${row.type})`);
    console.log(`  ${fields.join(", ")}`);
  }
}

if (showFieldCounts) {
  console.log("\nTop-level field pair counts by largest documents:");
  for (const row of rows.slice(0, limit)) {
    const doc = docs.find((item) => item._id === row.id);
    console.log(`\n${row.id} (${row.type})`);
    for (const [key, value] of Object.entries(doc || {})
      .map(([key, value]) => [key, countPairsForValue(value)])
      .sort((a, b) => b[1] - a[1])) {
      console.log(`  ${String(value).padStart(4, " ")}  ${key}`);
    }
  }
}

console.log("\nDocument types scanned:");
for (const [type, count] of [...typeCounts.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(4, " ")}  ${type}`);
}

console.log("\nLargest documents:");

for (const row of rows.slice(0, limit)) {
  console.log(
    `  ${String(row.pairCount).padStart(4, " ")}  ${row.id} (${row.type})${
      row.isDraft ? " [draft]" : ""
    }`,
  );

  if (showPaths) {
    for (const pair of [...row.pairs].sort().slice(0, 80)) {
      console.log(`        ${pair}`);
    }
  }
}

if (showFrequency) {
  console.log("\nMost repeated attribute/datatype pairs:");
  for (const [pair, count] of [...pathFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)) {
    console.log(`  ${String(count).padStart(4, " ")}  ${pair}`);
  }
}

console.log("\nRead-only report complete. No Sanity content was changed.");
