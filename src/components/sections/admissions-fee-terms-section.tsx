import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { AdmissionsFeeTermsGroup, AdmissionsFeeTermsSection as AdmissionsFeeTermsSectionData } from "@/types/sanity";

type AdmissionsFeeTermsSectionProps = {
  section?: AdmissionsFeeTermsSectionData;
};

function TermsGroup({ group }: { group: AdmissionsFeeTermsGroup }) {
  return (
    <article className={`admissions-fee-terms__group ${group.accentList ? "has-accent-list" : ""}`.trim()}>
      <h3 className="admissions-fee-terms__group-title">{group.title}</h3>
      <RichText blocks={group.body} className="admissions-fee-terms__body" />
    </article>
  );
}

export function AdmissionsFeeTermsSection({ section }: AdmissionsFeeTermsSectionProps) {
  const leftColumn = section?.leftColumn || [];
  const rightColumn = section?.rightColumn || [];

  if (!leftColumn.length && !rightColumn.length) return null;

  return (
    <section className="admissions-fee-terms" aria-labelledby="admissions-fee-terms-title">
      <SectionReveal className="admissions-fee-terms__inner">
        <h2 id="admissions-fee-terms-title" className="admissions-fee-terms__title">
          {section?.heading?.title || "Terms & Conditions"}
        </h2>

        <div className="admissions-fee-terms__columns">
          <div className="admissions-fee-terms__column">
            {leftColumn.map((group, index) => (
              <TermsGroup key={group._key || `${group.title}-${index}`} group={group} />
            ))}
          </div>
          <div className="admissions-fee-terms__column">
            {rightColumn.map((group, index) => (
              <TermsGroup key={group._key || `${group.title}-${index}`} group={group} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
