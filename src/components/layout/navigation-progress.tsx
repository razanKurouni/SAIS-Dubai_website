"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const clearTimers = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      intervalRef.current = null;
      timeoutRef.current = null;
    };

    const start = () => {
      clearTimers();
      setProgress(12);
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setProgress((current) => Math.min(90, current + Math.max(1, (90 - current) * 0.12)));
      }, 180);
      timeoutRef.current = setTimeout(() => {
        clearTimers();
        setIsActive(false);
        setProgress(0);
      }, 15000);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      start();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", start);
    return () => {
      clearTimers();
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", start);
    };
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    intervalRef.current = null;
    timeoutRef.current = null;
    setProgress(100);
    const hideTimer = setTimeout(() => {
      setIsActive(false);
      setProgress(0);
    }, 260);
    return () => clearTimeout(hideTimer);
  }, [pathname]);

  return (
    <div
      className={`navigation-progress ${isActive ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <span className="navigation-progress__bar" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
