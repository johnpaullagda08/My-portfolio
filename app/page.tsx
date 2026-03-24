import { Navbar, Footer } from "@/app/components/layout";
import { Hero, About, Skills, Experience, Projects, CTA } from "@/app/components/sections";
import { Preloader, ScrollToTop } from "@/components/common";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CTA />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
