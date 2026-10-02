"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { useEffect, useSyncExternalStore } from "react"

/* ─── CursorGlow ──────────────────────────────────────────────────
 * A soft champagne spotlight that trails the cursor across the whole
 * page, sitting behind the content. It is the single effect doing the
 * most work for the "lit from somewhere expensive" feel.
 * ─────────────────────────────────────────────────────────────── */
/* Subscribed rather than read in an effect, so there is no setState
   during mount and the value stays correct if the user plugs a mouse
   into a tablet mid-session. */
function subscribePointer(onChange: () => void) {
  const mq = window.matchMedia("(pointer: fine)")
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

function usePointerFine() {
  return useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  )
}

export function CursorGlow() {
  const reduced = useReducedMotion() ?? false
  const pointerFine = usePointerFine()
  const enabled = pointerFine && !reduced

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.9 })
  const y = useSpring(my, { stiffness: 60, damping: 22, mass: 0.9 })

  const background = useMotionTemplate`radial-gradient(560px circle at ${x}px ${y}px, rgba(200,169,98,0.10), rgba(200,169,98,0.035) 38%, transparent 68%)`

  useEffect(() => {
    if (!enabled) return

    mx.set(window.innerWidth / 2)
    my.set(window.innerHeight * 0.35)

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my, enabled])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  )
}

/* ─── Aurora ──────────────────────────────────────────────────────
 * Two very slow, very dim gold clouds. Pure CSS animation so it
 * costs nothing on the main thread.
 * ─────────────────────────────────────────────────────────────── */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute -top-[20%] left-[8%] size-[46rem] rounded-full opacity-[0.16] blur-[120px] animate-[drift_22s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, #c8a962 0%, transparent 68%)" }}
      />
      <div
        className="absolute top-[38%] -right-[12%] size-[38rem] rounded-full opacity-[0.10] blur-[130px] animate-[drift_30s_ease-in-out_infinite_reverse]"
        style={{ background: "radial-gradient(circle, #7c6330 0%, transparent 70%)" }}
      />
    </div>
  )
}
