"use client";

import { ScrollReveal } from "@/components/common";
import { Spotlight } from "@/components/ui/spotlight";
import {
  IconBrandVue,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandPhp,
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandMysql,
  IconBrandGit,
} from "@tabler/icons-react";
import { CodeIcon } from "@/components/icons";

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
    { name: "Vue.js", icon: IconBrandVue },
    { name: "React", icon: IconBrandReact },
    { name: "Next.js", icon: IconBrandNextjs },
    { name: "Node.js", icon: IconBrandNodejs },
    { name: "PHP", icon: IconBrandPhp },
    { name: "JavaScript", icon: IconBrandJavascript },
    { name: "TypeScript", icon: IconBrandTypescript },
    { name: "MySQL", icon: IconBrandMysql },
    { name: "Git", icon: IconBrandGit },
    { name: "shadcn/ui", icon: CodeIcon },
    { name: "Claude Code", icon: CodeIcon },
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
              {techStack.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div
                    key={tech.name}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                      <Icon className="w-full h-full" aria-hidden="true" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Work History */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20 pt-16 border-t border-border relative overflow-hidden rounded-2xl bg-card/50 p-8 md:p-12">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-8 relative z-10">
              WORK HISTORY
            </h3>
            <div className="space-y-8 relative z-10">
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
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
                      Develop web applications for various departments
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
                      Maintain SQL, MySQL, NoSQL databases
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1" aria-hidden="true">•</span>
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
