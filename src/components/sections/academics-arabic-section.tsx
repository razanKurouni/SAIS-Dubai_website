import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { balancedLayout } from "@/lib/academics-arabic-layout";
import type { AcademicsArabicSection as AcademicsArabicSectionData, PortableTextBlock } from "@/types/sanity";

type AcademicsArabicSectionProps = {
  section?: AcademicsArabicSectionData;
  /** Prefix for the heading id, so each page keeps unique ids. */
  idPrefix: string;
};

type Subject = { key: string; title: string; blocks: PortableTextBlock[] };

/**
 * Splits the rich text at each "Heading 3": the text before the first one is the
 * introduction, and every Heading 3 (Arabic Language, Islamic Education, Social
 * Studies…) starts its own subject card.
 */
function splitBySubject(blocks: PortableTextBlock[]) {
  const intro: PortableTextBlock[] = [];
  const subjects: Subject[] = [];
  for (const block of blocks) {
    if (block.style === "h3") {
      const title = (block.children || []).map((child) => child.text || "").join("").trim();
      subjects.push({ key: block._key || `subject-${subjects.length}`, title, blocks: [] });
    } else if (subjects.length) {
      subjects[subjects.length - 1].blocks.push(block);
    } else {
      intro.push(block);
    }
  }
  return { intro, subjects: subjects.filter((subject) => subject.title || subject.blocks.length) };
}

/** True when the text is written in Arabic script (then the section reads right to left). */
function isArabicText(title: string | undefined, blocks: PortableTextBlock[]) {
  const text = [title || "", ...blocks.flatMap((block) => (block.children || []).map((child) => child.text || ""))].join(" ");
  return /[؀-ۿ]/.test(text);
}

/**
 * The Arabic subjects department text. Arabic text reads right to left in an Arabic typeface;
 * the English version reads left to right in the site's typeface. It follows
 * the site's card sections (Learning Phases): heading with a full-width
 * rule, then solid blue / teal / grey cards with white text. On desktop the cards are
 * arranged to suit the length of each subject's text (see academics-arabic-layout.ts).
 */
export function AcademicsArabicSection({ section, idPrefix }: AcademicsArabicSectionProps) {
  const title = section?.heading?.title;
  const { intro, subjects } = splitBySubject(section?.body || []);

  if (!title && !intro.length && !subjects.length) {
    return null;
  }

  const titleId = `${idPrefix}-arabic-title`;
  const arabic = isArabicText(title, section?.body || []);
  const layout = balancedLayout(subjects, arabic);

  return (
    <section
      className={`academics-arabic${arabic ? "" : " academics-arabic--ltr"}`}
      dir={arabic ? "rtl" : "ltr"}
      lang={arabic ? "ar" : "en"}
      aria-labelledby={title ? titleId : undefined}
    >
      <div className="academics-arabic__inner">
        <Reveal threshold={0.16}>
          {title ? (
            <h2 id={titleId} className="academics-arabic__title">
              {title}
            </h2>
          ) : null}
          <div className="academics-arabic__divider" />
          {intro.length ? <RichText blocks={intro} className="academics-arabic__intro" /> : null}
        </Reveal>

        {subjects.length ? (
          <div
            className={`academics-arabic__grid academics-arabic__grid--${Math.min(subjects.length, 3)}`}
            style={layout.gridStyle}
          >
            {subjects.map((subject, index) => (
              <Reveal
                key={subject.key}
                className="academics-arabic__card-shell"
                style={layout.cardStyles[index]}
                threshold={0.12}
                delay={[0, 110, 210][index % 3]}
              >
                <article className="academics-arabic__card">
                  {subject.title ? <h3 className="academics-arabic__card-title">{subject.title}</h3> : null}
                  <RichText blocks={subject.blocks} className="academics-arabic__card-body" />
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
