import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2023-01-01" });

await client
  .patch("admissions-book-tour-page")
  .set({
    "formSection.recipientEmail": "razan@formulatecreative.com",
    "formSection.errorMessage": "Sorry, your request could not be sent. Please try again.",
  })
  .commit();

console.log("Updated the Book a Tour form recipient email.");
