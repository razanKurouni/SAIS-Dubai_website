import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Studio | SAIS Dubai",
  robots: { index: false, follow: false },
  // The Studio's tab shows the white SAIS shield, so it stands apart from the website's blue one.
  icons: {
    icon: "/studio-tab-icon.png",
    shortcut: "/studio-tab-icon.png",
  },
};

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
