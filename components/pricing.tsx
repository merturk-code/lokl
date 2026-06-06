"use client"

import Link from "next/link"
import { FadeUp } from "./fade-up"

const terms = [
  { label: "Free", detail: "draft of your site" },
  { label: "From £500", detail: "to design & launch" },
  { label: "Small", detail: "monthly to keep it live" },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-signal">
              Pricing
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-ink mt-3 leading-tight max-w-md">
              Honest pricing, no surprises.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="max-w-2xl mx-auto bg-parchment rounded-3xl border border-hairline p-10 md:p-14 relative overflow-hidden">
            {/* Top flag */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 bg-signal text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Founding-client offer
              </span>
            </div>

            {/* Heading */}
            <h3 className="font-serif text-2xl md:text-3xl text-ink mb-3 leading-snug max-w-sm">
              We&apos;re new — so our first clients get our best price.
            </h3>
            <p className="text-stone text-sm mb-10 font-light leading-relaxed max-w-xs">
              In return for being early, you get a proper site at a founding
              rate — and our full attention.
            </p>

            {/* Terms */}
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              {terms.map((t) => (
                <div key={t.label} className="flex-1">
                  <div className="font-serif text-3xl text-ink leading-none mb-1">
                    {t.label}
                  </div>
                  <div className="text-stone text-sm font-light">{t.detail}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-hairline mb-8" />

            {/* CTA */}
            <Link
              href="https://londoner-studio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 rounded-full bg-signal text-white font-medium hover:bg-signal/90 transition-all duration-200 hover:shadow-xl hover:shadow-signal/25 active:scale-95 text-[0.95rem]"
            >
              Claim a founding spot
            </Link>
            <p className="text-stone/70 text-xs mt-4 font-light">
              Only taking on a few at a time.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
