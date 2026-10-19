/**
 * Updates the Fees page (site-admissions-fees-page) with the AY 2026–2027 fee
 * schedule from "AY_2026-2027_School_Fees_-_MANAR.xls":
 *  - feeStructure: tuition, books, uniform (1 regular + 1 PE set), additional
 *    fees and totals incl. VAT, the column labels and the notes under the table;
 *  - transportFees: a new section with the bus fees per area.
 *
 * Dry run (default) prints what would change. Writing needs an Editor token:
 *
 *   SANITY_AUTH_TOKEN=<editor token> node scripts/update-fees-2026-27.mjs --apply
 *
 * Before writing, the current document is saved to backups/.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const apply = process.argv.includes("--apply");
const DOC_ID = "site-admissions-fees-page";
const token = process.env.SANITY_AUTH_TOKEN;

const client = createClient({
  projectId: "uwffig4f",
  dataset: "production",
  apiVersion: "2025-02-19",
  token: apply ? token : undefined,
  useCdn: false,
});

const format = (value) => value.toLocaleString("en-US");

// Grade, Fees, Books, Uniforms 1 set reg / 1 set PE, Additional Fees, Total with uniforms + VAT
const FEES = [
  ["kg-1", "KG 1", 17976, 1026, 494, 1602, 21098],
  ["kg-2", "KG 2", 20544, 1220, 494, 2389, 24647],
  ["grade-1", "Grade 1", 21826, 1348, 494, 1994, 25662],
  ["grade-2", "Grade 2", 23111, 1767, 494, 2074, 27446],
  ["grade-3", "Grade 3", 24396, 1893, 494, 4349, 31132],
  ["grade-4", "Grade 4", 25678, 2021, 494, 4254, 32447],
  ["grade-5", "Grade 5", 26963, 2182, 494, 4349, 33988],
  ["grade-6", "Grade 6", 28246, 2310, 494, 4254, 35304],
  ["grade-7", "Grade 7", 29529, 2504, 614, 4375, 37022],
  ["grade-8", "Grade 8", 30815, 2567, 614, 4365, 38361],
  ["grade-9", "Grade 9", 32099, 2824, 614, 2360, 37897],
  ["grade-10", "Grade 10", 35949, 2730, 614, 2429, 41722],
  ["grade-11", "Grade 11", 41086, 2760, 614, 2374, 46834],
  ["grade-12", "Grade 12", 44938, 2760, 614, 3045, 51357],
];

// Area, 2 Ways, 1 Way
const TRANSPORT = [
  ["warqa-1-3", "Warqa 1 / 2 / 3", 5130, 3705],
  ["warqa-4-mirdif-khawaneej", "Warqa 4 / Mirdif / Khawaneej", 6269, 4559],
  [
    "mizhar-muhaisnah-ghusais",
    "Mizhar / Muhaisnah / Ghusais / International City / Rashidiya / Nad Al Hamar",
    7409,
    5414,
  ],
  [
    "bur-dubai-jumeirah-meydan",
    "Bur Dubai / Karama / Jumeirah / Sheikh Zayed Road / Al Wasl / Satwa / Zabeel / Jafiliya / Nad Al Sheba / Meydan",
    9119,
    6840,
  ],
  [
    "deira-silicon-oasis",
    "Deira / Abu Hail / Hor Al Anz / Garhoud / Festival City / Silicon Oasis / Ras Al Khor",
    7978,
    5985,
  ],
  ["al-barsha-falcon-city", "Al Barsha / The Villa / Skycourts / Falcon City", 9688, 7124],
  [
    "sharjah",
    "Sharjah – Sahara Centre / Buhaira / Al Taawun / Al Qasba / Al Khan / Jamal Abdul Nasser / Al Nahda / King Faisal / Faya / Samnan / Al Riqqa",
    8548,
    6269,
  ],
  ["sharjah-airport-university-city", "Sharjah Airport / University City Area", 9119, 6840],
];

for (const [, grade, fees, books, uniform, additional, total] of FEES) {
  if (fees + books + uniform + additional !== total) throw new Error(`${grade}: columns do not add up to ${total}`);
}

const block = (key, text, listItem) => ({
  _key: key,
  _type: "block",
  style: "normal",
  ...(listItem ? { listItem, level: 1 } : {}),
  markDefs: [],
  children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
});

const entry = (key, label, text) => ({ _key: key, _type: "entry", label, text });

function feeCard(current, [key, title, fees, books, uniform, additional, total]) {
  const keyFor = (label) =>
    current?.entries?.find((item) => item.label === label)?._key || `${key}-${label}`;
  return {
    _key: key,
    _type: "card",
    title: current?.title || title,
    entries: [
      entry(keyFor("tuitionFee"), "tuitionFee", format(fees)),
      entry(keyFor("books"), "books", format(books)),
      entry(keyFor("uniform"), "uniform", format(uniform)),
      entry(keyFor("additionalFees"), "additionalFees", format(additional)),
      entry(keyFor("total"), "total", format(total)),
    ],
  };
}

function labelEntries(current, labels) {
  return labels.map(([label, text]) =>
    entry(current?.entries?.find((item) => item.label === label)?._key || `label-${label}`, label, text),
  );
}

const page = await client.fetch(`*[_id == $id][0]`, { id: DOC_ID });
if (!page) throw new Error(`${DOC_ID} not found`);
const draft = await client.fetch(`*[_id == $id][0]{_id}`, { id: `drafts.${DOC_ID}` });
if (draft && !apply) console.warn(`Note: ${draft._id} exists; it will be updated the same way.`);

function nextSections(doc) {
  const sections = [...(doc.sections || [])];
  const feeIndex = sections.findIndex((section) => section.slot === "feeStructure");
  if (feeIndex < 0) throw new Error("feeStructure section not found");
  const current = sections[feeIndex];

  sections[feeIndex] = {
    ...current,
    heading: {
      ...current.heading,
      _type: "sectionHeading",
      title: current.heading?.title || "Our Fee Structure",
      description: [
        block(
          "fee-structure-intro",
          "Fee schedule for the academic year 2026–2027. All amounts are in UAE Dirhams (AED).",
        ),
      ],
    },
    entries: labelEntries(current, [
      ["gradeYear", "Grade/Year"],
      ["tuitionFee", "Tuition Fee (AED)"],
      ["books", "Books (AED)"],
      ["uniform", "Uniform (AED)"],
      ["additionalFees", "Additional Fees (AED)"],
      ["total", "Total incl. VAT (AED)"],
    ]),
    cards: FEES.map((row) => feeCard(current.cards?.find((card) => card._key === row[0]), row)),
    body: [
      block("fee-note-uniform", "Uniform prices are for one regular set and one PE set.", "bullet"),
      block("fee-note-vat", "Totals include VAT.", "bullet"),
      block("fee-note-admission", "An admission / entrance exam fee of AED 262.50 applies to all new students.", "bullet"),
      block("fee-note-cat4", "New students in Grades 4, 6, 8 and 10 pay an additional AED 80 for the CAT4 test.", "bullet"),
      block("fee-note-change", "All fees are subject to change without prior notice.", "bullet"),
    ],
  };

  const transportIndex = sections.findIndex((section) => section.slot === "transportFees");
  const currentTransport = transportIndex >= 0 ? sections[transportIndex] : undefined;
  const transport = {
    _key: "transportFees",
    _type: "cardsSection",
    slot: "transportFees",
    heading: {
      _type: "sectionHeading",
      title: "Transportation Fees",
      description: [block("transport-fees-intro", "School bus fees by area for the academic year 2026–2027.")],
    },
    entries: labelEntries(currentTransport, [
      ["area", "Area"],
      ["twoWays", "Two Ways (AED)"],
      ["oneWay", "One Way (AED)"],
    ]),
    cards: TRANSPORT.map(([key, title, twoWays, oneWay]) => ({
      _key: key,
      _type: "card",
      title,
      entries: [entry(`${key}-two-ways`, "twoWays", format(twoWays)), entry(`${key}-one-way`, "oneWay", format(oneWay))],
    })),
  };
  if (transportIndex >= 0) sections[transportIndex] = transport;
  else sections.splice(feeIndex + 1, 0, transport);

  return sections;
}

const sections = nextSections(page);

if (!apply) {
  const fee = sections.find((section) => section.slot === "feeStructure");
  for (const card of fee.cards) console.log(card.title.padEnd(9), card.entries.map((e) => `${e.label}=${e.text}`).join("  "));
  const transport = sections.find((section) => section.slot === "transportFees");
  for (const card of transport.cards) console.log(card.entries.map((e) => e.text.padStart(6)).join(" "), card.title);
  console.log("Sections:", sections.map((section) => section.slot).join(", "));
  console.log("\nDry run only. Re-run with --apply and an Editor token to write.");
  process.exit(0);
}

if (!token) throw new Error("SANITY_AUTH_TOKEN is required with --apply");

const stamp = new Date().toISOString().slice(0, 10);
const backupDir = path.join(process.cwd(), "backups");
fs.mkdirSync(backupDir, { recursive: true });
const backupFile = path.join(backupDir, `uwffig4f-production-admissions-fees-before-2026-27-update-${stamp}.json`);
const draftDoc = draft ? await client.fetch(`*[_id == $id][0]`, { id: `drafts.${DOC_ID}` }) : null;
fs.writeFileSync(backupFile, `${JSON.stringify(draftDoc ? [page, draftDoc] : [page], null, 2)}\n`);
console.log(`Backup written to ${path.relative(process.cwd(), backupFile)}`);

const transaction = client.transaction().patch(DOC_ID, (patch) => patch.ifRevisionId(page._rev).set({ sections }));
if (draftDoc) {
  transaction.patch(draftDoc._id, (patch) => patch.ifRevisionId(draftDoc._rev).set({ sections: nextSections(draftDoc) }));
}
const result = await transaction.commit();
console.log(`Updated ${result.documentIds.join(", ")} (transaction ${result.transactionId}).`);
