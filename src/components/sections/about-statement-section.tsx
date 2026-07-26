import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { StatementCard, StatementSection } from "@/types/sanity";

type AboutStatementSectionProps = {
  section?: StatementSection;
};

const fallbackCards: StatementCard[] = [
  {
    title: "Vision",
    description:
      "To be a leading American curriculum school group, recognized for academic excellence, innovation and strong values, preparing confident individuals who embody the UAE's identity, contribute meaningfully to society, and thrive within an evolving global landscape.",
    image: {
      url: "/about-statement-vision.jpg",
      alt: "Teacher supporting a student in a SAIS Dubai classroom",
    },
    cardColor: "#27779d",
    imagePosition: "center",
  },
  {
    title: "Mission",
    description:
      "We will achieve our vision by combining academic excellence with meaningful real-world experiences, and personalized support. We will help every student discover their potential to succeed in higher education, future careers, and the communities they will shape.",
    image: {
      url: "/about-statement-mission.jpg",
      alt: "SAIS Dubai principal speaking with students on campus",
    },
    cardColor: "#00a5b2",
    imagePosition: "center",
  },
];

export function AboutStatementSection({ section }: AboutStatementSectionProps) {
  const title = section?.heading?.title || "Our Statement";
  const cards = section?.cards?.length ? section.cards : fallbackCards;

  return (
    <section
      id="about-statement"
      className="about-statement"
      aria-labelledby="about-statement-title"
      style={{ "--about-statement-bg": section?.backgroundColor || "#ffffff" } as CSSProperties}
    >
      <div className="about-statement__inner">
        <Reveal className="about-statement__header" threshold={0.18}>
          <h2 id="about-statement-title" className="about-statement__title">
            {title}
          </h2>
        </Reveal>

        <div className="about-statement__grid">
          {cards.map((card, index) => {
            const fallback = fallbackCards[index] || fallbackCards[0];
            const image = card.image?.url ? card.image : fallback.image;

            return (
              <Reveal
                key={card._key || `${card.title}-${index}`}
                className="about-statement__card"
                threshold={0.14}
              >
                <div className="about-statement__image-wrap">
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || card.title || fallback.title || "SAIS Dubai statement"}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 40px), 41vw"
                      className="about-statement__image"
                      style={{ objectPosition: card.imagePosition || fallback.imagePosition || "center" }}
                    />
                  ) : null}
                </div>

                <div
                  className="about-statement__content"
                  style={{ "--about-statement-card-color": card.cardColor || fallback.cardColor || "#27779d" } as CSSProperties}
                >
                  <h3 className="about-statement__card-title">{card.title || fallback.title}</h3>
                  <p className="about-statement__card-text">{card.description || fallback.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
