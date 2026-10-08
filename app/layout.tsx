import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Lawn Doctor | Customized Lawn Care with a Scientific Approach",
    template: "%s | Lawn Doctor",
  },
  description:
    "Locally owned lawn care, fertilization, seeding, and mosquito and tick control since 1967. 4.8 average Google rating from 30,000+ reviews. Get a free quote.",
  openGraph: {
    type: "website",
    siteName: "Lawn Doctor",
    images: [{ url: "/images/hero-lawn.jpg" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f5ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1611" },
  ],
};

// Applies a saved theme before paint so there is no light/dark flash.
const themeScript = `try{var t=localStorage.getItem('ld-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lawn Doctor",
  url: site.url,
  telephone: "+1-800-845-0580",
  foundingDate: site.since,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    bestRating: "5",
    reviewCount: "30000",
  },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="grain min-h-[100dvh] overflow-x-clip">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCallBar />
        </Providers>
      </body>
    </html>
  );
}
