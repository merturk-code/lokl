"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { useCopy } from "@/lib/i18n"
import { RevealWords } from "@/components/reveal"
import { Magnetic } from "@/components/magnetic"

const EASE = [0.16, 1, 0.3, 1] as const

/* Faint vertical rules. Gives the page an underlying grid you feel
   more than you see, which is most of what makes a layout read as
   art directed rather than assembled. */
function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="mx-auto flex h-full max-w-7xl justify-between px-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-px bg-gradient-to-b from-transparent via-line to-transparent"
          />
        ))}
      </div>
    </div>
  )
}

export function Hero() {
  const c = useCopy()
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -110])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0])
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 130])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-32 pb-20"
    >
      <GridLines />

      {/* Oversized wordmark behind everything */}
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute -bottom-[7vw] left-1/2 z-0 w-full -translate-x-1/2 text-center font-sans text-[24vw] font-black leading-none tracking-tighter text-bone/[0.02] select-none"
      >
        LONDON
      </motion.span>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6"
      >
        {/* ── Headline ────────────────────────────────────────── */}
        <h1 className="max-w-[15ch] font-sans text-[clamp(3rem,8.8vw,7.8rem)] font-medium leading-[0.92] tracking-[-0.045em] text-bone">
          <RevealWords text={c.hero.titleTop} delay={0.1} className="block" />
          <RevealWords
            text={c.hero.titleAccent}
            delay={0.26}
            className="block font-serif italic tracking-[-0.02em]"
            wordClassName="gold-sheen"
          />
        </h1>

        {/* ── Lede + actions ──────────────────────────────────── */}
        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
            className="max-w-[46ch] text-[1.02rem] leading-[1.75] text-ash"
          >
            {c.hero.lede}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.3}>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-void transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_44px_-8px_rgba(200,169,98,0.7)]"
              >
                {c.hero.primary}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </Magnetic>

            <Magnetic strength={0.22}>
              <Link
                href="#clients"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm text-bone transition-all duration-300 hover:border-gold/50 hover:bg-gold/[0.06]"
              >
                {c.hero.secondary}
                <ArrowDown
                  size={15}
                  className="text-gold transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
