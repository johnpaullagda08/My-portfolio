"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "@/components/common";
import { CheckCircleIcon } from "@/components/icons";

export function CTA() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const pageLinks = [
    { name: "ABOUT", href: "#about" },
    { name: "SKILLS", href: "#skills" },
    { name: "PROJECTS", href: "#projects" },
  ];

  const socialLinks = [
    { name: "GITHUB", href: profile.github },
    { name: "LINKEDIN", href: profile.linkedin },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

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
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircleIcon size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus("idle")}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "error" && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg" role="alert">
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    </div>
                  )}

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
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={status === "loading"}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
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
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === "loading"}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
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
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === "loading"}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-8"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * By submitting this form, you agree to our{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      Policies
                    </Link>
                    .
                  </p>
                </form>
              )}
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
