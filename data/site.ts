import type { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Luiz Gontijo",
  title: "Luiz Gontijo | Senior Test Engineer",
  description:
    "Portfolio of Luiz Gontijo - Senior Test Engineer at Netflix. Building quality into every product.",
  url: "https://lgontijojr.com",
  links: {
    github: "https://github.com/lgontijojr",
    linkedin: "https://linkedin.com/in/lgontijojr",
    email: "lgontijojr@gmail.com",
  },
};

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Resume", href: "/resume" },
  { title: "Contact", href: "/contact" },
];
