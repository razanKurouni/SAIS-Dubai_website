import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ImageCurvedPanel } from "@/components/ui/image-curved-panel";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { ContactInfoItem, ContactInfoSection as ContactInfoSectionData } from "@/types/sanity";

type ContactInfoSectionProps = {
  section?: ContactInfoSectionData;
  fallbackSection?: ContactInfoSectionData;
  className?: string;
  titleId?: string;
  ariaLabel?: string;
  flipped?: boolean;
};

type ContactInfoStyle = CSSProperties & {
  "--contact-info-image-position"?: string;
  "--contact-info-text-color"?: string;
  "--contact-info-title-color"?: string;
  "--contact-info-panel-color"?: string;
  "--contact-info-wave-color"?: string;
};

const fallbackSection: ContactInfoSectionData &
  Required<Pick<ContactInfoSectionData, "heading" | "image" | "items">> = {
  heading: {
    title: "Investing in Continuous Professional Growth",
  },
  image: {
    url: "/contact-campus-building.jpg",
    alt: "Sharjah American International School Dubai campus entrance",
  },
  items: [
    {
      _key: "address",
      icon: "location",
      label: "Campus Address",
      text: "Sharjah American International School Dubai Campus\nP.O. Box 47755 , Al Warqa 1,\nDubai, UAE.",
      href: "https://maps.app.goo.gl/jpHenWCshYQesNd69",
    },
    {
      _key: "phone",
      icon: "phone",
      label: "Phone",
      text: "+971 4 280 1111",
      href: "tel:+97142801111",
    },
    {
      _key: "email",
      icon: "email",
      label: "Email",
      text: "info@saisdubai.com",
      href: "mailto:info@saisdubai.com",
    },
  ],
};

const iconMap: Record<NonNullable<ContactInfoItem["icon"]>, typeof MapPin> = {
  location: MapPin,
  phone: Phone,
  email: Mail,
};

function ContactInfoIcon({ icon = "location" }: Pick<ContactInfoItem, "icon">) {
  const Icon = iconMap[icon] || MapPin;

  return (
    <span className="contact-info-section__item-icon" aria-hidden="true">
      <Icon size={14} strokeWidth={2.25} />
    </span>
  );
}

function ContactInfoText({ item }: { item: ContactInfoItem }) {
  const textLines = item.text?.split("\n").filter(Boolean) || [];
  const content = (
    <>
      {item.label ? <span className="sr-only">{item.label}: </span> : null}
      {textLines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {line}
          {index < textLines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );

  if (item.href) {
    const isExternal = item.href.startsWith("http");
    return (
      <Link
        className="contact-info-section__item-text"
        href={item.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  return <p className="contact-info-section__item-text">{content}</p>;
}

export function ContactInfoSection({
  section,
  fallbackSection: customFallback,
  className = "",
  titleId = "contact-info-title",
  ariaLabel,
  flipped = true,
}: ContactInfoSectionProps) {
  const baseFallback: ContactInfoSectionData = customFallback || fallbackSection;
  const heading = section?.heading?.title || baseFallback.heading?.title || fallbackSection.heading.title;
  const description = section?.heading?.description?.length
    ? section.heading.description
    : baseFallback.heading?.description;
  const image = section?.image?.url ? section.image : baseFallback.image?.url ? baseFallback.image : fallbackSection.image;
  const rawItems = section?.items?.length
    ? section.items
    : customFallback
      ? customFallback.items || []
      : fallbackSection.items;
  // Ensure location items always have the campus map link if none is set in CMS
  const MAP_HREF = "https://maps.app.goo.gl/jpHenWCshYQesNd69";
  const items = rawItems.map((item) =>
    item.icon === "location" && !item.href ? { ...item, href: MAP_HREF } : item
  );
  const panelColor = section?.panelColor || baseFallback.panelColor || "var(--sais-primary)";
  const waveColor = section?.waveColor || baseFallback.waveColor || "#d97252";
  const style: ContactInfoStyle = {
    "--contact-info-image-position": section?.imagePosition || baseFallback.imagePosition || "center",
    "--contact-info-text-color": section?.textColor || baseFallback.textColor || "#ffffff",
    "--contact-info-title-color":
      section?.titleColor || baseFallback.titleColor || section?.textColor || baseFallback.textColor || "#ffffff",
    "--contact-info-panel-color": panelColor,
    "--contact-info-wave-color": waveColor,
  };

  const mediaSlot = (
    <div className="contact-info-section__media">
      <div className="contact-info-section__image-shell">
        {image.url && (
          <Image
            src={image.url}
            alt={image.alt || heading}
            fill
            sizes="(max-width: 767px) 100vw, 44vw"
            quality={84}
            className="contact-info-section__image"
          />
        )}
      </div>
    </div>
  );

  return (
    <section
      className={`contact-info-section ${className}`.trim()}
      aria-labelledby={ariaLabel ? undefined : titleId}
      aria-label={ariaLabel}
      style={style}
    >
      <SectionReveal>
        <ImageCurvedPanel
          mediaSlot={mediaSlot}
          innerClassName="contact-info-section__inner"
          fillColor={panelColor}
          accentColor={waveColor}
          strokeWidth={88}
          flipped={flipped}
          panelClassName="contact-info-section__panel"
          panelContentClassName="contact-info-section__panel-content"
        >
          <div className="contact-info-section__body">
            <h2 id={titleId} className="contact-info-section__title">
              {heading}
            </h2>

            {description?.length ? (
              <RichText blocks={description} className="contact-info-section__description" />
            ) : null}

            {items.length ? (
              <div className="contact-info-section__items">
                {items.map((item, index) => (
                  <div className="contact-info-section__item" key={item._key || `${item.label}-${index}`}>
                    <ContactInfoIcon icon={item.icon} />
                    <ContactInfoText item={item} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* mobile wave divider between panel and image */}
          <div className="contact-info-section__mobile-divider" aria-hidden="true">
            <svg className="contact-info-section__curve-mask" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M0 -32 H52 C16 42 16 92 42 154 C70 220 70 274 38 352 H0 Z" />
            </svg>
            <svg className="contact-info-section__wave" viewBox="0 0 96 320" preserveAspectRatio="none">
              <path d="M52 -24 C16 42 16 92 42 154 C70 220 70 274 38 344" />
            </svg>
          </div>
        </ImageCurvedPanel>
      </SectionReveal>
    </section>
  );
}
