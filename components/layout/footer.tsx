"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { siteConfig } from "@/data/site";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    name: "Email",
    href: `mailto:${siteConfig.links.email}`,
    icon: Mail,
  },
];

export function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <p>
              © {currentYear} <span className="gradient-text font-medium">Luiz Gontijo</span>.{" "}
              {t("copyright")}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
                  >
                    <a
                      href={link.href}
                      target={link.name !== "Email" ? "_blank" : undefined}
                      rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
                      aria-label={link.name}
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Yttrium Labs */}
        <div className="mt-6 flex justify-center border-t border-border/30 pt-6">
          <p className="text-xs text-muted-foreground/70">
            {t("createdBy")} <span className="font-medium text-muted-foreground">Yttrium Labs</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
