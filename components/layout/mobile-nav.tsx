"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Home, User, FileText, FolderKanban, Mail, Github, Linkedin } from "lucide-react";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { siteConfig } from "@/data/site";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navItems = [
  { key: "home", href: "/", icon: Home },
  { key: "about", href: "/about", icon: User },
  { key: "resume", href: "/resume", icon: FileText },
  { key: "projects", href: "/projects", icon: FolderKanban },
  { key: "contact", href: "/contact", icon: Mail },
] as const;

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-[280px] flex-col border-l-emerald-500/20 bg-background/95 p-0 backdrop-blur-xl sm:w-[320px]"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border/50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400">
            <span className="text-lg font-bold text-background">LG</span>
          </div>
          <div>
            <p className="font-semibold text-foreground">{siteConfig.name}</p>
            <p className="text-xs text-muted-foreground">{tCommon("softwareEngineer")}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {tCommon("navigation")}
          </p>
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "text-emerald-400")} />
                  {t(item.key)}
                  {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border/50 p-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {tCommon("connect")}
          </p>
          <div className="flex gap-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${siteConfig.links.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Accent line */}
          <div className="mt-4 flex items-center justify-center gap-1">
            <div className="h-0.5 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
