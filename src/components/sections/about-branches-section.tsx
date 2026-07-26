import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { AboutBranchesSection as AboutBranchesSectionData, AboutBranchCard } from "@/types/sanity";

type AboutBranchesSectionProps = {
  section?: AboutBranchesSectionData;
};

type BranchCardStyle = CSSProperties & {
  "--about-branch-card-color"?: string;
  "--about-branch-button-color"?: string;
  "--about-branch-image-position"?: string;
};

const fallbackCards: AboutBranchCard[] = [
  {
    name: "SAIS Abu Dhabi",
    established: "2016",
    location: "Abu Dhabi, UAE",
    description:
      "SAIS Abu Dhabi, delivering a high-quality American curriculum aligned with internationally recognised standards. Guided by the California State framework, the school provides a nurturing environment that supports academic excellence.",
    image: {
      url: "/about-branch-abu-dhabi.png",
      alt: "SAIS Abu Dhabi campus building",
    },
    cta: {
      label: "See More",
      href: "#",
    },
    cardColor: "#27779d",
    buttonColor: "#27779d",
  },
  {
    name: "SAIS Sharjah",
    established: "1997",
    location: "Al Ramaqiya Area, Sharjah, UAE",
    description:
      "SAIS Sharjah offers a well-established academic environment known for its commitment to excellence, student wellbeing, and continuous improvement. Students benefit from a balanced American curriculum designed to support achievement and personal growth.",
    image: {
      url: "/about-branch-sharjah.png",
      alt: "SAIS Sharjah campus building",
    },
    cta: {
      label: "See More",
      href: "#",
    },
    cardColor: "#00a5b2",
    buttonColor: "#00a5b2",
  },
  {
    name: "SAIS Umm Al Quwain",
    established: "2014",
    location: "Umm Al Quwain City, UAE",
    description:
      "SAIS Umm Al Quwain fosters a close-knit and supportive community where personalized learning is a priority. The campus emphasizes strong relationships, ensuring every student is guided toward academic and personal development.",
    image: {
      url: "/about-branch-umm-al-quwain.png",
      alt: "SAIS Umm Al Quwain campus building",
    },
    cta: {
      label: "See More",
      href: "#",
    },
    cardColor: "#777b80",
    buttonColor: "#d97252",
  },
];

export function AboutBranchesSection({ section }: AboutBranchesSectionProps) {
  const title = section?.heading?.title || "Our Branches";
  const cards = section?.cards?.length ? section.cards : fallbackCards;

  if (!title && cards.length === 0) {
    return null;
  }

  return (
    <section
      id="about-branches"
      className="about-branches"
      aria-labelledby="about-branches-title"
      style={
        {
          "--about-branches-bg": section?.backgroundColor || "#f3f3f3",
          "--about-branches-title": section?.titleColor || "#00a5b2",
          "--about-branches-line": section?.lineColor || "#216b97",
        } as CSSProperties
      }
    >
      <div className="about-branches__inner">
        <Reveal threshold={0.16}>
          <h2 id="about-branches-title" className="about-branches__title">
            {title}
          </h2>
          <div className="about-branches__divider" />
        </Reveal>

        <div className="about-branches__grid">
          {cards.map((card, index) => {
            const fallback = fallbackCards[index] || fallbackCards[0];
            const image = card.image?.url ? card.image : fallback.image;
            const cta = card.cta || fallback.cta;
            const cardStyle: BranchCardStyle = {
              "--about-branch-card-color": card.cardColor || fallback.cardColor,
              "--about-branch-button-color": card.buttonColor || fallback.buttonColor || card.cardColor || fallback.cardColor,
              "--about-branch-image-position": card.imagePosition || fallback.imagePosition || "center",
            };

            return (
              <Reveal
                key={card._key || `${card.name}-${index}`}
                className="about-branches__card-shell"
                threshold={0.12}
              >
                <article className="about-branches__card" style={cardStyle}>
                  <div className="about-branches__image-wrap">
                    {image?.url ? (
                      <Image
                        src={image.url}
                        alt={image.alt || card.name || fallback.name || "SAIS branch campus"}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 40px), 31vw"
                        className="about-branches__image"
                      />
                    ) : null}
                  </div>

                  <div className="about-branches__content">
                    <h3 className="about-branches__card-title">{card.name || fallback.name}</h3>
                    <div className="about-branches__meta">
                      {card.established || fallback.established ? (
                        <p>
                          <strong>Established:</strong> {card.established || fallback.established}
                        </p>
                      ) : null}
                      {card.location || fallback.location ? (
                        <p>
                          <strong>Location:</strong> {card.location || fallback.location}
                        </p>
                      ) : null}
                    </div>
                    {card.description || fallback.description ? (
                      <p className="about-branches__description">{card.description || fallback.description}</p>
                    ) : null}
                    {cta?.label ? (
                      <Link
                        href={cta.href || "#"}
                        target={cta.openInNewTab ? "_blank" : undefined}
                        rel={cta.openInNewTab ? "noreferrer" : undefined}
                        className="about-branches__button"
                      >
                        <span>{cta.label}</span>
                        <span className="about-branches__button-icon" aria-hidden="true">
                          <ArrowRight size={17} strokeWidth={3} />
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
