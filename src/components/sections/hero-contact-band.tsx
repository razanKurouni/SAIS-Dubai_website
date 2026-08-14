import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Cta, HomepageData } from "@/types/sanity";
import { SectionReveal } from "@/components/ui/section-reveal";

type HeroContactBandProps = {
  section?: HomepageData["heroContactBand"];
};

const fallbackSection: NonNullable<HomepageData["heroContactBand"]> = {
  text: "For applications, school tours, or potential career opportunities, please don't hesitate to get in touch with our team.",
  ctas: [
    { label: "Book a Tour", href: "/admissions/book-a-tour", variant: "primary" },
    { label: "Apply Now", href: "/admissions/applications", variant: "secondary" },
    { label: "Careers", href: "/careers", variant: "ghost" },
  ],
};

const toneByVariant: Record<NonNullable<Cta["variant"]>, string> = {
  primary: "blue",
  secondary: "teal",
  ghost: "orange",
};

export function HeroContactBand({ section }: HeroContactBandProps) {
  const text = section?.text || fallbackSection.text;
  const actions = section?.ctas?.length ? section.ctas : fallbackSection.ctas;

  if (!text) {
    return null;
  }

  return (
    <section className="hero-contact-band" aria-label="Contact options">
      <SectionReveal className="hero-contact-band__inner">
        <p className="hero-contact-band__text">{text}</p>

        {actions && actions.length > 0 ? (
          <div className="hero-contact-band__actions">
            {actions.map((action) => {
              const tone = toneByVariant[action.variant || "primary"];

              return (
                <Link
                  key={`${action.label}-${action.href}`}
                  href={getActionHref(action)}
                  target={action.openInNewTab ? "_blank" : undefined}
                  rel={action.openInNewTab ? "noreferrer" : undefined}
                  className={`hero-contact-band__button hero-contact-band__button--${tone}`}
                >
                  <span>{action.label}</span>
                  <span className="hero-contact-band__icon" aria-hidden="true">
                    <ArrowRight size={17} strokeWidth={3} />
                  </span>
                </Link>
              );
            })}
          </div>
        ) : null}
      </SectionReveal>
    </section>
  );
}

function getActionHref(action: Cta) {
  const label = action.label?.trim().toLowerCase() || "";

  if (label.includes("book") && label.includes("tour")) {
    return "/admissions/book-a-tour";
  }

  if (label.includes("apply") || label.includes("application")) {
    return "/admissions/applications";
  }

  if (label.includes("career")) {
    return "/careers";
  }

  return action.href || "#";
}
