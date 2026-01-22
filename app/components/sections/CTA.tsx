"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/common";

export function CTA() {
  const pageLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
  ];

  const socialLinks = [
    { name: "GITHUB", href: profile.github },
    { name: "LINKEDIN", href: profile.linkedin },
  ];

  return (
    <section className="py-20 md:py-28 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center lg:text-left">
            LETS MAKE YOUR PROJECT{" "}
            <span className="text-primary">SPECIAL</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Left Side - Navigation & Social */}
          <ScrollReveal direction="left">
            <div>
              {/* Page Links */}
              <div className="mb-12">
                <p className="text-primary font-mono text-sm mb-4">[ PAGES ]</p>
                <div className="space-y-2">
                  {pageLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-primary font-mono text-sm mb-4">[ SOCIAL ]</p>
                <div className="space-y-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Middle - Contact Form */}
          <ScrollReveal>
            <div>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="cta-name"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    id="cta-name"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-email"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    id="cta-email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cta-message"
                    className="block text-sm text-muted-foreground mb-2"
                  >
                    TELL ME ABOUT YOUR PROJECT *
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    rows={3}
                    required
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full mt-8">
                  Send
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * By submitting this form, you agree to our{" "}
                  <Link href="/contact" className="text-primary hover:underline">
                    Policies
                  </Link>
                  .
                </p>
              </form>
            </div>
          </ScrollReveal>

          {/* Right Side - Image */}
          <ScrollReveal direction="right">
            <div className="hidden lg:flex items-center justify-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Decorative glow behind image */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />

                {/* Image container */}
                <div className="relative w-[300px] h-[400px]">
                  <Image
                    src="/contact-image.png"
                    alt="Contact illustration"
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
