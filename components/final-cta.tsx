"use client"

import Link from "next/link"
import { FadeUp } from "./fade-up"

export function FinalCTA() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <div className="relative bg-ink rounded-3xl px-10 py-20 md:px-20 md:py-24 text-center overflow-hidden shadow-[0_0_80px_rgba(217,101,53,0.18)]">
            {/* Subtle glow blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-signal/10 blur-3xl pointer-events-none" />

            <div className="relative">
              <h2 className="font-sans font-black text-4xl md:text-6xl text-white mb-5 leading-tight tracking-tight">
                Let&apos;s design{" "}
                <span className="italic text-signal">your</span> site.
              </h2>
              <p className="text-white/50 text-base md:text-lg mb-10 max-w-md mx-auto font-light leading-relaxed">
                We&apos;ll design a real draft of your site — completely free, no commitment. See what&apos;s possible before you decide anything.
              </p>
              <Link
                href="https://londoner-studio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-9 py-4 rounded-full bg-signal text-white font-medium hover:bg-signal/90 transition-all duration-200 hover:shadow-2xl hover:shadow-signal/30 active:scale-95 text-[0.95rem]"
              >
                Start your free draft
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
