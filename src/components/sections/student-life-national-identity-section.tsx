import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import "./student-life-national-identity-section.css";
import type { PortableTextBlock, StudentLifeNationalIdentitySection as SectionData } from "@/types/sanity";

type StudentLifeNationalIdentitySectionProps = {
  section?: SectionData;
};

type Part = { key: string; title: string; blocks: PortableTextBlock[] };

const textOf = (block: PortableTextBlock) => (block.children || []).map((child) => child.text || "").join("");

/** The text before the first Heading 3 is the introduction; every Heading 3 starts a card. */
function splitParts(blocks: PortableTextBlock[]) {
  const intro: PortableTextBlock[] = [];
  const parts: Part[] = [];
  for (const block of blocks) {
    if (block.style === "h3") parts.push({ key: block._key || `part-${parts.length}`, title: textOf(block).trim(), blocks: [] });
    else if (parts.length) parts[parts.length - 1].blocks.push(block);
    else intro.push(block);
  }
  return { intro, parts };
}

/**
 * Keeps names on one line: "SAIS - Dubai" (its spaces become no-break spaces and a word joiner
 * follows the dash) and Arabic names that start with "Al" (Al Sanaa, Al Etihad, Al Laila).
 */
const keepNamesTogether = (text: string) =>
  text
    .replace(/SAIS\s*[-–]\s*Dubai/g, (name) => name.replace(/\s/g, " ").replace(/([-–])/, "$1⁠"))
    .replace(/\bAl (?=[A-Z])/g, "Al ");

const withNamesKept = (blocks: PortableTextBlock[]) =>
  blocks.map((block) => ({
    ...block,
    children: block.children?.map((child) => (child.text ? { ...child, text: keepNamesTogether(child.text) } : child)),
  }));

/**
 * UAE National Identity & Al Sanaa on Student Life: the centred Student Life intro (title,
 * tagline, introduction) and the pillars as solid blue and teal cards on the light grey band,
 * as Our Branches. The calendar slider and the closing image section that follow it on the page
 * reuse the site's slider and editorial split sections.
 */
export function StudentLifeNationalIdentitySection({ section }: StudentLifeNationalIdentitySectionProps) {
  const title = section?.heading?.title ? keepNamesTogether(section.heading.title) : undefined;
  const tagline = section?.heading?.subtitle;
  const { intro, parts } = splitParts(withNamesKept(section?.body || []));
  if (!title && !intro.length && !parts.length) return null;

  return (
    <section id="national-identity" className="national-identity" aria-labelledby="national-identity-title">
      <div className="national-identity__header">
        <Reveal className="national-identity__header-inner" threshold={0.16}>
          {title ? (
            <h2 id="national-identity-title" className="national-identity__title">
              {title}
            </h2>
          ) : null}
          {tagline ? <p className="national-identity__tagline">{tagline}</p> : null}
          {intro.length ? <RichText blocks={intro} className="national-identity__intro" /> : null}
        </Reveal>
      </div>

      {parts.length ? (
        <div className="national-identity__pillars">
          <div className={`national-identity__inner national-identity__cards national-identity__cards--${Math.min(parts.length, 3)}`}>
            {parts.map((part, index) => (
              <Reveal key={part.key} className="national-identity__card-shell" threshold={0.12} delay={[0, 110, 210][index % 3]}>
                <article className="national-identity__card">
                  <h3 className="national-identity__card-title">{part.title}</h3>
                  {part.blocks.length ? <RichText blocks={part.blocks} className="national-identity__card-text" /> : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
