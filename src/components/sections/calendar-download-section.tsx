import type { CalendarDownloadSection as CalendarDownloadSectionData } from "@/types/sanity";

type CalendarDownloadSectionProps = {
  section?: CalendarDownloadSectionData | null;
  download?: boolean;
};

const fallback: CalendarDownloadSectionData = {
  text: "Download the full school calendar here:",
  buttonLabel: "Download",
  fileUrl: null,
};

export function CalendarDownloadSection({ section, download = true }: CalendarDownloadSectionProps) {
  const text = section?.text || fallback.text;
  const buttonLabel = section?.buttonLabel || fallback.buttonLabel;
  const fileUrl = section?.fileUrl || null;

  return (
    <section className="calendar-download-section">
      <div className="calendar-download-section__inner">
        <p className="calendar-download-section__text">{text}</p>
        {fileUrl ? (
          <a
            href={fileUrl}
            download={download || undefined}
            target="_blank"
            rel="noreferrer"
            className="calendar-download-section__btn"
          >
            <span>{buttonLabel}</span>
            <span className="calendar-download-section__btn-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
          </a>
        ) : (
          <span className="calendar-download-section__btn calendar-download-section__btn--disabled" aria-disabled="true">
            <span>{buttonLabel}</span>
            <span className="calendar-download-section__btn-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
          </span>
        )}
      </div>
    </section>
  );
}
