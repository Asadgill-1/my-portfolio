import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";

export default function Page() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Capabilities />
        <Process />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
