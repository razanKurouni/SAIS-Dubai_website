import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { ContactInfoSection } from "@/components/sections/contact-info-section";
import { HeroContactBand } from "@/components/sections/hero-contact-band";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { PageHero } from "@/components/sections/page-hero";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getContactPage, getHomepage } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Contact Us | SAIS Dubai",
  description: "Contact Sharjah American International School Dubai.",
};

const fallbackHero = {
  title: "Contact Sharjah American International School, Dubai",
  image: {
    url: "/about-hero-building.jpg",
    alt: "Sharjah American International School Dubai campus building",
  },
  imageWidth: "60%",
};

const contactInnerNavItems = [
  { label: "Latest News", href: "/news-events" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.270036294305!2d55.40545920292191!3d25.1850574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f612b56467f3f%3A0x323744670d26d9a5!2z2YXYr9in2LHYsyDYp9mE2LTYp9ix2YLYqSDYp9mE2KPZhdix2YrZg9mK2Kkg2KfZhNiv2YjZhNmK2Kkg2KfZhNiu2KfYtdipIC0g2K_YqNmK!5e1!3m2!1sar!2sae!4v1780555397048!5m2!1sar!2sae";

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPage();

  return {
    title: contactPage?.seo?.title || fallbackMetadata.title,
    description: contactPage?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const [data, contactPage] = await Promise.all([getHomepage(), getContactPage()]);
  const contactHero = contactPage?.hero;
  const heroTitle = contactHero?.heading?.title || fallbackHero.title;
  const heroImage = contactHero?.image || fallbackHero.image;

  return (
    <SitePageShell
      data={data}
      mainClassName="site-page__main contact-page__main"
      pageClassName="contact-page"
    >
      <PageHero
        className="contact-hero"
        title={heroTitle}
        image={heroImage}
        titleId="contact-hero-title"
        priority
        topLineColor={contactHero?.topLineColor}
        panelColor={contactHero?.panelColor}
        waveColor={contactHero?.waveColor}
        textColor={contactHero?.textColor}
        imagePosition={contactHero?.imagePosition}
        imageWidth={contactHero?.imageWidth || fallbackHero.imageWidth}
      />

      <InnerPageNav
        className="news-contact-careers-inner-nav"
        items={contactInnerNavItems}
        activeHref="/contact-us"
        activeColor="var(--sais-accent)"
        inactiveColor="#707174"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        ariaLabel="Contact page navigation"
      />

      <ContactInfoSection section={contactPage?.contactInfo} />

      <HeroContactBand section={data?.heroContactBand} />

      <section className="contact-map" aria-label="Campus location map">
        <SectionReveal>
          <iframe
            src={MAP_EMBED_SRC}
            className="contact-map__iframe"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sharjah American International School Dubai — Campus Location"
          />
        </SectionReveal>
      </section>
    </SitePageShell>
  );
}
