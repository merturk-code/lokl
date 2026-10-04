"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react"

export type Lang = "en" | "tr"

/* ═══════════════════════════════════════════════════════════════
   CONTENT
   Edit copy here only. `tr` is type-checked against `en`, so a
   missing or misspelled key fails the build instead of the page.
   Lines marked TODO need Mert's real figures before going live.
   ═══════════════════════════════════════════════════════════════ */

const en = {
  meta: { langName: "EN", switchTo: "Türkçe'ye geç" },

  nav: {
    links: [
      { label: "Services", href: "#services" },
      { label: "Clients", href: "#clients" },
      { label: "Process", href: "#process" },
    ],
    cta: "Start a project",
  },

  hero: {
    titleTop: "The brand you",
    titleAccent: "always meant to build",
    lede: "Lokl is a London agency building brands, websites, campaigns and apps for ambitious companies. London standards, wherever you trade.",
    primary: "Start a project",
    secondary: "Our clients",
  },

  marquee: { heading: "Companies we have worked with" },

  services: {
    label: "Services",
    titleTop: "Four disciplines,",
    titleAccent: "one room",
    lede: "Most companies stitch together a designer, an ads freelancer, a PR contact and a dev shop, then spend the year translating between them. We run all four ourselves, so the brand never argues with itself.",
    items: [
      {
        no: "01",
        title: "Websites & Rebranding",
        body: "We rebuild how a company looks, sounds and sells, then ship it as a site that loads fast and actually converts. Positioning and identity first, pixels second.",
        points: ["Brand identity & art direction", "Messaging & tone of voice", "Design and development", "Analytics and SEO from day one"],
      },
      {
        no: "02",
        title: "Digital Marketing",
        body: "Search, social and shopping campaigns measured against revenue, not impressions. Creative, media buying, testing and reporting handled end to end.",
        points: ["Google Ads", "Meta Ads & TikTok Ads", "Reporting you can read in a minute"],
      },
      {
        no: "03",
        title: "Public Relations",
        body: "The stories that get picked up, in the places your buyers already read. We build the narrative, then put your name in front of it.",
        points: ["Narrative and press positioning", "Media relations & outreach", "Launch and announcement plans", "Founder and executive profile"],
      },
      {
        no: "04",
        title: "App Creation",
        body: "Products designed, built and launched, with the marketing already attached. From the first sketch to a live App Store listing that ranks.",
        points: ["Product design & prototyping", "iOS and web development", "App Store launch & ASO", "Content and growth after launch"],
      },
    ],
  },



  process: {
    label: "Process",
    titleTop: "How the work",
    titleAccent: "actually runs",
    steps: [
      {
        no: "01",
        title: "Discovery",
        body: "We learn the business, the market and the numbers before anyone opens a design file. Competitors, buyers, channels, and what you actually need out of this.",
      },
      {
        no: "02",
        title: "Direction",
        body: "Positioning, naming where it is needed, art direction and the strategy the whole programme runs on. One document, agreed before anything is built.",
      },
      {
        no: "03",
        title: "Build",
        body: "Design and development in weekly cycles. Everything is reviewable in the browser or on your phone, so nothing is a surprise.",
      },
      {
        no: "04",
        title: "Launch & grow",
        body: "We ship, then run the campaigns, the press and the reporting. The brand keeps compounding instead of going quiet the week after launch.",
      },
    ],
  },

  cta: {
    label: "Start here",
    titleTop: "Let us build something",
    titleAccent: "worth talking about",
    lede: "Tell us the company, the market and what needs to change. You get a written view and a budget range back, not a sales call.",
    button: "Write to us",
    location: "London, United Kingdom",
  },

  footer: {
    tagline: "A London marketing and creative agency for companies that intend to be taken seriously.",
    servicesTitle: "Services",
    companyTitle: "Company",
    company: [
      { label: "Clients", href: "#clients" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
    /* TODO Mert: uncomment the registration line in footer.tsx once confirmed. */
    legal: "Lokl. London, United Kingdom.",
    rights: "All rights reserved.",
  },
}

const tr: typeof en = {
  meta: { langName: "TR", switchTo: "Switch to English" },

  nav: {
    links: [
      { label: "Hizmetler", href: "#services" },
      { label: "Referanslar", href: "#clients" },
      { label: "Süreç", href: "#process" },
    ],
    cta: "Projeyi başlatın",
  },

  hero: {
    titleTop: "Hep kurmak",
    titleAccent: "istediğiniz marka",
    lede: "Lokl, iddialı şirketler için marka, web sitesi, kampanya ve uygulama üreten bir Londra ajansı. Nerede iş yaparsanız yapın, Londra standardı.",
    primary: "Projeyi başlatın",
    secondary: "Referanslarımız",
  },

  marquee: { heading: "Daha önce çalıştığımız şirketler" },

  services: {
    label: "Hizmetler",
    titleTop: "Dört disiplin,",
    titleAccent: "tek çatı",
    lede: "Çoğu şirket bir tasarımcı, bir reklam freelancerı, bir PR ajansı ve bir yazılım firmasını yan yana getirir, sonra yılın kalanını aralarında tercümanlık yaparak geçirir. Dördünü de biz yürütüyoruz, böylece marka kendi içinde çelişmiyor.",
    items: [
      {
        no: "01",
        title: "Web Sitesi ve Rebranding",
        body: "Şirketin nasıl göründüğünü, nasıl konuştuğunu ve nasıl sattığını yeniden kuruyoruz. Sonra bunu hızlı açılan ve gerçekten dönüştüren bir siteye çeviriyoruz. Önce konumlandırma ve kimlik, sonra piksel.",
        points: ["Marka kimliği ve sanat yönetimi", "Mesaj ve marka dili", "Tasarım ve geliştirme", "İlk günden analitik ve SEO"],
      },
      {
        no: "02",
        title: "Dijital Pazarlama",
        body: "Gösterime göre değil ciroya göre ölçülen arama, sosyal ve alışveriş kampanyaları. Kreatif, medya satın alma, test ve raporlama baştan sona bizde.",
        points: ["Google Ads", "Meta Ads ve TikTok Ads", "Bir dakikada okunan raporlama"],
      },
      {
        no: "03",
        title: "Halkla İlişkiler",
        body: "Alıcılarınızın zaten okuduğu yerlerde karşılık bulan hikayeler. Önce anlatıyı kuruyoruz, sonra markanızı onun önüne koyuyoruz.",
        points: ["Anlatı ve basın konumlandırması", "Medya ilişkileri ve iletişim", "Lansman ve duyuru planları", "Kurucu ve yönetici görünürlüğü"],
      },
      {
        no: "04",
        title: "Uygulama Geliştirme",
        body: "Pazarlaması baştan bağlanmış şekilde tasarlanan, geliştirilen ve yayına alınan ürünler. İlk eskizden sıralamaya giren bir App Store sayfasına kadar.",
        points: ["Ürün tasarımı ve prototipleme", "iOS ve web geliştirme", "App Store lansmanı ve ASO", "Lansman sonrası içerik ve büyüme"],
      },
    ],
  },



  process: {
    label: "Süreç",
    titleTop: "İş gerçekte",
    titleAccent: "nasıl yürüyor",
    steps: [
      {
        no: "01",
        title: "Keşif",
        body: "Kimse bir tasarım dosyası açmadan önce işi, pazarı ve rakamları öğreniyoruz. Rakipler, alıcılar, kanallar ve bu işten gerçekte neye ihtiyacınız olduğu.",
      },
      {
        no: "02",
        title: "Yön",
        body: "Konumlandırma, gerekiyorsa isimlendirme, sanat yönetimi ve tüm programın üzerine kurulduğu strateji. Tek doküman, hiçbir şey yapılmadan önce onaylanmış.",
      },
      {
        no: "03",
        title: "Üretim",
        body: "Haftalık döngülerle tasarım ve geliştirme. Her şey tarayıcıda veya telefonunuzda incelenebilir, dolayısıyla hiçbir şey sürpriz olmuyor.",
      },
      {
        no: "04",
        title: "Lansman ve büyüme",
        body: "Yayına alıyoruz, sonra kampanyaları, basını ve raporlamayı yürütüyoruz. Marka lansmandan bir hafta sonra susmuyor, birikmeye devam ediyor.",
      },
    ],
  },

  cta: {
    label: "Buradan başlayın",
    titleTop: "Konuşulmaya değer",
    titleAccent: "bir şey kuralım",
    lede: "Bize şirketi, pazarı ve neyin değişmesi gerektiğini anlatın. Satış görüşmesi değil, yazılı bir değerlendirme ve bütçe aralığı geri dönüyor.",
    button: "Bize yazın",
    location: "Londra, Birleşik Krallık",
  },

  footer: {
    tagline: "Ciddiye alınmaya niyetli şirketler için bir Londra pazarlama ve kreatif ajansı.",
    servicesTitle: "Hizmetler",
    companyTitle: "Kurumsal",
    company: [
      { label: "Referanslar", href: "#clients" },
      { label: "Süreç", href: "#process" },
      { label: "İletişim", href: "#contact" },
    ],
    legal: "Lokl. Londra, Birleşik Krallık.",
    rights: "Tüm hakları saklıdır.",
  },
}

export const copy = { en, tr }
export type Copy = typeof en

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE STORE

   The chosen language lives in a tiny module-level store read through
   useSyncExternalStore rather than in an effect. That matters for two
   reasons: React uses the server snapshot ("en") while hydrating and
   only then swaps to the client snapshot, so a Turkish visitor never
   triggers a hydration mismatch, and nothing calls setState inside an
   effect, which React 19 flags as a cascading render.
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "lokl-lang"

let current: Lang | null = null
const listeners = new Set<() => void>()

function resolveInitial(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === "en" || saved === "tr") return saved
  } catch {
    /* private mode or blocked storage: fall through to the sniff */
  }
  try {
    if (navigator.language?.toLowerCase().startsWith("tr")) return "tr"
  } catch {
    /* no navigator: English it is */
  }
  return "en"
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function getSnapshot(): Lang {
  if (current === null) current = resolveInitial()
  return current
}

/* Rendered on the server and during hydration. English is the default
   so the markup search engines index stays English. */
function getServerSnapshot(): Lang {
  return "en"
}

function writeLang(next: Lang) {
  if (current === next) return
  current = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    /* non-fatal: the choice just will not survive a reload */
  }
  listeners.forEach((fn) => fn())
}

/* ═══════════════════════════════════════════════════════════════
   PROVIDER
   ═══════════════════════════════════════════════════════════════ */

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void; c: Copy }

const LangContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  /* Keep the document element in step for screen readers and for any
     language-aware typography. Syncing an external system, not state. */
  useEffect(() => {
    document.documentElement.lang = lang === "tr" ? "tr" : "en-GB"
  }, [lang])

  const setLang = useCallback((l: Lang) => writeLang(l), [])
  const toggle = useCallback(() => writeLang(getSnapshot() === "en" ? "tr" : "en"), [])

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, toggle, c: copy[lang] }),
    [lang, setLang, toggle],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>")
  return ctx
}

/** Shorthand for components that only need the copy tree. */
export function useCopy(): Copy {
  return useLang().c
}
