"use client";

import Image from "next/image";
import { Section, ScrollReveal } from "@/components/common";
import { profile, getYearsOfExperience } from "@/lib/data";

export function About() {
  const stats = [
    { label: "Years Experience", value: `${getYearsOfExperience()}+` },
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies", value: "15+" },
  ];

  return (
    <Section id="about" title="About Me">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Photo */}
        <ScrollReveal direction="left">
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-secondary rounded-lg overflow-hidden border border-border">
              <Image
                src="/profile.jpg"
                alt={profile.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary rounded-lg -z-10" />
          </div>
        </ScrollReveal>

        {/* Content */}
        <div>
          <ScrollReveal direction="right">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {profile.summary}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I believe that my understanding of problem solving and complex algorithms
              are skills that have and will continue to contribute to my overall success
              as a developer.
            </p>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 md:p-4 bg-secondary rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Section>
  );
}
