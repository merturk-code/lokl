"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { useCopy } from "@/lib/i18n"
import { Logo } from "@/components/logo"
import { LangToggle } from "@/components/lang-toggle"

const LINKEDIN = "https://www.linkedin.com/company/lokl-studio"

/* lucide dropped its brand icons, so the LinkedIn mark is inline. */
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function Footer() {
  const c = useCopy()
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-line bg-void/70 px-6 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* ── Brand ───────────────────────────────────────── */}
          <div>
            <Logo className="text-[30px]" />
            <p className="mt-5 max-w-[38ch] text-[0.88rem] leading-[1.8] text-ash">
              {c.footer.tagline}
            </p>
            <div className="mt-7 flex items-center gap-3">
              <LangToggle />
              <Link
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Lokl on LinkedIn"
                className="inline-flex size-9 items-center justify-center rounded-full border border-line text-ash transition-colors duration-300 hover:border-gold/50 hover:text-gold"
              >
                <LinkedInMark />
              </Link>
            </div>
          </div>

          {/* ── Services ────────────────────────────────────── */}
          <nav aria-label={c.footer.servicesTitle}>
            <h2 className="label text-ash">{c.footer.servicesTitle}</h2>
            <ul className="mt-5 space-y-3">
              {c.services.items.map((s) => (
                <li key={s.no}>
                  <Link
                    href="#services"
                    className="text-[0.88rem] text-ash transition-colors duration-300 hover:text-bone"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Company ─────────────────────────────────────── */}
          <nav aria-label={c.footer.companyTitle}>
            <h2 className="label text-ash">{c.footer.companyTitle}</h2>
            <ul className="mt-5 space-y-3">
              {c.footer.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.88rem] text-ash transition-colors duration-300 hover:text-bone"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Oversized wordmark ────────────────────────────── */}
        <div aria-hidden className="mt-20 select-none overflow-hidden">
          <div className="hairline" />
          <p className="pt-6 text-center font-sans text-[19vw] font-black leading-[0.78] tracking-tighter text-bone/[0.035]">
            lokl
          </p>
        </div>

        {/* ── Bottom bar ────────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.78rem] text-dust">
            &copy; {year} {c.footer.legal} {c.footer.rights}
          </p>
          {/*
            TODO Mert: once you have confirmed the trading arrangement,
            swap the line above for this, which is a strong trust signal
            for Turkish buyers checking that you are a real UK entity:

            Lokl is a trading name of Lexingtonworks Ltd, registered in
            England and Wales, company no. 16974034.
          */}

          <Link
            href="#top"
            className="group inline-flex items-center gap-2 text-[0.78rem] text-dust transition-colors duration-300 hover:text-gold"
          >
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Top
          </Link>
        </div>
      </div>
    </footer>
  )
}
