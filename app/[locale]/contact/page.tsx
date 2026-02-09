import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lgontijojr.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPortuguese = locale === "pt-BR";

  const title = isPortuguese ? "Contato" : "Contact";
  const description = isPortuguese
    ? "Entre em contato com Luiz Gontijo. Conecte-se via email, GitHub ou LinkedIn para oportunidades, colaborações ou apenas para dizer oi."
    : "Get in touch with Luiz Gontijo. Connect via email, GitHub, or LinkedIn for opportunities, collaborations, or just to say hi.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        "pt-BR": `${baseUrl}/pt-BR/contact`,
      },
    },
    openGraph: {
      title: `${title} | Luiz Gontijo`,
      description,
      url: `${baseUrl}/${locale}/contact`,
      locale: isPortuguese ? "pt_BR" : "en_US",
      type: "website",
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  const socialLinks = [
    {
      name: "GitHub",
      href: siteConfig.links.github,
      icon: Github,
      description: "@lgontijojr",
      color: "hover:border-emerald-400/50 hover:bg-emerald-400/5",
    },
    {
      name: "LinkedIn",
      href: siteConfig.links.linkedin,
      icon: Linkedin,
      description: "in/lgontijojr",
      color: "hover:border-cyan-400/50 hover:bg-cyan-400/5",
    },
  ];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Person",
      name: "Luiz Gontijo",
      email: siteConfig.links.email,
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          {/* Page Title */}
          <div className="animate-fade-in-up">
            <h1 className="text-display-sm font-bold tracking-tight md:text-display">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
            <div className="gradient-bg mx-auto mt-6 h-1 w-24 rounded-full" />
          </div>

          {/* Email CTA */}
          <div className="mt-12 animate-fade-in-up delay-100">
            <Card className="glass overflow-hidden border-border/50">
              <CardContent className="p-8">
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                </div>
                <h2 className="mb-2 text-xl font-semibold">{t("email")}</h2>
                <Button
                  asChild
                  size="lg"
                  className="gradient-bg mt-4 text-background transition-opacity hover:opacity-90"
                >
                  <a href={`mailto:${siteConfig.links.email}`} className="gap-2">
                    {t("emailAddress")}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Social Links */}
          <div className="mt-8 animate-fade-in-up delay-200">
            <h3 className="mb-6 text-lg font-medium">{t("connect")}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-all ${link.color}`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-secondary/80">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{link.name}</p>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Availability status */}
          <div className="mt-12 animate-fade-in-up delay-300">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-400">{tCommon("openToOpportunities")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
