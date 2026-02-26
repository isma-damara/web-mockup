import Navbar from "@workspace/ui/sections/Navbar";
import FAQ from "@workspace/ui/sections/FAQ";
import Footer from "@workspace/ui/sections/Footer";
import WhatsAppButton from "@workspace/ui/sections/WhatsAppButton";
import CookieBanner from "@workspace/ui/sections/CookieBanner";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900">FAQ</h1>
          <p className="mt-2 text-sm text-slate-600">Jawaban cepat untuk pertanyaan yang sering ditanyakan.</p>
        </section>
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
}
