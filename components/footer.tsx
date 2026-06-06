import Link from "next/link"

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function IconX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
            <div className="font-sans font-medium text-[17px] text-ink tracking-[-0.04em] leading-none mb-3">
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
                <a
                  href="mailto:hello@lokl.studio"
                  className="hover:text-ink transition-colors"
                >
                  hello@lokl.studio
                </a>
              </li>
            </ul>
            {/* Social icons */}
            <div className="flex items-center gap-4 mt-5">
              {[
                { Icon: IconInstagram, label: "Instagram", href: "https://instagram.com" },
                { Icon: IconFacebook,  label: "Facebook",  href: "https://facebook.com"  },
                { Icon: IconX,         label: "X",         href: "https://x.com"         },
              ].map(({ Icon, label, href }) => (
                <a
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
