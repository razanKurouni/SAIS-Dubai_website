import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { FeatureCard } from "@/types/sanity";

type QuickLinksCardsProps = {
  cards?: FeatureCard[];
};

const themeFallbacks: NonNullable<FeatureCard["theme"]>[] = ["blue", "orange", "teal", "gray"];

function getQuickLinkHref(card: FeatureCard) {
  const title = card.title?.trim().toLowerCase() || "";

  if (title.includes("about")) return "/about-us";
  if (title.includes("academic")) return "/academics";
  if (title.includes("community")) return "/our-community";
  if (title.includes("student life")) return "/student-life";

  return card.cta?.href || "#";
}

function QuickLinksArrow() {
  return (
    <span className="quick-links-card__arrow" aria-hidden="true">
      <ArrowRight size={17} strokeWidth={3} />
    </span>
  );
}

function QuickLinksWave() {
  return (
    <svg className="quick-links-card__wave" viewBox="0 0 96 320" preserveAspectRatio="none" aria-hidden="true">
      <path d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
    </svg>
  );
}

function QuickLinksCurveMask() {
  return (
    <svg className="quick-links-card__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
    </svg>
  );
}

export function QuickLinksCards({ cards = [] }: QuickLinksCardsProps) {
  return (
    <div className="quick-links__grid">
      {cards.map((card, index) => {
        const theme = card.theme || themeFallbacks[index % themeFallbacks.length];
        const href = getQuickLinkHref(card);

        return (
          <Reveal
            as="article"
            key={`${card.title}-${index}`}
            className={`quick-links-card quick-links-card--${theme}`}
            delay={index * 80}
            threshold={0.18}
          >
            <div className="quick-links-card__copy">
              <h3 className="quick-links-card__title">{card.title}</h3>
              {card.description && <p className="quick-links-card__text">{card.description}</p>}

              <Link
                href={href}
                target={card.cta?.openInNewTab ? "_blank" : undefined}
                rel={card.cta?.openInNewTab ? "noreferrer" : undefined}
                className="quick-links-card__button"
              >
                <span>{card.cta?.label || "See More"}</span>
                <QuickLinksArrow />
              </Link>
            </div>

            <QuickLinksWave />
            <QuickLinksCurveMask />

            <div className="quick-links-card__image-wrap">
              {card.image?.url ? (
                <Image
                  src={card.image.url}
                  alt={card.image.alt || card.title}
                  fill
                  quality={82}
                  sizes="(max-width: 767px) 92vw, (max-width: 1200px) 42vw, 520px"
                  className="quick-links-card__image"
                />
              ) : (
                <div className="quick-links-card__fallback">{card.title}</div>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
