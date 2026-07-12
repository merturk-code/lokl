import type { Metadata } from "next"
import { Instrument_Serif, Inter } from "next/font/google"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
})

const inter = Inter({
  weight: ["300", "400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
})

// Canonical host. If Netlify serves the site on www, change this to
// "https://www.loklstudio.com" (and the matching URLs in sitemap.ts / robots.ts).
const SITE_URL = "https://loklstudio.com"

const DESCRIPTION =
  "Lokl is a small London studio building beautiful, brand-true websites for independent businesses — cafés, salons and shops. AI-fast, human-finished, from £500."

const TITLE = "Lokl — Web Design for Local Businesses in London"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Lokl",
  },
  description: DESCRIPTION,
  keywords: [
    "web design London",
    "web designer for local businesses",
    "small business website design",
    "café website design",
    "salon website design",
    "shop website design",
    "custom website studio London",
  ],
  applicationName: "Lokl",
  authors: [{ name: "Lokl" }],
  creator: "Lokl",
  publisher: "Lokl",
  category: "Web Design",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Lokl",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_GB",
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
  image: `${SITE_URL}/hero-pin.png`,
  description: DESCRIPTION,
  email: "mert@loklstudio.com",
  sameAs: ["https://www.linkedin.com/company/lokl-studio"],
  areaServed: "London, United Kingdom",
  serviceType: "Web design and development",
  priceRange: "£500+",
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "GB",
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
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
