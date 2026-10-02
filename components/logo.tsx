"use client"

/* The wordmark. Lowercase Inter, very tight, with the champagne
   full stop carried over from the old identity as the one piece of
   continuity between the two brands. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`select-none font-sans font-medium leading-none tracking-[-0.05em] text-bone ${className}`}
    >
      lokl
      <span className="text-gold">.</span>
    </span>
  )
}
