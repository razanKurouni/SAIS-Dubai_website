import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const args = new Set(process.argv.slice(2));
const applyChanges = args.has("--apply");
const includeLayoutFields = args.has("--include-layout");
const summaryOnly = args.has("--summary");
const valueSummaryOnly = args.has("--value-summary");

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
    "Missing Sanity write token. Set SANITY_AUTH_TOKEN, SANITY_API_TOKEN, or SANITY_WRITE_TOKEN.",
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
];

const presentationalKeys = new Set([
  "backgroundColor",
  "sectionBackgroundColor",
  "panelColor",
  "waveColor",
  "topLineColor",
  "titleColor",
  "headingColor",
  "subheadingColor",
  "textColor",
  "cardTextColor",
  "cardBorderColor",
  "cardHoverBorderColor",
  "buttonColor",
  "buttonTextColor",
  "activeColor",
  "inactiveColor",
  "dividerColor",
  "accentColor",
]);

const layoutKeys = new Set(["imagePosition", "imageWidth"]);

function escapeKey(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function childPath(parentPath, key) {
  return parentPath ? `${parentPath}.${key}` : key;
}

function collectCandidates(value, currentPath = "") {
  if (!value || typeof value !== "object") {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => {
      const itemPath =
        item && typeof item === "object" && item._key
          ? `${currentPath}[_key=="${escapeKey(item._key)}"]`
          : `${currentPath}[${index}]`;
      return collectCandidates(item, itemPath);
    });
  }

  const candidates = [];
  for (const [key, nestedValue] of Object.entries(value)) {
    if (key.startsWith("_")) {
      continue;
    }

    const nestedPath = childPath(currentPath, key);
    if (
      presentationalKeys.has(key) ||
      (includeLayoutFields && layoutKeys.has(key))
    ) {
      candidates.push({ key, path: nestedPath, value: nestedValue });
      continue;
    }

    candidates.push(...collectCandidates(nestedValue, nestedPath));
  }

  return candidates;
}

function collectUnsetPaths(value, currentPath = "") {
  return collectCandidates(value, currentPath).map((candidate) => candidate.path);
}

function chunk(list, size) {
  const chunks = [];
  for (let index = 0; index < list.length; index += size) {
    chunks.push(list.slice(index, index + size));
  }
  return chunks;
}

let docs;
try {
  docs = await client.fetch(
    '*[_id in $ids && !(_id in path("drafts.**"))]{...}',
    { ids: singletonDocumentIds },
  );
} catch (error) {
  console.error(
    `Unable to read Sanity dataset ${projectId}/${dataset}: ${
      error?.message || "unknown error"
    }`,
  );
  process.exit(1);
}

const plan = docs
  .map((doc) => ({
    id: doc._id,
    type: doc._type,
    candidates: collectCandidates(doc).sort((a, b) => a.path.localeCompare(b.path)),
  }))
  .filter((entry) => entry.candidates.length > 0)
  .map((entry) => ({
    ...entry,
    paths: entry.candidates.map((candidate) => candidate.path),
  }));

const totalPaths = plan.reduce((sum, entry) => sum + entry.paths.length, 0);

console.log(
  `${applyChanges ? "Applying" : "Dry run"}: ${totalPaths} presentational field(s) across ${plan.length} document(s).`,
);
console.log(
  includeLayoutFields
    ? "Layout fields are included."
    : "Layout fields are excluded. Add --include-layout only if you intentionally want to remove imageWidth/imagePosition overrides.",
);

for (const entry of plan) {
  console.log(`\n${entry.id} (${entry.type}): ${entry.paths.length}`);
  if (summaryOnly || valueSummaryOnly) {
    continue;
  }

  for (const pathName of entry.paths.slice(0, 40)) {
    console.log(`  - ${pathName}`);
  }
  if (entry.paths.length > 40) {
    console.log(`  ... ${entry.paths.length - 40} more`);
  }
}

if (valueSummaryOnly) {
  const byKeyAndValue = new Map();
  for (const entry of plan) {
    for (const candidate of entry.candidates) {
      const value =
        typeof candidate.value === "string"
          ? candidate.value
          : JSON.stringify(candidate.value);
      const summaryKey = `${candidate.key}\u0000${value}`;
      const existing = byKeyAndValue.get(summaryKey) || {
        key: candidate.key,
        value,
        count: 0,
      };
      existing.count += 1;
      byKeyAndValue.set(summaryKey, existing);
    }
  }

  console.log("\nValue summary:");
  for (const entry of [...byKeyAndValue.values()].sort((a, b) => {
    if (a.key !== b.key) {
      return a.key.localeCompare(b.key);
    }
    return b.count - a.count;
  })) {
    console.log(`  ${entry.key}: ${entry.value} (${entry.count})`);
  }
}

if (!applyChanges) {
  console.log("\nNo Sanity content was changed. Re-run with --apply to unset these technical fields.");
  process.exit(0);
}

for (const entry of plan) {
  for (const paths of chunk(entry.paths, 100)) {
    try {
      await client.patch(entry.id).unset(paths).commit();
    } catch (error) {
      console.error(
        `Unable to clean ${entry.id}: ${error?.message || "unknown error"}`,
      );
      process.exit(1);
    }
  }
  console.log(`Cleaned ${entry.id}`);
}

console.log("Done.");
