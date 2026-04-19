import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { portfolioData } from "./data";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const siteUrl = "https://www.murrzzz.xyz";
const siteName = "Roger Moore Sangol – Full-Stack Developer";
const description =
  "Portfolio of Roger Moore A. Sangol, Full-Stack Developer specializing in React Native, Next.js, and cloud-based microservices.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s · Roger Moore Sangol",
  },
  description,
  keywords: [
    "Roger Moore Sangol",
    "Full-Stack Developer",
    "React Native Developer",
    "Next.js Developer",
    "FastAPI",
    "TypeScript",
    "Portfolio",
    "Philippines developer",
    "Caloocan developer",
  ],
  authors: [{ name: "Roger Moore A. Sangol", url: siteUrl }],
  creator: "Roger Moore A. Sangol",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description,
    siteName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioData.name,
  jobTitle: portfolioData.title,
  url: siteUrl,
  email: `mailto:${portfolioData.email}`,
  telephone: portfolioData.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caloocan City",
    addressRegion: "Metro Manila",
    addressCountry: "PH",
  },
  sameAs: [
    portfolioData.social.github,
    portfolioData.social.linkedin,
    portfolioData.social.facebook,
    portfolioData.social.instagram,
  ],
  knowsAbout: [
    "React Native",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "PostgreSQL",
    "AWS",
    "Cloud microservices",
  ],
  alumniOf: portfolioData.education.map(edu => ({
    "@type": "EducationalOrganization",
    name: edu.school,
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description,
  author: { "@type": "Person", name: portfolioData.name },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
