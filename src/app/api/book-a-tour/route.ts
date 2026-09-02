import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

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

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : port === 465,
    auth: { user, pass },
  };
}

async function sendWithSmtp({
  from,
  recipient,
  replyTo,
  subject,
  html,
}: {
  from: string;
  recipient: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const smtp = getSmtpConfig();
  if (!smtp) return false;

  const transporter = nodemailer.createTransport(smtp);
  await transporter.sendMail({
    from,
    to: recipient,
    replyTo,
    subject,
    html,
  });
  return true;
}

function hasMicrosoftGraphConfig() {
  return Boolean(
    process.env.MS_TENANT_ID &&
      process.env.MS_CLIENT_ID &&
      process.env.MS_CLIENT_SECRET &&
      process.env.MS_SENDER_EMAIL,
  );
}

async function sendWithMicrosoftGraph({
  recipient,
  replyTo,
  subject,
  html,
}: {
  recipient: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  if (!hasMicrosoftGraphConfig()) return false;

  const tenantId = process.env.MS_TENANT_ID as string;
  const clientId = process.env.MS_CLIENT_ID as string;
  const clientSecret = process.env.MS_CLIENT_SECRET as string;
  const sender = process.env.MS_SENDER_EMAIL as string;
  const tokenBody = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenBody,
    },
  );

  if (!tokenResponse.ok) {
    throw new Error(`Microsoft token request failed with status ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json() as { access_token?: string };
  if (!tokenData.access_token) {
    throw new Error("Microsoft token response did not include an access token.");
  }

  const messageResponse = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject,
          body: { contentType: "HTML", content: html },
          toRecipients: [{ emailAddress: { address: recipient } }],
          ...(replyTo
            ? { replyTo: [{ emailAddress: { address: replyTo } }] }
            : {}),
        },
        saveToSentItems: true,
      }),
    },
  );

  if (!messageResponse.ok) {
    throw new Error(`Microsoft Graph sendMail failed with status ${messageResponse.status}`);
  }
  return true;
}

async function sendWithResend({
  from,
  recipient,
  replyTo,
  subject,
  html,
}: {
  from: string;
  recipient: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: replyTo,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend failed with status ${response.status}: ${await response.text()}`);
  }
  return true;
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

  const from = process.env.FORM_FROM_EMAIL || process.env.SMTP_USER || process.env.MS_SENDER_EMAIL;
  const hasMicrosoftGraph = hasMicrosoftGraphConfig();
  const hasSmtp = Boolean(getSmtpConfig());
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  if (!from || (!hasMicrosoftGraph && !hasSmtp && !hasResend)) {
    console.error("Book a Tour email is not configured. Configure Microsoft Graph, SMTP, or Resend.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const isRegistration = body.formType === "admissions-registration";
  const recipient = isRegistration
    ? "registration@saisdubai.com"
    : await sanity.fetch<string | null>(
        `*[_type == "admissionsBookTourPage" && _id == "admissions-book-tour-page"][0].formSection.recipientEmail`,
      ).catch(() => null) || fallbackRecipient;
  const subject = isRegistration
    ? "New SAIS Dubai Pre-Registration Request"
    : "New SAIS Dubai Book a Tour Request";

  const replyTo = fields.find(({ label }) => label.toLowerCase().includes("email"))?.value;
  const rows = fields.map(({ label, value }) =>
    `<tr><th style="padding:10px;text-align:left;border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="padding:10px;border-bottom:1px solid #ddd">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
  ).join("");
  const heading = isRegistration ? "New Pre-Registration Request" : "New Book a Tour Request";
  const html = `<h1>${heading}</h1><table style="border-collapse:collapse;width:100%">${rows}</table>`;

  try {
    const sentWithMicrosoftGraph = await sendWithMicrosoftGraph({ recipient, replyTo, subject, html });
    const sentWithSmtp = sentWithMicrosoftGraph
      ? true
      : await sendWithSmtp({ from, recipient, replyTo, subject, html });
    if (!sentWithMicrosoftGraph && !sentWithSmtp) {
      await sendWithResend({ from, recipient, replyTo, subject, html });
    }
  } catch (error) {
    console.error("Book a Tour email failed:", error);
    return NextResponse.json({ error: "Unable to send your request." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
