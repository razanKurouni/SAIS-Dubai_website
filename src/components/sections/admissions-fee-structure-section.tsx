import { Fragment, type CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type {
  AdmissionsFeeStructureSection as AdmissionsFeeStructureSectionData,
  AdmissionsTransportFeesSection as AdmissionsTransportFeesSectionData,
  PortableTextBlock,
  SectionHeading,
} from "@/types/sanity";

type FeeTableColumn<Row> = {
  key: keyof Row & string;
  label: string;
};

type FeeTableSectionProps<Row extends { _key?: string }> = {
  id: string;
  className?: string;
  heading?: SectionHeading;
  fallbackTitle: string;
  columns: FeeTableColumn<Row>[];
  rows: Row[];
  notes?: PortableTextBlock[];
  /** Keeps each " / "-separated name on one line, so long lists only wrap between names. */
  splitRowHeader?: boolean;
};

function rowHeaderContent(value: string | undefined, split?: boolean) {
  if (!split || !value) return value;
  return value.split(" / ").map((name, index) => (
    <Fragment key={index}>
      {index > 0 ? "\u00a0/ " : null}
      <span className="admissions-fee-structure__nowrap">{name}</span>
    </Fragment>
  ));
}

function FeeTableSection<Row extends { _key?: string }>({
  id,
  className,
  heading,
  fallbackTitle,
  columns,
  rows,
  notes,
  splitRowHeader,
}: FeeTableSectionProps<Row>) {
  const [rowHeader, ...valueColumns] = columns;
  const titleId = `${id}-title`;

  return (
    <section className={["admissions-fee-structure", className].filter(Boolean).join(" ")} aria-labelledby={titleId}>
      <SectionReveal className="admissions-fee-structure__inner">
        <header className="admissions-fee-structure__header">
          <h2 id={titleId} className="admissions-fee-structure__title">
            {heading?.title || fallbackTitle}
          </h2>
          <RichText blocks={heading?.description} className="admissions-fee-structure__description" />
        </header>

        <div className="admissions-fee-structure__table-wrap">
          <table className="admissions-fee-structure__table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row._key || `${String(row[rowHeader.key])}-${index}`}
                  style={{ "--fee-row-delay": `${140 + index * 65}ms` } as CSSProperties}
                >
                  <th scope="row">{rowHeaderContent(row[rowHeader.key] as string | undefined, splitRowHeader)}</th>
                  {valueColumns.map((column) => (
                    <td key={column.key}>{row[column.key] as string | undefined}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <RichText blocks={notes} className="admissions-fee-structure__notes" />
      </SectionReveal>
    </section>
  );
}

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
    additionalFees: section?.labels?.additionalFees || "Additional Fees (AED)",
    total: section?.labels?.total || "Total (AED)",
  };
  const columns: FeeTableColumn<(typeof rows)[number]>[] = [
    { key: "gradeYear", label: labels.gradeYear },
    { key: "tuitionFee", label: labels.tuitionFee },
    { key: "books", label: labels.books },
    { key: "uniform", label: labels.uniform },
    // The column only appears when the fee schedule lists additional fees.
    ...(rows.some((row) => row.additionalFees)
      ? [{ key: "additionalFees" as const, label: labels.additionalFees }]
      : []),
    { key: "total", label: labels.total },
  ];

  return (
    <FeeTableSection
      id="admissions-fee-structure"
      heading={section?.heading}
      fallbackTitle="Our Fee Structure"
      columns={columns}
      rows={rows}
      notes={section?.notes}
    />
  );
}

type AdmissionsTransportFeesSectionProps = {
  section?: AdmissionsTransportFeesSectionData;
};

export function AdmissionsTransportFeesSection({ section }: AdmissionsTransportFeesSectionProps) {
  const rows = section?.rows || [];

  if (!rows.length) return null;

  return (
    <FeeTableSection
      id="admissions-transport-fees"
      className="admissions-fee-structure--transport"
      heading={section?.heading}
      fallbackTitle="Transportation Fees"
      columns={[
        { key: "area", label: section?.labels?.area || "Area" },
        { key: "twoWays", label: section?.labels?.twoWays || "Two Ways (AED)" },
        { key: "oneWay", label: section?.labels?.oneWay || "One Way (AED)" },
      ]}
      rows={rows}
      notes={section?.notes}
      splitRowHeader
    />
  );
}
