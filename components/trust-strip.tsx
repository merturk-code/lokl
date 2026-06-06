"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

const phrases = [
  "Made for your brand",
  "Live in days, not months",
  "You own it",
  "Founder-led",
]

/*
 * Each phrase is shown for DISPLAY_MS before the next one triggers.
 * AnimatePresence mode="wait" adds ~250ms exit + ~250ms enter on top,
 * so the perceived cycle is ~3.7s per phrase.
 */
const DISPLAY_MS = 3200

export function TrustStrip() {
  const reduced = useReducedMotion() ?? false
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (reduced) return
    const t = setInterval(() => setIdx(i => (i + 1) % phrases.length), DISPLAY_MS)
    return () => clearInterval(t)
  }, [reduced])

  /* ── Reduced motion: static row, no rotation ───────────────────── */
  if (reduced) {
    return (
      <div className="border-y border-hairline bg-parchment py-5">
        <div className="flex flex-wrap items-center justify-center gap-y-1.5 px-6">
          {phrases.map((p, i) => (
            <span
              key={p}
              className="inline-flex items-center text-[11px] font-medium tracking-[0.12em] uppercase text-stone"
            >
              {i > 0 && (
                <span aria-hidden className="mx-5 inline-block w-[4px] h-[4px] rounded-full bg-signal/50 flex-shrink-0" />
              )}
              {p}
            </span>
          ))}
        </div>
      </div>
    )
  }

  /* ── Full motion: rotating marker-highlight ────────────────────── */
  return (
    <div className="border-y border-hairline bg-parchment overflow-hidden">
      <div className="max-w-4xl mx-auto px-8 py-7 md:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">

          {/* Static lead-in label */}
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-stone/40 flex-shrink-0 select-none">
            Why Lokl
          </span>

          {/* Thin vertical rule – desktop only */}
          <span aria-hidden className="hidden sm:block w-px h-3.5 bg-stone/20 flex-shrink-0" />

          {/* Fixed-size box so layout never shifts between phrases.
              w-60 (240px) comfortably holds the longest phrase.
              h-7 (28px) matches the rendered line-height of text-sm/base. */}
          <div className="relative w-60 h-7 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                /* absolute so it fills the fixed container */
                className="absolute inset-0 flex items-center justify-center sm:justify-start"
                initial={{ opacity: 0, y: 9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* inline-block span gives the marker a tight bounding box */}
                <span className="relative inline-block whitespace-nowrap">

                  {/* Marker bar — scaleX 0→1 from origin:left on each new phrase */}
                  <motion.span
                    aria-hidden
                    className="absolute -inset-x-[6px] inset-y-[1px] rounded-[3px] pointer-events-none"
                    style={{
                      backgroundColor: "#d96535",
                      opacity: 0.83,
                      originX: 0,
                      originY: 0.5,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.58,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.24,   /* starts just as the phrase finishes fading in */
                    }}
                  />

                  {/* Phrase text — sits above the marker */}
                  <span className="relative text-ink text-sm md:text-[0.9375rem] font-medium tracking-wide">
                    {phrases[idx]}
                  </span>

                </span>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  )
}
