"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  const t = useTranslations("errors.error");

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        {/* Page Title */}
        <div className="animate-fade-in-up">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-red-400/10">
              <AlertTriangle className="h-10 w-10 text-red-400" />
            </div>
          </div>
          <h1 className="text-8xl font-bold tracking-tight text-red-400">500</h1>
          <h2 className="mt-4 text-display-sm font-bold tracking-tight md:text-display">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-red-400/50" />
        </div>

        {/* CTA Card */}
        <div className="mt-12 animate-fade-in-up delay-100">
          <Card className="glass overflow-hidden border-border/50">
            <CardContent className="flex flex-col gap-4 p-8 sm:flex-row sm:justify-center">
              <Button
                onClick={reset}
                size="lg"
                className="gap-2 bg-red-500 text-white transition-opacity hover:bg-red-600"
              >
                <RefreshCw className="h-4 w-4" />
                {t("tryAgain")}
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  {t("backHome")}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
