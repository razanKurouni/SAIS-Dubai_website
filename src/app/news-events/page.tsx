import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { NewsListingSection } from "@/components/sections/news-listing-section";
import { PageHero } from "@/components/sections/page-hero";
import { getHomepage, getNewsListingPage, getNewsPosts } from "@/lib/sanity";

const fallbackMetadata: Metadata = {
  title: "Latest News | SAIS Dubai",
  description: "Read the latest news, events, and newsletters from SAIS Dubai.",
};

const innerNavItems = [
  { label: "Latest News", href: "/news-events" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNewsListingPage();
  return {
    title: page?.seo?.title || fallbackMetadata.title,
    description: page?.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function NewsEventsPage() {
  const [data, page, posts] = await Promise.all([getHomepage(), getNewsListingPage(), getNewsPosts()]);
  const hero = page?.hero;

  return (
    <SitePageShell data={data} mainClassName="site-page__main news-page__main" pageClassName="news-page">
      <PageHero
        className="news-page-hero"
        title={hero?.heading?.title || "Latest\nNews"}
        image={hero?.image}
        titleId="news-page-hero-title"
        priority
        topLineColor={hero?.topLineColor}
        panelColor={hero?.panelColor}
        waveColor={hero?.waveColor}
        textColor={hero?.textColor}
        imagePosition={hero?.imagePosition}
        imageWidth={hero?.imageWidth}
      />
      <InnerPageNav
        className="news-contact-careers-inner-nav"
        items={innerNavItems}
        activeHref="/news-events"
        activeColor="#00A5B2"
        inactiveColor="#707174"
        textColor="#ffffff"
        dividerColor="#ffffff"
        topLineColor="#ffffff"
        ariaLabel="News, contact and careers navigation"
      />
      <NewsListingSection
        newsPosts={posts.filter((post) => post.category !== "newsletter")}
        newsletterPosts={posts.filter((post) => post.category === "newsletter")}
        newsHeading={page?.newsHeading}
        newslettersHeading={page?.newslettersHeading}
        buttonLabel={page?.buttonLabel}
      />
    </SitePageShell>
  );
}
