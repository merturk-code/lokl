"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/* A hairline of champagne across the very top, tied to scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-light"
    />
  )
}
