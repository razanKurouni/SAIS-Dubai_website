import fs from "node:fs";
import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });
const sourcePath = "/Users/razan/Downloads/MR. SULTAN.jpg";

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Principal image was not found at ${sourcePath}`);
}

function block(_key, text) {
  return {
    _type: "block",
    _key,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${_key}-text`,
        text,
        marks: [],
      },
    ],
  };
}

const paragraphs = [
  "Dear Students, Parents, Colleagues and Community Partners,",
  "It is my pleasure to welcome you to the official website of Sharjah American International School - Dubai.",
  "SAIS-Dubai cultivates an environment where dedicated educators collaborate seamlessly with parents and stakeholders to support and challenge our students in becoming innovative individuals and effective team players who excel in their pursuits.",
  "Our institution delivers a comprehensive American curriculum founded on well-defined, internationally recognized American Education Standards. We thoughtfully integrate relevant international benchmarking and enrichment programs to guide our curriculum, instruction, assessment protocols, and extracurricular offerings.",
  "We envision SAIS - Dubai as a dynamic, interactive learning community that serves not only our students but all members of our educational family. Life-long learning stands as a cornerstone of our guiding statement and is meaningfully implemented throughout our academic programs, events, and activities.",
  "We diligently foster a community that inspires a passion for learning - where students confidently embark on challenging journeys to realize their aspirations or explore opportunities as innovators and future entrepreneurs.",
  "Our community embraces and nurtures cultural diversity and multiculturalism with intention and care. We take pride in our diverse learning environment where all members work harmoniously, collaboratively, and respectfully to achieve common objectives and support individual needs.",
  "SAIS-Dubai maintains a distinguished record of success and achievement, widely acknowledged for preparing our students for careers that have yet to emerge. Our graduates consistently gain admission to leading colleges and universities both within the UAE and internationally.",
  "While we emphasize rigorous academic standards, we equally value nurturing the unique interests, talents, and capabilities of our students through specialized academic and enrichment programs. The depth of our curriculum, the commitment of our faculty, and the accomplishments of our students serve as compelling evidence of our standing among the premier American-curriculum private schools in Dubai. Through active parental involvement and strong community connections, SAIS-Dubai exemplifies holistic educational excellence.",
  "SAIS-Dubai offers a comprehensive education with student services centered on academic achievement, social development, and self-reliance. We actively encourage students to participate in school events, activities, and competitions, becoming engaged members of our broader school community.",
  "I extend a warm welcome to all visitors to our website who seek to learn more about our school community and services. We trust that the information provided will assist you in developing a comprehensive understanding of the quality educational experience we offer.",
  "Regards,",
  "Mohammed Sultan",
  "School Principal",
];

const asset = await client.assets.upload("image", fs.createReadStream(sourcePath), {
  filename: "principal-message-mohammed-sultan.jpg",
  title: "Mohammed Sultan, School Principal",
});

await client.createIfNotExists({
  _id: "about-page",
  _type: "aboutPage",
});

await client
  .patch("about-page")
  .set({
    principalMessage: {
      _type: "imageTextSection",
      heading: {
        _type: "sectionHeading",
        title: "A Message from Our Principal",
        description: paragraphs.map((paragraph, index) =>
          block(`principal-message-body-${index + 1}`, paragraph)
        ),
      },
      image: {
        _type: "imageWithAlt",
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        alt: "Mohammed Sultan, School Principal",
      },
      imagePosition: "right",
      theme: "blue",
      ctas: [],
    },
  })
  .commit();

console.log(`Updated about-page.principalMessage with ${asset._id}`);
