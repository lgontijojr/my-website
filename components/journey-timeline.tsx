"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Briefcase, GraduationCap, Rocket, Building2, Sparkles, Globe } from "lucide-react";

interface JourneyMilestone {
  year: string;
  title: string;
  icon: React.ElementType;
}

const milestones: JourneyMilestone[] = [
  { year: "2012", title: "Brazil → USA", icon: Globe },
  { year: "2014", title: "First Steps", icon: Briefcase },
  { year: "2016", title: "Apple", icon: Building2 },
  { year: "2017", title: "Year Up", icon: GraduationCap },
  { year: "2017", title: "Slack", icon: Building2 },
  { year: "2021", title: "Airtable", icon: Rocket },
  { year: "2023", title: "Tango", icon: Sparkles },
  { year: "2024", title: "Netflix", icon: MapPin },
];

interface JourneyTimelineProps {
  paragraphs: string[];
}

export function JourneyTimeline({ paragraphs }: JourneyTimelineProps) {
  const tCommon = useTranslations("common");
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [paragraphs.length]);

  // Map paragraphs to milestones (2 milestones per paragraph roughly)
  const getMilestonesForParagraph = (index: number) => {
    const milestonesPerParagraph = Math.ceil(milestones.length / paragraphs.length);
    const start = index * milestonesPerParagraph;
    const end = Math.min(start + milestonesPerParagraph, milestones.length);
    return milestones.slice(start, end);
  };

  return (
    <div className="relative">
      {/* Progress indicator - fixed on desktop */}
      <div className="sticky top-24 z-10 mb-8 hidden md:block">
        <div className="flex items-center justify-center gap-2">
          {paragraphs.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                sectionRefs.current[index]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-emerald-400"
                  : "w-2 bg-border hover:bg-emerald-400/50"
              }`}
              aria-label={`Go to chapter ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Chapters */}
      <div className="space-y-24 md:space-y-32">
        {paragraphs.map((paragraph, index) => {
          const chapterMilestones = getMilestonesForParagraph(index);
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={`transition-opacity duration-500 ${
                isActive ? "opacity-100" : "opacity-40"
              }`}
            >
              {/* Chapter header */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-4xl font-bold text-emerald-400/20 md:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              </div>

              {/* Milestones for this chapter */}
              <div className="mb-6 flex flex-wrap gap-3">
                {chapterMilestones.map((milestone, mIndex) => {
                  const Icon = milestone.icon;
                  return (
                    <div
                      key={mIndex}
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5"
                    >
                      <Icon className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-xs font-medium text-emerald-400">{milestone.year}</span>
                      <span className="text-xs text-muted-foreground">{milestone.title}</span>
                    </div>
                  );
                })}
              </div>

              {/* Paragraph content */}
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                {paragraph}
              </p>
            </div>
          );
        })}
      </div>

      {/* Journey complete */}
      <div className="mt-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">
            {tCommon("journeyContinues")}
          </span>
        </div>
      </div>
    </div>
  );
}
