import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  const t = useTranslations("errors.notFound");

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        {/* Page Title */}
        <div className="animate-fade-in-up">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-400/10">
              <Search className="h-10 w-10 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-8xl font-bold tracking-tight text-emerald-400">404</h1>
          <h2 className="mt-4 text-display-sm font-bold tracking-tight md:text-display">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
          <div className="gradient-bg mx-auto mt-6 h-1 w-24 rounded-full" />
        </div>

        {/* CTA Card */}
        <div className="mt-12 animate-fade-in-up delay-100">
          <Card className="glass overflow-hidden border-border/50">
            <CardContent className="p-8">
              <Button
                asChild
                size="lg"
                className="gradient-bg text-background transition-opacity hover:opacity-90"
              >
                <Link href="/" className="gap-2">
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
