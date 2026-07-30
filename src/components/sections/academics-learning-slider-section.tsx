"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { AcademicsLearningSliderSection as AcademicsLearningSliderSectionData } from "@/types/sanity";

type AcademicsLearningSliderSectionProps = {
  section?: AcademicsLearningSliderSectionData;
  fallbackSection: AcademicsLearningSliderSectionData;
  className?: string;
  disableAnimation?: boolean;
};

type LearningSliderStyle = CSSProperties & {
  "--learning-slide-bg"?: string;
  "--learning-slide-side"?: string;
  "--learning-slide-ring"?: string;
  "--learning-slide-title"?: string;
  "--learning-slide-text"?: string;
  "--learning-slide-image-position"?: string;
};

function renderBody(body?: string) {
  const blocks = body?.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean) || [];

  return blocks.map((block, blockIndex) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const isList = lines.length > 0 && lines.every((line) => /^[-•*]\s+/.test(line));

    if (isList) {
      return (
        <ul key={`${block}-${blockIndex}`} className="academics-learning-slider__list">
          {lines.map((line) => (
            <li key={line}>{line.replace(/^[-•*]\s+/, "")}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`${block}-${blockIndex}`}>
        {lines.map((line, lineIndex) => (
          <span key={`${line}-${lineIndex}`}>
            {line}
            {lineIndex < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </p>
    );
  });
}

export function AcademicsLearningSliderSection({
  section,
  fallbackSection,
  className = "",
  disableAnimation = false,
}: AcademicsLearningSliderSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const slides = section?.slides?.length ? section.slides : fallbackSection.slides || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideCount = slides.length;
  const safeActiveIndex = slideCount > 0 ? activeIndex % slideCount : 0;
  const activeSlide = slides[safeActiveIndex];

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    if (slideCount <= 1) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goToNext = useCallback(() => {
    if (slideCount <= 1) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex + 1) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (disableAnimation || slideCount <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (isHovered) return;

    const timer = window.setInterval(goToNext, 5600);

    return () => window.clearInterval(timer);
  }, [disableAnimation, goToNext, slideCount, isHovered]);

  if (!heading?.title && !slides.length) {
    return null;
  }

  const style: LearningSliderStyle = {
    "--learning-slide-bg": activeSlide?.backgroundColor || "#d97252",
    "--learning-slide-side": activeSlide?.sideColor || "#00A5B2",
    "--learning-slide-ring": activeSlide?.ringColor || "var(--sais-primary)",
    "--learning-slide-title": activeSlide?.titleColor || activeSlide?.textColor || "#ffffff",
    "--learning-slide-text": activeSlide?.textColor || "#ffffff",
    "--learning-slide-image-position": activeSlide?.imagePosition || "center",
  };

  return (
    <section
      className={`academics-learning-slider ${disableAnimation ? "academics-learning-slider--animation-paused" : ""} ${className}`.trim()}
      aria-labelledby={heading?.title ? "academics-learning-slider-title" : undefined}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {heading?.title ? (
        <Reveal className="academics-learning-slider__header">
          <h2 id="academics-learning-slider-title" className="academics-learning-slider__title">
            {heading.title}
          </h2>
        </Reveal>
      ) : null}

      {activeSlide ? (
        <Reveal className="academics-learning-slider__stage">
          <svg
            className="academics-learning-slider__curve"
            viewBox="0 0 1647 928"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="academics-learning-slider__curve-fill"
              d="M0,0 H1460 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980 L0,928 Z"
            />
            <path
              className="academics-learning-slider__curve-line"
              d="M1460,-50 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980"
              fill="none"
              strokeWidth="88"
              strokeLinecap="round"
            />
          </svg>

          <div
            key={activeSlide._key || `${activeSlide.title}-${safeActiveIndex}`}
            className="academics-learning-slider__inner"
          >
            <div className="academics-learning-slider__media">
              {activeSlide.image?.url ? (
                <Image
                  src={activeSlide.image.url}
                  alt={activeSlide.image.alt || activeSlide.title || ""}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 48px), 42vw"
                  quality={86}
                  className="academics-learning-slider__image"
                />
              ) : null}
            </div>

            <div className="academics-learning-slider__mobile-curve" aria-hidden="true">
              <svg viewBox="0 0 1440 170" preserveAspectRatio="none">
                <path
                  className="academics-learning-slider__mobile-curve-fill"
                  d="M0 0 H1440 V170 H0 V116 C190 70 390 72 560 108 C790 158 1004 152 1218 88 C1308 61 1384 54 1440 62 V0 H0 Z"
                />
                <path
                  className="academics-learning-slider__mobile-curve-line"
                  d="M0 116 C190 70 390 72 560 108 C790 158 1004 152 1218 88 C1308 61 1384 54 1440 62"
                  fill="none"
                  strokeLinecap="round"
                  strokeWidth="34"
                />
              </svg>
            </div>

            <div className="academics-learning-slider__content">
              {activeSlide.title ? <h3>{activeSlide.title}</h3> : null}
              <div className="academics-learning-slider__body">{renderBody(activeSlide.body)}</div>
            </div>
          </div>

          {slides.length > 1 ? (
            <div className="academics-learning-slider__arrows" aria-label="Student learning slide navigation">
              <button
                type="button"
                className="academics-learning-slider__arrow academics-learning-slider__arrow--prev"
                aria-label="Previous student learning slide"
                onClick={goToPrevious}
              >
                <ChevronLeft aria-hidden="true" strokeWidth={1.8} />
              </button>
              <button
                type="button"
                className="academics-learning-slider__arrow academics-learning-slider__arrow--next"
                aria-label="Next student learning slide"
                onClick={goToNext}
              >
                <ChevronRight aria-hidden="true" strokeWidth={1.8} />
              </button>
            </div>
          ) : null}
        </Reveal>
      ) : null}

      {slides.length > 1 ? (
        <div className="academics-learning-slider__dots" aria-label="Student learning slide controls">
          {slides.map((slide, index) => (
            <button
              key={slide._key || `${slide.title}-${index}`}
              type="button"
              className={`academics-learning-slider__dot ${index === safeActiveIndex ? "is-active" : ""}`.trim()}
              aria-label={`Show ${slide.title || `slide ${index + 1}`}`}
              aria-pressed={index === safeActiveIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
