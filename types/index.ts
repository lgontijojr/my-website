export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export interface ProfileData {
  name: string;
  title: string;
  company: string;
  taglines: string[];
  image: string;
}

export interface Experience {
  company: string;
  positions: Position[];
}

export interface Position {
  title: string;
  current?: boolean;
  achievements: string[];
}

export interface NonProfitWork {
  title: string;
  achievements: string[];
}

export interface Education {
  institution: string;
  program: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  highlights: string[];
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface AboutSection {
  title: string;
  paragraphs: string[];
}

export interface ContactInfo {
  email: string;
  socialLinks: {
    github: string;
    linkedin: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
}
