/**
 * The name a downloaded policy is saved under: its title on the site (as on the UAQ site), with
 * the file's own extension. Line breaks typed into a title become spaces, and characters that
 * file systems refuse are dropped.
 */
export function policyFileName(title: string | null | undefined, documentUrl?: string | null) {
  const extension = documentUrl?.split(/[?#]/)[0].match(/\.([a-z0-9]{2,5})$/i)?.[1]?.toLowerCase() || "pdf";
  const base =
    (title || "")
      .replace(/\s*\n\s*/g, " ")
      .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 150) || "School Policy";

  return `${base}.${extension}`;
}

/** A Content-Disposition header that keeps the name readable in every browser. */
export function contentDisposition(type: "inline" | "attachment", fileName: string) {
  const asciiFallback = fileName.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  return `${type}; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}
