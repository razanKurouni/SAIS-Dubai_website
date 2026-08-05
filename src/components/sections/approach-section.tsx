import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { RichText } from "@/components/ui/rich-text";
import { richTextToParagraphs } from "@/lib/content";
import type { Cta, HomepageData, PortableTextBlock, SanityImage } from "@/types/sanity";

// Base component — used directly by about-governance and home page
type ApproachSectionBaseProps = {
  id?: string;
  title?: string;
  titleId?: string;
  className?: string;
  lead?: string;
  paragraphs?: string[];
  content?: PortableTextBlock[];
  image?: SanityImage;
  imageSizes?: string;
  cta?: Cta;
};

function ArrowBadge() {
  return (
    <span className="approach-section__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

export function ApproachSectionBase({
  id,
  title = "Educational Approach",
  titleId = "approach-section-title",
  className = "",
  lead,
  paragraphs = [],
  content,
  image,
  imageSizes = "100vw",
  cta,
}: ApproachSectionBaseProps) {
  const hasRichText = Boolean(content?.length);
  const copyItems = [lead, ...(hasRichText ? [] : paragraphs)].filter(Boolean);

  if (!copyItems.length && !hasRichText && !image?.url) {
    return null;
  }

  return (
    <section id={id} className={`approach-section ${className}`.trim()} aria-labelledby={titleId}>
      <h2 id={titleId} className="sr-only">
        {title}
      </h2>

      {image?.url && (
        <Reveal className="approach-section__image-wrap" threshold={0.18}>
          <Image
            src={image.url}
            alt={image.alt || title}
            fill
            sizes={imageSizes}
            quality={82}
            className="approach-section__image"
          />
        </Reveal>
      )}

      <Reveal className="approach-section__panel" threshold={0.18}>
        <svg
          className="approach-section__shape"
          viewBox="0 0 1647 928"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="approach-section__shape-fill"
            d="M0,0 H1460 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980 L0,928 Z"
          />
          <path
            className="approach-section__shape-accent"
            d="M1460,-50 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980"
            fill="none"
            strokeWidth="88"
            strokeLinecap="round"
          />
        </svg>

        <div className="approach-section__mobile-divider" aria-hidden="true">
          <svg className="approach-section__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none">
            <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
          </svg>
          <svg className="approach-section__wave" viewBox="0 0 96 320" preserveAspectRatio="none">
            <path d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
          </svg>
        </div>

        <div className="approach-section__content">
          {lead && <p className="approach-section__lead">{lead}</p>}

          {hasRichText ? (
            <RichText blocks={content} className="approach-section__rich-text" />
          ) : (
            <div className="approach-section__paragraphs">
              {paragraphs.map((paragraph, index) => (
                <Reveal
                  as="p"
                  className="approach-section__paragraph"
                  key={paragraph}
                  delay={160 + index * 70}
                  threshold={0.22}
                >
                  {paragraph}
                </Reveal>
              ))}
            </div>
          )}

          {cta && (
            <Reveal delay={320} threshold={0.22}>
              <Link
                href={cta.href || "#"}
                target={cta.openInNewTab ? "_blank" : undefined}
                rel={cta.openInNewTab ? "noreferrer" : undefined}
                className="approach-section__button"
              >
                <span>{cta.label}</span>
                <ArrowBadge />
              </Link>
            </Reveal>
          )}
        </div>
      </Reveal>
    </section>
  );
}

// Home-page wrapper — maps HomepageData["whySection"] to ApproachSectionBase props
type ApproachSectionProps = {
  section?: HomepageData["whySection"];
};

export function ApproachSection({ section }: ApproachSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <ApproachSectionBase
      className="approach-section--home"
      title={section.heading?.title}
      lead={section.heading?.subtitle}
      paragraphs={richTextToParagraphs(section.heading?.description)}
      image={section.image}
      cta={section.ctas?.[0]}
    />
  );
}
