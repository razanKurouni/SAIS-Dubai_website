import { ApproachSectionBase } from "@/components/sections/approach-section";
import { richTextToParagraphs } from "@/lib/content";
import type { ImageTextSection } from "@/types/sanity";

type AboutGovernanceSectionProps = {
  section?: ImageTextSection;
};

const fallbackParagraphs = [
  "The Governance Board regularly convenes to ensure curriculum coordination, protocols, processes, and practices remain consistent and cohesive across all SAIS institutions. In recent years, the Governance Board has formalized the active involvement of parents in the planning and local governance structure of each campus.",
  "The establishment of a Governance Board - evolving from our previous parent committee - incorporates parents, senior students, and faculty members, enabling each campus to operate efficiently at the local level while maintaining alignment with the overarching governance framework. The SAIS Dubai Governance Board meets regularly to monitor improvement initiatives and celebrate the diversity that defines our vibrant community.",
];

const fallbackImage = {
  url: "/about-governance-board.jpg",
  alt: "SAIS Dubai governance meeting with a staff member seated at a table",
};

export function AboutGovernanceSection({ section }: AboutGovernanceSectionProps) {
  const title = section?.heading?.title || "Governance Board";
  const paragraphs = richTextToParagraphs(section?.heading?.description);

  return (
    <ApproachSectionBase
      id="about-governance"
      title={title}
      titleId="about-governance-title"
      className="approach-section--governance"
      paragraphs={paragraphs.length > 0 ? paragraphs : fallbackParagraphs}
      image={section?.image || fallbackImage}
      imageSizes="(max-width: 767px) calc(100vw - 32px), 42vw"
      showTitle={false}
      naturalImage
    />
  );
}
