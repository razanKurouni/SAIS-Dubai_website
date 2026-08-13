"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { ValuesSection } from "@/types/sanity";

type AboutValuesSectionProps = {
  section?: ValuesSection;
};

type AboutValuesStyle = CSSProperties & {
  "--about-values-bg"?: string;
  "--about-values-title"?: string;
  "--about-values-intro"?: string;
  "--about-values-curve"?: string;
  "--about-values-slide-title"?: string;
  "--about-values-item-title"?: string;
  "--about-values-text"?: string;
  "--about-values-image-position"?: string;
};

const fallbackValues: ValuesSection = {
  heading: {
    title: "Our Values",
    subtitle:
      "We express our values through three connected pillars:\nthe character we build, the way we work together, and how we continue to grow.",
  },
  backgroundColor: "#00a5b2",
  titleColor: "#ffffff",
  introTextColor: "#ffffff",
  slides: [
    {
      title: "Character",
      image: {
        url: "/about-values-character.jpg",
        alt: "SAIS Dubai teacher supporting a student with a tablet in class",
      },
      curveColor: "#216b97",
      titleColor: "#216b97",
      itemTitleColor: "#216b97",
      textColor: "#666b70",
      imagePosition: "center",
      items: [
        {
          title: "Integrity",
          description:
            "We act with honesty, take responsibility for our actions, and hold ourselves to high standards.",
          icon: {
            url: "/about-values-icon-integrity.png",
            alt: "Integrity icon",
          },
        },
        {
          title: "Respect and Equity",
          description:
            "By treating every individual with fairness, dignity, and consideration, we create an inclusive environment where everyone feels they belong and can succeed.",
          icon: {
            url: "/about-values-icon-respect.png",
            alt: "Respect and equity icon",
          },
        },
      ],
    },
    {
      title: "Community",
      image: {
        url: "/about-values-community.jpg",
        alt: "SAIS Dubai students smiling together on the playground",
      },
      curveColor: "#d97252",
      titleColor: "#d97252",
      itemTitleColor: "#d97252",
      textColor: "#666b70",
      imagePosition: "center",
      items: [
        {
          title: "Collaboration",
          description:
            "We work together with purpose, valuing the synergy between different cultures and perspectives, and building strong relationships across our school community.",
          icon: {
            url: "/about-values-icon-collaboration.png",
            alt: "Collaboration icon",
          },
        },
        {
          title: "Wellbeing",
          description:
            "We prioritize the social, emotional, and physical wellbeing of our community, creating a safe and supportive environment where individuals can grow with confidence.",
          icon: {
            url: "/about-values-icon-wellbeing.png",
            alt: "Wellbeing icon",
          },
        },
      ],
    },
    {
      title: "Growth",
      image: {
        url: "/about-values-growth.jpg",
        alt: "SAIS Dubai students working in a science lab",
      },
      curveColor: "#777b80",
      titleColor: "#777b80",
      itemTitleColor: "#777b80",
      textColor: "#666b70",
      imagePosition: "center",
      items: [
        {
          title: "Innovation",
          description:
            "We embrace curiosity, creativity, and forward thinking, using technology and new ideas to enrich learning and prepare students for a changing world.",
          icon: {
            url: "/about-values-icon-innovation.png",
            alt: "Innovation icon",
          },
        },
        {
          title: "Lifelong Learning",
          description:
            "We encourage curiosity, adaptability, and continuous growth, empowering students to take ownership of their learning and future.",
          icon: {
            url: "/about-values-icon-lifelong-learning.png",
            alt: "Lifelong learning icon",
          },
        },
      ],
    },
  ],
};

export function AboutValuesSection({ section }: AboutValuesSectionProps) {
  const heading = section?.heading || fallbackValues.heading;
  const slides = section?.slides?.length ? section.slides : fallbackValues.slides || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = slides.length;
  const safeActiveIndex = slideCount > 0 ? activeIndex % slideCount : 0;
  const activeSlide = slides[safeActiveIndex];

  const goToSlide = useCallback((index: number) => {
    if (!slideCount) return;
    setActiveIndex((index + slideCount) % slideCount);
  }, [slideCount]);

  useEffect(() => {
    if (slideCount <= 1 || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slideCount);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused, slideCount]);

  if (!heading?.title && !slides.length) {
    return null;
  }

  const style: AboutValuesStyle = {
    "--about-values-bg": section?.backgroundColor || fallbackValues.backgroundColor,
    "--about-values-title": section?.titleColor || fallbackValues.titleColor,
    "--about-values-intro": section?.introTextColor || fallbackValues.introTextColor,
    "--about-values-curve": activeSlide?.curveColor || "#216b97",
    "--about-values-slide-title": activeSlide?.titleColor || activeSlide?.curveColor || "#216b97",
    "--about-values-item-title": activeSlide?.itemTitleColor || activeSlide?.titleColor || activeSlide?.curveColor || "#216b97",
    "--about-values-text": activeSlide?.textColor || "#666b70",
    "--about-values-image-position": activeSlide?.imagePosition || "center",
  };

  const introLines = heading?.subtitle?.split("\n").map((line) => line.trim()).filter(Boolean) || [];

  return (
    <section
      id="about-values"
      className="about-values"
      aria-labelledby="about-values-title"
      style={style}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="about-values__inner">
        <Reveal className="about-values__header">
          {heading?.title ? (
            <h2 id="about-values-title" className="about-values__title">
              {heading.title}
            </h2>
          ) : null}
          {introLines.length ? (
            <p className="about-values__intro">
              {introLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < introLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          ) : null}
        </Reveal>

        {activeSlide ? (
          <Reveal className="about-values__stage" threshold={0.16}>
            {slides.length > 1 ? (
              <button
                type="button"
                className="about-values__arrow about-values__arrow--previous"
                aria-label="Previous value"
                onClick={() => goToSlide(safeActiveIndex - 1)}
              >
                <ChevronLeft aria-hidden="true" strokeWidth={2.2} />
              </button>
            ) : null}

            <article
              key={activeSlide._key || `${activeSlide.title}-${safeActiveIndex}`}
              className="about-values__slide"
            >
              <div className="about-values__content">
                {activeSlide.title ? <h3 className="about-values__slide-title">{activeSlide.title}</h3> : null}

                {activeSlide.items?.length ? (
                  <div className="about-values__items">
                    {activeSlide.items.map((item, index) => (
                      <div key={item._key || `${item.title}-${index}`} className="about-values__item">
                        {item.icon?.url ? (
                          <div className="about-values__icon">
                            <Image
                              src={item.icon.url}
                              alt={item.icon.alt || item.title || ""}
                              width={64}
                              height={64}
                              className="about-values__icon-image"
                            />
                          </div>
                        ) : null}

                        {item.title ? <h4 className="about-values__item-title">{item.title}</h4> : null}
                        {item.description ? <p className="about-values__item-text">{item.description}</p> : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="about-values__mobile-divider" aria-hidden="true">
                <svg
                  className="about-values__mobile-divider-fill"
                  viewBox="0 0 390 92"
                  preserveAspectRatio="none"
                >
                  <path d="M-12 0H402V34C190 -2 88 84 -12 36Z" />
                </svg>
                <svg
                  className="about-values__mobile-divider-line"
                  viewBox="0 0 390 92"
                  preserveAspectRatio="none"
                >
                  <path d="M-12 44C88 92 190 6 402 42" />
                </svg>
              </div>

              <svg
                className="about-values__curve-mask"
                viewBox="0 0 150 630"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 0H54.744C27.918 42.07-22.61 140.7 11.348 245.152 20.38 272.9 32.387 300.24 44 326.679c17.436 39.7 35.469 80.747 44.789 125.714 11.992 57.789 10.416 129.992-24.246 177.121H0Z" />
              </svg>

              <svg
                className="about-values__wave"
                viewBox="0 0 150 630"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M54.744 0h57.1C51.817 73.765 33.911 164.912 62.94 254.174c9.45 29.065 21.727 57.033 33.607 84.082 16.871 38.393 34.3 78.077 43.029 120.126 10.505 50.676 9.889 121.445-22.385 171.132H64.543c34.662-47.129 36.238-119.332 24.246-177.121C79.469 407.426 61.436 366.379 44 326.679 32.387 300.24 20.38 272.9 11.348 245.152-22.61 140.7 27.918 42.07 54.744 0" />
              </svg>

              <div className="about-values__media">
                {activeSlide.image?.url ? (
                  <Image
                    src={activeSlide.image.url}
                    alt={activeSlide.image.alt || activeSlide.title || ""}
                    fill
                    sizes="(max-width: 767px) calc(100vw - 40px), 44vw"
                    quality={88}
                    className="about-values__image"
                  />
                ) : null}
              </div>
            </article>

            {slides.length > 1 ? (
              <button
                type="button"
                className="about-values__arrow about-values__arrow--next"
                aria-label="Next value"
                onClick={() => goToSlide(safeActiveIndex + 1)}
              >
                <ChevronRight aria-hidden="true" strokeWidth={2.2} />
              </button>
            ) : null}
          </Reveal>
        ) : null}

        {slides.length > 1 ? (
          <div className="about-values__navigation">
            <div className="about-values__dots" aria-label="Values slider controls">
              {slides.map((slide, index) => (
                <button
                  key={slide._key || `${slide.title}-${index}`}
                  type="button"
                  className={`about-values__dot ${index === safeActiveIndex ? "is-active" : ""}`.trim()}
                  aria-label={`Show ${slide.title || `values slide ${index + 1}`}`}
                  aria-pressed={index === safeActiveIndex}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
