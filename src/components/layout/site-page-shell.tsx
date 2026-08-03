import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import type { Cta, HeaderSettings, HomepageData, LinkField } from "@/types/sanity";
import type { ReactNode } from "react";

type SitePageShellProps = {
  children: ReactNode;
  data?: HomepageData;
  mainClassName?: string;
  pageClassName?: string;
};

function toHomeAnchor(href?: string) {
  if (!href) {
    return "#";
  }

  return href.startsWith("#") ? `/${href}` : href;
}

function normalizeInnerNavigation(links?: LinkField[]) {
  return links?.map((link) => {
    const label = link.label.trim().toLowerCase();

    if (label.includes("about")) {
      return { ...link, href: "/about-us#about" };
    }

    if (label.includes("academic")) {
      return { ...link, href: "/academics" };
    }

    if (label.includes("contact")) {
      return { ...link, href: "/contact-us" };
    }

    if (label.includes("career")) {
      return { ...link, href: "/careers" };
    }

    if (label.includes("community")) {
      return { ...link, href: "/our-community" };
    }

    return { ...link, href: toHomeAnchor(link.href) };
  });
}

function normalizeInnerCta(cta: Cta | undefined, fallback: Cta): Cta {
  return {
    ...fallback,
    ...cta,
    href: toHomeAnchor(cta?.href || fallback.href),
  };
}

function normalizeHeaderSettings(settings?: HeaderSettings): HeaderSettings {
  return {
    ...settings,
    bookTourButton: normalizeInnerCta(settings?.bookTourButton, {
      label: "Book a Tour",
      href: "/#tour",
    }),
    applyNowButton: normalizeInnerCta(settings?.applyNowButton, {
      label: "Apply Now",
      href: "/#apply",
      variant: "secondary",
    }),
  };
}

export function SitePageShell({
  children,
  data,
  mainClassName = "site-page__main",
  pageClassName = "",
}: SitePageShellProps) {
  const headerSettings = normalizeHeaderSettings(data?.header);
  const navigation = normalizeInnerNavigation(data?.navigation);

  return (
    <div className={`site-page site-page--inner ${pageClassName}`.trim()}>
      <SiteHeader
        brandHref="/"
        settings={headerSettings}
        links={navigation}
        variant="solid"
      />

      <main className={mainClassName}>
        {children}
      </main>

      <SiteFooter footer={data?.footer} />
    </div>
  );
}
