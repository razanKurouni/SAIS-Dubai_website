import Link from "next/link";
import { notFound } from "next/navigation";
import mammoth from "mammoth";
import sanitizeHtml from "sanitize-html";

type PolicyDocumentViewerPageProps = {
  searchParams: Promise<{ url?: string; title?: string }>;
};

const allowedDocumentHosts = new Set(["cdn.sanity.io"]);
const officeDocumentPattern = /\.(doc|docx)$/i;

function getAllowedDocumentUrl(value?: string) {
  if (!value) return null;

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      !allowedDocumentHosts.has(url.hostname) ||
      !officeDocumentPattern.test(url.pathname)
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

export default async function PolicyDocumentViewerPage({
  searchParams,
}: PolicyDocumentViewerPageProps) {
  const params = await searchParams;
  const documentUrl = getAllowedDocumentUrl(params.url);
  if (!documentUrl) notFound();

  const response = await fetch(documentUrl, { next: { revalidate: 3600 } });
  if (!response.ok) notFound();

  const buffer = Buffer.from(await response.arrayBuffer());
  const result = await mammoth.convertToHtml({ buffer });
  const content = sanitizeHtml(result.value, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
    },
    allowedSchemesByTag: {
      img: ["data", "https"],
    },
  });
  const title = params.title || "School Policy";

  return (
    <main className="policy-document-viewer">
      <header className="policy-document-viewer__header">
        <Link href="/school-policies" className="policy-document-viewer__back">
          Back to School Policies
        </Link>
        <a href={documentUrl.toString()} download className="policy-document-viewer__download">
          Download document
        </a>
      </header>

      <article className="policy-document-viewer__document">
        <h1>{title}</h1>
        <div
          className="policy-document-viewer__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </main>
  );
}
