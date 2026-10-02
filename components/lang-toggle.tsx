"use client"

import { motion } from "framer-motion"
import { useLang } from "@/lib/i18n"

/* A two-state pill. The active side is filled with champagne and the
   knob slides under it with a shared layout animation. */
export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, c } = useLang()

  const options = [
    { id: "en" as const, label: "EN" },
    { id: "tr" as const, label: "TR" },
  ]

  return (
    <div
      className={`relative flex items-center rounded-full border border-line bg-smoke/60 p-0.5 backdrop-blur-md ${className}`}
      role="group"
      aria-label={c.meta.switchTo}
    >
      {options.map((o) => {
        const active = lang === o.id
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setLang(o.id)}
            aria-pressed={active}
            className="relative rounded-full px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] transition-colors duration-300"
          >
            {active && (
              <motion.span
                layoutId="lang-knob"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-gold"
              />
            )}
            <span className={`relative z-10 ${active ? "text-void" : "text-ash hover:text-bone"}`}>
              {o.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
