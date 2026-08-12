import fs from "node:fs";
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_AUTH_TOKEN;

if (!token) throw new Error("SANITY_AUTH_TOKEN is required to seed news pages.");

const client = createClient({ projectId, dataset, token, apiVersion: "2023-01-01", useCdn: false });

async function uploadImage(path, filename, alt) {
  const asset = await client.assets.upload("image", fs.createReadStream(path), { filename, title: alt });
  return {
    _type: "imageWithAlt",
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    alt,
  };
}

function block(key, text, style = "normal") {
  return {
    _key: key,
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
  };
}

const campusImage = await uploadImage(
  "/Users/razan/Downloads/_DEL4004.jpg",
  "news-sais-dubai-campus.jpg",
  "Sharjah American International School Dubai campus",
);
const heroImage = await uploadImage(
  "/Users/razan/Downloads/_NEC6197.jpg",
  "news-sais-dubai-hero.jpg",
  "Sharjah American International School Dubai entrance and UAE flags",
);

const listingPage = {
  _id: "news-listing-page",
  _type: "newsListingPage",
  seo: {
    _type: "seo",
    title: "Latest News & Events | SAIS Dubai",
    description: "Read the latest news, events, and newsletters from SAIS Dubai.",
    image: heroImage,
  },
  hero: {
    _type: "object",
    heading: { _type: "sectionHeading", title: "Latest\nNews" },
    image: heroImage,
    topLineColor: "#d97252",
    panelColor: "#216B97",
    waveColor: "#00A5B2",
    textColor: "#ffffff",
    imagePosition: "center",
    imageWidth: "60%",
  },
  newsHeading: "Latest News & Events",
  newslettersHeading: "Newsletters",
  buttonLabel: "See More",
};

const postDefinitions = [
  {
    id: "news-post-welcome-to-sais-dubai",
    title: "Welcome to SAIS Dubai",
    slug: "welcome-to-sais-dubai",
    category: "news",
    featured: true,
    date: "2026-08-12T08:00:00.000Z",
    excerpt: "Discover the latest updates from our vibrant school community and learn more about the educational experiences, achievements, and opportunities at SAIS Dubai.",
  },
  {
    id: "news-post-campus-community-update",
    title: "Campus Community Update",
    slug: "campus-community-update",
    category: "news",
    date: "2026-08-10T08:00:00.000Z",
    excerpt: "Our campus continues to grow as a welcoming community where students learn, connect, and celebrate their achievements together.",
  },
  {
    id: "news-post-learning-excellence",
    title: "Learning, Growth and Excellence",
    slug: "learning-growth-and-excellence",
    category: "news",
    date: "2026-08-08T08:00:00.000Z",
    excerpt: "A closer look at how SAIS Dubai supports academic excellence, strong values, and meaningful opportunities for every student.",
  },
  {
    id: "news-post-school-events",
    title: "Upcoming School Events",
    slug: "upcoming-school-events",
    category: "news",
    date: "2026-08-06T08:00:00.000Z",
    excerpt: "Explore upcoming events that bring our students, families, staff, and wider school community together throughout the academic year.",
  },
  {
    id: "news-post-august-newsletter",
    title: "August School Newsletter",
    slug: "august-school-newsletter",
    category: "newsletter",
    date: "2026-08-05T08:00:00.000Z",
    excerpt: "Catch up on school highlights, important announcements, student achievements, and dates to remember in our August newsletter.",
  },
  {
    id: "news-post-july-newsletter",
    title: "July School Newsletter",
    slug: "july-school-newsletter",
    category: "newsletter",
    date: "2026-07-05T08:00:00.000Z",
    excerpt: "Read the July edition of our school newsletter for community stories, academic updates, and important information for families.",
  },
  {
    id: "news-post-june-newsletter",
    title: "June School Newsletter",
    slug: "june-school-newsletter",
    category: "newsletter",
    date: "2026-06-05T08:00:00.000Z",
    excerpt: "A celebration of student learning and school life, with news and reminders from across the SAIS Dubai community.",
  },
];

const posts = postDefinitions.map((post) => ({
  _id: post.id,
  _type: "newsPost",
  title: post.title,
  slug: { _type: "slug", current: post.slug },
  category: post.category,
  featured: Boolean(post.featured),
  publishedAt: post.date,
  excerpt: post.excerpt,
  image: campusImage,
  body: [
    block(`${post.slug}-intro`, post.excerpt),
    block(`${post.slug}-heading`, "A connected school community", "h2"),
    block(
      `${post.slug}-body`,
      "At SAIS Dubai, every school day provides opportunities for students to explore new ideas, strengthen their skills, and contribute positively to their community. Our teachers and staff work closely with families to create a supportive environment where every learner can thrive.",
    ),
    block(
      `${post.slug}-closing`,
      "We look forward to sharing more stories, achievements, and important updates with our families throughout the academic year.",
    ),
  ],
  seo: {
    _type: "seo",
    title: `${post.title} | SAIS Dubai`,
    description: post.excerpt,
    image: campusImage,
  },
}));

const transaction = client.transaction().createOrReplace(listingPage);
for (const post of posts) transaction.createOrReplace(post);
await transaction.commit();

await client.patch("homepage-main").set({
  "news.cta.href": "/news-events",
}).commit();

console.log("Seeded dynamic news listing page and news posts.");
