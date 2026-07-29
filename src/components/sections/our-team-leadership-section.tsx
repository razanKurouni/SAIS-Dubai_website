"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, UIEvent } from "react";
import { Reveal } from "@/components/ui/reveal";
import { richTextToParagraphs } from "@/lib/content";
import type { BoardGovernorMember, OurTeamPageData } from "@/types/sanity";

type OurTeamLeadershipSectionData = NonNullable<OurTeamPageData["leadershipSection"]>;

type OurTeamLeadershipSectionProps = {
  section?: OurTeamLeadershipSectionData;
};

const fallbackMembers: BoardGovernorMember[] = [
  { name: "Mohammed Sultan", role: "School Principal", cardColor: "#27779d" },
  { name: "Mr. Bachir Zarzour", role: "Vice Principal", cardColor: "#27779d" },
  { name: "Mr. Meisam Hasanpour", role: "Assistant Principal", cardColor: "#27779d" },
  {
    name: "Donna Reeves",
    role: "Curriculum Coordinator and Head of Performing Arts",
    cardColor: "#27779d",
  },
];

const teamCardColor = "#27779d";

type OurTeamLeadershipStyle = CSSProperties & {
  "--our-team-leadership-bg"?: string;
  "--our-team-leadership-intro"?: string;
  "--our-team-leadership-body"?: string;
  "--our-team-leadership-title"?: string;
  "--our-team-leadership-line"?: string;
};

export function OurTeamLeadershipSection({ section }: OurTeamLeadershipSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredMemberKey, setHoveredMemberKey] = useState<string | null>(null);
  const intro =
    section?.heading?.title ||
    "Our academic team is a diverse group of passionate educators and experienced leaders committed to delivering high-quality education across all grade levels.";
  const body =
    richTextToParagraphs(section?.heading?.description)[0] ||
    section?.heading?.subtitle ||
    "Our Senior Leadership Team (SLT) provides strategic direction and fosters a culture of excellence and innovation.";
  const groupTitle = section?.groupTitle || "Senior Leadership Team";
  const members = section?.members?.length ? section.members : fallbackMembers;
  const canSlide = members.length > 1;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!sliderRef.current || !members.length) {
        return;
      }

      const safeIndex = (index + members.length) % members.length;
      const firstCard = sliderRef.current.children[0] as HTMLElement | undefined;
      const target = sliderRef.current.children[safeIndex] as HTMLElement | undefined;

      if (firstCard && target) {
        sliderRef.current.scrollTo({
          left: target.offsetLeft - firstCard.offsetLeft,
          behavior: "smooth",
        });
        setActiveIndex(safeIndex);
      }
    },
    [members.length],
  );

  const goToPrevious = useCallback(() => {
    scrollToIndex(activeIndexRef.current - 1);
  }, [scrollToIndex]);

  const goToNext = useCallback(() => {
    scrollToIndex(activeIndexRef.current + 1);
  }, [scrollToIndex]);

  const updateActiveIndex = useCallback((event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    const cards = Array.from(track.children) as HTMLElement[];
    const firstCard = cards[0];

    if (!cards.length || !firstCard) {
      return;
    }

    const closestIndex = cards.reduce(
      (closest, card, index) => {
        const targetLeft = card.offsetLeft - firstCard.offsetLeft;
        const distance = Math.abs(targetLeft - track.scrollLeft);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    if (!canSlide || isHovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      goToNext();
    }, 4200);

    return () => window.clearInterval(timer);
  }, [canSlide, goToNext, isHovered]);

  const style: OurTeamLeadershipStyle = {
    "--our-team-leadership-bg": section?.backgroundColor || "#ffffff",
    "--our-team-leadership-intro": section?.introColor || "var(--sais-primary)",
    "--our-team-leadership-body": section?.bodyColor || "#707174",
    "--our-team-leadership-title": section?.titleColor || "var(--sais-accent)",
    "--our-team-leadership-line": section?.lineColor || "var(--sais-primary)",
  };

  return (
    <section
      className="our-team-leadership"
      aria-labelledby="our-team-leadership-title"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="our-team-leadership__inner">
        <Reveal className="our-team-leadership__intro" threshold={0.16}>
          <h2 className="our-team-leadership__lead">{intro}</h2>
          {body ? <p className="our-team-leadership__body">{body}</p> : null}
        </Reveal>

        <div className="our-team-leadership__heading-row">
          <h2 id="our-team-leadership-title" className="our-team-leadership__title">
            {groupTitle}
          </h2>

          {canSlide ? (
            <div className="our-team-leadership__controls" aria-label="Leadership team slider controls">
              <button
                type="button"
                className="our-team-leadership__arrow"
                aria-label="Previous team member"
                onClick={goToPrevious}
              >
                <ChevronLeft aria-hidden="true" strokeWidth={1.9} />
              </button>

              <button
                type="button"
                className="our-team-leadership__arrow"
                aria-label="Next team member"
                onClick={goToNext}
              >
                <ChevronRight aria-hidden="true" strokeWidth={1.9} />
              </button>
            </div>
          ) : null}

          <span className="our-team-leadership__line" aria-hidden="true" />
        </div>

        <div
          ref={sliderRef}
          className="our-team-leadership__cards"
          aria-label={groupTitle}
          onScroll={updateActiveIndex}
        >
          {members.map((member, index) => {
            const fallback = fallbackMembers[index] || fallbackMembers[0];
            const image = member.image?.url ? member.image : fallback.image;
            const hasHoverContent = Boolean(member.yearsOfExperience || member.hoverBio);
            const memberKey = member._key || `${member.name}-${index}`;
            const cardClassName = [
              "our-team-leadership__card",
              hasHoverContent && hoveredMemberKey === memberKey ? "is-hovered" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <Reveal
                key={memberKey}
                className={cardClassName}
                onBlur={() => setHoveredMemberKey(null)}
                onClick={() =>
                  hasHoverContent
                    ? setHoveredMemberKey((currentKey) => (currentKey === memberKey ? null : memberKey))
                    : undefined
                }
                onFocus={() => (hasHoverContent ? setHoveredMemberKey(memberKey) : undefined)}
                onMouseEnter={() => (hasHoverContent ? setHoveredMemberKey(memberKey) : undefined)}
                onMouseLeave={() => setHoveredMemberKey(null)}
                onMouseMove={() => (hasHoverContent ? setHoveredMemberKey(memberKey) : undefined)}
                onPointerEnter={() => (hasHoverContent ? setHoveredMemberKey(memberKey) : undefined)}
                onPointerLeave={() => setHoveredMemberKey(null)}
                tabIndex={hasHoverContent ? 0 : undefined}
                threshold={0.12}
              >
                <div
                  className="our-team-leadership__photo"
                  style={
                    {
                      "--our-team-member-photo-bg":
                        member.imageBackgroundColor || fallback.imageBackgroundColor || "#d3d3d3",
                    } as CSSProperties
                  }
                >
                  {image?.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || member.name || fallback.name || "SAIS Dubai team member"}
                      fill
                      sizes="(max-width: 767px) 78vw, 322px"
                      className="our-team-leadership__image"
                    />
                  ) : null}
                </div>

                <div
                  className="our-team-leadership__caption"
                  style={
                    {
                      "--our-team-member-card-color": teamCardColor,
                    } as CSSProperties
                  }
                >
                  <h3 className="our-team-leadership__name">{member.name || fallback.name}</h3>
                  <p className="our-team-leadership__role">{member.role || fallback.role}</p>
                </div>

                {hasHoverContent ? (
                  <div className="our-team-leadership__hover-panel" aria-hidden="true">
                    {member.yearsOfExperience ? (
                      <p className="our-team-leadership__experience">
                        <strong>Years of Experience:</strong> {member.yearsOfExperience}
                      </p>
                    ) : null}
                    {member.hoverBio ? <p className="our-team-leadership__bio">{member.hoverBio}</p> : null}
                  </div>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
