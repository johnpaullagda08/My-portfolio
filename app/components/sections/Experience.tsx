"use client";

import { ScrollReveal } from "@/components/common";

export function Experience() {
  const whatIBuild = [
    "WEB APPLICATIONS",
    "ADMIN DASHBOARDS",
    "INVENTORY SYSTEMS",
    "EMAIL AUTOMATION",
    "DATABASE SYSTEMS",
    "API INTEGRATIONS",
    "MONITORING TOOLS",
  ];

  const techStack = [
    { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "shadcn/ui", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
    { name: "Claude Code", icon: "https://www.anthropic.com/images/icons/apple-touch-icon.png" },
  ];

  return (
    <section id="experience" className="py-20 md:py-28 bg-secondary/20">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <ScrollReveal>
          <p className="text-primary font-mono text-sm mb-4">[ EXPERIENCE ]</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground italic mb-16">
            EXPERTISE THAT DELIVERS
          </h2>
        </ScrollReveal>

        {/* What I Build */}
        <ScrollReveal delay={0.1}>
          <div className="mb-16">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">
              WHAT I BUILD
            </h3>
            <div className="flex flex-wrap gap-3">
              {whatIBuild.map((item) => (
                <span
                  key={item}
                  className="px-4 py-2 border border-border rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* How I Build It */}
        <ScrollReveal delay={0.2}>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">
              HOW I BUILD IT
            </h3>
            <div className="flex flex-wrap gap-6 md:gap-8">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="group flex flex-col items-center gap-2"
                  title={tech.name}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Work History */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 pt-16 border-t border-border">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-8">
              WORK HISTORY
            </h3>
            <div className="space-y-8">
              {/* HRD Singapore */}
              <div className="grid md:grid-cols-[200px_1fr] gap-4">
                <div>
                  <p className="text-primary font-mono text-sm">2018 - Present</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    HRD Singapore PTE LTD
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Full Stack Web Developer
                  </p>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Develop web applications for various departments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Maintain SQL, MySQL, NoSQL databases
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      Train team members in Full Stack JavaScript
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
