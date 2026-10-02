"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useCopy } from "@/lib/i18n"
import { LangToggle } from "@/components/lang-toggle"
import { Magnetic } from "@/components/magnetic"
import { Logo } from "@/components/logo"

const EASE = [0.16, 1, 0.3, 1] as const

export function Nav() {
  const c = useCopy()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Lock the page behind the mobile sheet. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <motion.div
          initial={false}
          animate={{
            backgroundColor: scrolled ? "rgba(10,9,13,0.72)" : "rgba(10,9,13,0)",
            borderColor: scrolled ? "rgba(34,31,41,1)" : "rgba(34,31,41,0)",
            paddingLeft: scrolled ? 22 : 12,
            paddingRight: scrolled ? 14 : 12,
          }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border backdrop-blur-xl"
        >
          <Link href="#top" aria-label="Lokl" className="shrink-0">
            <Logo className="text-[26px]" />
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 md:flex">
            {c.nav.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-[13px] text-ash transition-colors duration-300 hover:text-bone"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-400 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LangToggle className="hidden sm:flex" />

            <span className="hidden md:inline-block">
              <Magnetic strength={0.25}>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-[13px] font-medium text-void transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_30px_-6px_rgba(200,169,98,0.55)]"
                >
                  {c.nav.cta}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </Magnetic>
            </span>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-full border border-line p-2.5 text-bone md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.div>
      </header>

      {/* ── Mobile sheet ──────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-void/98 px-6 pb-10 pt-6 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo className="text-[26px]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-full border border-line p-2.5 text-bone"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-7">
              {c.nav.links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 text-[2.4rem] font-medium leading-none tracking-tight text-bone"
                  >
                    <span className="label text-gold/60">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-5 pt-10">
              <LangToggle className="w-fit" />
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-base font-medium text-void"
              >
                {c.nav.cta}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
