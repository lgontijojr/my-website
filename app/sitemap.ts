import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lgontijojr.com";

  const routes = ["", "/about", "/resume", "/projects", "/contact"];
  const locales = ["en", "pt-BR"];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            "pt-BR": `${baseUrl}/pt-BR${route}`,
          },
        },
      });
    }
  }

  return sitemap;
}
