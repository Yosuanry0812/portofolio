import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import EasterEgg from "@/components/EasterEgg";
import BackgroundFX from "@/components/BackgroundFX";
import Snow from "@/components/Snow";
import CursorTrail from "@/components/CursorTrail";

export default function Home() {
  return (
    <>
      <Navbar />
      <BackgroundFX />
      <Snow />
      <CursorTrail />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <EasterEgg />
    </>
  );
}
