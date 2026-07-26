import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { richTextToParagraphs } from "@/lib/content";
import type { AboutAccreditationsSection as AboutAccreditationsSectionData, AccreditationLogo } from "@/types/sanity";

type AboutAccreditationsSectionProps = {
  section?: AboutAccreditationsSectionData;
};

const fallbackBody = [
  "SAIS - Dubai maintains full accreditation from two internationally recognized and distinguished accreditation bodies: The New England Association of Schools and Colleges (NEASC) and Cognia. These accreditations affirm our commitment to educational excellence and continuous improvement.",
  "Our institution holds all required licenses and permits from Dubai's regulatory authorities.",
  "SAIS - Dubai is an approved and authorized College Board testing center for the PSAT, SAT, and Advanced Placement (AP) examinations. Our official Test Center number is 52858.",
];

const fallbackLogos: AccreditationLogo[] = [
  {
    name: "Dubai Chamber",
    image: {
      url: "/about-accreditation-dubai-chamber.png",
      alt: "Dubai Chamber logo",
    },
    width: "240px",
  },
  {
    name: "Dubai Health Authority",
    image: {
      url: "/about-accreditation-dubai-health-authority.png",
      alt: "Dubai Health Authority logo",
    },
    width: "260px",
  },
  {
    name: "Roads and Transport Authority",
    image: {
      url: "/about-accreditation-rta.png",
      alt: "Roads and Transport Authority logo",
    },
    width: "260px",
  },
  {
    name: "Dubai Municipality",
    image: {
      url: "/about-accreditation-dubai-municipality.png",
      alt: "Dubai Municipality logo",
    },
    width: "280px",
  },
];

export function AboutAccreditationsSection({ section }: AboutAccreditationsSectionProps) {
  const title = section?.heading?.title || "Accreditations";
  const bodyParagraphs = richTextToParagraphs(section?.body);
  const paragraphs = bodyParagraphs.length ? bodyParagraphs : fallbackBody;
  const logos = section?.logos?.length ? section.logos : fallbackLogos;

  if (!title && paragraphs.length === 0 && logos.length === 0) {
    return null;
  }

  return (
    <section
      id="about-accreditations"
      className="about-accreditations"
      aria-labelledby="about-accreditations-title"
      style={
        {
          "--about-accreditations-bg": section?.backgroundColor || "#f3f3f3",
          "--about-accreditations-title": section?.titleColor || "#00a5b2",
          "--about-accreditations-line": section?.lineColor || "#216b97",
          "--about-accreditations-text": section?.textColor || "#6f7378",
        } as CSSProperties
      }
    >
      <div className="about-accreditations__inner">
        <Reveal threshold={0.16}>
          <h2 id="about-accreditations-title" className="about-accreditations__title">
            {title}
          </h2>
          <div className="about-accreditations__divider" />
        </Reveal>

        <div className="about-accreditations__layout">
          <Reveal className="about-accreditations__copy" threshold={0.14}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className="about-accreditations__logos" threshold={0.14}>
            {logos.map((logo, index) => (
              <div className="about-accreditations__logo-card" key={logo._key || `${logo.name}-${index}`}>
                {logo.image?.url ? (
                  <Image
                    src={logo.image.url}
                    alt={logo.image.alt || logo.name || "Accreditation logo"}
                    width={320}
                    height={140}
                    className="about-accreditations__logo"
                    sizes="(max-width: 767px) 66vw, 260px"
                    style={{ "--about-accreditations-logo-width": logo.width || undefined } as CSSProperties}
                  />
                ) : (
                  <span className="about-accreditations__logo-fallback">{logo.name}</span>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
