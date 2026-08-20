import { Award, Globe2, Network, UsersRound } from "lucide-react";
import type { ComponentType } from "react";
import { Reveal } from "@/components/ui/reveal";
import type { HomepageData, WhyDubaiItem } from "@/types/sanity";

type WhyDubaiSectionProps = {
  section?: HomepageData["whyDubai"];
};

const iconMap: Record<NonNullable<WhyDubaiItem["iconType"]>, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  student: Award,
  globe: Globe2,
  learning: Network,
  family: UsersRound,
};

export function WhyDubaiSection({ section }: WhyDubaiSectionProps) {
  if (!section?.items?.length) {
    return null;
  }

  const title = section.heading?.title || "Why SAIS Dubai?";
  const subtitle = section.heading?.subtitle;

  return (
    <section className="why-dubai" aria-labelledby="why-dubai-title">
      <Reveal className="why-dubai__inner" threshold={0.24}>
        <h2 id="why-dubai-title" className="why-dubai__title">
          {title}
        </h2>

        {subtitle && <p className="why-dubai__subtitle">{subtitle}</p>}

        <div className="why-dubai__items">
          {section.items?.map((item, index) => {
            const Icon = iconMap[item.iconType || "student"] || Award;

            return (
              <Reveal
                as="article"
                className="why-dubai__item academics-card-reveal"
                key={`${item.description}-${index}`}
                delay={100 + index * 120}
                threshold={0.12}
              >
                <span className="why-dubai__icon">
                  {item.icon?.url ? (
                    // SVG icon bases render more reliably as plain images than through next/image.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.icon.url} alt="" aria-hidden="true" className="why-dubai__icon-image" />
                  ) : (
                    <Icon size={84} strokeWidth={1.9} />
                  )}
                </span>
                <p>{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
