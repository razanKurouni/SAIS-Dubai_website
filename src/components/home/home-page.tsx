import { SiteHeader } from "@/components/sections/site-header";
import { HomeHero } from "@/components/sections/home-hero";
import { IntroFeatureSection } from "@/components/sections/intro-feature-section";
import { HeroContactBand } from "@/components/sections/hero-contact-band";
import { WhyDubaiSection } from "@/components/sections/why-dubai-section";
import { AccreditationsSection } from "@/components/sections/accreditations-section";
import { FactsSection } from "@/components/sections/facts-section";
import { QuickLinksSection } from "@/components/sections/quick-links-section";
import { LearningPhasesSection } from "@/components/sections/learning-phases-section";
import { TourIntroSection } from "@/components/sections/tour-intro-section";
import { TourSection } from "@/components/sections/tour-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { LatestNewsSection } from "@/components/sections/latest-news-section";
import { SocialSection } from "@/components/sections/social-section";
import { SiteFooter } from "@/components/sections/site-footer";
import type { HomepageData } from "@/types/sanity";
import type { InstagramPost } from "@/lib/instagram";

type HomePageProps = {
  data?: HomepageData;
  instagramPosts?: InstagramPost[];
};

export function HomePage({ data, instagramPosts }: HomePageProps) {
  return (
    <div className="preview-page">
      <SiteHeader settings={data?.header} links={data?.navigation} />

      <main id="home" className="preview-main">
        <HomeHero hero={data?.hero} />
        <IntroFeatureSection section={data?.intro} />
        <HeroContactBand section={data?.heroContactBand} />
        <AccreditationsSection section={data?.accreditations} />
        <ApproachSection section={data?.whySection} />
        <FactsSection section={data?.facts} />
        <WhyDubaiSection section={data?.whyDubai} />
        <QuickLinksSection section={data?.quickLinks} />
        <LearningPhasesSection section={data?.learningPhases} />
        <TourIntroSection section={data?.tour} />
        <TourSection section={data?.tour} />
        <LatestNewsSection section={data?.news} />
        <SocialSection section={data?.instagram} posts={instagramPosts} />
      </main>

      <SiteFooter footer={data?.footer} />
    </div>
  );
}
