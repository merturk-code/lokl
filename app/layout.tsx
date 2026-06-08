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

export const metadata: Metadata = {
  title: "Lokl — Websites for local businesses",
  description:
    "Lokl is a small London studio building beautiful, brand-true websites for independent businesses. Cafés, salons, shops. AI-fast, human-finished.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
