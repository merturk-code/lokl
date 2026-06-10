import Link from "next/link"

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-parchment border-t border-hairline px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="font-sans font-medium text-[28px] text-ink tracking-[-0.04em] leading-none mb-3">
              lokl<span className="text-signal">.</span>
            </div>
            <p className="text-stone text-sm leading-relaxed font-light max-w-xs">
              A small studio building beautiful websites for local businesses.
              Made in London.
            </p>
          </div>

          {/* Studio */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-stone mb-5">
              Studio
            </h4>
            <ul className="space-y-3 text-sm text-stone font-light">
              <li>
                <Link href="#what-we-do" className="hover:text-ink transition-colors">
                  What we do
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-ink transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-ink transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-stone mb-5">
              Get in touch
            </h4>
            <ul className="space-y-3 text-sm text-stone font-light">
              <li>
                
                  href="mailto:mert@loklstudio.com"
                  className="hover:text-ink transition-colors"
                >
                  mert@loklstudio.com
                </a>
              </li>
            </ul>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-5">
              {[
                { Icon: IconLinkedIn, label: "LinkedIn", href: "https://www.linkedin.com/company/lokl-studio" },
              ].map(({ Icon, label, href }) => (
                
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone hover:text-ink transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-stone/70 font-light">
            © 2026 Lokl. All rights reserved.
          </p>
          <p className="text-xs text-stone/50 font-light">
            London, UK
          </p>
        </div>
      </div>
    </footer>
  )
}
