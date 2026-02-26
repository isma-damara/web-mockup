import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero, SectionHeader } from "../components/GovPrimitives";
import { Button } from "@workspace/ui/ui/button";
import { Input } from "@workspace/ui/ui/input";
import { Textarea } from "@workspace/ui/ui/textarea";

export default function PengaduanPage() {
  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Pengaduan" }]} />
      <PageHero
        badge="📣 Layanan Publik"
        title="Pengaduan Masyarakat"
        description="Sampaikan aspirasi, keluhan, dan laporan Anda. Setiap pengaduan ditangani serius."
      />

      <ContentWrap className="py-10 sm:py-12" id="form">
        <SectionHeader label="📣 Statistik" title="Ringkasan Pengaduan" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-base flex items-center gap-4 px-5 py-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(26,86,219,0.1)] text-xl">📣</div>
            <div>
              <div className="font-display text-[22px] font-bold text-[var(--gov-navy)]">2.841</div>
              <div className="text-[12.5px] text-[var(--gov-text-muted)]">Pengaduan Masuk 2024</div>
            </div>
          </div>
          <div className="card-base flex items-center gap-4 px-5 py-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(22,163,74,0.12)] text-xl">✅</div>
            <div>
              <div className="font-display text-[22px] font-bold text-[var(--gov-navy)]">94.2%</div>
              <div className="text-[12.5px] text-[var(--gov-text-muted)]">Pengaduan Terselesaikan</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card-base p-6">
            <div className="font-display text-[18px] font-bold text-[var(--gov-navy)]">📝 Form Pengaduan Baru</div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Nama Lengkap *</label>
                <Input placeholder="Masukkan nama lengkap Anda" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Nomor Telepon *</label>
                <Input placeholder="08xx-xxxx-xxxx" />
              </div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Email</label>
                <Input placeholder="email@contoh.com" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Kategori *</label>
                <select className="h-10 w-full rounded-md border border-[var(--gov-border)] bg-white px-3 text-[13px] text-[var(--gov-text)]">
                  <option value="">-- Pilih Kategori --</option>
                  {[
                    "Infrastruktur & Jalan",
                    "Kebersihan & Sampah",
                    "Keamanan & Ketertiban",
                    "Pelayanan Publik",
                    "Pendidikan",
                    "Kesehatan",
                    "Lainnya",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-[13px] font-semibold">Judul Pengaduan *</label>
              <Input placeholder="Tuliskan judul pengaduan secara singkat" />
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-[13px] font-semibold">Detail Pengaduan *</label>
              <Textarea rows={5} placeholder="Jelaskan pengaduan Anda secara detail, termasuk lokasi dan waktu..." />
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-[13px] font-semibold">Upload Bukti/Foto</label>
              <Input type="file" />
              <div className="mt-1 text-[11.5px] text-[var(--gov-slate)]">Format: JPG, PNG, PDF. Maksimal 5 MB.</div>
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-[rgba(26,86,219,0.15)] bg-[rgba(26,86,219,0.05)] px-4 py-3 text-[13px] text-[var(--gov-blue)]">
              <span>🔒</span>
              <span>Identitas Anda akan dijaga kerahasiaannya sesuai ketentuan perlindungan data.</span>
            </div>
            <Button className="mt-5 w-full rounded-xl bg-[var(--gov-blue)] text-white">📤 Kirim Pengaduan</Button>
          </div>

          <div className="space-y-4">
            <div className="card-base p-6">
              <div className="font-display text-[16px] font-bold text-[var(--gov-navy)]">🔍 Cek Status Pengaduan</div>
              <div className="mt-4 flex gap-2">
                <Input placeholder="Masukkan nomor tiket pengaduan..." />
                <Button className="h-9 rounded-md bg-[var(--gov-blue)] text-white">Cek</Button>
              </div>
            </div>
            <div className="card-base p-6">
              <div className="font-display text-[16px] font-bold text-[var(--gov-navy)]">Tahapan Penanganan</div>
              <div className="mt-4 space-y-3 text-[13px] text-[var(--gov-text-muted)]">
                <div>1. Verifikasi awal oleh admin layanan.</div>
                <div>2. Disposisi ke dinas terkait.</div>
                <div>3. Tindak lanjut lapangan.</div>
                <div>4. Penyelesaian & konfirmasi.</div>
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
