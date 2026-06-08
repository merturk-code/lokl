"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"

/* ─── Logo variants — change LOGO to "A" | "B" | "C" to preview ─── */
/*
 *  A  lokl·  lowercase Inter medium, tight tracking, signal-orange dot
 *  B  lokl ⬡  same wordmark + a tiny inline location-pin SVG glyph
 *  C  LOKL    all-caps Inter semibold, ultra-tight, no decoration
 */
const LOGO = "A" as "A" | "B" | "C"

function LogoMark() {
  const base = "font-sans leading-none select-none"

  if (LOGO === "B") {
    return (
      <span className={`${base} font-medium text-[16px] text-ink tracking-[-0.04em] inline-flex items-center gap-[3px]`}>
        lokl
        <svg width="8" height="11" viewBox="0 0 8 11" fill="none" aria-hidden>
          <path
            d="M4 0C1.79 0 0 1.79 0 4c0 2.98 4 7 4 7s4-4.02 4-7c0-2.21-1.79-4-4-4zm0 5.5A1.5 1.5 0 1 1 4 2.5a1.5 1.5 0 0 1 0 3z"
            fill="#d96535"
          />
        </svg>
      </span>
    )
  }

  if (LOGO === "C") {
    return (
      <span className={`${base} font-semibold text-[13px] text-ink tracking-[0.12em] uppercase`}>
        lokl
      </span>
    )
  }

  /* A — default */
  return (
    <span className={`${base} font-medium text-[28px] text-ink tracking-[-0.04em]`}>
      lokl<span className="text-signal">.</span>
    </span>
  )
}

const links = [
  { label: "What we do", href: "#what-we-do" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-paper/90 backdrop-blur-md border-b border-hairline"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Lokl home">
            <LogoMark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-stone hover:text-ink transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="https://loklstudio.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-signal text-white text-sm font-medium hover:bg-signal/90 transition-all duration-200 hover:shadow-lg hover:shadow-signal/20"
          >
            See your site free
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ink p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-paper flex flex-col pt-20 px-8 pb-10 md:hidden"
          >
            <nav className="flex flex-col gap-8 mt-10">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className="text-3xl font-sans font-medium text-ink leading-none tracking-[-0.02em]"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto pt-10">
              <Link
                href="https://loklstudio.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center px-6 py-4 rounded-full bg-signal text-white text-base font-medium"
                onClick={() => setOpen(false)}
              >
                See your site free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
