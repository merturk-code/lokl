"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useCopy } from "@/lib/i18n"
import { Reveal, RevealWords, SectionLabel } from "@/components/reveal"

/* The champagne rule down the left draws itself as the section
   scrolls, so the process literally advances with the reader. */
export function Process() {
  const c = useCopy()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  return (
    <section id="process" className="relative z-10 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{c.process.label}</SectionLabel>

        <h2 className="mt-8 font-sans text-[clamp(2.1rem,5.2vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.04em] text-bone">
          <RevealWords text={c.process.titleTop} className="block" />
          <RevealWords
            text={c.process.titleAccent}
            delay={0.12}
            className="block font-serif italic text-gold"
          />
        </h2>

        <div ref={ref} className="relative mt-16 pl-10 md:pl-14">
          {/* track */}
          <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px bg-line" />
          {/* drawn line */}
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-gold via-gold to-gold-deep"
          />

          <ol className="flex flex-col gap-12 md:gap-16">
            {c.process.steps.map((s, i) => (
              <Reveal as="li" key={s.no} delay={i * 0.07}>
                <div className="group/step relative">
                  {/* node */}
                  <span
                    aria-hidden
                    className="absolute -left-10 top-2 size-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_16px_3px_rgba(200,169,98,0.35)] md:-left-14"
                  />
                  <div className="grid gap-4 md:grid-cols-[9rem_1fr] md:gap-10">
                    <div>
                      <span className="label text-dust">{s.no}</span>
                      <h3 className="mt-2 font-sans text-[1.4rem] font-medium leading-tight tracking-[-0.03em] text-bone">
                        {s.title}
                      </h3>
                    </div>
                    <p className="max-w-[58ch] text-[0.92rem] leading-[1.85] text-ash md:pt-7">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
