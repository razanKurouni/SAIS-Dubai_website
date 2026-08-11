import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { FaqSection } from "@/types/sanity";

type FaqGridSectionProps = {
  section?: FaqSection;
};

export function FaqGridSection({ section }: FaqGridSectionProps) {
  const items = section?.items || [];

  if (!items.length) {
    return null;
  }

  return (
    <section className="faq-grid-section" aria-labelledby="faq-grid-title">
      <SectionReveal className="faq-grid-section__inner">
        {section?.heading?.title ? (
          <h2 id="faq-grid-title" className="faq-grid-section__title">
            {section.heading.title}
          </h2>
        ) : null}

        <div className="faq-grid-section__grid">
          {items.map((item, index) => (
            <Reveal
              as="article"
              className={`faq-grid-card faq-grid-card--${index % 2 === 0 ? "blue" : "teal"}`}
              delay={(index % 2) * 90}
              key={item._key || item.question}
            >
              <h3 className="faq-grid-card__question">{item.question}</h3>
              <p className="faq-grid-card__answer">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
