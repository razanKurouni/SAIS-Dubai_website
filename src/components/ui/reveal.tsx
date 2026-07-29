"use client";

import { createElement, memo, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type RevealProps = {
  as?: "a" | "article" | "div" | "li" | "p" | "section" | "span";
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  threshold?: number;
} & Pick<
  HTMLAttributes<HTMLElement>,
  | "onBlur"
  | "onClick"
  | "onFocus"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
  | "onPointerEnter"
  | "onPointerLeave"
  | "tabIndex"
>;

export const Reveal = memo(function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  onBlur,
  onClick,
  onFocus,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onPointerEnter,
  onPointerLeave,
  style,
  tabIndex,
  threshold = 0.18,
}: RevealProps) {
  const { ref, isInViewport } = useInViewport<HTMLElement>({ once: true, threshold });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isVisible = prefersReducedMotion || isInViewport;
  const revealStyle =
    delay > 0 ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style;

  return createElement(
    as,
    {
      className: `${className} reveal-item ${isVisible ? "is-visible" : ""}`.trim(),
      onBlur,
      onClick,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      onPointerEnter,
      onPointerLeave,
      ref,
      style: revealStyle,
      tabIndex,
    },
    children,
  );
});
