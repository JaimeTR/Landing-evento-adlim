import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Agenda from "@/components/Agenda";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex flex-1 flex-col justify-center gap-32 py-6">
        <Hero />
        <About />
        <Agenda />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
