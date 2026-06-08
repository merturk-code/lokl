"use client"

import { FadeUp } from "./fade-up"

const steps = [
  {
    number: "01",
    title: "Tell us about you",
    body: "Fill in a short 2-minute form about your business, brand, and what you're hoping for. No tech knowledge needed.",
  },
  {
    number: "02",
    title: "We design a draft",
    body: "Within a few days we'll have a real, tailored draft of your site — built around your brand, not a generic template.",
  },
  {
    number: "03",
    title: "You take a look",
    body: "Review the draft with us. We refine it together until every detail feels right. You're in control the whole way.",
  },
  {
    number: "04",
    title: "We go live",
    body: "We launch your site, connect your domain, and keep everything running smoothly so you never have to think about it.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6 bg-ink">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="mb-16">
            <span className="text-xs font-medium tracking-widest uppercase text-signal">
              How it works
            </span>
            <h2 className="font-sans font-semibold text-4xl md:text-5xl text-white mt-3 leading-tight tracking-[-0.02em] max-w-lg">
              Simple from start to site.
            </h2>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.08}>
              <div className="bg-ink p-8 md:p-10 h-full">
                <span className="font-serif italic text-signal text-5xl leading-none mb-5 block">
                  {step.number}
                </span>
                <h3 className="text-white font-medium text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-light">
                  {step.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
