import { CalendarDays } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import "./student-life-national-identity-section.css";
import type { PortableTextBlock, StudentLifeNationalIdentitySection as SectionData } from "@/types/sanity";

type StudentLifeNationalIdentitySectionProps = {
  section?: SectionData;
};

type Part = { key: string; title: string; blocks: PortableTextBlock[] };

const textOf = (block: PortableTextBlock) => (block.children || []).map((child) => child.text || "").join("");

/** The text before the first Heading 3 is the introduction; every Heading 3 starts a part. */
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

/** A paragraph written entirely in bold is a statement line (the section's closing words). */
const isStatement = (block: PortableTextBlock) =>
  !block.listItem && !!block.children?.length && block.children.every((child) => !child.text?.trim() || child.marks?.includes("strong"));

/**
 * Keeps names on one line: "SAIS - Dubai" (its spaces become no-break spaces and a word joiner
 * follows the dash) and Arabic names that start with "Al" (Al Sanaa, Al Etihad, Al Laila).
 */
const keepNamesTogether = (text: string) =>
  text
    .replace(/SAIS\s*[-–]\s*Dubai/g, (name) => name.replace(/\s/g, "\u00a0").replace(/([-–])/, "$1\u2060"))
    .replace(/\bAl (?=[A-Z])/g, "Al\u00a0");

const withNamesKept = (blocks: PortableTextBlock[]) =>
  blocks.map((block) => ({
    ...block,
    children: block.children?.map((child) => (child.text ? { ...child, text: keepNamesTogether(child.text) } : child)),
  }));

function Paragraphs({ blocks, className }: { blocks: PortableTextBlock[]; className: string }) {
  return blocks.length ? <RichText blocks={blocks} className={className} /> : null;
}

/** A part that holds a bullet list: text before it, the list as tiles, text after it. */
function CalendarPart({ part }: { part: Part }) {
  const firstItem = part.blocks.findIndex((block) => block.listItem);
  const lastItem = part.blocks.length - 1 - [...part.blocks].reverse().findIndex((block) => block.listItem);
  const before = part.blocks.slice(0, firstItem);
  const items = part.blocks.slice(firstItem, lastItem + 1).filter((block) => block.listItem);
  const after = part.blocks.slice(lastItem + 1);

  return (
    <section className="national-identity__calendar" aria-labelledby={`national-identity-${part.key}`}>
      <div className="national-identity__inner">
        <Reveal threshold={0.16}>
          <h3 id={`national-identity-${part.key}`} className="national-identity__calendar-title">
            {part.title}
          </h3>
          <div className="national-identity__rule" />
          <Paragraphs blocks={before} className="national-identity__calendar-text" />
        </Reveal>
        <ul className="national-identity__occasions">
          {items.map((item, index) => (
            <Reveal
              key={item._key || index}
              as="li"
              className="national-identity__occasion"
              threshold={0.1}
              delay={(index % 3) * 90}
            >
              <CalendarDays aria-hidden="true" strokeWidth={1.6} className="national-identity__occasion-icon" />
              <span>{textOf(item).trim()}</span>
            </Reveal>
          ))}
        </ul>
        <Paragraphs blocks={after} className="national-identity__calendar-text national-identity__calendar-text--after" />
      </div>
    </section>
  );
}

/**
 * UAE National Identity & Al Sanaa on Student Life. Built from the page's own design units: the
 * centred intro of Student Life, solid blue and teal cards on light grey (as Our Branches), a
 * heading over a full-width rule with bordered tiles (as Learning Phases and the assessment
 * cards), and the blue band of the activities slider for the closing part.
 */
export function StudentLifeNationalIdentitySection({ section }: StudentLifeNationalIdentitySectionProps) {
  const title = section?.heading?.title ? keepNamesTogether(section.heading.title) : undefined;
  const tagline = section?.heading?.subtitle;
  const { intro, parts } = splitParts(withNamesKept(section?.body || []));
  if (!title && !intro.length && !parts.length) return null;

  const listPart = parts.find((part) => part.blocks.some((block) => block.listItem));
  const closingPart = parts.length > 1 && parts[parts.length - 1] !== listPart ? parts[parts.length - 1] : undefined;
  const cardParts = parts.filter((part) => part !== listPart && part !== closingPart);
  const listIndex = listPart ? parts.indexOf(listPart) : parts.length;
  const cardsBefore = cardParts.filter((part) => parts.indexOf(part) < listIndex);
  const cardsAfter = cardParts.filter((part) => parts.indexOf(part) > listIndex);

  const cardRow = (row: Part[]) =>
    row.length ? (
      <div className="national-identity__pillars">
        <div className={`national-identity__inner national-identity__cards national-identity__cards--${Math.min(row.length, 3)}`}>
          {row.map((part, index) => (
            <Reveal key={part.key} className="national-identity__card-shell" threshold={0.12} delay={[0, 110, 210][index % 3]}>
              <article className="national-identity__card">
                <h3 className="national-identity__card-title">{part.title}</h3>
                <Paragraphs blocks={part.blocks} className="national-identity__card-text" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    ) : null;

  const statements = closingPart?.blocks.filter(isStatement) || [];
  const closingText = closingPart?.blocks.filter((block) => !isStatement(block)) || [];

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
          <Paragraphs blocks={intro} className="national-identity__intro" />
        </Reveal>
      </div>

      {cardRow(cardsBefore)}
      {listPart ? <CalendarPart part={listPart} /> : null}
      {cardRow(cardsAfter)}

      {closingPart ? (
        <div className="national-identity__closing">
          <Reveal className="national-identity__closing-inner" threshold={0.16}>
            <h3 className="national-identity__closing-title">{closingPart.title}</h3>
            <Paragraphs blocks={closingText} className="national-identity__closing-text" />
            {statements.map((block, index) => (
              <p key={block._key || index} className="national-identity__statement">
                {textOf(block).trim()}
              </p>
            ))}
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}
