import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { InnerPageNav } from "@/components/sections/inner-page-nav";
import { RichText } from "@/components/ui/rich-text";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getHomepage, getNewsPostBySlug } from "@/lib/sanity";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

const innerNavItems = [
  { label: "Latest News", href: "/news-events" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Careers", href: "/careers" },
];

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  return {
    title: post?.seo?.title || `${post?.title || "News"} | SAIS Dubai`,
    description: post?.seo?.description || post?.excerpt,
  };
}

export const dynamic = "force-dynamic";

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const [data, post] = await Promise.all([getHomepage(), getNewsPostBySlug(slug)]);
  if (!post) notFound();

  const publishedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-AE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.publishedAt))
    : null;

  return (
    <SitePageShell data={data} mainClassName="site-page__main news-post-page__main" pageClassName="news-post-page">
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
      <article className="news-post">
        <SectionReveal className="news-post__inner">
          <header className="news-post__header">
            <p className="news-post__eyebrow">{post.category === "newsletter" ? "Newsletter" : "News & Events"}</p>
            <h1>{post.title}</h1>
            {publishedDate ? <time dateTime={post.publishedAt}>{publishedDate}</time> : null}
          </header>
          {post.image?.url ? (
            <div className="news-post__image-wrap">
              <Image
                src={post.image.url}
                alt={post.image.alt || post.title || "News image"}
                fill
                priority
                sizes="(max-width: 767px) calc(100vw - 32px), 85vw"
                className="news-post__image"
              />
            </div>
          ) : null}
          <RichText blocks={post.body} fallback={post.excerpt} className="news-post__body" />
        </SectionReveal>
      </article>
    </SitePageShell>
  );
}
