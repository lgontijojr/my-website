"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";

const CAREER_START_DATE = new Date("2017-08-01T00:00:00");

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeElapsed(startDate: Date): TimeElapsed {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days, hours, minutes, seconds };
}

interface TimeUnitProps {
  value: number;
  label: string;
  padLength?: number;
}

function TimeUnit({ value, label, padLength = 2 }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/30 px-3 py-2 sm:px-4 sm:py-3">
          <span className="font-mono text-2xl font-bold tabular-nums text-foreground sm:text-4xl md:text-5xl">
            {String(value).padStart(padLength, "0")}
          </span>
        </div>
        <div className="absolute -bottom-0.5 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      </div>
      <span className="mt-2 text-[10px] font-medium uppercase tracking-widest text-emerald-400/70 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center self-start pt-3 sm:pt-4">
      <span className="text-2xl font-bold text-emerald-500/50 sm:text-4xl md:text-5xl">:</span>
    </div>
  );
}

interface ExperienceCounterProps {
  label: string;
}

export function ExperienceCounter({ label }: ExperienceCounterProps) {
  const t = useTranslations("experience");
  const [time, setTime] = useState<TimeElapsed | null>(null);

  useEffect(() => {
    setTime(calculateTimeElapsed(CAREER_START_DATE));

    const interval = setInterval(() => {
      setTime(calculateTimeElapsed(CAREER_START_DATE));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <Card className="border-border/50 bg-card/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-center">
          <span className="text-3xl font-bold text-foreground">7+ Years</span>
        </div>
        <div className="mt-2 text-center text-sm text-muted-foreground">{label}</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-4 flex items-center justify-center gap-2 sm:mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-emerald-500/30" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-emerald-500/30 to-emerald-500/30" />
        </div>

        {/* Time Display */}
        <div className="flex items-start justify-center gap-2 sm:gap-3 md:gap-4">
          <TimeUnit value={time.years} label={t("years")} padLength={1} />
          <TimeUnit value={time.months} label={t("months")} />
          <TimeUnit value={time.days} label={t("days")} />

          <div className="mx-1 sm:mx-2" />

          <TimeUnit value={time.hours} label={t("hours")} />
          <Separator />
          <TimeUnit value={time.minutes} label={t("min")} />
          <Separator />
          <TimeUnit value={time.seconds} label={t("sec")} />
        </div>

        {/* Footer accent */}
        <div className="mt-4 flex items-center justify-center gap-1 sm:mt-6">
          <div className="h-1 w-1 rounded-full bg-emerald-500/50" />
          <div className="h-1 w-2 rounded-full bg-emerald-500/30" />
          <div className="h-1 w-1 rounded-full bg-emerald-500/50" />
        </div>
      </div>
    </Card>
  );
}
