import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { OurTeamImageSection } from "@/types/sanity";

type OurTeamPastoralSectionProps = {
  section?: OurTeamImageSection;
  className?: string;
  titleId?: string;
  fallbackAlt?: string;
};

type OurTeamPastoralStyle = CSSProperties & {
  "--our-team-pastoral-bg"?: string;
  "--our-team-pastoral-title"?: string;
  "--our-team-pastoral-line"?: string;
};

export function OurTeamPastoralSection({
  section,
  className = "our-team-pastoral",
  titleId = "our-team-pastoral-title",
  fallbackAlt = "SAIS Dubai pastoral team",
}: OurTeamPastoralSectionProps) {
  if (!section?.heading?.title && !section?.image?.url) {
    return null;
  }

  const style: OurTeamPastoralStyle = {
    "--our-team-pastoral-bg": section?.backgroundColor || "#ffffff",
    "--our-team-pastoral-title": section?.titleColor || "var(--sais-accent)",
    "--our-team-pastoral-line": section?.lineColor || "var(--sais-primary)",
  };

  return (
    <section className={className} aria-labelledby={titleId} style={style}>
      <div className="our-team-pastoral__inner">
        {section?.heading?.title ? (
          <Reveal threshold={0.14}>
            <h2 id={titleId} className="our-team-pastoral__title">
              {section.heading.title}
            </h2>
            <span className="our-team-pastoral__line" aria-hidden="true" />
          </Reveal>
        ) : null}

        {section?.image?.url ? (
          <Reveal className="our-team-pastoral__image-shell" threshold={0.12}>
            <Image
              src={section.image.url}
              alt={section.image.alt || section.heading?.title || fallbackAlt}
              fill
              sizes="100vw"
              className="our-team-pastoral__image"
              style={{ objectPosition: section.imagePosition || "center" }}
            />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
