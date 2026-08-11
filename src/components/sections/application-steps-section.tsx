import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { ApplicationStepsSection as ApplicationStepsSectionData } from "@/types/sanity";

type ApplicationStepsSectionProps = {
  section?: ApplicationStepsSectionData;
};

type StepStyle = CSSProperties & {
  "--application-step-color"?: string;
};

export function ApplicationStepsSection({ section }: ApplicationStepsSectionProps) {
  const steps = section?.steps || [];

  if (!steps.length) {
    return null;
  }

  return (
    <section className="application-steps" aria-labelledby="application-steps-title">
      <SectionReveal className="application-steps__inner">
        {section?.heading?.title ? (
          <h2 id="application-steps-title" className="application-steps__title">
            {section.heading.title}
          </h2>
        ) : null}

        <div className="application-steps__grid">
          {steps.map((step, index) => (
            <Reveal
              as="article"
              className="application-step"
              delay={index * 100}
              key={step._key || `${step.number}-${step.title}`}
              style={{ "--application-step-color": step.backgroundColor } as StepStyle}
            >
              <span className="application-step__number" aria-hidden="true">
                {step.number || index + 1}
              </span>
              <h3 className="application-step__title">{step.title}</h3>
              <p className="application-step__description">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
