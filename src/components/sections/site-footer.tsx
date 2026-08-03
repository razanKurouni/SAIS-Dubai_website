import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { FacebookBrandIcon, LinkedinBrandIcon } from "@/components/ui/social-icons";
import type { FooterColumn, LinkField, SiteFooter as SiteFooterData } from "@/types/sanity";

type SiteFooterProps = {
  footer?: SiteFooterData;
};

const defaultColumns: FooterColumn[] = [
  {
    links: [
      { label: "About", href: "/about-us#about" },
      { label: "Academics", href: "/academics" },
      { label: "Our Community", href: "/our-community" },
      { label: "Student Life", href: "#student-life" },
    ],
  },
  {
    links: [
      { label: "Campus Tours", href: "#tour" },
      { label: "Admissions Process", href: "#admissions" },
      { label: "FAQ’s", href: "#faq" },
      { label: "Fees", href: "#fees" },
    ],
  },
  {
    links: [
      { label: "News & Events", href: "#news" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

const defaultSocialLinks: LinkField[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sais-dubai-174281177/", openInNewTab: true },
  { label: "Facebook", href: "https://www.facebook.com/SAISDubai/", openInNewTab: true },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC9lzvD4QMlT9jmqbc3rRs0w", openInNewTab: true },
  { label: "Instagram", href: "https://www.instagram.com/saisdubaicampus/", openInNewTab: true },
];

const defaultLegalLinks: LinkField[] = [
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const contactItems = [
  {
    icon: MapPin,
    label: "Address",
    text: "Sharjah American\nInternational School Dubai Campus\nP.O. Box 47755 , Al Warqa 1,\nDubai, UAE.",
    href: "#location",
  },
  {
    icon: Phone,
    label: "Phone",
    text: "+971 4 280 1111",
    href: "tel:+97142801111",
  },
  {
    icon: Mail,
    label: "Email",
    text: "sais_dubai@saisdubai.com",
    href: "mailto:sais_dubai@saisdubai.com",
  },
];

const socialIcons = [LinkedinBrandIcon, FacebookBrandIcon, Youtube, Instagram];

function findSocialLink(links: LinkField[], label: string, fallback: LinkField) {
  return links.find((link) => link.label?.toLowerCase().includes(label.toLowerCase())) || fallback;
}

function normalizeFooterHref(link: LinkField) {
  if (link.label?.trim().toLowerCase().includes("about")) {
    return "/about-us#about";
  }

  if (link.label?.trim().toLowerCase().includes("contact")) {
    return "/contact-us";
  }

  if (link.label?.trim().toLowerCase().includes("career")) {
    return "/careers";
  }

  if (link.label?.trim().toLowerCase().includes("academic")) {
    return "/academics";
  }

  if (link.label?.trim().toLowerCase().includes("community")) {
    return "/our-community";
  }

  return link.href || "#";
}

function isHighlightedFooterLink(label?: string) {
  const normalizedLabel = label?.trim().toLowerCase();

  return ["campus tours", "admissions process", "faq’s", "faq's", "fees"].includes(normalizedLabel || "");
}

function FooterLink({ link }: { link: LinkField }) {
  return (
    <Link
      href={normalizeFooterHref(link)}
      target={link.openInNewTab ? "_blank" : undefined}
      rel={link.openInNewTab ? "noreferrer" : undefined}
      className={`site-footer__link ${isHighlightedFooterLink(link.label) ? "site-footer__link--blue" : ""}`.trim()}
    >
      {link.label}
    </Link>
  );
}

export function SiteFooter({ footer }: SiteFooterProps) {
  const columns = footer?.columns?.some((column) => column.links?.length) ? footer.columns : defaultColumns;
  const socialLinks = footer?.socialLinks?.length ? footer.socialLinks : defaultSocialLinks;
  const legalLinks = footer?.legalLinks?.length ? footer.legalLinks : defaultLegalLinks;

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <svg className="site-footer__shape" viewBox="0 0 760 436" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 0H674C635 38 633 103 660 160L704 249C740 324 713 394 667 461L0 436Z"
            fill="var(--sais-primary)"
          />
          <path
            d="M674 -24C635 38 633 103 660 160L704 249C740 324 713 394 667 461"
            fill="none"
            stroke="var(--sais-accent)"
            strokeLinecap="round"
            strokeWidth="44"
          />
        </svg>

        <div className="site-footer__content">
          <div className="site-footer__brand-area">
            <Image
              src="/sais-footer-logo-lockup.png"
              alt="Sharjah American International School Dubai"
              width={390}
              height={88}
              className="site-footer__logo"
            />

            <address className="site-footer__contact">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a key={item.label} href={item.href} className="site-footer__contact-item">
                    <span className="site-footer__contact-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <span>{item.text}</span>
                  </a>
                );
              })}
            </address>

            <svg className="site-footer__curve-mask" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 70 C240 112 468 112 720 70 C980 28 1196 28 1440 70 V140 H0 Z" />
            </svg>
            <svg className="site-footer__wave" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 70 C240 112 468 112 720 70 C980 28 1196 28 1440 70" />
            </svg>
          </div>

          <div className="site-footer__right">
            <div className="site-footer__social" aria-label="Social media links">
              {socialIcons.map((Icon, index) => {
                const link = findSocialLink(socialLinks, defaultSocialLinks[index].label, defaultSocialLinks[index]);

                return (
                  <a
                    key={link.label}
                    href={link.href || "#"}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noreferrer" : undefined}
                    aria-label={link.label}
                    className="site-footer__social-link"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>

            <nav className="site-footer__nav" aria-label="Footer navigation">
              {columns.slice(0, 3).map((column, columnIndex) => (
                <div key={column.title || `footer-column-${columnIndex}`} className="site-footer__column">
                  {(column.links || []).map((link) => (
                    <FooterLink key={`${link.label}-${link.href}`} link={link} />
                  ))}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p>© 2026 Sharjah American International School Dubai Campus</p>

          <nav className="site-footer__legal" aria-label="Legal links">
            {legalLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href || "#"}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <p className="site-footer__credit">
            Site by{" "}
            <a href="https://www.formulatecreative.com/" target="_blank" rel="noreferrer">
              Formulate
            </a>
          </p>
          </nav>

          
        </div>
      </div>
    </footer>
  );
}
