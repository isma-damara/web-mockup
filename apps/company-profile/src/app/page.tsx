import Navbar from "@workspace/ui/sections/Navbar";
import Hero from "@workspace/ui/sections/Hero";
import ClientMarquee from "@workspace/ui/sections/ClientMarquee";
import About from "@workspace/ui/sections/About";
import Services from "@workspace/ui/sections/Services";
import Portfolio from "@workspace/ui/sections/Portfolio";
import Team from "@workspace/ui/sections/Team";
import Testimonials from "@workspace/ui/sections/Testimonials";
import FAQ from "@workspace/ui/sections/FAQ";
import Contact from "@workspace/ui/sections/Contact";
import Footer from "@workspace/ui/sections/Footer";
import WhatsAppButton from "@workspace/ui/sections/WhatsAppButton";
import CookieBanner from "@workspace/ui/sections/CookieBanner";

export default function CompanyProfilePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientMarquee />
        <About />
        <Services />
        <Portfolio />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
