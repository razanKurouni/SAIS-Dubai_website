import type { Metadata } from "next";
import { preload } from "react-dom";
import { NavigationProgress } from "@/components/layout/navigation-progress";
import { RouteScrollReset } from "@/components/layout/route-scroll-reset";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://new-sais-main.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sharjah American International School Dubai | SAIS Dubai",
  description: "Official website of Sharjah American International School Dubai.",
  icons: {
    icon: "/sais-tab-icon.png",
    shortcut: "/sais-tab-icon.png",
    apple: "/sais-tab-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The three Axiforma faces most text uses load with the page, so browsers do not first paint
  // a fallback font (most visible in Safari). crossOrigin is required for font preloads.
  for (const face of ["book", "regular", "semibold"]) {
    preload(`/fonts/axiforma/axiforma-${face}.otf`, { as: "font", type: "font/otf", crossOrigin: "anonymous" });
  }

  return (
    <html lang="en">
      <body>
        <NavigationProgress />
        <RouteScrollReset />
        {children}
      </body>
    </html>
  );
}
