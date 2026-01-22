"use client";

import { Section, ScrollReveal } from "@/components/common";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/data";
import { EmailIcon, PhoneIcon, LocationIcon, LinkedInIcon } from "@/components/icons";

export function Contact() {
  return (
    <Section id="contact" title="Get In Touch">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-muted-foreground text-lg mb-8">
            I&apos;m currently open to new opportunities and collaborations. Whether you
            have a question or just want to say hi, feel free to reach out!
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="lg">
              <a href={`mailto:${profile.email}`}>
                <EmailIcon size={20} className="mr-2" />
                Send Email
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon size={20} className="mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>
        </ScrollReveal>

        {/* Contact Info */}
        <ScrollReveal delay={0.2}>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-primary mb-2 flex justify-center">
                <EmailIcon size={24} />
              </div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground text-sm font-medium break-all">
                {profile.email}
              </p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-primary mb-2 flex justify-center">
                <PhoneIcon size={24} />
              </div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="text-foreground text-sm font-medium">{profile.phone}</p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-primary mb-2 flex justify-center">
                <LocationIcon size={24} />
              </div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-foreground text-sm font-medium">{profile.location}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  );
}
