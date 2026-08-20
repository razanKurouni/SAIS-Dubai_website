import type { CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { AdmissionsFeeStructureSection as AdmissionsFeeStructureSectionData } from "@/types/sanity";

type AdmissionsFeeStructureSectionProps = {
  section?: AdmissionsFeeStructureSectionData;
};

export function AdmissionsFeeStructureSection({ section }: AdmissionsFeeStructureSectionProps) {
  const rows = section?.rows || [];

  if (!rows.length) return null;

  const labels = {
    gradeYear: section?.labels?.gradeYear || "Grade/Year",
    tuitionFee: section?.labels?.tuitionFee || "Tuition Fee",
    books: section?.labels?.books || "Books (AED)",
    uniform: section?.labels?.uniform || "Uniform (AED)",
    total: section?.labels?.total || "Total (AED)",
  };

  return (
    <section className="admissions-fee-structure" aria-labelledby="admissions-fee-structure-title">
      <SectionReveal className="admissions-fee-structure__inner">
        <header className="admissions-fee-structure__header">
          <h2 id="admissions-fee-structure-title" className="admissions-fee-structure__title">
            {section?.heading?.title || "Our Fee Structure"}
          </h2>
          <RichText
            blocks={section?.heading?.description}
            className="admissions-fee-structure__description"
          />
        </header>

        <div className="admissions-fee-structure__table-wrap">
          <table className="admissions-fee-structure__table">
            <thead>
              <tr>
                <th scope="col">{labels.gradeYear}</th>
                <th scope="col">{labels.tuitionFee}</th>
                <th scope="col">{labels.books}</th>
                <th scope="col">{labels.uniform}</th>
                <th scope="col">{labels.total}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row._key || `${row.gradeYear}-${index}`}
                  style={{ "--fee-row-delay": `${140 + index * 65}ms` } as CSSProperties}
                >
                  <th scope="row">{row.gradeYear}</th>
                  <td>{row.tuitionFee}</td>
                  <td>{row.books}</td>
                  <td>{row.uniform}</td>
                  <td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionReveal>
    </section>
  );
}
