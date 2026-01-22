import type { Profile, Skills, Experience, Project, NavLink } from "@/types";

export const profile: Profile = {
  name: "John Paul Lagda",
  title: "Full Stack Web Developer",
  email: "japs03081995@gmail.com",
  phone: "+639524839511",
  location: "Imus, Cavite, Philippines",
  github: "https://github.com/johnpaullagda08",
  linkedin: "https://www.linkedin.com/in/john-paul-lagda-7aa0451b2/",
  summary:
    "I am a web developer with a vast array of knowledge in different front end and back end technologies, responsive frameworks, and databases. Dedicated to perfecting my craft by learning from more seasoned developers, remaining humble, and continuously making strides to learn all that I can about development.",
};

export const skills: Skills = {
  frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "Vuetify", "Vue", "jQuery", "React"],
  backend: ["Node.js", "Express.js", "PHP"],
  databases: ["MySQL", "NoSQL", "MSSQL"],
  tools: ["VS Code", "GitLab", "GitHub", "NPM", "Yarn", "REST API"],
};

export const experience: Experience[] = [
  {
    company: "HRD Singapore PTE LTD",
    location: "Singapore",
    roles: [
      {
        title: "Software and Full Stack Web Developer",
        period: "January 2017 - Present",
        responsibilities: [
          "Develop web applications for various departments",
          "Select programming languages, tools, database and platforms",
          "Maintain SQL, MySQL, NoSQL databases",
          "Maintain all department systems",
          "Train team members in Full Stack JavaScript",
        ],
      },
      {
        title: "Autocad and Architrend Encoder",
        period: "May 2013 - December 2016",
        responsibilities: [
          "House Socket Plan Encoder and Checker",
          "Multi Process of Socket plan",
          "House Wire route Plan Encoder and Checker",
        ],
      },
    ],
  },
  {
    company: "DATACOM",
    location: "Imus, Cavite",
    roles: [
      {
        title: "Computer Programmer",
        period: "June 2011 - May 2013",
        responsibilities: [],
      },
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "homes-system",
    name: "Homes System",
    description: "Admin System for all departments of the company",
    tech: ["Vue", "Vuetify", "Node.js", "MySQL"],
    category: "vue",
    image: "/projects/homes-system.jpg",
  },
  {
    slug: "tachibana-rendering",
    name: "Tachibana Rendering System",
    description: "Automatic rendering of different PDF formats based on user requests for ICAD System",
    tech: ["Vue", "Vuetify", "Node.js", "MySQL"],
    category: "vue",
    image: "/projects/tachibana-rendering.jpg",
  },
  {
    slug: "ihs-qa-system",
    name: "IHS Question and Answer System",
    description: "Q&A platform to help developers with their systems",
    tech: ["Vue", "Vuetify", "Node.js", "MySQL"],
    category: "vue",
    image: "/projects/ihs-qa.jpg",
  },
  {
    slug: "awarding-system",
    name: "Awarding System",
    description: "Automatic PDF format generation for awards",
    tech: ["Vue", "Vuetify", "Node.js", "MySQL"],
    category: "vue",
    image: "/projects/awarding-system.jpg",
  },
  {
    slug: "mailing-monitoring",
    name: "Mailing Monitoring System",
    description: "Automate gathering of all plans and information with email sending",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/mailing-monitoring.jpg",
  },
  {
    slug: "error-guide",
    name: "Error Guide System",
    description: "Monitoring of errors in Autocad and Architrend",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/error-guide.jpg",
  },
  {
    slug: "denki-pattern",
    name: "Denki Pattern",
    description: "List of electrical items with specifications and auto email functionality",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/denki-pattern.jpg",
  },
  {
    slug: "kansen-proposal",
    name: "Kansen Proposal",
    description: "Automatic data gathering with auto update and email notifications",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/kansen-proposal.jpg",
  },
  {
    slug: "wiring-workguide",
    name: "Wiring Connection Workguide",
    description: "Process workguide for wiring connections",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/wiring-workguide.jpg",
  },
  {
    slug: "unit-wiring-supplies",
    name: "Unit Wiring Supplies System",
    description: "Inventory management system for unit wiring supplies",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/unit-wiring-supplies.jpg",
  },
  {
    slug: "re-email-henkou",
    name: "Re-Email Henkou System",
    description: "Email system with PDF attachment functionality",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/re-email-henkou.jpg",
  },
  {
    slug: "survey-system",
    name: "Survey System",
    description: "Survey platform for resignation and other company activities",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/survey-system.jpg",
  },
  {
    slug: "borrowing-system",
    name: "Borrowing System",
    description: "Monitoring and tracking of borrowed items",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/borrowing-system.jpg",
  },
  {
    slug: "unit-wiring-message",
    name: "Unit Wiring Message",
    description: "Messaging system for all staffs or specific teams",
    tech: ["PHP", "JavaScript", "jQuery", "MySQL"],
    category: "php",
    image: "/projects/unit-wiring-message.jpg",
  },
];

export const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
];
