import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, GraduationCap, Heart, Globe, Code, Layers, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExperienceCounter } from "@/components/experience-counter";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lgontijojr.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPortuguese = locale === "pt-BR";

  const title = isPortuguese ? "Currículo" : "Resume";
  const description = isPortuguese
    ? "Currículo profissional de Luiz Gontijo: experiência na Netflix, Slack, Airtable e Tango Technologies. Especialista em automação de testes, Cypress, Playwright e engenharia de qualidade."
    : "Professional resume of Luiz Gontijo: experience at Netflix, Slack, Airtable, and Tango Technologies. Expert in test automation, Cypress, Playwright, and quality engineering.";

  return {
    title,
    description,
    keywords: [
      "Luiz Gontijo Resume",
      "Senior Software Engineer Resume",
      "Netflix Engineer",
      "Test Automation Expert",
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}/resume`,
      languages: {
        en: `${baseUrl}/en/resume`,
        "pt-BR": `${baseUrl}/pt-BR/resume`,
      },
    },
    openGraph: {
      title: `${title} | Luiz Gontijo`,
      description,
      url: `${baseUrl}/${locale}/resume`,
      locale: isPortuguese ? "pt_BR" : "en_US",
      type: "profile",
    },
  };
}

const skills = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Node.js",
  "React",
  "Playwright",
  "Cypress",
  "Jenkins CI",
  "GitHub Actions",
  "TestRail",
  "Retool",
  "E2E Automation",
  "Visual Regression",
  "API Testing",
];

const sectionIds = [
  { id: "experience", icon: Briefcase },
  { id: "nonprofit", icon: Heart },
  { id: "education", icon: GraduationCap },
  { id: "languages", icon: Globe },
  { id: "projects", icon: Code },
];

export default async function ResumePage() {
  const t = await getTranslations("resume");
  const tCommon = await getTranslations("common");
  const tExperience = await getTranslations("experience");

  const jobs = [
    {
      key: "netflix",
      current: true,
      period: "July 2024 - Present",
      achievementCount: 4,
      logo: (
        <Image
          src="/images/netflix-logo.png"
          alt="Netflix"
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
      ),
    },
    {
      key: "tango",
      period: "Jan 2023 - Present",
      achievementCount: 3,
      logo: (
        <Image
          src="/images/tango-logo.png"
          alt="Tango"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-contain"
        />
      ),
    },
    {
      key: "airtable",
      period: "June 2021 - Dec 2022",
      achievementCount: 4,
      logo: (
        <svg viewBox="0 0 200 170" className="h-10 w-auto">
          <path
            fill="#FCB400"
            d="M90.039 12.368 24.079 39.66c-3.667 1.519-3.63 6.729.062 8.192l66.235 26.266a24.58 24.58 0 0 0 17.913 0l66.236-26.266c3.69-1.463 3.729-6.673.06-8.191l-65.96-27.293a24.58 24.58 0 0 0-18.586 0"
          />
          <path
            fill="#18BFFF"
            d="M105.312 88.46v65.617c0 3.12 3.147 5.258 6.048 4.108l73.806-28.648a4.42 4.42 0 0 0 2.79-4.108V59.813c0-3.121-3.147-5.258-6.048-4.108l-73.806 28.648a4.42 4.42 0 0 0-2.79 4.108"
          />
          <path
            fill="#F82B60"
            d="m88.078 91.846-21.904 10.576-2.224 1.075-46.238 22.155c-2.93 1.414-6.672-.722-6.672-3.978V60.088c0-1.178.604-2.195 1.414-2.96a5 5 0 0 1 1.12-.84c1.104-.663 2.68-.84 4.02-.31L87.71 83.76c3.564 1.414 3.844 6.408.368 8.087"
          />
          <path
            fill="#8B8B8D"
            d="m88.078 91.846-21.904 10.576-53.72-45.295a5 5 0 0 1 1.12-.839c1.104-.663 2.68-.84 4.02-.31L87.71 83.76c3.564 1.414 3.844 6.408.368 8.087"
          />
        </svg>
      ),
    },
    {
      key: "slack",
      hasPositions: true,
      positionAchievementCounts: [4, 2],
      period: "Aug 2017 - May 2021",
      logo: (
        <svg viewBox="0 0 54 54" className="h-10 w-auto">
          <g fill="none" fillRule="evenodd">
            <path
              fill="#E01E5A"
              d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386"
            />
            <path
              fill="#36C5F0"
              d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387"
            />
            <path
              fill="#2EB67D"
              d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386"
            />
            <path
              fill="#ECB22E"
              d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387"
            />
          </g>
        </svg>
      ),
    },
  ];

  const resumeSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luiz Gontijo",
    jobTitle: "Senior Software Engineer",
    worksFor: { "@type": "Organization", name: "Netflix" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeSchema) }}
      />
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-12 animate-fade-in-up text-center">
            <Badge className="mb-4 border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
              {t("badge")}
            </Badge>
            <h1 className="text-display-sm font-bold tracking-tight md:text-display">
              {t("title")}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>

          {/* Quick Navigation */}
          <nav className="delay-50 mb-12 flex animate-fade-in-up flex-wrap justify-center gap-2">
            {sectionIds.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-foreground"
              >
                <section.icon className="h-4 w-4" />
                {t(`sections.${section.id}`)}
              </a>
            ))}
          </nav>

          {/* Experience Counter */}
          <div className="mb-16 flex animate-fade-in-up justify-center delay-100">
            <ExperienceCounter label={tExperience("label")} />
          </div>

          {/* Skills Section */}
          <div className="mb-16 animate-fade-in-up delay-150">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">{tCommon("techStack")}</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-border/50 bg-card/30 px-3 py-1.5 text-sm transition-colors hover:border-emerald-500/30 hover:bg-emerald-500/10"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="my-12 h-px bg-border/50" />

          {/* Experience Section */}
          <section id="experience" className="animate-fade-in-up scroll-mt-24 delay-200">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">{t("experience")}</h2>
            </div>

            <div className="space-y-6">
              {jobs.map((job) => (
                <Card
                  key={job.key}
                  className={`relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-emerald-500/30 ${
                    job.current ? "border-l-4 border-l-emerald-500" : ""
                  }`}
                >
                  {job.current && (
                    <div className="absolute right-4 top-4">
                      <Badge className="border-0 bg-emerald-500 text-background">
                        {t("current")}
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-6">
                    {/* Company Header */}
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex-shrink-0">{job.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">
                          {t(`jobs.${job.key}.company`)}
                        </h3>
                        {!job.hasPositions && (
                          <p className="font-medium text-emerald-400">
                            {t(`jobs.${job.key}.title`)}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-muted-foreground">{job.period}</p>
                      </div>
                    </div>

                    {/* Achievements */}
                    {job.hasPositions && job.positionAchievementCounts ? (
                      <div className="mt-6 space-y-6">
                        {job.positionAchievementCounts.map((count, posIndex) => (
                          <div key={posIndex} className="relative border-l-2 border-border/50 pl-6">
                            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-emerald-500 bg-emerald-500/20" />
                            <h4 className="font-semibold text-foreground">
                              {t(`jobs.${job.key}.positions.${posIndex}.title`)}
                            </h4>
                            <ul className="mt-3 space-y-2">
                              {Array.from({ length: count }, (_, achIndex) => (
                                <li
                                  key={achIndex}
                                  className="flex items-start gap-3 text-muted-foreground"
                                >
                                  <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                                  <span>
                                    {t(
                                      `jobs.${job.key}.positions.${posIndex}.achievements.${achIndex}`
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="mt-4 space-y-2">
                        {Array.from({ length: job.achievementCount || 0 }, (_, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                            <span>{t(`jobs.${job.key}.achievements.${achIndex}`)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="my-12 h-px bg-border/50" />

          {/* Non-Profit & Education Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* Non-Profit Work */}
            <section id="nonprofit" className="animate-fade-in-up scroll-mt-24 delay-300">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Heart className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">{t("nonProfit")}</h2>
              </div>

              <div className="space-y-4">
                {[0, 1].map((index) => (
                  <Card
                    key={index}
                    className="border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-emerald-500/30"
                  >
                    <CardContent className="p-5">
                      <h3 className="mb-3 font-semibold text-foreground">
                        {t(`nonProfitWork.${index}.title`)}
                      </h3>
                      <ul className="space-y-2">
                        {[0, 1].map((achIndex) => {
                          const achievement = t(`nonProfitWork.${index}.achievements.${achIndex}`);
                          if (achievement.includes("nonProfitWork.")) {
                            return null;
                          }
                          return (
                            <li
                              key={achIndex}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <ChevronRight className="mt-1 h-3 w-3 flex-shrink-0 text-emerald-400" />
                              <span>{achievement}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Education */}
            <section id="education" className="delay-400 animate-fade-in-up scroll-mt-24">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold">{t("education")}</h2>
              </div>

              <div className="space-y-4">
                {[0, 1].map((index) => (
                  <Card
                    key={index}
                    className="border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-emerald-500/30"
                  >
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground">
                        {t(`educationItems.${index}.institution`)}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-emerald-400">
                        {t(`educationItems.${index}.program`)}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t(`educationItems.${index}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <div className="my-12 h-px bg-border/50" />

          {/* Languages */}
          <section id="languages" className="animate-fade-in-up scroll-mt-24 delay-500">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Globe className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">{t("languages")}</h2>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { emoji: "🇧🇷", index: 0 },
                { emoji: "🇺🇸", index: 1 },
                { emoji: "🇪🇸", index: 2 },
              ].map((lang) => (
                <div
                  key={lang.index}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-5 py-3 backdrop-blur-sm transition-colors hover:border-emerald-500/30"
                >
                  <span className="text-2xl">{lang.emoji}</span>
                  <div>
                    <span className="block font-semibold text-foreground">
                      {t(`languageItems.${lang.index}.name`)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t(`languageItems.${lang.index}.proficiency`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="my-12 h-px bg-border/50" />

          {/* Projects */}
          <section id="projects" className="delay-600 animate-fade-in-up scroll-mt-24">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Code className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">{t("projects")}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[0, 1].map((index) => (
                <Card
                  key={index}
                  className="group border-border/50 bg-card/50 backdrop-blur-sm transition-colors hover:border-emerald-500/30"
                >
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="font-semibold text-foreground">
                        {t(`projectItems.${index}.title`)}
                      </h3>
                      <Code className="h-4 w-4 text-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t(`projectItems.${index}.description`)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
