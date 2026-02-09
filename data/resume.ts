import type { Experience, NonProfitWork, Education, Project, Language } from "@/types";

export const experiences: Experience[] = [
  {
    company: "Netflix",
    positions: [
      {
        title: "Senior Test Engineer",
        current: true,
        achievements: [
          "Building innovative testing solutions to ensure seamless user experiences across diverse platforms.",
        ],
      },
    ],
  },
  {
    company: "Tango Technologies",
    positions: [
      {
        title: "Senior Software Engineer",
        achievements: [
          "Led manual testing for dozens of large-scale features, collaborating with 18 engineers across teams.",
          "Implemented Playwright for browser extension testing and created a tool for visual testing millions of snapshots monthly.",
          "Designed end-to-end coverage strategies, enhancing QA efficiency.",
        ],
      },
    ],
  },
  {
    company: "Airtable",
    positions: [
      {
        title: "Senior Software Engineer - Automation",
        achievements: [
          "Introduced and scaled Cypress for CI pipelines, improving testing continuity.",
          "Built a 15+ member automation team, overseeing hiring and strategy.",
          "Authored numerous E2E tests to validate robust code integration.",
        ],
      },
    ],
  },
  {
    company: "Slack",
    positions: [
      {
        title: "Senior Software Engineer - Automation",
        achievements: [
          "Helped pioneer and implement Cypress testing framework across Slack, including a Slack integration to alert and report test failures.",
          "Wrote multiple E2E test cases using JavaScript, Ruby, and Python.",
          "Worked with Jenkins and Sauce Labs to run tests across multiple OS and browsers.",
          "Wrote dozens of React components as well as unit tests.",
        ],
      },
      {
        title: "Quality Engineer - Web",
        achievements: [
          "Led QA efforts for the calls feature, testing audio, video, and screen-sharing features across multiple OS's and devices.",
          "Authored automation and manual cases weekly.",
          "Collaborated with Applause (testing company) to improve the calls product.",
        ],
      },
      {
        title: "Quality Engineer - iOS",
        achievements: ["Ran weekly regressions on the latest iOS application."],
      },
    ],
  },
];

export const nonProfitWork: NonProfitWork[] = [
  {
    title: "JavaScript Instructor - Year Up",
    achievements: [
      "Taught JavaScript for a year to 20+ students, covering fundamentals to advanced concepts.",
      "Prepared engaging lessons and assignments, fostering creativity and skill growth.",
    ],
  },
  {
    title: "Guest Speaker - Year Up and Emerging Leaders Program",
    achievements: [
      "Delivered motivational talks to high school students about career goals and professional development.",
      "Shared industry experiences and practical advice for navigating career paths.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "General Assembly",
    program: "JavaScript & TypeScript Bootcamp",
    description: "10-week intensive program",
  },
  {
    institution: "Year Up",
    program: "Technical Training & Career Development",
    description:
      "Intensive program with 250 corporate partners, graduating 1,500 students annually across ten cities. Includes college-level courses, professional training, and a six-month internship.",
  },
];

export const projects: Project[] = [
  {
    title: "Lote 17 Restaurant Website",
    description:
      "Developed a fully-responsive restaurant website using JavaScript, CSS, and React.",
    highlights: ["Implemented real-time updates and robust hosting through Google Firebase."],
  },
  {
    title: "Maysa Tattoo Studio Website",
    description:
      "Crafted an interactive website for a tattoo artist and studio owner using JavaScript, CSS, and React.",
    highlights: ["Leveraged Google Firebase for hosting, providing seamless reliability."],
  },
  {
    title: "Personal Website",
    description: "Designed and created a portfolio showcasing skills, projects, and experiences.",
    highlights: [
      "Built with Next.js, TypeScript, and shadcn/ui for a modern, performant experience.",
    ],
  },
];

export const languages: Language[] = [
  { name: "Portuguese", proficiency: "Native or bilingual proficiency" },
  { name: "English", proficiency: "Native or bilingual proficiency" },
  { name: "Spanish", proficiency: "Limited working proficiency" },
];
