"use client";

import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="JP Logo"
              width={40}
              height={28}
              className="object-contain"
            />
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
