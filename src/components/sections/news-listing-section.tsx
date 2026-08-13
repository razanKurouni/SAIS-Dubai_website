"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type UIEvent } from "react";
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

function NewsCardsCollection({
  posts,
  buttonLabel,
  label,
}: {
  posts: NewsPost[];
  buttonLabel: string;
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldSlide = posts.length > 3;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;

    if (!track || !posts.length) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const firstCard = cards[0];
    const secondCard = cards[1];
    const cardStep = secondCard && firstCard ? secondCard.offsetLeft - firstCard.offsetLeft : firstCard?.offsetWidth || 1;
    const visibleCount = Math.max(1, Math.round((track.clientWidth + (cardStep - (firstCard?.offsetWidth || 0))) / cardStep));
    const lastStartIndex = Math.max(0, posts.length - visibleCount);
    const targetIndex = index > lastStartIndex ? 0 : index < 0 ? lastStartIndex : index;
    const target = cards[targetIndex];

    if (!firstCard || !target) return;

    track.scrollTo({ left: target.offsetLeft - firstCard.offsetLeft, behavior: "smooth" });
    setActiveIndex(targetIndex);
  }, [posts.length]);

  const updateActiveIndex = useCallback((event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    const cards = Array.from(track.children) as HTMLElement[];
    const firstCard = cards[0];

    if (!firstCard) return;

    const closestIndex = cards.reduce(
      (closest, card, index) => {
        const distance = Math.abs(card.offsetLeft - firstCard.offsetLeft - track.scrollLeft);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    ).index;

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    if (!shouldSlide || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => scrollToIndex(activeIndexRef.current + 1), 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, scrollToIndex, shouldSlide]);

  if (!shouldSlide) {
    return (
      <div className="news-listing__grid">
        {posts.map((post) => <NewsCard key={post._id || post.slug} post={post} buttonLabel={buttonLabel} />)}
      </div>
    );
  }

  return (
    <div
      className="news-listing-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div className="news-listing-slider__controls" aria-label={`${label} slider controls`}>
        <button type="button" onClick={() => scrollToIndex(activeIndexRef.current - 1)} aria-label={`Previous ${label}`}>
          <ArrowLeft aria-hidden="true" size={20} strokeWidth={2.5} />
        </button>
        <button type="button" onClick={() => scrollToIndex(activeIndexRef.current + 1)} aria-label={`Next ${label}`}>
          <ArrowRight aria-hidden="true" size={20} strokeWidth={2.5} />
        </button>
      </div>
      <div
        ref={trackRef}
        className="news-listing-slider__track"
        aria-label={label}
        onScroll={updateActiveIndex}
      >
        {posts.map((post) => <NewsCard key={post._id || post.slug} post={post} buttonLabel={buttonLabel} />)}
      </div>
    </div>
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
            <NewsCardsCollection posts={remainingNews} buttonLabel={buttonLabel} label={newsHeading} />
          ) : null}
        </SectionReveal>
      </section>

      {newsletterPosts.length ? (
        <section className="news-listing__section news-listing__section--newsletters" aria-labelledby="newsletter-listing-heading">
          <SectionReveal className="news-listing__inner">
            <h2 id="newsletter-listing-heading" className="news-listing__heading">{newslettersHeading}</h2>
            <NewsCardsCollection posts={newsletterPosts} buttonLabel={buttonLabel} label={newslettersHeading} />
          </SectionReveal>
        </section>
      ) : null}
    </div>
  );
}
