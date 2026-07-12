import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.loklstudio.com/sitemap.xml",
    host: "https://www.loklstudio.com",
  }
}
