import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { ClientMarquee } from "@/components/client-marquee"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { ContactCTA } from "@/components/contact-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ClientMarquee />
        <Services />
        <Process />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
