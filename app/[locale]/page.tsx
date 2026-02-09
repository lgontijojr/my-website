import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { GitHubContributions } from "@/components/github-contributions";
import { fetchGitHubContributions } from "@/lib/github";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lgontijojr.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPortuguese = locale === "pt-BR";

  return {
    title: isPortuguese
      ? "Luiz Gontijo | Senior Software Engineer na Netflix"
      : "Luiz Gontijo | Senior Software Engineer at Netflix",
    description: isPortuguese
      ? "Luiz Gontijo é um Senior Software Engineer na Netflix com 7+ anos de experiência em automação, QA e desenvolvimento full stack."
      : "Luiz Gontijo is a Senior Software Engineer at Netflix with 7+ years of experience in automation, QA, and full stack development.",
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        "pt-BR": `${baseUrl}/pt-BR`,
      },
    },
    openGraph: {
      title: isPortuguese
        ? "Luiz Gontijo | Senior Software Engineer na Netflix"
        : "Luiz Gontijo | Senior Software Engineer at Netflix",
      description: isPortuguese
        ? "De faxineiro a engenheiro na Netflix. Senior Software Engineer com 7+ anos de experiência em automação e desenvolvimento full stack."
        : "From janitor to Netflix engineer. Senior Software Engineer with 7+ years in automation and full stack development.",
      url: `${baseUrl}/${locale}`,
      locale: isPortuguese ? "pt_BR" : "en_US",
      type: "profile",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Luiz Gontijo - Senior Software Engineer at Netflix",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Luiz Gontijo | Senior Software Engineer at Netflix",
      description:
        "From janitor to Netflix engineer. Senior Software Engineer with 7+ years of experience.",
      images: [`${baseUrl}/og-image.png`],
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");
  const contributionData = await fetchGitHubContributions();

  const taglines = [t("taglines.0"), t("taglines.1"), t("taglines.2")];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        {/* Profile Image */}
        <div className="relative flex-shrink-0 animate-fade-in-up">
          <div className="relative h-64 w-64 overflow-hidden rounded-full md:h-80 md:w-80 lg:h-[400px] lg:w-[400px]">
            {/* Gradient border effect */}
            <div className="gradient-bg absolute -inset-1 rounded-full opacity-75 blur-sm" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-border/50 bg-card">
              <Image
                src="/images/profile.png"
                alt="Luiz Gontijo - Senior Software Engineer at Netflix"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 400px"
              />
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-blue-400/20 blur-3xl" />
        </div>

        {/* Text Content */}
        <div className="flex max-w-2xl flex-col items-center text-center lg:items-start lg:text-left">
          {/* Role badge */}
          <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t("role")} @ {t("company")}
          </div>

          {/* Greeting */}
          <h1 className="animate-fade-in-up text-display-sm font-bold tracking-tight delay-100 md:text-display lg:text-display-lg">
            {t("greeting")} <span className="gradient-text">Luiz Gontijo</span>
          </h1>

          {/* Taglines */}
          <div className="mt-8 animate-fade-in-up space-y-4 delay-200">
            {taglines.map((tagline, index) => (
              <p key={index} className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {tagline}
              </p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex animate-fade-in-up flex-col gap-4 delay-300 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="gradient-bg group text-background transition-opacity hover:opacity-90"
            >
              <Link href="/resume" className="gap-2">
                {t("cta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border/50 transition-all hover:border-primary/30 hover:bg-secondary/50"
            >
              <Link href="/contact">{tCommon("getInTouch")}</Link>
            </Button>
          </div>

          {/* Stats or social proof */}
          <div className="delay-400 mt-12 flex animate-fade-in-up items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
              <span>Netflix</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-cyan-400" />
              <span>Slack</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-blue-400" />
              <span>Airtable</span>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Contributions */}
      {contributionData && (
        <div className="mt-16 animate-fade-in-up delay-500">
          <GitHubContributions data={contributionData} />
        </div>
      )}
    </section>
  );
}
