import type { CSSProperties } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { Reveal } from "@/components/ui/reveal";
import type { AcademicsApBenefitsSection as AcademicsApBenefitsSectionData } from "@/types/sanity";

type AcademicsApBenefitsSectionProps = {
  section?: AcademicsApBenefitsSectionData;
  fallbackSection: AcademicsApBenefitsSectionData;
  className?: string;
};

type ApBenefitsStyle = CSSProperties & {
  "--ap-benefits-bg"?: string;
  "--ap-benefits-title"?: string;
  "--ap-benefits-subtitle"?: string;
  "--ap-benefits-card-icon"?: string;
  "--ap-benefits-card-title"?: string;
  "--ap-benefits-card-text"?: string;
};

export function AcademicsApBenefitsSection({
  section,
  fallbackSection,
  className = "",
}: AcademicsApBenefitsSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const cards = section?.cards?.length ? section.cards : fallbackSection.cards || [];

  const style: ApBenefitsStyle = {
    "--ap-benefits-bg": section?.backgroundColor || fallbackSection.backgroundColor,
    "--ap-benefits-title": section?.titleColor || fallbackSection.titleColor,
    "--ap-benefits-subtitle": section?.subtitleColor || fallbackSection.subtitleColor,
    "--ap-benefits-card-icon": section?.cardIconColor || fallbackSection.cardIconColor,
    "--ap-benefits-card-title": section?.cardTitleColor || fallbackSection.cardTitleColor,
    "--ap-benefits-card-text": section?.cardTextColor || fallbackSection.cardTextColor,
  };

  if (!heading?.title && !cards.length) return null;

  return (
    <section
      className={`academics-ap-benefits ${className}`.trim()}
      aria-labelledby={heading?.title ? "academics-ap-benefits-title" : undefined}
      style={style}
    >
      <Reveal className="academics-ap-benefits__inner">
        {heading?.title ? (
          <h2 id="academics-ap-benefits-title" className="academics-ap-benefits__title">
            {heading.title}
          </h2>
        ) : null}
        {heading?.subtitle ? (
          <p className="academics-ap-benefits__subtitle">{heading.subtitle}</p>
        ) : null}

        {cards.length ? (
          <div className="academics-ap-benefits__grid">
            {cards.map((card, index) => (
              <Reveal
                key={card._key || `${card.title}-${index}`}
                className="academics-card-reveal"
                delay={100 + index * 120}
                threshold={0.12}
              >
                <HoverIconCard
                  className="academics-ap-benefits__card"
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  iconSizes="96px"
                />
              </Reveal>
            ))}
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
