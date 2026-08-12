import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { NewsPost } from "@/types/sanity";

type NewsListingSectionProps = {
  newsPosts: NewsPost[];
  newsletterPosts: NewsPost[];
  newsHeading?: string;
  newslettersHeading?: string;
  buttonLabel?: string;
};

function NewsButton({ post, label }: { post: NewsPost; label: string }) {
  return (
    <Link className="news-listing-card__button" href={`/news-events/${post.slug}`}>
      <span>{label}</span>
      <span className="news-listing-card__arrow" aria-hidden="true">
        <ArrowRight size={16} strokeWidth={3} />
      </span>
    </Link>
  );
}

function NewsCard({ post, buttonLabel }: { post: NewsPost; buttonLabel: string }) {
  return (
    <article className="news-listing-card">
      <Link className="news-listing-card__media" href={`/news-events/${post.slug}`} tabIndex={-1}>
        {post.image?.url ? (
          <Image
            src={post.image.url}
            alt={post.image.alt || post.title || "News image"}
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), 28vw"
            className="news-listing-card__image"
          />
        ) : null}
      </Link>
      <div className="news-listing-card__body">
        <h3><Link href={`/news-events/${post.slug}`}>{post.title}</Link></h3>
        {post.excerpt ? <p>{post.excerpt}</p> : null}
        <NewsButton post={post} label={buttonLabel} />
      </div>
    </article>
  );
}

export function NewsListingSection({
  newsPosts,
  newsletterPosts,
  newsHeading = "Latest News & Events",
  newslettersHeading = "Newsletters",
  buttonLabel = "See More",
}: NewsListingSectionProps) {
  const featured = newsPosts.find((post) => post.featured) || newsPosts[0];
  const remainingNews = newsPosts.filter((post) => post._id !== featured?._id);

  return (
    <div className="news-listing">
      <section className="news-listing__section" aria-labelledby="news-listing-heading">
        <SectionReveal className="news-listing__inner">
          <h2 id="news-listing-heading" className="news-listing__heading">{newsHeading}</h2>

          {featured ? (
            <article className="news-listing-featured">
              <Link className="news-listing-featured__media" href={`/news-events/${featured.slug}`} tabIndex={-1}>
                {featured.image?.url ? (
                  <Image
                    src={featured.image.url}
                    alt={featured.image.alt || featured.title || "Featured news"}
                    fill
                    priority
                    sizes="(max-width: 767px) calc(100vw - 32px), 42vw"
                    className="news-listing-featured__image"
                  />
                ) : null}
              </Link>
              <div className="news-listing-featured__body">
                <h3><Link href={`/news-events/${featured.slug}`}>{featured.title}</Link></h3>
                {featured.excerpt ? <p>{featured.excerpt}</p> : null}
                <NewsButton post={featured} label={buttonLabel} />
              </div>
            </article>
          ) : null}

          {remainingNews.length ? (
            <div className="news-listing__grid">
              {remainingNews.map((post) => <NewsCard key={post._id || post.slug} post={post} buttonLabel={buttonLabel} />)}
            </div>
          ) : null}
        </SectionReveal>
      </section>

      {newsletterPosts.length ? (
        <section className="news-listing__section news-listing__section--newsletters" aria-labelledby="newsletter-listing-heading">
          <SectionReveal className="news-listing__inner">
            <h2 id="newsletter-listing-heading" className="news-listing__heading">{newslettersHeading}</h2>
            <div className="news-listing__grid">
              {newsletterPosts.map((post) => <NewsCard key={post._id || post.slug} post={post} buttonLabel={buttonLabel} />)}
            </div>
          </SectionReveal>
        </section>
      ) : null}
    </div>
  );
}
