import Link from "next/link";
import type { CSSProperties } from "react";

export type InnerPageNavItem = {
  label: string;
  href: string;
  isActive?: boolean;
  openInNewTab?: boolean;
};

type InnerPageNavProps = {
  items: InnerPageNavItem[];
  activeHref?: string;
  activeLabel?: string;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  dividerColor?: string;
  topLineColor?: string;
  className?: string;
  ariaLabel?: string;
};

type InnerPageNavStyle = CSSProperties & {
  "--inner-page-nav-count"?: number;
  "--inner-page-nav-active-bg"?: string;
  "--inner-page-nav-inactive-bg"?: string;
  "--inner-page-nav-text-color"?: string;
  "--inner-page-nav-divider-color"?: string;
  "--inner-page-nav-top-line-color"?: string;
};

function isActiveItem(item: InnerPageNavItem, activeHref?: string, activeLabel?: string) {
  return Boolean(
    item.isActive ||
      (activeHref && item.href === activeHref) ||
      (activeLabel && item.label.trim().toLowerCase() === activeLabel.trim().toLowerCase()),
  );
}

export function InnerPageNav({
  items,
  activeHref,
  activeLabel,
  activeColor = "var(--sais-accent)",
  inactiveColor = "#707174",
  textColor = "#ffffff",
  dividerColor = "#ffffff",
  topLineColor = "#ffffff",
  className = "",
  ariaLabel = "Section navigation",
}: InnerPageNavProps) {
  if (!items.length) {
    return null;
  }

  const style: InnerPageNavStyle = {
    "--inner-page-nav-count": items.length,
    "--inner-page-nav-active-bg": activeColor,
    "--inner-page-nav-inactive-bg": inactiveColor,
    "--inner-page-nav-text-color": textColor,
    "--inner-page-nav-divider-color": dividerColor,
    "--inner-page-nav-top-line-color": topLineColor,
  };
  const activeItem = items.find((item) => isActiveItem(item, activeHref, activeLabel)) || items[0];

  return (
    <nav className={`inner-page-nav ${className}`.trim()} aria-label={ariaLabel} style={style}>
      <details className="inner-page-nav__dropdown">
        <summary className="inner-page-nav__dropdown-trigger">
          <span>{activeItem.label}</span>
        </summary>
        <ul className="inner-page-nav__dropdown-list">
          {items.filter((item) => !isActiveItem(item, activeHref, activeLabel)).map((item) => {
            const isActive = isActiveItem(item, activeHref, activeLabel);

            return (
              <li key={`mobile-${item.label}-${item.href}`} className="inner-page-nav__dropdown-item">
                <Link
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noreferrer" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={`inner-page-nav__dropdown-link ${
                    isActive ? "inner-page-nav__dropdown-link--active" : ""
                  }`.trim()}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </details>

      <ul className="inner-page-nav__list">
        {items.map((item) => {
          const isActive = isActiveItem(item, activeHref, activeLabel);

          return (
            <li
              key={`${item.label}-${item.href}`}
              className={`inner-page-nav__item ${isActive ? "inner-page-nav__item--active" : ""}`.trim()}
            >
              <Link
                href={item.href}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noreferrer" : undefined}
                aria-current={isActive ? "page" : undefined}
                className="inner-page-nav__link"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
