"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { ContributionData } from "@/lib/github";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";

interface GitHubContributionsProps {
  data: ContributionData | null;
}

const levelColors: Record<string, string> = {
  NONE: "bg-emerald-950/40",
  FIRST_QUARTILE: "bg-emerald-800",
  SECOND_QUARTILE: "bg-emerald-600",
  THIRD_QUARTILE: "bg-emerald-500",
  FOURTH_QUARTILE: "bg-emerald-400",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubContributions({ data }: GitHubContributionsProps) {
  const t = useTranslations("github");
  const tCommon = useTranslations("common");
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(10);
  const [gap, setGap] = useState(3);

  useEffect(() => {
    if (!data || !containerRef.current) {
      return;
    }

    const updateSize = () => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const availableWidth = container.offsetWidth - 24; // Account for day labels
      const weekCount = data.weeks.length;

      // Calculate optimal cell size and gap to fill width
      // Total width = (weekCount * cellSize) + ((weekCount - 1) * gap)
      // We want gap to be about 20-30% of cell size
      const totalUnits = weekCount + (weekCount - 1) * 0.25;
      const unitSize = availableWidth / totalUnits;

      const newCellSize = Math.floor(unitSize);
      const newGap = Math.floor(unitSize * 0.25);

      setCellSize(Math.max(8, Math.min(14, newCellSize)));
      setGap(Math.max(2, Math.min(4, newGap)));
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 pb-3 sm:p-5 sm:pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 sm:h-9 sm:w-9">
            <Github className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">{t("activity")}</h3>
            <p className="text-xs text-muted-foreground">
              {data.totalContributions.toLocaleString()} {t("contributionsLastYear")}
            </p>
          </div>
        </div>
        <a
          href="https://github.com/lgontijojr"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
        >
          {tCommon("viewProfile")}
        </a>
      </div>

      <div ref={containerRef} className="px-4 pb-4 sm:px-5 sm:pb-5">
        {/* Month labels */}
        <div className="relative mb-1 ml-6 flex h-4 justify-between text-[10px] text-muted-foreground">
          {data.weeks.map((week, weekIndex) => {
            const firstDay = week.contributionDays[0];
            if (!firstDay) {
              return <span key={weekIndex} className="w-0" />;
            }

            const date = new Date(firstDay.date);
            const isFirstOfMonth = date.getDate() <= 7;
            const monthLabel = isFirstOfMonth ? months[date.getMonth()] : "";

            return (
              <span key={weekIndex} className="w-0 overflow-visible whitespace-nowrap">
                {monthLabel}
              </span>
            );
          })}
        </div>

        {/* Grid container */}
        <div className="flex">
          {/* Day labels */}
          <div
            className="mr-1 flex flex-col text-[10px] text-muted-foreground"
            style={{
              width: "20px",
              gap: `${gap}px`,
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div
                key={day}
                className="flex items-center justify-end pr-1"
                style={{ height: `${cellSize}px` }}
              >
                {day === 1 ? "M" : day === 3 ? "W" : day === 5 ? "F" : ""}
              </div>
            ))}
          </div>

          {/* Contribution grid */}
          <div className="flex flex-1 justify-between">
            {data.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col" style={{ gap: `${gap}px` }}>
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    className={`rounded-sm ${levelColors[day.contributionLevel]} transition-all hover:scale-110 hover:ring-1 hover:ring-emerald-400`}
                    style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
                    title={`${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          className="mr-2 mt-5 flex items-center justify-end text-[10px] text-muted-foreground"
          style={{ gap: `${gap + 2}px` }}
        >
          <span>{tCommon("less")}</span>
          {["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"].map(
            (level) => (
              <div
                key={level}
                className={`rounded-sm ${levelColors[level]}`}
                style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
              />
            )
          )}
          <span>{tCommon("more")}</span>
        </div>
      </div>
    </Card>
  );
}
