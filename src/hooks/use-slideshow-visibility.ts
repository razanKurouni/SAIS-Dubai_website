"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { flushSync } from "react-dom";

/**
 * Slideshows do not move on by themselves, the same as on the other SAIS sites (school feedback for those campuses,
 * Nov 2026: "Whenever a user opens a slideshow, it should start from Slide 1", "for SLT always start with the
 * principal"; Dubai was asked to match them). With autoplay running from page load, a slideshow was already on slide 2
 * or 3 by the time the visitor scrolled to it, so every slideshow now shows slide 1 until the visitor uses its arrows,
 * dots or a swipe. Set to true to bring autoplay back (on screen only).
 */
const AUTOPLAY = false;

/** Share of the slideshow that has to be on screen before it starts moving on by itself (when AUTOPLAY is on). */
const THRESHOLD = 0.35;

/**
 * Keeps every slideshow on slide 1 for each visitor. Once it is completely off screen, `onReset` puts it back on
 * slide 1 while it is out of sight, so coming back to it starts from the beginning again, even after the visitor moved
 * it with the arrows; the same happens when the page is shown again from the browser's Back/Forward cache. Leaving for
 * another page unmounts the slideshow, so it is back on slide 1 after a client-side Back anyway. `canAutoplay` is
 * false while AUTOPLAY is off; with it on, it is only true while the slideshow is on screen and the tab is in front.
 */
export function useSlideshowVisibility<TElement extends HTMLElement>(onReset: (element: TElement) => void) {
  const ref = useRef<TElement | null>(null);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const reset = useEffectEvent(onReset);

  useEffect(() => {
    const node = ref.current;

    // Without IntersectionObserver (very old browsers) it simply stays on slide 1 until the visitor moves it.
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    // A slideshow taller than the screen never shows THRESHOLD of itself, so it plays once it fills that share of the
    // screen instead.
    const height = node.getBoundingClientRect().height;
    const threshold = height > window.innerHeight ? (THRESHOLD * window.innerHeight) / height : THRESHOLD;
    let isOnScreen = false;
    const update = () => setCanAutoplay(isOnScreen && !document.hidden);

    const observer = new IntersectionObserver(
      (entries) => {
        // Several reports can arrive together during a fast scroll; the last one is the current state.
        const entry = entries[entries.length - 1];
        isOnScreen = entry.isIntersecting && entry.intersectionRatio >= threshold;

        if (!entry.isIntersecting) {
          reset(node);
        }

        update();
      },
      { threshold: [0, threshold] },
    );

    // Back from the Back/Forward cache the page is shown exactly as it was left, countdown included. It stops at once
    // (synchronously, so it cannot merge with the restart below), goes back to slide 1, and observing again makes the
    // observer report afresh, which starts a new countdown.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        return;
      }

      isOnScreen = false;
      flushSync(update);
      reset(node);
      observer.unobserve(node);
      observer.observe(node);
    };

    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return { ref, canAutoplay: AUTOPLAY && canAutoplay };
}
