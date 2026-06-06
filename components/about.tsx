"use client"

import { FadeUp } from "./fade-up"

export function About() {
  return (
    <section id="about" className="py-28 px-6 bg-parchment border-y border-hairline">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <span className="text-xs font-medium tracking-widest uppercase text-signal">
            About
          </span>
        </FadeUp>

        <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo placeholder */}
          <FadeUp delay={0.05}>
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl bg-paper border border-hairline flex items-center justify-center shadow-sm">
              <span className="font-serif italic text-signal text-8xl leading-none select-none">
                M
              </span>
            </div>
          </FadeUp>

          {/* Text */}
          <FadeUp delay={0.12}>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-ink mb-6 leading-tight">
                I kept seeing great local businesses with websites that didn&apos;t do them justice.
              </h2>
              <div className="space-y-4 text-stone text-[0.95rem] leading-relaxed font-light max-w-md">
                <p>
                  I&apos;m Mert, London-based. I&apos;ve spent years watching independent cafés, salons, and shops — places with real character — settle for websites that look like everyone else&apos;s.
                </p>
                <p>
                  Lokl is my answer. Modern tools for speed, finished by hand for quality. Founding clients get real attention, a direct line to me, and a founding price that won&apos;t come around again.
                </p>
              </div>
              <p className="mt-8 font-serif italic text-ink text-lg">
                — Mert, founder
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
