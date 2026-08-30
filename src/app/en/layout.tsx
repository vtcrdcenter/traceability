import type { Metadata } from "next";

/* =========================================================
   ENGLISH METADATA
========================================================= */

export const metadata: Metadata = {
  title: {
    default: "Cultural Product Traceability · VTC",
    template: "%s · VTC Traceability Platform",
  },

  description:
    "VTC cultural product traceability platform providing product verification, heritage references, cultural attestation, copyright information and access to the VTC Merch ecosystem.",

  keywords: [
    "VTC",
    "traceability",
    "cultural product",
    "heritage product",
    "Vietnamese heritage",
    "product verification",
    "cultural attestation",
    "copyright",
    "VTC Merch",
    "Nguyen Dynasty",
  ],

  authors: [
    {
      name: "Vietnam Multimedia Corporation (VTC)",
    },
  ],

  creator: "VTC",
  publisher: "VTC",

  applicationName: "VTC Traceability Platform",

  alternates: {
    canonical: "/en",
    languages: {
      "vi-VN": "/",
      "en-US": "/en",
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    url:
      "https://vtcrdcenter.github.io/traceability/en/",

    siteName: "VTC Traceability Platform",

    title:
      "Cultural Product Traceability · VTC",

    description:
      "Verify cultural product information, explore heritage references, cultural attestation, copyright records and the VTC Merch ecosystem.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================================
   ENGLISH LAYOUT
========================================================= */

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
