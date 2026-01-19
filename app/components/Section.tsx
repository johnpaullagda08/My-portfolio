import { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {title && (
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
              {title}
              <span className="text-primary">.</span>
            </h2>
          </ScrollReveal>
        )}
        {children}
      </div>
    </section>
  );
}
