import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://new-sais-main.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SAIS Dubai | School Website",
  description: "Responsive SAIS Dubai homepage powered by Sanity CMS.",
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
