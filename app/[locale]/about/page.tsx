import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/journey-timeline";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lgontijojr.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPortuguese = locale === "pt-BR";

  const title = isPortuguese ? "Sobre Mim" : "About Me";
  const description = isPortuguese
    ? "Conheça a história de Luiz Gontijo: de imigrante brasileiro trabalhando como faxineiro a Senior Test Engineer na Netflix. Uma jornada de determinação e crescimento."
    : "Learn about Luiz Gontijo's journey from a Brazilian immigrant working as a janitor to Senior Test Engineer at Netflix. A story of determination and growth.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        "pt-BR": `${baseUrl}/pt-BR/about`,
      },
    },
    openGraph: {
      title: `${title} | Luiz Gontijo`,
      description,
      url: `${baseUrl}/${locale}/about`,
      locale: isPortuguese ? "pt_BR" : "en_US",
      type: "profile",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Luiz Gontijo - About Me",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Luiz Gontijo`,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  const paragraphs = [t("paragraphs.0"), t("paragraphs.1"), t("paragraphs.2"), t("paragraphs.3")];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Person",
      name: "Luiz Gontijo",
      description: paragraphs.join(" "),
      nationality: { "@type": "Country", name: "Brazil" },
      birthPlace: { "@type": "Place", name: "Goiânia, Brazil" },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Page Title */}
          <div className="mb-16 animate-fade-in-up text-center">
            <h1 className="text-display-sm font-bold tracking-tight md:text-display">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
          </div>

          {/* Interactive Journey Timeline */}
          <JourneyTimeline paragraphs={paragraphs} />
        </div>
      </section>
    </>
  );
}
