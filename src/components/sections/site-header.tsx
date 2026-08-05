"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleUserRound, Instagram, Search, X, Youtube } from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { FacebookBrandIcon, LinkedinBrandIcon } from "@/components/ui/social-icons";
import { SaisWaveMark } from "@/components/ui/sais-wave-mark";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";
import type { Cta, HeaderSettings, LinkField } from "@/types/sanity";

type SiteHeaderProps = {
  brandHref?: string;
  settings?: HeaderSettings;
  links?: LinkField[];
  variant?: "home" | "solid";
};

const fallbackLinks: LinkField[] = [
  { label: "About", href: "/about-us#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Community", href: "#community" },
  { label: "Contact", href: "/contact-us" },
];

const fallbackHeader: Required<Pick<HeaderSettings, "bookTourButton" | "applyNowButton">> = {
  bookTourButton: { label: "Book a Tour", href: "#tour" },
  applyNowButton: { label: "Apply Now", href: "#apply", variant: "secondary" },
};

type MenuSection = {
  title: string;
  href?: string;
  items?: Array<{ label: string; href?: string }>;
};

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sais-dubai-174281177/", icon: LinkedinBrandIcon },
  { label: "Facebook", href: "https://www.facebook.com/SAISDubai/", icon: FacebookBrandIcon },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC9lzvD4QMlT9jmqbc3rRs0w", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/saisdubaicampus/", icon: Instagram },
];

type ExpandedSections = Record<string, boolean>;

function createInitialExpandedSections(): ExpandedSections {
  return {};
}

export function SiteHeader({
  brandHref = "#home",
  settings,
  links = [],
  variant = "home",
}: SiteHeaderProps) {
  const isSolid = variant === "solid";
  const isScrolled = useScrollThreshold(18);
  const isScrolledStyleActive = !isSolid && isScrolled;
  const pathname = usePathname();
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>(createInitialExpandedSections);
  const navLinks = useMemo(() => (links.length > 0 ? links : fallbackLinks), [links]);
  const logo = settings?.logo;
  const scrolledLogo = settings?.scrolledLogo;
  const shouldUseScrolledLogo = !isSolid && (isScrolled || isMobileViewport);
  const fallbackSolidLogo = {
    url: "/sais-logo-lockup-solid.png",
    alt: "Sharjah American International School Dubai",
  };
  const activeLogo =
    isSolid
      ? scrolledLogo?.url
        ? scrolledLogo
        : fallbackSolidLogo
      : shouldUseScrolledLogo
      ? scrolledLogo?.url
        ? scrolledLogo
        : fallbackSolidLogo
      : logo;
  const menuIcon = settings?.menuIcon;
  const bookTourButton = settings?.bookTourButton || fallbackHeader.bookTourButton;
  const applyNowButton = settings?.applyNowButton || fallbackHeader.applyNowButton;
  const baseMenuSections = useMemo(() => buildMenuSections(navLinks), [navLinks]);
  const menuSections = useMemo(
    () => filterMenuSections(baseMenuSections, searchQuery),
    [baseMenuSections, searchQuery],
  );
  const hasSearchQuery = searchQuery.trim().length > 0;
  useBodyScrollLock(isMenuOpen);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateMobileViewport();
    mediaQuery.addEventListener("change", updateMobileViewport);

    return () => mediaQuery.removeEventListener("change", updateMobileViewport);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setSearchQuery("");
    setExpandedSections(createInitialExpandedSections());
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => {
      const next = !current;

      if (!next) {
        setSearchQuery("");
        setExpandedSections(createInitialExpandedSections());
      }

      return next;
    });
  };

  const toggleExpandedSection = (sectionTitle: string) => {
    setExpandedSections((current) => ({
      ...current,
      [sectionTitle]: !current[sectionTitle],
    }));
  };

  return (
    <header className={`site-header site-header--${variant} ${isScrolledStyleActive ? "is-scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link
          href={brandHref}
          className="site-header__brand"
          aria-label="Sharjah American International School Dubai home"
        >
          <Image
            src={activeLogo?.url || "/sais-logo-lockup.png"}
            alt={activeLogo?.alt || "Sharjah American International School Dubai"}
            width={481}
            height={109}
            priority
            className="site-header__logo"
          />
        </Link>

        <nav className="site-header__nav" aria-label="Primary navigation">
          <HeaderAction cta={bookTourButton} fallbackLabel="Book a Tour" fallbackHref="#tour" />
          <HeaderAction cta={applyNowButton} fallbackLabel="Apply Now" fallbackHref="#apply" />
          <IconLink href="#portal" label="Parent portal" />
          <MenuButton icon={menuIcon} isOpen={isMenuOpen} onClick={toggleMenu} />
        </nav>

        <div className="site-header__mobile-actions">
          <MenuButton icon={menuIcon} isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </div>

      <div
        className={`sais-menu-panel ${isMenuOpen ? "is-open" : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="sais-menu-panel__scrim"
          onClick={closeMenu}
        />

        <aside className="sais-menu-drawer">
          <div className="sais-menu-drawer__inner">
            <div className="sais-menu-drawer__top">
              <div className="sais-menu-drawer__actions">
                <HeaderAction cta={bookTourButton} fallbackLabel="Book a Tour" fallbackHref="#tour" />
                <HeaderAction cta={applyNowButton} fallbackLabel="Apply Now" fallbackHref="#apply" />

                <IconLink href="#portal" label="Parent portal" />
                <MenuButton
                  icon={menuIcon}
                  isOpen={isMenuOpen}
                  onClick={closeMenu}
                />
              </div>

              <form
                className="sais-menu-search"
                aria-label="Search site"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <span className="sr-only">Search</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search"
                />
                <button type="submit" className="sais-menu-search__icon" aria-label="Search menu">
                  <Search size={20} strokeWidth={2.2} />
                </button>
              </form>
            </div>

            <div className="sais-menu-drawer__sections">
              {menuSections.map((section, sectionIndex) => {
                const sectionIsExpanded =
                  hasSearchQuery || (expandedSections[section.title] ?? false);
                const sectionStyle = {
                  "--sais-menu-section-delay": `${60 + sectionIndex * 50}ms`,
                } as CSSProperties;

                return (
                  <div
                    key={section.title}
                    className="sais-menu-section"
                    style={sectionStyle}
                  >
                    {section.items?.length ? (
                      <button
                        type="button"
                        className="sais-menu-section__head sais-menu-section__head--button"
                        onClick={() => !hasSearchQuery && toggleExpandedSection(section.title)}
                        aria-expanded={sectionIsExpanded}
                      >
                        <span className="sais-menu-section__title">{section.title}</span>
                        <span
                          className={`sais-menu-section__toggle ${
                            sectionIsExpanded ? "is-open" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <DrawerWaveAccent />
                        </span>
                      </button>
                    ) : (
                      <div className="sais-menu-section__head">
                        <Link
                          href={section.href || "#"}
                          className="sais-menu-section__title"
                          onClick={closeMenu}
                        >
                          {section.title}
                        </Link>
                      </div>
                    )}

                    {section.items?.length ? (
                      <div
                        className={`sais-menu-section__items ${
                          sectionIsExpanded ? "is-open" : ""
                        }`}
                        aria-hidden={!sectionIsExpanded}
                      >
                        <div className="sais-menu-section__items-inner">
                          {section.items.map((item) => (
                            <Link
                              key={`${section.title}-${item.label}`}
                              href={item.href || "#"}
                              className={`sais-menu-subitem${pathname === item.href ? " is-active" : ""}`}
                              aria-current={pathname === item.href ? "page" : undefined}
                              onClick={closeMenu}
                            >
                              <MenuSubitemAccent />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="sais-menu-drawer__footer">
              <div className="sais-menu-drawer__socials">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="sais-menu-social"
                  >
                    <Icon size={20} strokeWidth={2.15} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

function buildMenuSections(links: LinkField[]): MenuSection[] {
  const mapHref = (label: string, fallback: string) => {
    const href = links.find((link) => link.label.trim().toLowerCase() === label.trim().toLowerCase())?.href;

    if (label === "About" && (!href || href === "#about")) {
      return "/about-us#about";
    }

    if (label === "Academics" && (!href || href === "#academics")) {
      return "/academics";
    }

    if (label === "Contact" && (!href || href === "#contact")) {
      return "/contact-us";
    }

    if (label === "Community" && (!href || href === "#community")) {
      return "/our-community";
    }

    return href || fallback;
  };

  return [
    {
      title: "About",
      href: mapHref("About", "/about-us#about"),
      items: [
        { label: "About", href: "/about-us#about" },
        { label: "Our Team", href: "/about-us/our-team" },
      ],
    },
    {
      title: "Academics",
      href: mapHref("Academics", "/academics"),
      items: [
        { label: "Overview", href: "/academics" },
        { label: "Kindergarten", href: "/academics/kindergarten" },
        { label: "Elementary", href: "/academics/elementary" },
        { label: "Middle School", href: "/academics/middle-school" },
        { label: "High School", href: "/academics/high-school" },
      ],
    },
    {
      title: "Our Community",
      href: mapHref("Community", "/our-community"),
      items: [
        { label: "Our Community", href: "/our-community" },
        { label: "Our Campus", href: "/our-campus" },
        { label: "Student & Staff Wellbeing", href: "/student-staff-wellbeing" },
        { label: "Student Inclusion", href: "/student-inclusion" },
        { label: "Parent Involvement", href: "/parent-involvement" },
        { label: "School Calendar", href: "/school-calendar" },
        { label: "School Policies", href: "/school-policies" },
        { label: "Health & Safety", href: "/health-safety" },
        { label: "Food Services & Nutrition", href: "/food-services-nutrition" },
        { label: "Medical Services", href: "/our-community#medical-services" },
        { label: "School Supplies & Uniform", href: "/our-community#school-supplies-uniform" },
        { label: "Transportation Safety Guidelines", href: "/our-community#transportation-safety-guidelines" },
      ],
    },
    {
      title: "Student Life",
      href: "#student-life",
      items: [
        { label: "Student Programs", href: "#student-programs" },
        { label: "ECA’s", href: "#ecas" },
      ],
    },
    { title: "News & Events", href: "#news" },
    { title: "Contact Us", href: mapHref("Contact", "/contact-us") },
    { title: "Careers", href: "/careers" },
  ];
}

function filterMenuSections(sections: MenuSection[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return sections;
  }

  return sections
    .map((section) => {
      const sectionMatch = section.title.toLowerCase().includes(normalizedQuery);
      const matchingItems = section.items?.filter((item) => item.label.toLowerCase().includes(normalizedQuery));

      if (sectionMatch) {
        return section;
      }

      if (matchingItems?.length) {
        return { ...section, items: matchingItems };
      }

      return null;
    })
    .filter((section): section is MenuSection => section !== null);
}

function DrawerWaveAccent() {
  return (
    <svg viewBox="0 0 27.941 7.626" aria-hidden="true">
      <g transform="translate(0 7.626) rotate(-90)">
        <path
          d="M-30.9-174.393h-2.99c3.143-3.274 4.081-7.32 2.561-11.282a37.064 37.064 0 0 0-1.76-3.732 24.589 24.589 0 0 1-2.253-5.332c-.55-2.249-.518-5.39 1.172-7.6h2.757c-1.815 2.092-1.9 5.3-1.27 7.862a25.4 25.4 0 0 0 2.345 5.58 36.368 36.368 0 0 1 1.71 3.619c1.778 4.636-.868 9.014-2.272 10.881"
          transform="translate(35.656 202.334)"
          fill="#d97252"
        />
      </g>
    </svg>
  );
}

function MenuSubitemAccent() {
  return (
    <svg viewBox="0 0 25.679 7.009" aria-hidden="true">
      <g transform="translate(0 7.009) rotate(-90)">
        <path
          d="M-31.282-176.655h-2.748a9.529 9.529 0 0 0 2.353-10.368 34.061 34.061 0 0 0-1.617-3.43 22.6 22.6 0 0 1-2.071-4.9c-.506-2.067-.476-4.954 1.077-6.981h2.534c-1.668 1.922-1.744 4.868-1.167 7.225a23.347 23.347 0 0 0 2.156 5.128 33.424 33.424 0 0 1 1.571 3.326c1.634 4.261-.8 8.284-2.088 10"
          transform="translate(35.656 202.334)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function HeaderAction({
  cta,
  fallbackLabel,
  fallbackHref,
  fill = false,
}: {
  cta?: Cta;
  fallbackLabel: string;
  fallbackHref: string;
  fill?: boolean;
}) {
  const href = cta?.href || fallbackHref;
  const label = cta?.label || fallbackLabel;
  const tone = getActionTone(cta?.variant);
  const newTabProps = cta?.openInNewTab
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Link
      href={href}
      {...newTabProps}
      className={`header-action header-action--${tone} ${
        fill ? "is-fill" : ""
      }`}
    >
      <span>{label}</span>
      <span className="header-action__icon">
        <ArrowRight size={17} strokeWidth={3} />
      </span>
    </Link>
  );
}

function getActionTone(variant?: Cta["variant"]) {
  if (variant === "secondary") {
    return "teal";
  }

  if (variant === "ghost") {
    return "orange";
  }

  return "blue";
}

function IconLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="header-icon-link"
    >
      <CircleUserRound size={24} strokeWidth={2.55} />
    </Link>
  );
}

function MenuButton({
  icon,
  isOpen,
  onClick,
}: {
  icon?: HeaderSettings["menuIcon"];
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={`sais-menu-button ${isOpen ? "is-open" : ""}`}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      {icon?.url ? (
        <Image
          src={icon.url}
          alt=""
          width={42}
          height={46}
          className="sais-menu-button__image-icon"
        />
      ) : (
        <SaisWaveMark active={isOpen} />
      )}
      <X className="sais-menu-button__close" size={25} strokeWidth={2.4} />
    </button>
  );
}
