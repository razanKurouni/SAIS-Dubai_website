"use client";

import { useEffect } from "react";

const PARAM = "find";
const MAX_SLIDER_STEPS = 12;
const SLIDE_SETTLE_MS = 450;
const RETRY_DELAYS_MS = [900, 2000];

function normalize(text: string | null | undefined) {
  return (text ?? "").replace(/\s+/g, " ").trim().toLowerCase();
}

/** The text is the title, starts with it, or ends with it after a label ("Pillar 3: Growth"). */
function namesTarget(text: string, target: string) {
  return text === target || text.startsWith(target) || text.endsWith(` ${target}`);
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Headings plus the card, table and list titles that sections use; only visible
 * ones. A loose match (the title appears inside a longer text) is only used once
 * the sliders have been tried, so a slide titled "Growth" wins over a paragraph
 * that mentions growth.
 */
function findTarget(target: string, loose = false) {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main :is(h1, h2, h3, h4, h5, strong, p, th, td, li, [class*='title'], [class*='name'])",
    ),
  ).filter((el) => el.getClientRects().length > 0);
  return (
    candidates.find((el) => normalize(el.textContent) === target) ||
    candidates.find((el) => namesTarget(normalize(el.textContent), target)) ||
    (loose ? candidates.find((el) => normalize(el.textContent).includes(target)) : undefined)
  );
}

function isInViewHorizontally(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.right > 0 && rect.left < window.innerWidth;
}

/** Height of the fixed header and any sticky bars, so the item is not hidden under them. */
function headerOffset() {
  let offset = 0;
  for (const el of document.querySelectorAll<HTMLElement>("header, nav, [class*='sticky' i]")) {
    const style = window.getComputedStyle(el);
    const { height } = el.getBoundingClientRect();
    if ((style.position === "fixed" || style.position === "sticky") && height > 0 && height < 260 && style.visibility !== "hidden") {
      offset += height;
    }
  }
  return Math.min(Math.max(offset + 16, 90), 320);
}

/**
 * When the page opens from a search result (#find=<section title>), scroll to
 * the heading or item that carries that title and flash it, so the visitor
 * lands on it rather than the top of the page. Items inside a slider are
 * brought into view by stepping the slider forward.
 */
export function SearchJump() {
  useEffect(() => {
    let cancelled = false;

    const jump = async (attempt = 0) => {
      const hash = window.location.hash;
      if (!hash.startsWith(`#${PARAM}=`)) return;
      let target = "";
      try {
        target = normalize(decodeURIComponent(hash.slice(PARAM.length + 2)));
      } catch {
        return;
      }
      if (!target) return;

      let match = findTarget(target);

      // Slider dots named after their slide ("Show <title>"): open that slide directly.
      if (!match) {
        const dot = Array.from(document.querySelectorAll<HTMLButtonElement>("main button[aria-label^='Show ']")).find(
          (button) => namesTarget(normalize(button.getAttribute("aria-label")?.slice(5)), target),
        );
        if (dot) {
          dot.click();
          await wait(SLIDE_SETTLE_MS);
          match = findTarget(target);
        }
      }

      // Sliders that only render the active slide: step each one until the item appears.
      if (!match) {
        for (const button of document.querySelectorAll<HTMLButtonElement>("main button[aria-label^='Next']")) {
          for (let step = 0; step < MAX_SLIDER_STEPS && !match && !cancelled; step += 1) {
            button.click();
            await wait(SLIDE_SETTLE_MS);
            match = findTarget(target);
          }
          if (match || cancelled) break;
        }
      }
      // Slider controls may not respond until their script has loaded: try again shortly.
      if (!match && attempt < RETRY_DELAYS_MS.length) {
        if (!cancelled) timer = window.setTimeout(() => void jump(attempt + 1), RETRY_DELAYS_MS[attempt]);
        return;
      }
      if (!match) match = findTarget(target, true);
      if (!match || cancelled) return;

      // Sliders that render every slide but move them sideways: step until it is on screen.
      const next = match.closest("section")?.querySelector<HTMLButtonElement>("button[aria-label^='Next']");
      for (let step = 0; next && step < MAX_SLIDER_STEPS && !isInViewHorizontally(match) && !cancelled; step += 1) {
        next.click();
        await wait(SLIDE_SETTLE_MS);
      }
      if (cancelled) return;

      const top = match.getBoundingClientRect().top + window.scrollY - headerOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      match.classList.add("sais-search-target");
      const flashed = match;
      window.setTimeout(() => flashed.classList.remove("sais-search-target"), 2600);
    };

    // Let the page settle (fonts, reveal animations) before measuring.
    let timer = window.setTimeout(() => void jump(), 350);
    const onHashChange = () => void jump();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
