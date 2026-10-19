import Image from "next/image";
import type { CSSProperties } from "react";
import { RichText } from "@/components/ui/rich-text";
import { Reveal } from "@/components/ui/reveal";
import { SaisCurvedPanel } from "@/components/ui/sais-curved-panel";
import type { ImageTextSection, PortableTextBlock } from "@/types/sanity";

type IntroFeatureSectionProps = {
  section?: ImageTextSection;
  fallbackSection?: ImageTextSection;
  className?: string;
  titleId?: string;
  panelColor?: string;
  accentColor?: string;
  titleColor?: string;
  textColor?: string;
  imagePosition?: string;
};

type IntroFeatureStyle = CSSProperties & {
  "--intro-feature-panel-color"?: string;
  "--intro-feature-accent-color"?: string;
  "--intro-feature-title-color"?: string;
  "--intro-feature-text-color"?: string;
  "--intro-feature-image-position"?: string;
};

const fallbackDescription: PortableTextBlock[] = [
  {
    _key: "intro-feature-paragraph-1",
    _type: "block",
    children: [
      {
        _key: "intro-feature-span-1",
        _type: "span",
        text:
          "Sharjah American International School (SAIS) - Dubai is a distinguished member of the SAIS group of schools founded and led by Dr. Aysha Sayyar and Dr. Nawaf Fawaz. The SAIS educational network spans four Emirates across the UAE: Sharjah, Dubai, Umm Al-Quwain, and Abu Dhabi.",
      },
    ],
  },
  {
    _key: "intro-feature-paragraph-2",
    _type: "block",
    children: [
      {
        _key: "intro-feature-span-2",
        _type: "span",
        text:
          "At SAIS Dubai, we deliver a rigorous American curriculum within a framework that honors UAE values and cultural heritage. Our fundamental belief is that students achieve their highest potential in a supportive, nurturing environment that respects and integrates local traditions.",
      },
    ],
  },
];

const fallbackSection: ImageTextSection = {
  heading: {
    title: "Building Bright Futures with Purpose and Principle",
    description: fallbackDescription,
  },
  image: {
    url: "/sais-building-futures.png",
    alt: "SAIS Dubai students during a science lab activity",
  },
  imagePosition: "left",
  theme: "blue",
  ctas: [],
};

export function IntroFeatureSection({
  section,
  fallbackSection: customFallback,
  className = "",
  titleId = "intro-feature-title",
  panelColor = "var(--sais-primary)",
  accentColor = "var(--sais-accent)",
  titleColor = "var(--sais-accent)",
  textColor = "var(--sais-body-text-color-on-dark)",
  imagePosition = "center",
}: IntroFeatureSectionProps) {
  const baseFallback = customFallback || fallbackSection;
  const title = section?.heading?.title || baseFallback.heading.title;
  const description = section?.heading?.description?.length
    ? section.heading.description
    : baseFallback.heading.description;
  const imageUrl = section?.image?.url || baseFallback.image?.url;
  const imageAlt = section?.image?.alt || baseFallback.image?.alt || title;
  const style: IntroFeatureStyle = {
    "--intro-feature-panel-color": panelColor,
    "--intro-feature-accent-color": accentColor,
    "--intro-feature-title-color": titleColor,
    "--intro-feature-text-color": textColor,
    "--intro-feature-image-position": imagePosition,
  };

  return (
    <section className={`intro-feature ${className}`.trim()} aria-labelledby={titleId} style={style}>
      <Reveal
        className="intro-feature__layout"
        threshold={0.18}
      >
        <div className="intro-feature__media">
          <div className="intro-feature__image-shell">
            <Image
              src={imageUrl || baseFallback.image?.url || "/sais-building-futures.png"}
              alt={imageAlt}
              fill
              priority={false}
              sizes="(max-width: 767px) 100vw, 44vw"
              className="intro-feature__image"
            />
          </div>
        </div>

        <SaisCurvedPanel
          className="intro-feature__shape"
          contentClassName="intro-feature__shape-content"
          fillColor={panelColor}
          accentColor={accentColor}
          strokeWidth={88}
          flipped
        >
          <div className="intro-feature__content">
            <h2 id={titleId} className="intro-feature__title">
              {title}
            </h2>
            <RichText blocks={description} className="intro-feature__description" />
          </div>
          <div className="intro-feature__mobile-divider" aria-hidden="true">
            <svg className="intro-feature__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
            </svg>
            <svg className="intro-feature__wave" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
            </svg>
          </div>
        </SaisCurvedPanel>
      </Reveal>
    </section>
  );
}
