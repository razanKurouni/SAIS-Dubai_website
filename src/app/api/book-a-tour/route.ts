import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  useCdn: false,
});

const fallbackRecipient = "razan@formulatecreative.com";
const requests = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  })[character] || character);
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || body.website) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const fields = Object.entries(body.fields || {})
    .filter(([, value]) => typeof value === "string" && value.trim())
    .slice(0, 20)
    .map(([label, value]) => ({ label: label.slice(0, 80), value: String(value).slice(0, 4000) }));

  if (!fields.length) {
    return NextResponse.json({ error: "Please complete the form." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FORM_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Book a Tour email is not configured: RESEND_API_KEY or FORM_FROM_EMAIL is missing.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const recipient = await sanity.fetch<string | null>(
    `*[_type == "admissionsBookTourPage" && _id == "admissions-book-tour-page"][0].formSection.recipientEmail`,
  ).catch(() => null) || fallbackRecipient;

  const replyTo = fields.find(({ label }) => label.toLowerCase().includes("email"))?.value;
  const rows = fields.map(({ label, value }) =>
    `<tr><th style="padding:10px;text-align:left;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #ddd">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
  ).join("");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: replyTo,
      subject: "New SAIS Dubai Book a Tour Request",
      html: `<h1>New Book a Tour Request</h1><table style="border-collapse:collapse;width:100%">${rows}</table>`,
    }),
  });

  if (!response.ok) {
    console.error("Resend failed:", response.status, await response.text());
    return NextResponse.json({ error: "Unable to send your request." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
