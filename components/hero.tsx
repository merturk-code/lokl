"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

/* ─── Animated pin image ──────────────────────────────────────────── */
/*
 * Animation sequence (full motion):
 *   0.08s  — spring drop-in (y, scale) from above, origin at pin tip
 *   0.68s  — left-to-right clip-path wipe reveals the scene over 1.1s
 *   1.82s  — GPS-ping pulse ring radiates once (after reveal completes)
 *   1.95s  — slow float loop begins (9px up-down, 3.8s period)
 *
 * Reduced motion: outer div stays opaque, inner reveal fades in (0.4s).
 */
function HeroPinImage({ reduced }: { reduced: boolean }) {
  return (
    /* Drop-in spring — opacity stays 1 for reduced (reveal handles fade) */
    <motion.div
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -60, scale: reduced ? 1 : 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 180, damping: 16, mass: 1, delay: 0.08 }
      }
      style={{ transformOrigin: "50% 82%" }}
    >
      {/* Overflow-visible wrapper so upward transforms never clip */}
      <div className="relative overflow-visible">

        {/* Float is the OUTER wrapper — it moves the clip rectangle with it,
            so inset(0 …) never cuts the top of the pin during upward travel  */}
        <motion.div
          animate={reduced ? {} : { y: [0, -9, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.95 }}
        >
          {/* Left-to-right wipe reveal — only clips the image itself */}
          <motion.div
            initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
            animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
            transition={
              reduced
                ? { duration: 0.4 }
                : { duration: 1.1, delay: 0.68, ease: [0.22, 1, 0.36, 1] as const }
            }
          >
            <Image
              src="/hero-pin.png"
              alt="Hand-drawn London neighbourhood scene inside an orange location pin"
              width={1299}
              height={1079}
              priority
              className="w-full h-auto select-none"
            />
          </motion.div>

          {/* GPS-ping pulse ring — outside clip wrapper (expands freely),
              inside float (stays locked to pin position while it floats) */}
          {!reduced && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[34%]
                         -translate-x-1/2 -translate-y-1/2
                         block w-[42%] aspect-square rounded-full
                         border border-signal/50"
              initial={{ scale: 0.45, opacity: 0 }}
              animate={{ scale: 2.2, opacity: [0, 0.65, 0] }}
              transition={{ duration: 1.1, delay: 1.82, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </div>

      {/* Contact shadow — fades in on landing, stays static */}
      <motion.span
        aria-hidden
        className="pointer-events-none block mx-auto -mt-1
                   w-[15%] h-[6px] rounded-full bg-ink/[0.13] blur"
        initial={{ opacity: 0, scaleX: 0.2 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={
          reduced
            ? { duration: 0.4 }
            : { delay: 0.75, duration: 0.45, ease: "easeOut" }
        }
      />
    </motion.div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────── */
export function Hero() {
  const reduced = useReducedMotion() ?? false

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  const words = ["local", "is", "more."] as const

  return (
    <section className="relative min-h-screen bg-paper flex flex-col pt-16">

      {/* ── Main content: 3-col on desktop, stacked on mobile ──── */}
      <div className="
        flex-1
        flex flex-col
        md:grid md:grid-cols-[1fr_480px_1fr]
        px-8 md:px-14 lg:px-20
        md:items-center
        gap-0
      ">

        {/* ── RIGHT (desktop) / FIRST (mobile): Big headline ──── */}
        <div className="
          flex flex-col justify-center
          py-14 md:py-0
          md:pl-14
          order-1 md:order-3
        ">
          <h1 className="
            font-sans font-black text-ink
            leading-[0.88] tracking-tighter
            text-[clamp(4.8rem,16vw,7rem)]
            md:text-[clamp(3.5rem,7vw,7rem)]
          ">
            {words.map((word, i) => (
              <motion.span
                key={word}
                {...fadeUp(0.28 + i * 0.13)}
                className="block"
              >
                {word === "more." ? (
                  <span>more<span className="text-signal">.</span></span>
                ) : word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* ── CENTER (all): Hand-drawn pin illustration ──────── */}
        <div className="flex items-center justify-center py-6 md:py-0 order-2">
          <div className="w-[min(90vw,400px)] md:w-full">
            <HeroPinImage reduced={reduced} />
          </div>
        </div>

        {/* ── LEFT (desktop) / LAST (mobile): Body copy ─────────── */}
        <div className="
          flex flex-col justify-center
          pb-12 md:pb-0
          md:pr-14
          order-3 md:order-1
        ">
          <motion.p
            {...fadeUp(0.18)}
            className="text-stone text-sm leading-[1.75] font-light max-w-[240px] mb-7"
          >
            A small studio building beautiful websites for the local places we
            love. Fast, because we use AI. Warm, because a real person finishes
            every one.
          </motion.p>
          <motion.a
            {...fadeUp(0.28)}
            href="#start"
            className="
              text-sm text-ink/50 hover:text-ink
              underline underline-offset-4 decoration-hairline hover:decoration-ink/30
              transition-colors duration-200 w-fit
            "
          >
            See your site free →
          </motion.a>
        </div>
      </div>

    </section>
  )
}
