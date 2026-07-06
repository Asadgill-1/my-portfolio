import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
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
