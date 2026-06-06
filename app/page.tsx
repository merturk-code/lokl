import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { TrustStrip } from "@/components/trust-strip"
import { WhatWeDo } from "@/components/what-we-do"
import { HowItWorks } from "@/components/how-it-works"
import { Pricing } from "@/components/pricing"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <WhatWeDo />
        <HowItWorks />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
