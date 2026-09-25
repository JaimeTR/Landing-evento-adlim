import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Agenda from "@/components/Agenda";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import SiteBackground from "@/components/SiteBackground";
import BookingModalProvider from "@/components/BookingModalContext";

export default function Home() {
  return (
    <BookingModalProvider>
      <div className="flex min-h-screen flex-col">
        <Nav />
        <main className="relative flex flex-1 flex-col overflow-hidden">
          <SiteBackground />
          <Hero />
          <About />
          <div className="flex flex-col gap-24 py-10 sm:gap-28 sm:py-20">
            <Agenda />
            <Pricing />
          </div>
        </main>
        <Footer />
      </div>
    </BookingModalProvider>
  );
}
