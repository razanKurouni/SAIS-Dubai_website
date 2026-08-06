import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  threshold?: number;
};

export function SectionReveal({ children, className = "", threshold = 0.18 }: SectionRevealProps) {
  return (
    <Reveal className={className} threshold={threshold}>
      {children}
    </Reveal>
  );
}
