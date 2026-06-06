"use client"

import { motion, useReducedMotion } from "framer-motion"

/* ─── Path draw-in helper ──────────────────────────────────────────── */
/*
 * Each <DrawPath> animates pathLength 0→1 (stroke-dashoffset technique
 * via Framer Motion). Delay staggers the draw-in left→right.
 */
function DrawPath({
  d,
  strokeWidth = 1.6,
  delay = 0,
  duration = 0.7,
  reduced = false,
  style,
}: {
  d: string
  strokeWidth?: number
  delay?: number
  duration?: number
  reduced?: boolean
  style?: React.CSSProperties
}) {
  return (
    <motion.path
      d={d}
      stroke="#1a1a17"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      pathLength={reduced ? undefined : 1}
      initial={reduced ? { opacity: 0 } : { pathLength: 0, opacity: 1 }}
      animate={reduced ? { opacity: 1 } : { pathLength: 1, opacity: 1 }}
      transition={
        reduced
          ? { duration: 0.3, delay: 0 }
          : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
      style={style}
    />
  )
}

/* ─── Main SVG component ───────────────────────────────────────────── */
export function HeroPinSVG({ reduced: reducedProp }: { reduced?: boolean }) {
  const prefersReduced = useReducedMotion() ?? false
  const reduced = reducedProp ?? prefersReduced

  /*
   * ViewBox: 0 0 560 520
   * Pin teardrop centred at x=280, tip at y=480
   * Scene inside pin: buildings span roughly x=120–440, y=140–380
   * Pavement baseline at y=382
   */

  /* Timing buckets */
  const T = {
    pin: 0,           /* pin body fades in */
    baseline: 0.55,   /* pavement + building shells */
    shops: 0.75,      /* awning, Victorian, café details */
    details: 1.0,     /* windows, door, umbrella ribs */
    trees: 1.25,      /* left + right trees */
    people: 1.5,      /* two figures + dog */
  }

  return (
    <motion.div
      /* Drop-in spring entrance */
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -60, scale: reduced ? 1 : 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 180, damping: 16, mass: 1, delay: 0.08 }
      }
      style={{ transformOrigin: "50% 82%" }}
    >
      {/* Float loop */}
      <motion.div
        animate={reduced ? {} : { y: [0, -9, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
      >
        <svg
          viewBox="0 0 560 520"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Hand-drawn London neighbourhood scene inside an orange location pin"
          className="w-full h-auto select-none"
        >
          {/* ── 1. Pin teardrop body ──────────────────────────────── */}
          <motion.path
            d={`
              M 280 480
              C 252 445 140 340 140 240
              A 140 140 0 1 1 420 240
              C 420 340 308 445 280 480
              Z
            `}
            fill="#d96535"
            stroke="none"
            initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.55, delay: T.pin + 0.05, ease: [0.22, 1, 0.36, 1] }
            }
            style={{ transformOrigin: "280px 240px" }}
          />

          {/* ── 2. Inner white oval mask (creates space for scene) ── */}
          <motion.ellipse
            cx="280" cy="245" rx="118" ry="112"
            fill="#faf9f5"
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.3, delay: T.pin + 0.3 }
            }
          />

          {/* Clip path so scene stays inside the oval */}
          <defs>
            <clipPath id="pin-scene-clip">
              <ellipse cx="280" cy="245" rx="115" ry="109" />
            </clipPath>
          </defs>

          {/* ── 3. Scene — all clipped to oval ───────────────────── */}
          <g clipPath="url(#pin-scene-clip)">

            {/* Pavement baseline */}
            <DrawPath
              d="M 162 355 L 398 355"
              strokeWidth={2}
              delay={T.baseline}
              duration={0.6}
              reduced={reduced}
            />

            {/* ── Building shells (left→right draw) ─────────────── */}

            {/* Far-left building (low, 2-storey) */}
            <DrawPath d="M 165 355 L 165 295 L 202 295 L 202 355" delay={T.baseline + 0.05} reduced={reduced} />
            {/* Flat awning over far-left shop */}
            <DrawPath d="M 163 320 L 204 320" strokeWidth={2} delay={T.shops} duration={0.4} reduced={reduced} />
            {/* Awning valance zigzag */}
            <DrawPath d="M 163 320 Q 169 326 175 320 Q 181 326 187 320 Q 193 326 199 320 Q 204 326 204 320" strokeWidth={1.2} delay={T.shops + 0.08} duration={0.5} reduced={reduced} />

            {/* Narrow Victorian (tall) */}
            <DrawPath d="M 202 355 L 202 270 L 238 270 L 238 355" delay={T.baseline + 0.12} reduced={reduced} />
            {/* Victorian gable / pointed top */}
            <DrawPath d="M 200 272 L 220 252 L 240 272" strokeWidth={1.4} delay={T.shops + 0.05} duration={0.4} reduced={reduced} />
            {/* Victorian 1st floor window */}
            <DrawPath d="M 210 290 L 210 310 L 230 310 L 230 290 Z" strokeWidth={1.2} delay={T.details} duration={0.4} reduced={reduced} />
            {/* Window cross */}
            <DrawPath d="M 220 290 L 220 310 M 210 300 L 230 300" strokeWidth={0.8} delay={T.details + 0.08} duration={0.35} reduced={reduced} />

            {/* Centre café (wider, lower) */}
            <DrawPath d="M 238 355 L 238 300 L 322 300 L 322 355" delay={T.baseline + 0.2} reduced={reduced} />
            {/* Café sign board */}
            <DrawPath d="M 238 315 L 322 315" strokeWidth={1.8} delay={T.shops + 0.1} duration={0.4} reduced={reduced} />
            {/* Café door */}
            <DrawPath d="M 272 355 L 272 330 Q 280 325 288 330 L 288 355" strokeWidth={1.2} delay={T.details + 0.05} duration={0.4} reduced={reduced} />
            {/* Café left window */}
            <DrawPath d="M 244 320 L 244 352 L 268 352 L 268 320 Z" strokeWidth={1.1} delay={T.details + 0.1} duration={0.35} reduced={reduced} />
            {/* Café right window */}
            <DrawPath d="M 292 320 L 292 352 L 316 352 L 316 320 Z" strokeWidth={1.1} delay={T.details + 0.15} duration={0.35} reduced={reduced} />

            {/* Umbrella pole */}
            <DrawPath d="M 250 355 L 250 308" strokeWidth={1} delay={T.details + 0.2} duration={0.3} reduced={reduced} />
            {/* Umbrella canopy arc */}
            <DrawPath d="M 226 308 Q 238 292 250 308 Q 262 292 274 308" strokeWidth={1.3} delay={T.details + 0.28} duration={0.5} reduced={reduced} />

            {/* Outdoor table (small circle) */}
            <DrawPath d="M 232 348 Q 240 342 248 348" strokeWidth={1.1} delay={T.details + 0.35} duration={0.3} reduced={reduced} />
            {/* Table leg */}
            <DrawPath d="M 240 348 L 240 356" strokeWidth={0.9} delay={T.details + 0.4} duration={0.2} reduced={reduced} />
            {/* Chair suggestion */}
            <DrawPath d="M 226 344 L 228 356" strokeWidth={1} delay={T.details + 0.42} duration={0.2} reduced={reduced} />

            {/* Bay-window building (right of café) */}
            <DrawPath d="M 322 355 L 322 290 L 368 290 L 368 355" delay={T.baseline + 0.3} reduced={reduced} />
            {/* Bay window projection */}
            <DrawPath d="M 328 355 L 328 310 Q 345 300 362 310 L 362 355" strokeWidth={1.2} delay={T.shops + 0.2} duration={0.5} reduced={reduced} />
            {/* Bay window top */}
            <DrawPath d="M 326 312 Q 345 302 364 312" strokeWidth={1} delay={T.details + 0.25} duration={0.4} reduced={reduced} />

            {/* Far-right building */}
            <DrawPath d="M 368 355 L 368 295 L 396 295 L 396 355" delay={T.baseline + 0.38} reduced={reduced} />
            {/* Far-right window */}
            <DrawPath d="M 374 305 L 374 326 L 390 326 L 390 305 Z" strokeWidth={1.1} delay={T.details + 0.3} duration={0.35} reduced={reduced} />

            {/* ── Trees ─────────────────────────────────────────── */}

            {/* Left tree trunk */}
            <DrawPath d="M 175 355 L 175 330" strokeWidth={1.8} delay={T.trees} duration={0.3} reduced={reduced} />
            {/* Left tree canopy (rough circle) */}
            <DrawPath
              d="M 175 328 C 162 325 154 315 156 305 C 158 295 167 288 178 290 C 189 288 198 295 198 305 C 200 315 190 325 175 328 Z"
              strokeWidth={1.3}
              delay={T.trees + 0.1}
              duration={0.6}
              reduced={reduced}
            />
            {/* Left tree inner texture */}
            <DrawPath d="M 170 310 Q 175 305 180 312" strokeWidth={0.8} delay={T.trees + 0.45} duration={0.3} reduced={reduced} />

            {/* Right tree trunk */}
            <DrawPath d="M 378 355 L 378 328" strokeWidth={1.8} delay={T.trees + 0.08} duration={0.3} reduced={reduced} />
            {/* Right tree canopy */}
            <DrawPath
              d="M 378 326 C 365 323 357 313 359 303 C 361 293 370 286 381 288 C 392 286 401 293 401 303 C 403 313 393 323 378 326 Z"
              strokeWidth={1.3}
              delay={T.trees + 0.18}
              duration={0.6}
              reduced={reduced}
            />

            {/* ── People ────────────────────────────────────────── */}

            {/* Person 1 (left of centre, walking right) */}
            {/* Head */}
            <motion.circle
              cx="254" cy="339" r="5"
              stroke="#1a1a17" strokeWidth="1.3" fill="none"
              initial={reduced ? { opacity: 0 } : { scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduced ? { duration: 0.3 } : { duration: 0.25, delay: T.people, ease: "backOut" }}
              style={{ transformOrigin: "254px 339px" }}
            />
            {/* Body */}
            <DrawPath d="M 254 344 L 254 356" strokeWidth={1.3} delay={T.people + 0.05} duration={0.2} reduced={reduced} />
            {/* Arms */}
            <DrawPath d="M 248 349 L 260 349" strokeWidth={1.1} delay={T.people + 0.1} duration={0.2} reduced={reduced} />
            {/* Legs */}
            <DrawPath d="M 254 356 L 250 365 M 254 356 L 258 365" strokeWidth={1.1} delay={T.people + 0.14} duration={0.2} reduced={reduced} />

            {/* Person 2 (right of centre) */}
            <motion.circle
              cx="306" cy="338" r="5"
              stroke="#1a1a17" strokeWidth="1.3" fill="none"
              initial={reduced ? { opacity: 0 } : { scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduced ? { duration: 0.3 } : { duration: 0.25, delay: T.people + 0.06, ease: "backOut" }}
              style={{ transformOrigin: "306px 338px" }}
            />
            <DrawPath d="M 306 343 L 306 355" strokeWidth={1.3} delay={T.people + 0.12} duration={0.2} reduced={reduced} />
            <DrawPath d="M 300 348 L 312 347" strokeWidth={1.1} delay={T.people + 0.17} duration={0.2} reduced={reduced} />
            <DrawPath d="M 306 355 L 302 365 M 306 355 L 310 365" strokeWidth={1.1} delay={T.people + 0.2} duration={0.2} reduced={reduced} />

            {/* Dog on lead (right of person 2) */}
            {/* Lead from person2 hand */}
            <DrawPath d="M 312 348 Q 322 348 326 350" strokeWidth={0.9} delay={T.people + 0.25} duration={0.3} reduced={reduced} />
            {/* Dog body */}
            <DrawPath d="M 326 352 Q 336 348 342 352 Q 342 358 336 360 Q 330 360 326 356 Z" strokeWidth={1.1} delay={T.people + 0.32} duration={0.4} reduced={reduced} />
            {/* Dog head */}
            <DrawPath d="M 342 352 Q 348 350 350 354 Q 350 358 346 360 L 342 358" strokeWidth={1.1} delay={T.people + 0.38} duration={0.3} reduced={reduced} />
            {/* Dog tail */}
            <DrawPath d="M 326 354 Q 320 348 322 343" strokeWidth={0.9} delay={T.people + 0.44} duration={0.25} reduced={reduced} />
            {/* Dog legs */}
            <DrawPath d="M 330 360 L 330 366 M 336 360 L 336 366" strokeWidth={0.9} delay={T.people + 0.48} duration={0.2} reduced={reduced} />

          </g>
          {/* ─── end scene clip group ─────────────────────────────── */}

          {/* Pin tip dot (solid ink, outside clip) */}
          <motion.circle
            cx="280" cy="478" r="4"
            fill="#1a1a17"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduced
                ? { duration: 0.3 }
                : { duration: 0.25, delay: T.people + 0.6, ease: "backOut" }
            }
            style={{ transformOrigin: "280px 478px" }}
          />

        </svg>
      </motion.div>

      {/* Contact shadow */}
      <motion.span
        aria-hidden
        className="pointer-events-none block mx-auto -mt-1 w-[15%] h-[6px] rounded-full bg-ink/[0.13] blur"
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
