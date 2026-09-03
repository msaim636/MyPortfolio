import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import TrustedBrands from "./sections/TrustedBrands";
import About from "./sections/About";
import Services from "./sections/Services";
import Projects from "./sections/Projects";
import BlackTransition from "./sections/BlackTransition";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Nav />
      <main>
        <Hero />
        <TrustedBrands />
        <About />
        <Services />
        <Projects />
        <BlackTransition />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
