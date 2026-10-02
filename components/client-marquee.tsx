"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import { useCopy } from "@/lib/i18n"
import { Reveal } from "@/components/reveal"

/* ═══════════════════════════════════════════════════════════════
   CLIENTS
   The only place on the page where past clients appear. Names
   only, no description of the work: the point is recognition, not
   a case study.

   Everything renders monochrome and brightens on hover. That is
   deliberate. A row of logos in their own brand colours turns into
   a fruit salad and drags attention away from the page; normalising
   them is what makes a client strip look expensive.

   THREE WAYS TO ADD A CLIENT, in order of preference:
     logo  a file in public/logos. White or single-colour, since the
           background is near black. SVG best, else transparent PNG
           around 400px wide.
     node  inline SVG, for marks drawn with currentColor so they
           pick up the monochrome treatment for free.
     style a typographic wordmark, the stand-in until a real file
           arrives.
   ═══════════════════════════════════════════════════════════════ */

/* Mola's mark, lifted from the Mola site and recoloured to
   currentColor so it sits in the same ink as everything else. */
function MolaMark() {
  return (
    <span className="flex shrink-0 items-center gap-2.5">
      <svg viewBox="0 0 64 64" className="h-[2.25rem] w-[2.25rem]" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="3.2">
          <circle cx="32" cy="20" r="9.5" />
          <circle cx="40.5" cy="23.5" r="9.5" />
          <circle cx="44" cy="32" r="9.5" />
          <circle cx="40.5" cy="40.5" r="9.5" />
          <circle cx="32" cy="44" r="9.5" />
          <circle cx="23.5" cy="40.5" r="9.5" />
          <circle cx="20" cy="32" r="9.5" />
          <circle cx="23.5" cy="23.5" r="9.5" />
        </g>
      </svg>
      <span className="font-sans text-[1.9rem] font-medium tracking-[-0.04em]">Mola</span>
    </span>
  )
}

type Client = {
  name: string
  logo?: { src: string; w: number; h: number; className?: string }
  node?: ReactNode
  style?: string
}

const CLIENTS: Client[] = [
  {
    name: "MSI",
    /* Converted from the red original by dropping hue and lifting the
       result, rather than flattening every pixel to one tone. A flat
       recolour would have erased the dragon inside the shield; this
       keeps it, carried by tone instead of colour. */
    logo: { src: "/logos/msi.png", w: 200, h: 68, className: "h-[1.9rem]" },
  },
  {
    name: "Londoner Cars",
    logo: { src: "/logos/londonercars.png", w: 269, h: 115, className: "h-[3rem]" },
  },
  { name: "Mola", node: <MolaMark /> },
  {
    name: "Bocan",
    /* Supplied as near-black artwork, recoloured to bone so it is
       visible on this background. */
    logo: { src: "/logos/bocan.png", w: 282, h: 96, className: "h-[2.05rem]" },
  },
]

function Separator() {
  return <span aria-hidden className="mx-12 h-5 w-px shrink-0 bg-line md:mx-16" />
}

function ClientItem({ c }: { c: Client }) {
  if (c.logo) {
    return (
      <Image
        src={c.logo.src}
        alt={c.name}
        width={c.logo.w}
        height={c.logo.h}
        className={`${c.logo.className ?? "h-8"} w-auto shrink-0 opacity-70 transition-opacity duration-500 hover:opacity-100`}
      />
    )
  }

  return (
    <span className="group/item shrink-0 cursor-default px-1">
      <span
        className={`${c.style ?? ""} flex items-center whitespace-nowrap text-ash/65 transition-colors duration-500 group-hover/item:text-bone`}
      >
        {c.node ?? c.name}
      </span>
    </span>
  )
}

/** One half of the loop. Rendered twice by the track so it can slide
 *  exactly -50% and start over without a visible seam. */
function ClientRun({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex items-center" aria-hidden={ariaHidden}>
      {[0, 1, 2].map((pass) =>
        CLIENTS.map((c) => (
          <span key={`${pass}-${c.name}`} className="flex items-center">
            <ClientItem c={c} />
            <Separator />
          </span>
        )),
      )}
    </div>
  )
}

export function ClientMarquee() {
  const c = useCopy()

  return (
    <section
      id="clients"
      className="relative z-10 scroll-mt-24 border-y border-line/70 bg-void/40 py-16 backdrop-blur-[2px] md:py-24"
    >
      <Reveal className="mb-12 px-6">
        <h2 className="text-center text-[0.95rem] text-ash">{c.marquee.heading}</h2>
      </Reveal>

      <div className="marquee-mask edge-fade overflow-hidden">
        <div className="marquee-track">
          <ClientRun />
          <ClientRun ariaHidden />
        </div>
      </div>
    </section>
  )
}
