"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import type { LogoItem, SanityImage } from "@/types/sanity";

type AccreditationsLogoRailProps = {
  logos?: LogoItem[];
};

type LogoBox = { area: number; maxWidth: number; maxHeight: number };

/*
 * Logos come in every shape and at every pixel size, so each one is drawn in a
 * box of about the same area for its own proportions instead of at whatever
 * size its file happens to be: a square badge and a long wordmark then read as
 * one set. The area is the set's average before, so the rail keeps its scale,
 * and the boxes stay inside the rail's limits, 170 × 94, and 136 × 82 on
 * phones.
 */
const DESKTOP_BOX: LogoBox = { area: 104 * 104, maxWidth: 170, maxHeight: 94 };
const PHONE_BOX: LogoBox = { area: 91 * 91, maxWidth: 136, maxHeight: 82 };

/*
 * The narrowest logo the browser is told about. Sanity's smallest copies of a
 * logo (256px wide and under) can carry faint grey smudges from compression
 * around the letters, which showed above the College Board wordmark; from
 * 384px up they are clean. A logo narrower than this is still drawn at its
 * own size, it is only read from a sharper copy.
 */
const MIN_SOURCE_WIDTH = 260;

/*
 * How far below (or above) the screen the rail is when its logos start to load.
 * The browser's own lazy loading only looks at where each logo is on the page,
 * and it does not notice a logo that reaches the screen by riding the moving
 * track, so that logo stayed blank until a hover stopped the track. The rail
 * itself does not move sideways, so it is the rail that is watched: once it
 * comes this close, every logo in it loads. Until then none of them is
 * requested, and none of them is preloaded with the page.
 */
const LOAD_MARGIN = "600px 0px";

/* Width over height, from the asset's dimensions or the `-<W>x<H>.<ext>` end of its Sanity URL. */
function aspectRatio(image: SanityImage): number {
  if (image.width && image.height) {
    return image.width / image.height;
  }

  const match = image.url?.split("?")[0].match(/-(\d+)x(\d+)\.[a-z0-9]+$/i);
  return match ? Number(match[1]) / Number(match[2]) : 2;
}

function fitLogo(ratio: number, box: LogoBox) {
  let width = Math.sqrt(box.area * ratio);
  let height = width / ratio;

  if (width > box.maxWidth) {
    width = box.maxWidth;
    height = width / ratio;
  }

  if (height > box.maxHeight) {
    height = box.maxHeight;
    width = height * ratio;
  }

  return { width: Math.round(width), height: Math.round(height) };
}

export function AccreditationsLogoRail({ logos = [] }: AccreditationsLogoRailProps) {
  const { ref, isInViewport: isNear } = useInViewport<HTMLDivElement>({
    rootMargin: LOAD_MARGIN,
    threshold: 0,
  });
  const shouldSlide = logos.length > 0;
  const logoGroups = shouldSlide ? [0, 1] : [0];
  const railStyle = {
    "--accreditations-scroll-duration": `${Math.max(18, logos.length * 4.2)}s`,
  } as CSSProperties;

  if (logos.length === 0) {
    return null;
  }

  /* Each logo's box is fixed before its file loads, so the copy group is
     always exactly as wide as the first and the loop wraps without a jump. */
  const sizedLogos = logos.map((logo) => {
    const image = logo.image;
    const src = image?.url;

    if (!image || !src) {
      return { logo };
    }

    const ratio = aspectRatio(image);
    const desktop = fitLogo(ratio, DESKTOP_BOX);
    const phone = fitLogo(ratio, PHONE_BOX);

    return {
      logo,
      src,
      alt: image.alt,
      desktop,
      sizes: `(max-width: 767px) ${Math.max(phone.width, MIN_SOURCE_WIDTH)}px, ${Math.max(desktop.width, MIN_SOURCE_WIDTH)}px`,
      style: {
        /* The rounded box's own proportions, not the file's: the drawn height
           then equals the height attribute exactly, as the width does.
           object-fit: contain takes up the sub-pixel difference. */
        "--accreditations-logo-ratio": `${desktop.width} / ${desktop.height}`,
        "--accreditations-logo-width": `${desktop.width}px`,
        "--accreditations-logo-width-sm": `${phone.width}px`,
      } as CSSProperties,
    };
  });

  return (
    <div ref={ref} className={`accreditations-rail ${shouldSlide ? "is-slider" : ""}`}>
      <div
        className="accreditations-rail__track"
        style={railStyle}
      >
        {logoGroups.map((groupIndex) => (
          <div className="accreditations-rail__group" key={`accreditations-group-${groupIndex}`}>
            {sizedLogos.map(({ logo, src, alt, desktop, sizes, style }, index) => (
              <div
                className="accreditations-rail__item"
                key={`${logo.name}-${groupIndex}-${index}`}
                aria-hidden={groupIndex > 0}
                style={style}
              >
                {src && desktop ? (
                  /* Lazy in the page's HTML, eager once the rail is near the
                     screen (see LOAD_MARGIN). The copy group reuses the same
                     files, so it costs no extra downloads. */
                  <Image
                    src={src}
                    alt={groupIndex > 0 ? "" : alt || logo.name}
                    width={desktop.width}
                    height={desktop.height}
                    loading={isNear ? "eager" : "lazy"}
                    className="accreditations-rail__image"
                    sizes={sizes}
                  />
                ) : (
                  <span className="accreditations-rail__fallback">{logo.name}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
