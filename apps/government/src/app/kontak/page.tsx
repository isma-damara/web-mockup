import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero, SectionHeader } from "../components/GovPrimitives";
import { Button } from "@workspace/ui/ui/button";
import { Input } from "@workspace/ui/ui/input";
import { Textarea } from "@workspace/ui/ui/textarea";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Kontak" }]} />
      <PageHero
        badge="📞 Kontak"
        title="Hubungi Kami"
        description="Ada pertanyaan, saran, atau butuh bantuan? Kami siap melayani Anda."
      />
      <ContentWrap className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader label="📝 Form" title="Kirim Pesan" />
            <div className="card-base p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[13px] font-semibold">Nama Lengkap *</label>
                  <Input placeholder="Nama Anda" />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-semibold">Email *</label>
                  <Input placeholder="email@contoh.com" />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-[13px] font-semibold">Nomor Telepon</label>
                <Input placeholder="08xx-xxxx-xxxx" />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-[13px] font-semibold">Subjek *</label>
                <select className="h-10 w-full rounded-md border border-[var(--gov-border)] bg-white px-3 text-[13px] text-[var(--gov-text)]">
                  <option value="">-- Pilih Subjek --</option>
                  {[
                    "Pertanyaan Umum",
                    "Informasi Layanan",
                    "Kerjasama",
                    "Media & Pers",
                    "Lainnya",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-[13px] font-semibold">Pesan *</label>
                <Textarea rows={5} placeholder="Tulis pesan Anda di sini..." />
              </div>
              <Button className="mt-5 w-full rounded-xl bg-[var(--gov-blue)] text-white">📤 Kirim Pesan</Button>
            </div>
          </div>

          <div>
            <SectionHeader label="📍 Info" title="Informasi Kontak" />
            <div className="space-y-4">
              {[
                {
                  icon: "🏛️",
                  label: "Alamat Kantor",
                  value: "Balaikota Kota Contoh",
                  desc: "Jl. Merdeka No. 1, Kec. Pusat · Kota Contoh 12345",
                },
                {
                  icon: "☎️",
                  label: "Telepon",
                  value: "(021) 123-4567",
                  desc: "Senin–Jumat, 08.00–16.00 WIB",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "info@kotacontoh.go.id",
                  desc: "Balasan dalam 1×24 jam kerja",
                },
                {
                  icon: "📠",
                  label: "Fax",
                  value: "(021) 123-4568",
                  desc: "Dokumen resmi & korespondensi",
                },
              ].map((item) => (
                <div key={item.label} className="card-base flex gap-4 px-4 py-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(26,86,219,0.08)] text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--gov-slate)]">
                      {item.label}
                    </div>
                    <div className="text-[14px] font-semibold text-[var(--gov-navy)]">{item.value}</div>
                    <div className="text-[12.5px] text-[var(--gov-text-muted)]">{item.desc}</div>
                  </div>
                </div>
              ))}
              <div className="card-base flex h-[260px] flex-col items-center justify-center gap-2 text-[var(--gov-slate)]">
                <div className="text-4xl">🗺️</div>
                <div className="text-[14px] font-semibold text-[var(--gov-navy)]">Peta Lokasi Balaikota</div>
                <div className="text-[12px]">Klik untuk membuka di Google Maps</div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrap>
      <GovFooter />
      <BackToTop />
    </div>
  );
}
