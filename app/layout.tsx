import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avideo.lt";
const description =
  "Augusto Laurinavičiaus video darbai: filmavimas, montažas, FPV, motion grafika ir live produkcija.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AVideo — Augustas Laurinavičius",
    template: "%s | AVideo",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "lt_LT",
    siteName: "AVideo",
    title: "AVideo — Augustas Laurinavičius",
    description,
    url: "/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt">
      <body id="top">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
