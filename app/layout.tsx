import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common";
import { getYearsOfExperience } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = `Full Stack Web Developer with ${getYearsOfExperience()}+ years of experience building web applications with Vue, React, Node.js, and PHP.`;

export const metadata: Metadata = {
  title: "John Paul Lagda | Full Stack Web Developer",
  description,
  keywords: ["Full Stack Developer", "Web Developer", "Vue", "React", "Node.js", "PHP", "JavaScript", "TypeScript"],
  authors: [{ name: "John Paul Lagda" }],
  creator: "John Paul Lagda",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://johnpaullagda.dev",
    siteName: "John Paul Lagda Portfolio",
    title: "John Paul Lagda | Full Stack Web Developer",
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "John Paul Lagda - Full Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Paul Lagda | Full Stack Web Developer",
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
