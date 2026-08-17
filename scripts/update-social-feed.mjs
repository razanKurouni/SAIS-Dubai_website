import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

const existingImage = await client.fetch(
  `*[_type == "homepage" && _id == "homepage-main"][0].news.posts[0].image`
);

if (!existingImage?.image?.asset?._ref) {
  throw new Error("Could not find the current Latest News image in Sanity to reuse for Follow Us.");
}

function socialImage(key) {
  return {
    ...existingImage,
    _key: key,
    _type: "imageWithAlt",
    alt: existingImage.alt || "SAIS teacher reading with students",
  };
}

await client
  .patch("homepage-main")
  .set({
    instagram: {
      _type: "object",
      heading: {
        _type: "sectionHeading",
        title: "Follow Us",
      },
      images: [
        socialImage("social-1"),
        socialImage("social-2"),
        socialImage("social-3"),
        socialImage("social-4"),
      ],
      socialLinks: [
        {
          _key: "instagram",
          _type: "linkField",
          label: "Instagram",
          href: "https://www.instagram.com/saisdubaicampus/",
          openInNewTab: true,
        },
        {
          _key: "facebook",
          _type: "linkField",
          label: "Facebook",
          href: "https://www.facebook.com/SAISDubai/",
          openInNewTab: true,
        },
        {
          _key: "linkedin",
          _type: "linkField",
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/sais-dubai-174281177/",
          openInNewTab: true,
        },
      ],
    },
  })
  .commit();

console.log("Updated homepage-main.instagram using the current Sanity news image.");
