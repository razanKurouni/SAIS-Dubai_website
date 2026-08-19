import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { LegalDocument } from "@/components/sections/legal-document";
import { getHomepage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Terms & Conditions | SAIS Dubai",
  description: "Terms and conditions governing use of the SAIS Dubai website.",
};

const sections = [
  {
    title: "1. Acceptance of these terms",
    paragraphs: [
      "By accessing or using this website, you agree to these Terms & Conditions. If you do not agree, please do not use the website. These terms apply to website use only and do not replace any enrolment contract, school policy, fee schedule, consent form, or other agreement issued by Sharjah American International School – Dubai (SAIS Dubai).",
    ],
  },
  {
    title: "2. Website information",
    paragraphs: [
      "The website provides general information about SAIS Dubai, including its programmes, admissions, fees, activities, news, facilities, and services. We take reasonable care to keep information accurate and current, but content may change and should not be treated as a binding offer or guarantee.",
      "For decisions relating to admissions, fees, calendars, policies, transportation, or student services, please confirm the latest information directly with the School.",
    ],
  },
  {
    title: "3. Permitted use",
    paragraphs: ["You may use this website for lawful, personal, and informational purposes."],
    items: [
      "Do not misuse, disrupt, damage, or attempt to gain unauthorised access to the website, its servers, or connected systems.",
      "Do not introduce malware, automated scraping, or other harmful technology.",
      "Do not use website content in a misleading, defamatory, unlawful, or commercially exploitative manner.",
      "Do not impersonate another person or submit false or unauthorised information through website forms.",
    ],
  },
  {
    title: "4. Intellectual property",
    paragraphs: [
      "Unless otherwise stated, the website design, text, photographs, videos, graphics, logos, documents, and other materials are owned by or licensed to SAIS Dubai and are protected by applicable intellectual property laws.",
      "You may view and print reasonable extracts for personal, non-commercial use. Reproduction, modification, distribution, publication, or commercial use requires prior written permission from the School and any relevant rights holder.",
    ],
  },
  {
    title: "5. Forms, applications, and enquiries",
    paragraphs: [
      "Submitting an enquiry, tour request, application, or other form does not guarantee admission, an appointment, placement, employment, or any other outcome. Submissions are subject to review, availability, verification, and the School’s applicable procedures and policies.",
      "You are responsible for ensuring that information you provide is accurate, complete, current, and submitted with the necessary authority or consent.",
    ],
  },
  {
    title: "6. Fees and payments",
    paragraphs: [
      "Any fee information displayed on the website is provided for general guidance and may be updated in accordance with applicable approvals, regulations, and School policies. The official fee schedule, payment plan, and enrolment documents issued by SAIS Dubai will prevail if there is any inconsistency.",
    ],
  },
  {
    title: "7. Third-party websites and services",
    paragraphs: [
      "The website may link to third-party websites or services. These links are provided for convenience and do not imply endorsement. SAIS Dubai does not control and is not responsible for third-party content, availability, security, or privacy practices. Please review the terms and privacy notices of those services.",
    ],
  },
  {
    title: "8. Website availability and security",
    paragraphs: [
      "We aim to keep the website available and secure but cannot guarantee uninterrupted, error-free, or virus-free operation. Access may be suspended or changed for maintenance, security, operational, or other reasons without prior notice.",
    ],
  },
  {
    title: "9. Disclaimer and limitation of liability",
    paragraphs: [
      "To the extent permitted by applicable law, the website and its content are provided on an “as available” basis. SAIS Dubai excludes warranties that are not expressly stated and will not be liable for indirect, incidental, or consequential loss arising solely from use of, or inability to use, the website.",
      "Nothing in these terms excludes or limits liability where exclusion or limitation is prohibited by law.",
    ],
  },
  {
    title: "10. Privacy",
    paragraphs: [
      "Personal information submitted through the website is handled in accordance with our Privacy Policy. Please read that policy before submitting personal information.",
    ],
  },
  {
    title: "11. Changes to these terms",
    paragraphs: [
      "We may update these Terms & Conditions when our website, services, or legal obligations change. The updated version will be posted on this page with a revised date. Continued use of the website after an update constitutes acceptance of the revised terms.",
    ],
  },
  {
    title: "12. Governing law and jurisdiction",
    paragraphs: [
      "These Terms & Conditions are governed by the laws applicable in the United Arab Emirates and the Emirate of Dubai. The courts of Dubai will have jurisdiction, subject to any mandatory legal requirements that apply.",
    ],
  },
  {
    title: "13. Contact us",
    paragraphs: [
      "For questions about these terms, contact SAIS Dubai at sais_dubai@saisdubai.com or +971 4 280 1111.",
    ],
  },
];

export default async function TermsAndConditionsPage() {
  const data = await getHomepage();

  return (
    <SitePageShell data={data} pageClassName="legal-page" mainClassName="site-page__main legal-page__main">
      <LegalDocument
        title="Terms & Conditions"
        effectiveDate="19 August 2026"
        introduction="These Terms & Conditions explain the rules that apply when you visit or use the SAIS Dubai website."
        sections={sections}
      />
    </SitePageShell>
  );
}
