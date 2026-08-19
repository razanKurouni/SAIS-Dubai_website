import type { Metadata } from "next";
import { SitePageShell } from "@/components/layout/site-page-shell";
import { LegalDocument } from "@/components/sections/legal-document";
import { getHomepage } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Privacy Policy | SAIS Dubai",
  description: "How SAIS Dubai collects, uses, and protects personal information submitted through its website.",
};

const sections = [
  {
    title: "1. Who we are",
    paragraphs: [
      "Sharjah American International School – Dubai (SAIS Dubai) operates this website. This Privacy Policy explains how we handle personal information collected through the website and applies to visitors, parents, guardians, prospective families, applicants, and other people who interact with us online.",
    ],
  },
  {
    title: "2. Information we collect",
    paragraphs: ["Depending on how you use the website, we may collect:"],
    items: [
      "Contact information, such as name, surname, email address, telephone number, and postal address.",
      "Information submitted through admissions, school tour, employment, contact, or enquiry forms.",
      "Appointment preferences, messages, uploaded documents, and other information you choose to provide.",
      "Technical information such as IP address, browser type, device information, referring pages, timestamps, and website usage data.",
      "Cookie or similar technology data where those technologies are used.",
    ],
  },
  {
    title: "3. How we use personal information",
    items: [
      "To respond to enquiries and communicate with you.",
      "To arrange school tours, appointments, admissions steps, or requested services.",
      "To process applications and verify submitted information.",
      "To operate, secure, maintain, and improve the website and our services.",
      "To keep appropriate administrative and communication records.",
      "To comply with legal, regulatory, safeguarding, and reporting obligations.",
      "To send updates or marketing communications where you have consented or where otherwise permitted by law, with an option to unsubscribe.",
    ],
  },
  {
    title: "4. Legal basis and consent",
    paragraphs: [
      "We process personal information where you have provided consent, where processing is needed to respond to your request or take steps relating to a service or agreement, where required by law, or where another lawful basis applies. You may withdraw consent where processing relies on consent, subject to legal and operational requirements.",
    ],
  },
  {
    title: "5. Children’s and student information",
    paragraphs: [
      "Our website is primarily intended for parents, guardians, prospective families, students, and members of the School community. Parents and guardians should supervise children’s use of online forms. Please do not submit sensitive information about a child unless it is requested through an authorised School process and you have authority to provide it.",
      "Student records created through formal admissions or enrolment processes may also be governed by separate School notices, policies, consent forms, and regulatory requirements.",
    ],
  },
  {
    title: "6. Sharing personal information",
    paragraphs: ["We do not sell personal information. We may share it only when reasonably necessary with:"],
    items: [
      "Authorised School staff who require access for their duties.",
      "Service providers supporting website hosting, communications, forms, IT, security, analytics, or administration, subject to appropriate obligations.",
      "Regulators, education authorities, government bodies, law enforcement, courts, or professional advisers where required or permitted by law.",
      "Other parties where you have authorised the disclosure or where it is necessary to protect rights, safety, or security.",
    ],
  },
  {
    title: "7. International transfers",
    paragraphs: [
      "Some technology or service providers may process information outside the UAE. Where personal information is transferred internationally, we take reasonable steps to use appropriate safeguards and comply with applicable transfer requirements.",
    ],
  },
  {
    title: "8. Retention",
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, to meet operational needs, and to comply with legal, regulatory, safeguarding, accounting, or record-keeping requirements. Retention periods vary according to the type of information and the relevant School process.",
    ],
  },
  {
    title: "9. Security",
    paragraphs: [
      "We use reasonable administrative, technical, and organisational measures designed to protect personal information against unauthorised access, loss, misuse, alteration, or disclosure. No internet transmission or storage system can be guaranteed completely secure, so please use care when sending information online.",
    ],
  },
  {
    title: "10. Cookies and analytics",
    paragraphs: [
      "The website may use essential cookies and similar technologies needed for functionality and security. It may also use analytics or preference technologies to understand performance and improve user experience. Browser settings can be used to control cookies, although disabling essential cookies may affect website functions.",
    ],
  },
  {
    title: "11. Your rights",
    paragraphs: [
      "Subject to applicable UAE law and relevant exceptions, you may have rights to request information about processing, access your personal information, correct inaccurate or outdated information, request deletion, restrict or object to certain processing, obtain a copy or transfer of information where applicable, and withdraw consent.",
      "To make a request, contact us using the details below. We may need to verify your identity and authority before responding, particularly where a request concerns a child or student.",
    ],
  },
  {
    title: "12. External links",
    paragraphs: [
      "Our website may contain links to third-party websites. Their privacy practices are outside our control. We encourage you to review the privacy notice of each third-party website you visit.",
    ],
  },
  {
    title: "13. Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy to reflect changes to our website, practices, or legal obligations. The revised policy will be posted on this page with an updated date.",
    ],
  },
  {
    title: "14. Contact us",
    paragraphs: [
      "For privacy questions or requests, contact SAIS Dubai at sais_dubai@saisdubai.com, call +971 4 280 1111, or write to Sharjah American International School – Dubai Campus, P.O. Box 47755, Al Warqa 1, Dubai, UAE.",
    ],
  },
];

export default async function PrivacyPolicyPage() {
  const data = await getHomepage();

  return (
    <SitePageShell data={data} pageClassName="legal-page" mainClassName="site-page__main legal-page__main">
      <LegalDocument
        title="Privacy Policy"
        effectiveDate="19 August 2026"
        introduction="SAIS Dubai respects your privacy and is committed to handling personal information responsibly and in accordance with applicable UAE data protection requirements."
        sections={sections}
      />
    </SitePageShell>
  );
}
