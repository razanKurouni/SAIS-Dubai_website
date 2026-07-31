"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { OurTeamDepartmentsSection as OurTeamDepartmentsSectionData } from "@/types/sanity";

type OurTeamDepartmentsSectionProps = {
  section?: OurTeamDepartmentsSectionData;
};

type OurTeamDepartmentsStyle = CSSProperties & {
  "--our-team-departments-bg"?: string;
  "--our-team-departments-title"?: string;
  "--our-team-departments-slide-title"?: string;
  "--our-team-departments-line"?: string;
};

export function OurTeamDepartmentsSection({ section }: OurTeamDepartmentsSectionProps) {
  const slides = section?.slides?.filter((slide) => slide.image?.url || slide.panels?.length) || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const activeSlide = slides[activeIndex] || slides[0];
  const slidesCount = slides.length;
  const canSlide = slidesCount > 1;

  const goToSlide = (index: number) => {
    if (!slidesCount) {
      return;
    }

    setActiveIndex((index + slidesCount) % slidesCount);
  };

  const goToPrevious = () => {
    goToSlide(activeIndex - 1);
  };

  const goToNext = () => {
    goToSlide(activeIndex + 1);
  };

  useEffect(() => {
    if (!canSlide || isHovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slidesCount);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [canSlide, isHovered, slidesCount]);

  if (!section?.heading?.title && !slides.length) {
    return null;
  }

  const style: OurTeamDepartmentsStyle = {
    "--our-team-departments-bg": section?.backgroundColor || "#ffffff",
    "--our-team-departments-title": section?.titleColor || "var(--sais-accent)",
    "--our-team-departments-slide-title": section?.slideTitleColor || "var(--sais-primary)",
    "--our-team-departments-line": section?.lineColor || "var(--sais-primary)",
  };

  const sliderControls = canSlide ? (
    <div className="our-team-departments__controls" aria-label="Department slider controls">
      <button
        type="button"
        className="our-team-departments__arrow"
        aria-label="Previous department slide"
        onClick={goToPrevious}
      >
        <ChevronLeft aria-hidden="true" strokeWidth={1.9} />
      </button>

      <button
        type="button"
        className="our-team-departments__arrow"
        aria-label="Next department slide"
        onClick={goToNext}
      >
        <ChevronRight aria-hidden="true" strokeWidth={1.9} />
      </button>
    </div>
  ) : null;

  return (
    <section
      className="our-team-departments"
      aria-labelledby="our-team-departments-title"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="our-team-departments__inner">
        <Reveal className="our-team-departments__header" threshold={0.14}>
          {section?.heading?.title ? (
            <h2 id="our-team-departments-title" className="our-team-departments__title">
              {section.heading.title}
            </h2>
          ) : null}
        </Reveal>

        {activeSlide ? (
          <Reveal className="our-team-departments__stage" threshold={0.12}>
            {activeSlide.panels?.length ? (
              <div className="our-team-departments__panel-grid">
                {activeSlide.panels.map((panel, index) => (
                  <article
                    key={panel._key || `${panel.title}-${index}`}
                    className="our-team-departments__panel"
                  >
                    <div className="our-team-departments__slide-heading-row">
                      {panel.title ? (
                        <h3 className="our-team-departments__slide-title">{panel.title}</h3>
                      ) : null}
                      {index === (activeSlide.panels?.length || 0) - 1 ? sliderControls : null}
                    </div>
                    <span className="our-team-departments__line" aria-hidden="true" />
                    {panel.image?.url ? (
                      <div
                        className="our-team-departments__image-shell our-team-departments__image-shell--panel"
                        style={
                          {
                            "--our-team-department-panel-ratio": panel.title
                              ?.toLowerCase()
                              .includes("senco")
                              ? "0.92 / 1"
                              : "1.554 / 1",
                          } as CSSProperties
                        }
                      >
                        <Image
                          src={panel.image.url}
                          alt={panel.image.alt || panel.title || "SAIS Dubai department team"}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          className="our-team-departments__image"
                          style={{ objectPosition: panel.imagePosition || "center" }}
                        />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <article className="our-team-departments__single">
                <div className="our-team-departments__slide-heading-row">
                  {activeSlide.title ? (
                    <h3 className="our-team-departments__slide-title">{activeSlide.title}</h3>
                  ) : null}
                  {sliderControls}
                </div>
                <span className="our-team-departments__line" aria-hidden="true" />
                {activeSlide.image?.url ? (
                  <div className="our-team-departments__image-shell">
                    <Image
                      src={activeSlide.image.url}
                      alt={activeSlide.image.alt || activeSlide.title || "SAIS Dubai department team"}
                      fill
                      sizes="100vw"
                      className="our-team-departments__image"
                      style={{ objectPosition: activeSlide.imagePosition || "center" }}
                    />
                  </div>
                ) : null}
              </article>
            )}
          </Reveal>
        ) : null}

        {slides.length ? (
          <div className="our-team-departments__mobile-stack">
            {slides.map((slide, slideIndex) =>
              slide.panels?.length ? (
                <div
                  className="our-team-departments__panel-grid"
                  key={slide._key || `${slide.title}-${slideIndex}`}
                >
                  {slide.panels.map((panel, index) => (
                    <article
                      key={panel._key || `${panel.title}-${index}`}
                      className="our-team-departments__panel"
                    >
                      <div className="our-team-departments__slide-heading-row">
                        {panel.title ? (
                          <h3 className="our-team-departments__slide-title">{panel.title}</h3>
                        ) : null}
                      </div>
                      <span className="our-team-departments__line" aria-hidden="true" />
                      {panel.image?.url ? (
                        <div
                          className="our-team-departments__image-shell our-team-departments__image-shell--panel"
                          style={
                            {
                              "--our-team-department-panel-ratio": panel.title
                                ?.toLowerCase()
                                .includes("senco")
                                ? "0.92 / 1"
                                : "1.554 / 1",
                            } as CSSProperties
                          }
                        >
                          <Image
                            src={panel.image.url}
                            alt={panel.image.alt || panel.title || "SAIS Dubai department team"}
                            fill
                            sizes="100vw"
                            className="our-team-departments__image"
                            style={{ objectPosition: panel.imagePosition || "center" }}
                          />
                        </div>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : (
                <article
                  className="our-team-departments__single"
                  key={slide._key || `${slide.title}-${slideIndex}`}
                >
                  <div className="our-team-departments__slide-heading-row">
                    {slide.title ? (
                      <h3 className="our-team-departments__slide-title">{slide.title}</h3>
                    ) : null}
                  </div>
                  <span className="our-team-departments__line" aria-hidden="true" />
                  {slide.image?.url ? (
                    <div className="our-team-departments__image-shell">
                      <Image
                        src={slide.image.url}
                        alt={slide.image.alt || slide.title || "SAIS Dubai department team"}
                        fill
                        sizes="100vw"
                        className="our-team-departments__image"
                        style={{ objectPosition: slide.imagePosition || "center" }}
                      />
                    </div>
                  ) : null}
                </article>
              )
            )}
          </div>
        ) : null}

        {slides.length > 1 ? (
          <div className="our-team-departments__dots" aria-label="Department slides">
            {slides.map((slide, index) => (
              <button
                key={slide._key || `${slide.title}-${index}`}
                type="button"
                className={`our-team-departments__dot${activeIndex === index ? " is-active" : ""}`}
                aria-label={`Show ${slide.title || `department slide ${index + 1}`}`}
                aria-pressed={activeIndex === index}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
