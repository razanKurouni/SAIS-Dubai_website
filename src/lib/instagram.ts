export type InstagramPost = {
  id: string;
  caption?: string;
  mediaType?: string;
  mediaUrl: string;
  permalink: string;
  timestamp?: string;
};

type InstagramApiPost = {
  id?: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
};

type InstagramApiResponse = {
  data?: InstagramApiPost[];
};

export async function getLatestInstagramPosts(limit = 4): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) return [];

  const userId = process.env.INSTAGRAM_USER_ID || "me";
  const graphBaseUrl = (process.env.INSTAGRAM_GRAPH_BASE_URL || "https://graph.instagram.com")
    .replace(/\/$/, "");
  const url = new URL(`${graphBaseUrl}/${encodeURIComponent(userId)}/media`);
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp",
  );
  url.searchParams.set("limit", String(Math.max(limit, 4)));
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url, { next: { revalidate: 1800 } });
    if (!response.ok) {
      console.error(`Instagram feed request failed with status ${response.status}.`);
      return [];
    }

    const payload = await response.json() as InstagramApiResponse;
    return (payload.data || [])
      .map((post) => ({
        id: post.id || "",
        caption: post.caption,
        mediaType: post.media_type,
        mediaUrl: post.media_type === "VIDEO"
          ? post.thumbnail_url || post.media_url || ""
          : post.media_url || post.thumbnail_url || "",
        permalink: post.permalink || "",
        timestamp: post.timestamp,
      }))
      .filter((post) => post.id && post.mediaUrl && post.permalink)
      .slice(0, limit);
  } catch (error) {
    console.error("Instagram feed request failed:", error);
    return [];
  }
}
