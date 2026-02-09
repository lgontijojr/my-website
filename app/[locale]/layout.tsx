import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";

import { inter, jetbrainsMono } from "@/lib/fonts";
import { locales, type Locale } from "@/i18n/config";
import { siteConfig } from "@/data/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TooltipProvider } from "@/components/ui/tooltip";

import "../globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lgontijojr.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Luiz Gontijo | Senior Software Engineer at Netflix",
    template: "%s | Luiz Gontijo",
  },
  description:
    "Luiz Gontijo is a Senior Software Engineer at Netflix with 7+ years of experience in automation, QA, and full stack development. Previously at Slack, Airtable, and Tango Technologies.",
  keywords: [
    "Luiz Gontijo",
    "Senior Software Engineer",
    "Netflix Engineer",
    "Test Automation",
    "Quality Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "Cypress",
    "Playwright",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "San Francisco",
    "Bay Area",
    "E2E Testing",
    "End to End Testing",
    "QA Engineer",
    "Automation Engineer",
    "Node.js",
    "Python",
    "Slack Engineer",
    "Airtable Engineer",
    "Brazilian Engineer",
    "Tech Lead",
    "CI/CD",
    "Jenkins",
    "GitHub Actions",
    "Visual Regression Testing",
    "API Testing",
    "Software Quality",
  ],
  authors: [{ name: "Luiz Gontijo", url: baseUrl }],
  creator: "Luiz Gontijo",
  publisher: "Luiz Gontijo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      en: `${baseUrl}/en`,
      "pt-BR": `${baseUrl}/pt-BR`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    url: baseUrl,
    siteName: "Luiz Gontijo",
    title: "Luiz Gontijo | Senior Software Engineer at Netflix",
    description:
      "Senior Software Engineer at Netflix with 7+ years in automation and full stack development. From janitor to Netflix engineer.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Luiz Gontijo - Senior Software Engineer at Netflix",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luiz Gontijo | Senior Software Engineer at Netflix",
    description:
      "Senior Software Engineer at Netflix. 7+ years in automation and full stack. Previously at Slack, Airtable, and Tango.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@lgontijojr",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
  category: "technology",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Luiz Gontijo",
    givenName: "Luiz",
    familyName: "Gontijo",
    jobTitle: "Senior Software Engineer",
    description:
      "Senior Software Engineer at Netflix with 7+ years of experience in test automation, quality engineering, and full stack development.",
    image: `${baseUrl}/images/profile.png`,
    worksFor: {
      "@type": "Organization",
      name: "Netflix",
      url: "https://netflix.com",
    },
    url: baseUrl,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    email: siteConfig.links.email,
    knowsLanguage: [
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "Portuguese", alternateName: "pt" },
      { "@type": "Language", name: "Spanish", alternateName: "es" },
    ],
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "General Assembly",
        url: "https://generalassemb.ly",
      },
      { "@type": "EducationalOrganization", name: "Year Up", url: "https://yearup.org" },
    ],
    knowsAbout: [
      "Test Automation",
      "Software Engineering",
      "Quality Assurance",
      "Cypress",
      "Playwright",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "CI/CD",
    ],
    nationality: { "@type": "Country", name: "Brazil" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco Bay Area",
      addressCountry: "US",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Luiz Gontijo Portfolio",
    url: baseUrl,
    author: { "@type": "Person", name: "Luiz Gontijo" },
    inLanguage: ["en", "pt-BR"],
  };

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <TooltipProvider>
              <div className="relative flex min-h-screen flex-col">
                {/* Background effects */}
                <div className="pointer-events-none fixed inset-0 z-0">
                  <div className="radial-gradient absolute inset-0" />
                  <div className="grid-pattern absolute inset-0 opacity-50" />
                </div>

                <Header />
                <main className="relative z-10 flex-1">{children}</main>
                <Footer />
              </div>
            </TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
