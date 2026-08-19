type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalDocumentProps = {
  title: string;
  effectiveDate: string;
  introduction: string;
  sections: LegalSection[];
};

export function LegalDocument({ title, effectiveDate, introduction, sections }: LegalDocumentProps) {
  return (
    <article className="legal-document">
      <header className="legal-document__header">
        <div className="legal-document__header-inner">
          <h1>{title}</h1>
          <p>Last updated: {effectiveDate}</p>
        </div>
      </header>

      <div className="legal-document__content">
        <p className="legal-document__introduction">{introduction}</p>

        {sections.map((section) => (
          <section key={section.title} className="legal-document__section">
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items?.length ? (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </article>
  );
}
