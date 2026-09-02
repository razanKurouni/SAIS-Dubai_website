import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uwffig4f",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

if (!process.env.SANITY_AUTH_TOKEN) throw new Error("SANITY_AUTH_TOKEN is required.");

const document = await client.getDocument("admissions-withdrawal-page");
if (!document) throw new Error("Admissions Withdrawal page was not found in Sanity.");

const body = (document.intro?.body || []).map((block) => {
  if (block?._key !== "withdrawal-info-4") return block;

  return {
    ...block,
    children: (block.children || []).map((child) => ({
      ...child,
      text: child.text?.replace(
        "For further information, please contact us at T: 04 280 1111",
        "For further information, please contact us at 04 280 1111.",
      ),
    })),
  };
});

await client.patch(document._id).set({ "intro.body": body }).commit();
console.log("Corrected the Withdrawal contact sentence in Sanity.");
