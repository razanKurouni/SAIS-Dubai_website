import { HomePage } from "@/components/home/home-page";
import { getHomepage } from "@/lib/sanity";
import { getLatestInstagramPosts } from "@/lib/instagram";
import type { Metadata } from "next";

const fallbackMetadata: Metadata = {
  title: "SAIS Dubai | UI Preview",
  description: "Local SAIS navigation rebuild preview.",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepage();

  return {
    title: data.seo?.title || fallbackMetadata.title,
    description: data.seo?.description || fallbackMetadata.description,
  };
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const [data, instagramPosts] = await Promise.all([
    getHomepage(),
    getLatestInstagramPosts(4),
  ]);

  return <HomePage data={data} instagramPosts={instagramPosts} />;
}
