"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";
import { EmailIcon, PhoneIcon, LocationIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="JP Logo"
                width={50}
                height={35}
                className="object-contain"
              />
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto">
            {/* Section Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-mono text-sm mb-4"
            >
              [ CONTACT ]
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              let&apos;s make your
              <br />
              project <span className="text-primary">special</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-lg mb-12 max-w-xl"
            >
              Have a project in mind? Let&apos;s discuss how we can work together to
              bring your ideas to life.
            </motion.p>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {status === "success" && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-500 text-sm">
                        Message sent successfully! I&apos;ll get back to you soon.
                      </p>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={status === "loading"}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={status === "loading"}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm text-muted-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={status === "loading"}
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none disabled:opacity-50"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy.
                  </p>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                {/* Direct Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Direct Contact
                  </h3>
                  <div className="space-y-4">
                    <a
                      href={`mailto:${profile.email}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <EmailIcon size={20} />
                      </div>
                      <span>{profile.email}</span>
                    </a>

                    <a
                      href={`tel:${profile.phone}`}
                      className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <PhoneIcon size={20} />
                      </div>
                      <span>{profile.phone}</span>
                    </a>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                        <LocationIcon size={20} />
                      </div>
                      <span>{profile.location}</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Connect With Me
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      aria-label="GitHub"
                    >
                      <GitHubIcon size={20} />
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon size={20} />
                    </a>
                  </div>
                </div>

                {/* Availability */}
                <div className="p-6 bg-secondary rounded-lg border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-foreground font-medium">
                      Available for work
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I&apos;m currently accepting new projects and collaborations. Let&apos;s
                    build something great together!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <p className="text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
