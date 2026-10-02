import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/lib/i18n"
import { Aurora, CursorGlow } from "@/components/cursor-glow"
import { ScrollProgress } from "@/components/scroll-progress"

/* latin-ext carries the Turkish glyphs (ı ğ ş İ Ç Ü Ö). Without it the
   italic accent headlines fall back to Georgia mid-word on the TR side.
   If a build ever rejects the subset for this family, drop it here and
   the Georgia fallback in globals.css covers those characters. */
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
})

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
})

// Canonical host — Netlify serves the site on www; the apex (loklstudio.com)
// 308-redirects here, so www is the indexable/canonical version.
const SITE_URL = "https://www.loklstudio.com"

const TITLE = "Lokl — London Marketing & Creative Agency"

const DESCRIPTION =
  "Lokl is a London marketing and creative agency. Websites and rebranding, Google and Meta Ads, PR and app development for ambitious companies across the UK, Europe and Türkiye."

export const viewport: Viewport = {
  themeColor: "#0a090d",
  colorScheme: "dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Lokl",
  },
  description: DESCRIPTION,
  keywords: [
    "London marketing agency",
    "creative agency London",
    "rebranding agency",
    "website design London",
    "Google Ads agency",
    "Meta Ads agency",
    "PR agency London",
    "app development London",
    "Londra pazarlama ajansı",
    "Londra reklam ajansı",
    "rebranding ajansı",
    "Google ve Meta reklam yönetimi",
  ],
  applicationName: "Lokl",
  authors: [{ name: "Lokl" }],
  creator: "Lokl",
  publisher: "Lokl",
  category: "Marketing Agency",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Lokl",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_GB",
    alternateLocale: ["tr_TR"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Lokl",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  email: "hello@loklstudio.com",
  sameAs: ["https://www.linkedin.com/company/lokl-studio"],
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Türkiye" },
    { "@type": "Place", name: "Europe" },
  ],
  knowsLanguage: ["en", "tr"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      "Website design and rebranding",
      "Digital marketing, Google and Meta Ads",
      "Public relations",
      "App creation",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="relative min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <Aurora />
          <CursorGlow />
          <ScrollProgress />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
