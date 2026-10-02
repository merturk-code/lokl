"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useCopy } from "@/lib/i18n"
import { Reveal, RevealWords, SectionLabel } from "@/components/reveal"
import { Magnetic } from "@/components/magnetic"

const EMAIL = "hello@loklstudio.com"

export function ContactCTA() {
  const c = useCopy()

  return (
    <section id="contact" className="relative z-10 overflow-hidden px-6 py-28 md:py-44">
      {/* pooled light behind the statement */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[44rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.13] blur-[110px]"
        style={{ background: "radial-gradient(circle, #c8a962 0%, transparent 68%)" }}
      />

      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center">
          <SectionLabel>{c.cta.label}</SectionLabel>
        </div>

        <h2 className="mt-8 font-sans text-[clamp(2.3rem,6.4vw,5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-bone">
          <RevealWords text={c.cta.titleTop} className="block" />
          <RevealWords
            text={c.cta.titleAccent}
            delay={0.12}
            className="block font-serif italic"
            wordClassName="gold-sheen"
          />
        </h2>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-7 max-w-[52ch] text-[0.98rem] leading-[1.8] text-ash">
            {c.cta.lede}
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-11 flex justify-center">
            <Magnetic strength={0.3}>
              <Link
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-medium text-void transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_60px_-10px_rgba(200,169,98,0.85)]"
              >
                {c.cta.button}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.88rem] text-dust">
            <Link
              href={`mailto:${EMAIL}`}
              className="text-ash transition-colors duration-300 hover:text-gold"
            >
              {EMAIL}
            </Link>
            <span aria-hidden className="text-line">/</span>
            <span>{c.cta.location}</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
