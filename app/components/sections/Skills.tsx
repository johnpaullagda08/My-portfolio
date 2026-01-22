"use client";

import { ScrollReveal } from "@/components/common";
import { Badge } from "@/components/ui/badge";
import { skills } from "@/lib/data";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      items: skills.frontend,
    },
    {
      title: "Backend",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      items: skills.backend,
    },
    {
      title: "Databases",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      items: skills.databases,
    },
    {
      title: "Tools",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      items: skills.tools,
    },
  ];

  return (
    <section id="skills">
      <AuroraBackground className="!h-auto py-20 md:py-28">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
          <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Skills
            <span className="text-primary">.</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.1}>
              <div className="relative h-full rounded-xl">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative rounded-xl bg-card border border-border p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary">{category.icon}</div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        </div>
      </AuroraBackground>
    </section>
  );
}
