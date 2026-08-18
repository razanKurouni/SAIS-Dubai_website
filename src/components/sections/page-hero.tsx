import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import type { SanityImage } from "@/types/sanity";

type PageHeroProps = {
  title: string;
  image?: SanityImage;
  eyebrow?: string;
  titleId?: string;
  className?: string;
  imageSizes?: string;
  imagePosition?: string;
  imageWidth?: string;
  priority?: boolean;
  topLineColor?: string;
  panelColor?: string;
  waveColor?: string;
  textColor?: string;
  strokeWidth?: number;
};

type PageHeroStyle = CSSProperties & {
  "--page-hero-top-line-color"?: string;
  "--page-hero-panel-bg"?: string;
  "--page-hero-wave-color"?: string;
  "--page-hero-text-color"?: string;
  "--page-hero-image-position"?: string;
  "--page-hero-image-width"?: string;
};

export function PageHero({
  title,
  image,
  eyebrow,
  titleId,
  className = "",
  imageSizes = "(max-width: 920px) 100vw, 60vw",
  imagePosition = "center",
  imageWidth = "60%",
  priority = false,
  topLineColor = "#d97252",
  panelColor = "var(--sais-primary)",
  waveColor = "var(--sais-accent)",
  textColor = "#ffffff",
  strokeWidth = 88,
}: PageHeroProps) {
  const style: PageHeroStyle = {
    "--page-hero-top-line-color": topLineColor,
    "--page-hero-panel-bg": panelColor,
    "--page-hero-wave-color": waveColor,
    "--page-hero-text-color": textColor,
    "--page-hero-image-position": imagePosition,
    "--page-hero-image-width": imageWidth,
  };
  const imageAlt = image?.alt || image?.mobileAlt || title;
  const desktopImageProps = image?.url
    ? getImageProps({
        src: image.url,
        alt: imageAlt,
        fill: true,
        priority,
        sizes: imageSizes,
        className: "page-hero__image",
      }).props
    : null;
  const mobileImageProps = image?.mobileUrl
    ? getImageProps({
        src: image.mobileUrl,
        alt: imageAlt,
        fill: true,
        priority,
        sizes: "100vw",
        className: "page-hero__image",
      }).props
    : null;

  return (
    <section className={`page-hero ${className}`} aria-labelledby={titleId} style={style}>
      <div className="page-hero__media">
        {desktopImageProps ? (
          <picture>
            {mobileImageProps ? (
              <source
                media="(max-width: 920px)"
                srcSet={mobileImageProps.srcSet}
                sizes={mobileImageProps.sizes}
              />
            ) : null}
            <img {...desktopImageProps} alt={imageAlt} />
          </picture>
        ) : null}
      </div>

      <svg
        className="page-hero__panel-svg"
        viewBox="0 0 1647 928"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="page-hero__panel-shape"
          d="M0,0 H1460 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980 L0,928 Z"
        />
        <path
          className="page-hero__panel-wave"
          d="M1460,-50 C1375,80 1370,220 1430,340 L1525,530 C1605,690 1545,840 1445,980"
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>

      <div className="page-hero__copy">
        {eyebrow ? <p className="page-hero__eyebrow">{eyebrow}</p> : null}
        <h1 id={titleId} className="page-hero__title">
          {title}
        </h1>
      </div>

      <div className="page-hero__mobile-divider" aria-hidden="true">
        <svg className="page-hero__mobile-shape" viewBox="0 0 430 224.161" preserveAspectRatio="none">
          <g transform="translate(0 0)">
            <path
              className="page-hero__mobile-shape-panel"
              d="M0,0H186.508s-55.963,50.047-52.071,112.444c5.27,84.476,71.365,190.8,77.046,219.167C221.363,380.947,186.508,430,186.508,430H0Z"
              transform="translate(429.999 0) rotate(90)"
            />
            <path
              className="page-hero__mobile-shape-wave"
              d="M42.455,0H75.189C26.854,50.348,12.435,112.561,35.81,173.487c7.61,19.839,17.5,38.928,27.062,57.39,13.585,26.205,27.618,53.292,34.649,81.992,8.46,34.589,7.963,82.892-18.026,116.806H51.974C79.886,397.507,81.155,348.225,71.5,308.781c-7.505-30.692-22.027-58.709-36.068-85.806-9.351-18.046-19.019-36.708-26.292-55.647C-18.207,96.033,22.481,28.715,44.083,0"
              transform="translate(430 121.756) rotate(90)"
            />
          </g>
        </svg>
      </div>
    </section>
  );
}
