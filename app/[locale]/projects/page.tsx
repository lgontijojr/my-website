import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ExternalLink, Github, Globe, User, Pencil } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lgontijojr.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPortuguese = locale === "pt-BR";

  const title = isPortuguese ? "Projetos" : "Projects";
  const description = isPortuguese
    ? "Projetos pessoais de Luiz Gontijo. Websites responsivos desenvolvidos com React, Next.js, TypeScript e Firebase."
    : "Personal projects by Luiz Gontijo. Responsive websites built with React, Next.js, TypeScript, and Firebase.";

  return {
    title,
    description,
    keywords: [
      "Luiz Gontijo Projects",
      "React Developer",
      "Next.js Portfolio",
      "TypeScript Projects",
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/projects`,
      languages: {
        en: `${baseUrl}/en/projects`,
        "pt-BR": `${baseUrl}/pt-BR/projects`,
      },
    },
    openGraph: {
      title: `${title} | Luiz Gontijo`,
      description,
      url: `${baseUrl}/${locale}/projects`,
      locale: isPortuguese ? "pt_BR" : "en_US",
      type: "website",
    },
  };
}

const projects = [
  {
    title: "Ink-y",
    description:
      "A tattoo-focused social platform emphasizing user experience and performance optimization. Connect with artists, discover designs, and share your ink journey.",
    icon: Pencil,
    tech: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "Social platform features",
      "Artist portfolios",
      "Performance optimized",
      "User-centric design",
    ],
    status: "live",
    links: {
      live: "#",
    },
  },
  {
    title: "Personal Website",
    description:
      "A modern portfolio showcasing my skills, experience, and projects. Built from scratch with a focus on performance, accessibility, and clean design.",
    icon: User,
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    features: [
      "Internationalization (EN/PT-BR)",
      "Dark/Light mode",
      "SEO optimized",
      "Responsive design",
    ],
    status: "active",
    links: {
      live: "https://lgontijojr.com",
      github: "https://github.com/lgontijojr/my-website",
    },
  },
];

const stats = [
  { key: "projectsBuilt", value: "2+" },
  { key: "technologies", value: "10+" },
];

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");

  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Luiz Gontijo",
    description: "Portfolio of web development projects",
    author: {
      "@type": "Person",
      name: "Luiz Gontijo",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
      />
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-16 animate-fade-in-up text-center">
            <Badge className="mb-4 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
              {t("badge")}
            </Badge>
            <h1 className="text-display-sm font-bold tracking-tight md:text-display">
              {t("title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
            <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-emerald-500" />
          </div>

          {/* Stats */}
          <div className="mb-16 grid animate-fade-in-up grid-cols-2 gap-4 delay-100">
            {stats.map((stat) => (
              <div
                key={stat.key}
                className="rounded-xl border border-border/50 bg-card/50 p-6 text-center backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t(`stats.${stat.key}`)}</div>
              </div>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="animate-fade-in-up space-y-8 delay-200">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-emerald-500/30"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
                        <project.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">{project.title}</h2>
                        <div className="mt-1 flex items-center gap-2">
                          {project.status === "active" && (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                              </span>
                              {tCommon("activeDevelopment")}
                            </span>
                          )}
                          {project.status === "live" && (
                            <span className="text-xs text-muted-foreground">
                              <Globe className="mr-1 inline h-3 w-3" />
                              {tCommon("live")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.links.github && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View on GitHub"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.links.live && project.links.live !== "#" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-9 w-9 text-muted-foreground hover:text-foreground"
                        >
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View live site"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="mb-6 text-muted-foreground">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-sm font-medium text-foreground">
                      {tCommon("techStack")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-border/50 bg-card/30 px-2 py-0.5 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-foreground">
                      {tCommon("keyFeatures")}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 animate-fade-in-up text-center delay-300">
            <Card className="border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <h2 className="mb-2 text-xl font-semibold">{t("cta.title")}</h2>
              <p className="mb-6 text-muted-foreground">{t("cta.description")}</p>
              <div className="flex justify-center gap-4">
                <Button asChild className="bg-emerald-500 text-background hover:bg-emerald-600">
                  <a href="mailto:lgontijojr@gmail.com">{t("cta.contact")}</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/lgontijojr" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
