"use client";

import { Accessibility, BrainCircuit, ChevronLeft, ChevronRight, Globe2, MessagesSquare, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import type {
  AcademicsSupportProgramCard,
  AcademicsSupportProgramsSection as AcademicsSupportProgramsSectionData,
} from "@/types/sanity";

type AcademicsSupportProgramsSliderSectionProps = {
  section?: AcademicsSupportProgramsSectionData;
  fallbackSection: AcademicsSupportProgramsSectionData;
  className?: string;
  autoplayIntervalMs?: number;
};

type SupportProgramsStyle = CSSProperties & {
  "--support-programs-bg"?: string;
  "--support-programs-title"?: string;
  "--support-card-border"?: string;
  "--support-card-hover-border"?: string;
  "--support-card-text"?: string;
};

type SupportProgramsTrackStyle = CSSProperties & {
  "--support-visible-count"?: number;
};

const fallbackIconMap = {
  determination: Accessibility,
  gifted: Sparkles,
  eal: Globe2,
  counseling: MessagesSquare,
  differentiation: BrainCircuit,
} satisfies Record<NonNullable<AcademicsSupportProgramCard["iconType"]>, typeof Accessibility>;

function getVisibleCount() {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.innerWidth >= 960) {
    return 3;
  }

  if (window.innerWidth >= 640) {
    return 2;
  }

  return 1;
}

export function AcademicsSupportProgramsSliderSection({
  section,
  fallbackSection,
  className = "",
  autoplayIntervalMs = 5000,
}: AcademicsSupportProgramsSliderSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeStart, setActiveStart] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const maxStart = Math.max(0, cards.length - visibleCount);
  const safeActiveStart = Math.min(activeStart, maxStart);
  const dots = useMemo(() => Array.from({ length: maxStart + 1 }, (_, index) => index), [maxStart]);

  const goToPrev = useCallback(() => setActiveStart((s) => (s <= 0 ? maxStart : s - 1)), [maxStart]);
  const goToNext = useCallback(() => setActiveStart((s) => (s >= maxStart ? 0 : s + 1)), [maxStart]);

  useEffect(() => {
    if (maxStart <= 0 || isHovered || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const timer = window.setInterval(goToNext, autoplayIntervalMs);
    return () => window.clearInterval(timer);
  }, [autoplayIntervalMs, goToNext, maxStart, isHovered]);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  if (!heading?.title && !cards.length) {
    return null;
  }

  const style: SupportProgramsStyle = {
    "--support-programs-bg": section?.backgroundColor || fallbackSection.backgroundColor,
    "--support-programs-title": section?.titleColor || fallbackSection.titleColor,
    "--support-card-border": section?.cardBorderColor || fallbackSection.cardBorderColor,
    "--support-card-hover-border": section?.cardHoverBorderColor || fallbackSection.cardHoverBorderColor,
    "--support-card-text": section?.cardTextColor || fallbackSection.cardTextColor,
  };
  const trackStyle: SupportProgramsTrackStyle = {
    "--support-visible-count": visibleCount,
    transform: `translateX(calc(-${safeActiveStart} * ((100% - (${visibleCount - 1} * var(--support-slider-gap))) / ${visibleCount} + var(--support-slider-gap))))`,
  };

  return (
    <section
      className={`academics-support-programs ${className}`.trim()}
      aria-labelledby={heading?.title ? "academics-support-programs-title" : undefined}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Reveal className="academics-support-programs__inner">
        {heading?.title ? (
          <h2 id="academics-support-programs-title" className="academics-support-programs__title">
            {heading.title}
          </h2>
        ) : null}

        {cards.length ? (
          <>
            {dots.length > 1 ? (
              <div className="academics-support-programs__arrows">
                <button
                  type="button"
                  className="academics-support-programs__arrow academics-support-programs__arrow--prev"
                  aria-label="Previous"
                  onClick={goToPrev}
                  disabled={false}
                >
                  <ChevronLeft aria-hidden="true" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  className="academics-support-programs__arrow academics-support-programs__arrow--next"
                  aria-label="Next"
                  onClick={goToNext}
                  disabled={false}
                >
                  <ChevronRight aria-hidden="true" strokeWidth={1.8} />
                </button>
              </div>
            ) : null}

            <div className="academics-support-programs__viewport">
              <div className="academics-support-programs__track" style={trackStyle}>
                {cards.map((card, index) => {
                  const FallbackIcon = card.iconType ? fallbackIconMap[card.iconType] : Accessibility;

                  return (
                    <HoverIconCard
                      key={card._key || `${card.title}-${index}`}
                      className="academics-support-programs__card"
                      icon={card.icon}
                      fallbackIcon={FallbackIcon}
                      title={card.title}
                      description={card.description}
                      iconSizes="96px"
                    />
                  );
                })}
              </div>
            </div>

            {dots.length > 1 ? (
              <div className="academics-support-programs__dots" aria-label="Support programs slider controls">
                {dots.map((startIndex) => (
                  <button
                    key={startIndex}
                    type="button"
                    className={`academics-support-programs__dot ${safeActiveStart === startIndex ? "is-active" : ""}`.trim()}
                    aria-label={`Show support programs ${startIndex + 1}`}
                    aria-pressed={safeActiveStart === startIndex}
                    onClick={() => setActiveStart(startIndex)}
                  />
                ))}
              </div>
            ) : null}
          </>
        ) : null}
      </Reveal>
    </section>
  );
}
