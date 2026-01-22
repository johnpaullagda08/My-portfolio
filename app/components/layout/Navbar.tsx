"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/data";
import { SCROLL_THRESHOLD, ANIMATION_DURATION, SPRING_CONFIG } from "@/lib/constants";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

// Hydration-safe mounted check
const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD.navbarBg);

      // Calculate scroll progress
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Determine active section
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + SCROLL_THRESHOLD.sectionActive;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: ANIMATION_DURATION.normal }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-primary/20 w-full">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="JP Logo"
                width={50}
                height={35}
                className="object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", ...SPRING_CONFIG.activeSection }}
                      />
                    )}
                  </a>
                );
              })}

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && (
                  theme === "dark" ? (
                    <SunIcon size={20} />
                  ) : (
                    <MoonIcon size={20} />
                  )
                )}
              </button>

              <Button asChild size="sm">
                <Link href="/contact">Let&apos;s Talk</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <CloseIcon size={24} />
              ) : (
                <MenuIcon size={24} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden pt-20"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-xl transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}

              {/* Mobile Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {mounted && (
                  theme === "dark" ? (
                    <>
                      <SunIcon size={20} />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <MoonIcon size={20} />
                      <span>Dark Mode</span>
                    </>
                  )
                )}
              </button>

              <Button asChild className="mt-4">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Let&apos;s Talk
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
