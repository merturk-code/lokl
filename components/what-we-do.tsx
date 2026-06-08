"use client"

import { Fingerprint, Zap, Eye } from "lucide-react"
import { FadeUp } from "./fade-up"

const cards = [
  {
    icon: Fingerprint,
    title: "Made for your brand",
    body: "We start from your colours, character, and story — never a template. Every element is chosen to feel unmistakably like you.",
  },
  {
    icon: Zap,
    title: "AI-fast, human-finished",
    body: "Modern tools let us move in days, not months. Then we refine every detail by hand until it's something you're genuinely proud of.",
  },
  {
    icon: Eye,
    title: "See it before you pay",
    body: "We design a real draft of your site first. You only go ahead if you love it — no commitment, no risk.",
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-signal">
              What we do
            </span>
            <h2 className="font-sans font-semibold text-4xl md:text-5xl text-ink mt-3 leading-tight tracking-[-0.02em] max-w-md">
              Built for the way you actually work.
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <FadeUp key={card.title} delay={i * 0.1}>
                <div className="group bg-white rounded-2xl border border-hairline p-8 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-signal/10 flex items-center justify-center mb-6">
                    <Icon size={20} className="text-signal" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-ink mb-3 tracking-[-0.01em]">
                    {card.title}
                  </h3>
                  <p className="text-stone text-sm leading-relaxed font-light">
                    {card.body}
                  </p>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
