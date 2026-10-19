"use client";

import type { CSSProperties } from "react";
import { SectionReveal } from "@/components/ui/section-reveal";
import { useCountUpValue } from "@/hooks/use-count-up-value";
import type { HomepageData } from "@/types/sanity";

type FactsSectionProps = {
  section?: HomepageData["facts"];
};

function AnimatedFactValue({ value }: { value: string }) {
  const { displayValue, ref } = useCountUpValue(value);

  return (
    <p ref={ref} className="facts-section__value">
      {displayValue}
    </p>
  );
}

export function FactsSection({ section }: FactsSectionProps) {
  if (!section?.heading?.title && !section?.items?.length) {
    return null;
  }

  return (
    <section className="facts-section" aria-labelledby="facts-title">
      <SectionReveal className="facts-section__inner">
        {section.heading?.title ? (
          <div className="facts-section__heading">
            <h2 id="facts-title" className="facts-section__title">
              {section.heading.title}
            </h2>
          </div>
        ) : null}

        <div
          className="facts-section__grid"
          style={{ "--facts-columns": section.items?.length || 1 } as CSSProperties}
        >
          {(section.items || []).map((item) => (
            <div
              key={`${item.value}-${item.label}`}
              className="facts-section__item"
            >
              <AnimatedFactValue value={item.value} />
              <p className="facts-section__label">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
