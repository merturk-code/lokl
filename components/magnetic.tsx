"use client"

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { useRef, type ReactNode } from "react"

/* ─── Magnetic ────────────────────────────────────────────────────
 * The element leans toward the cursor while it is nearby, then
 * springs home. Pointer-fine devices only; no-ops for touch and
 * for anyone who asked for reduced motion.
 * ─────────────────────────────────────────────────────────────── */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion() ?? false

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.35 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.35 })

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (reduced || !ref.current) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * strength)
    my.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  )
}
