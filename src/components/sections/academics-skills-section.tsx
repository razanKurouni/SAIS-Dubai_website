import {
  BrainCircuit,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Network,
  RefreshCw,
  SearchCheck,
  UserRoundCheck,
} from "lucide-react";
import type { ComponentType } from "react";
import { HoverIconCard } from "@/components/ui/hover-icon-card";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Reveal } from "@/components/ui/reveal";
import type { AcademicsSkillsSection as AcademicsSkillsSectionData } from "@/types/sanity";

type AcademicsSkillsSectionProps = {
  section?: AcademicsSkillsSectionData;
  fallbackSection: AcademicsSkillsSectionData;
};

type IconProps = {
  size?: number;
  strokeWidth?: number;
};

const iconMap: Record<string, ComponentType<IconProps>> = {
  critical: BrainCircuit,
  communication: MessageCircle,
  organization: Network,
  research: SearchCheck,
  resilience: RefreshCw,
  empathy: HeartHandshake,
  curiosity: Lightbulb,
  growth: UserRoundCheck,
};

export function AcademicsSkillsSection({
  section,
  fallbackSection,
}: AcademicsSkillsSectionProps) {
  const heading = section?.heading || fallbackSection.heading;
  const groups = section?.groups?.length ? section.groups : fallbackSection.groups || [];

  if (!heading?.description?.length && !groups.length) {
    return null;
  }

  return (
    <section className="academics-skills" aria-label="Academic skills and dispositions">
      <SectionReveal className="academics-skills__inner">
        <RichText blocks={heading?.description} className="academics-skills__intro" />

        {groups.map((group) => (
          <section className="academics-skills__group" key={group._key || group.title}>
            {group.title ? <h2 className="academics-skills__group-title">{group.title}</h2> : null}
            {group.items?.length ? (
              <div className="academics-skills__cards">
                {group.items.map((item, index) => {
                  const Icon = iconMap[item.iconType || "critical"] || BrainCircuit;

                  return (
                    <Reveal
                      key={item._key || `${item.title}-${index}`}
                      className="academics-card-reveal"
                      delay={100 + index * 110}
                      threshold={0.12}
                    >
                      <HoverIconCard
                        className={`academics-skills__card academics-skills__card--${item.theme || "teal"}`}
                        icon={item.icon}
                        fallbackIcon={Icon}
                        title={item.title}
                        iconSizes="86px"
                      />
                    </Reveal>
                  );
                })}
              </div>
            ) : null}
          </section>
        ))}
      </SectionReveal>
    </section>
  );
}
