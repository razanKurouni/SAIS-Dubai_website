import { Instagram } from "lucide-react";
import { CmsImage } from "@/components/ui/cms-image";
import { Reveal } from "@/components/ui/reveal";
import { FacebookBrandIcon, LinkedinBrandIcon } from "@/components/ui/social-icons";
import type { InstagramPost } from "@/lib/instagram";
import type { HomepageData } from "@/types/sanity";

type SocialSectionProps = {
  section?: HomepageData["instagram"];
  posts?: InstagramPost[];
};

const socialPlatforms = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/saisdubaicampus/",
    Icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/SAISDubai/",
    Icon: FacebookBrandIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sais-dubai-174281177/",
    Icon: LinkedinBrandIcon,
  },
];

export function SocialSection({ section, posts = [] }: SocialSectionProps) {
  if (!section) {
    return null;
  }

  return (
    <section className="social-feed" aria-labelledby="social-feed-title">
      <div className="social-feed__inner">
        <div className="social-feed__top">
          <h2 id="social-feed-title" className="social-feed__title">
            {section.heading?.title || "Follow Us"}
          </h2>

          <div className="social-feed__links" aria-label="Social media links">
            {socialPlatforms.map(({ label, href, Icon }) => {
              const configuredLink = section.socialLinks?.find(
                (link) => link.label?.toLowerCase() === label.toLowerCase(),
              );
              const resolvedHref = configuredLink?.href && !configuredLink.href.startsWith("#")
                ? configuredLink.href
                : href;

              return (
                <a
                  key={label}
                  href={resolvedHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="social-feed__link"
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="social-feed__grid">
          {(posts.length
            ? posts.map((post) => ({
                image: { url: post.mediaUrl, alt: post.caption || "SAIS Dubai Instagram post" },
                href: post.permalink,
                key: post.id,
              }))
            : (section.images || []).slice(0, 4).map((image, index) => ({
                image,
                href: section.socialLinks?.[0]?.href || "#",
                key: `${image.url || "social"}-${index}`,
              })))
            .map((item, index) => (
            <Reveal
              key={item.key}
              className="social-feed__item"
              delay={index * 80}
              threshold={0.2}
            >
              <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open Instagram post ${index + 1}`}>
                <CmsImage
                  image={item.image}
                  fallbackLabel={`Social image ${index + 1}`}
                  className="social-feed__image-wrap"
                  imageClassName="social-feed__image"
                  sizes="(max-width: 767px) 88vw, (max-width: 1024px) 42vw, 270px"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
