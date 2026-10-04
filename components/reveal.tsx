"use client"

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion"
import { Fragment, useRef, type ReactNode } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

/* ─── Reveal ──────────────────────────────────────────────────────
 * Blur + lift on first scroll into view. The blur is what makes it
 * read as expensive rather than as a generic fade.
 * ─────────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  as = "div",
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: "div" | "section" | "li" | "span"
}) {
  const reduced = useReducedMotion() ?? false
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: reduced ? 0.3 : 0.9, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}

/* ─── RevealWords ─────────────────────────────────────────────────
 * Each word rides up from behind a clipping mask, staggered. Used
 * for the big display headlines only, never for body copy.
 * ─────────────────────────────────────────────────────────────── */
export function RevealWords({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
  stagger = 0.07,
  once = true,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLSpanElement>(null)
  /* Driven by a real `animate` prop rather than `whileInView`. The words
     remount whenever the language changes, and children that mount under a
     `whileInView` parent never inherit the visible variant, so the headline
     would silently stay at opacity 0. `animate` is inherited correctly. */
  /* Top margin grows the observer root far above the viewport so a headline
     the browser scrolled past (restored scroll on reload) still counts as
     seen; the bottom margin keeps the normal reveal for sections below. */
  const inView = useInView(ref, { once, margin: "9999px 0px -60px 0px" })
  const words = text.split(" ")

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  }

  const word: Variants = {
    hidden: reduced ? { opacity: 0 } : { y: "170%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: reduced ? 0.3 : 1, ease: EASE },
    },
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {words.map((w, i) => (
        /* The space lives between the masks, not inside them: a trailing
           space inside an inline-block collapses, which glued the words
           together. As a text node it still collapses and wraps normally. */
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.35em] -mb-[0.35em]">
            <motion.span variants={word} className={`inline-block ${wordClassName}`}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  )
}

/* ─── SectionLabel ────────────────────────────────────────────────
 * Just the section name, small and quiet, sitting above the headline.
 * No dot, no gradient rule: those read as template furniture.
 * ─────────────────────────────────────────────────────────────── */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <span className="label block text-ash">{children}</span>
    </Reveal>
  )
}
