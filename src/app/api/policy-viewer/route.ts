import { NextResponse } from "next/server";
import { contentDisposition, policyFileName } from "@/lib/policy-file-name";

export const runtime = "nodejs";

const allowedDocumentHosts = new Set(["cdn.sanity.io"]);

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const documentUrlValue = requestUrl.searchParams.get("url");
  // ?name= is the policy title (the file is saved under it); ?download=1 saves instead of showing it.
  const fileName = policyFileName(requestUrl.searchParams.get("name") || "School Policy", documentUrlValue);
  const disposition = requestUrl.searchParams.get("download") === "1" ? "attachment" : "inline";

  if (!documentUrlValue) {
    return NextResponse.json({ error: "Missing policy document URL." }, { status: 400 });
  }

  let documentUrl: URL;
  try {
    documentUrl = new URL(documentUrlValue);
  } catch {
    return NextResponse.json({ error: "Invalid policy document URL." }, { status: 400 });
  }

  if (documentUrl.protocol !== "https:" || !allowedDocumentHosts.has(documentUrl.hostname)) {
    return NextResponse.json({ error: "Policy document host is not allowed." }, { status: 400 });
  }

  if (!documentUrl.pathname.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "Only PDF documents can use the PDF viewer." }, { status: 400 });
  }

  try {
    const response = await fetch(documentUrl, { next: { revalidate: 3600 } });
    if (!response.ok || !response.body) {
      return NextResponse.json({ error: "Unable to load policy document." }, { status: 502 });
    }

    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition(disposition, fileName),
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Content-Type-Options": "nosniff",
    });
    const contentLength = response.headers.get("content-length");
    if (contentLength) headers.set("Content-Length", contentLength);

    return new NextResponse(response.body, { status: 200, headers });
  } catch (error) {
    console.error("Policy viewer failed:", error);
    return NextResponse.json({ error: "Unable to load policy document." }, { status: 502 });
  }
}
