import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { Preloader } from "./components/Preloader";
import { ScrollToTop } from "./components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
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
