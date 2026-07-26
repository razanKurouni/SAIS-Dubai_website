import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { richTextToParagraphs } from "@/lib/content";
import type { BoardGovernorsSection, BoardGovernorMember } from "@/types/sanity";

type AboutBoardGovernorsSectionProps = {
  section?: BoardGovernorsSection;
};

const fallbackMembers: BoardGovernorMember[] = [
  {
    name: "Dr. Aysha AISayyar",
    role: "Founder and Owner",
    image: {
      url: "/about-board-dr-aysha.jpg",
      alt: "Dr. Aysha AISayyar",
    },
    cardColor: "#27779d",
  },
  {
    name: "Dr. Nawaf Fawaz",
    role: "Founder and Owner",
    image: {
      url: "/about-board-dr-fawaz.jpg",
      alt: "Dr. Nawaf Fawaz",
    },
    cardColor: "#00a5b2",
  },
  {
    name: "Ms. Fatima Fawwaz",
    role: "COO",
    image: {
      url: "/about-board-placeholder.jpg",
      alt: "",
    },
    cardColor: "#777777",
    imageBackgroundColor: "#27779d",
  },
];

export function AboutBoardGovernorsSection({ section }: AboutBoardGovernorsSectionProps) {
  const title = section?.heading?.title || "Our Board of Governors";
  const descriptionParagraphs = richTextToParagraphs(section?.heading?.description);
  const description =
    descriptionParagraphs[0] ||
    "Our Board of Governors provides strategic leadership and oversight, ensuring the school continues to thrive while upholding its mission, values, and commitment to educational excellence.";
  const members = section?.members?.length ? section.members : fallbackMembers;

  return (
    <section
      id="about-board-governors"
      className="about-board-governors"
      aria-labelledby="about-board-governors-title"
      style={{ "--about-board-bg": section?.backgroundColor || "#f2f2f2" } as CSSProperties}
    >
      <div className="about-board-governors__inner">
        <Reveal className="about-board-governors__header" threshold={0.18}>
          <h2 id="about-board-governors-title" className="about-board-governors__title">
            {title}
          </h2>
          <p className="about-board-governors__description">{description}</p>
        </Reveal>

        <div className="about-board-governors__grid">
          {members.map((member, index) => {
            const fallback = fallbackMembers[index] || fallbackMembers[0];
            const image = member.image?.url ? member.image : fallback.image;

            return (
              <Reveal
                key={member._key || `${member.name}-${index}`}
                className="about-board-governors__card"
                threshold={0.14}
              >
                <div
                  className="about-board-governors__photo"
                  style={
                    {
                      "--about-board-photo-bg": member.imageBackgroundColor || fallback.imageBackgroundColor || "#27779d",
                    } as CSSProperties
                  }
                >
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || member.name || fallback.name || "Board governor"}
                      fill
                      sizes="(max-width: 767px) 82vw, (max-width: 1180px) 30vw, 322px"
                      className="about-board-governors__image"
                    />
                  ) : null}
                </div>

                <div
                  className="about-board-governors__caption"
                  style={{ "--about-board-card-color": member.cardColor || fallback.cardColor || "#27779d" } as CSSProperties}
                >
                  <h3 className="about-board-governors__name">{member.name || fallback.name}</h3>
                  <p className="about-board-governors__role">{member.role || fallback.role}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
