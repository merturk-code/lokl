"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { useCopy } from "@/lib/i18n"
import { Reveal, RevealWords, SectionLabel } from "@/components/reveal"

/* ─── SpotlightCard ───────────────────────────────────────────────
 * Three stacked layers:
 *   A  bright gradient on the outer box
 *   B  solid surface inset by 1px, which masks A down to its rim
 *   C  dim gradient over the surface
 * The result is a card whose edge catches the light where the cursor
 * is, like a bevel, instead of a flat hover state.
 * ─────────────────────────────────────────────────────────────── */
function SpotlightCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(-500)
  const my = useMotionValue(-500)

  const edge = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(200,169,98,0.7), rgba(200,169,98,0.12) 40%, transparent 68%)`
  const surface = useMotionTemplate`radial-gradient(460px circle at ${mx}px ${my}px, rgba(200,169,98,0.085), transparent 68%)`

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  function onLeave() {
    mx.set(-500)
    my.set(-500)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group/card relative h-full rounded-2xl bg-line/60 p-px transition-colors duration-500"
    >
      <motion.div
        aria-hidden
        style={{ background: edge }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />
      <div className="relative h-full overflow-hidden rounded-[15px] bg-smoke/85 backdrop-blur-sm">
        <motion.div
          aria-hidden
          style={{ background: surface }}
          className="pointer-events-none absolute inset-0"
        />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </div>
  )
}

export function Services() {
  const c = useCopy()

  return (
    <section id="services" className="relative z-10 px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{c.services.label}</SectionLabel>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-end">
          <h2 className="font-sans text-[clamp(2.1rem,5.2vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.04em] text-bone">
            <RevealWords text={c.services.titleTop} className="block" />
            <RevealWords
              text={c.services.titleAccent}
              delay={0.12}
              className="block font-serif italic text-gold"
            />
          </h2>
          <Reveal delay={0.15}>
            <p className="max-w-[50ch] text-[0.95rem] leading-[1.8] text-ash">
              {c.services.lede}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {c.services.items.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.08} className="h-full">
              <SpotlightCard>
                <div className="flex h-full flex-col p-8 md:p-10">
                  <h3 className="font-sans text-[1.7rem] font-medium leading-tight tracking-[-0.03em] text-bone">
                    {s.title}
                  </h3>

                  <p className="mt-5 text-[0.92rem] leading-[1.8] text-ash">{s.body}</p>

                  <ul className="mt-auto space-y-2.5 border-t border-line pt-7">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.85rem] text-dust">
                        <span
                          aria-hidden
                          className="mt-[0.45em] size-1 shrink-0 rounded-full bg-gold/50 transition-colors duration-500 group-hover/card:bg-gold"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
