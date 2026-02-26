import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero, SectionHeader, SidebarMenu } from "../components/GovPrimitives";
import { Button } from "@workspace/ui/ui/button";
import Link from "next/link";

const layananMenu = [
  { label: "📝 Perizinan Online", href: "/layanan#perizinan" },
  { label: "📣 Pengaduan", href: "/pengaduan" },
  { label: "👪 Kependudukan", href: "/layanan#kependudukan" },
  { label: "🏥 Kesehatan", href: "/layanan#kesehatan" },
  { label: "🎓 Pendidikan", href: "/layanan#pendidikan" },
];

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Layanan Publik" }]} />
      <PageHero
        badge="🏛️ Layanan Publik"
        title="Portal Layanan Terpadu"
        description="Akses layanan publik, perizinan, dan informasi pelayanan Kota Contoh secara cepat dan transparan."
      />

      <ContentWrap className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <SidebarMenu title="Layanan Publik" items={layananMenu} />
          <div className="space-y-10">
            <section id="perizinan" className="card-base p-6">
              <div className="flex flex-wrap items-start gap-4">
                <div className="text-3xl">📝</div>
                <div>
                  <div className="font-display text-[20px] font-bold text-[var(--gov-navy)]">Perizinan Online</div>
                  <p className="mt-1 text-[13.5px] text-[var(--gov-text-muted)]">
                    Ajukan berbagai jenis izin secara online melalui sistem perizinan terpadu.
                  </p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  { title: "Izin Mendirikan Bangunan (IMB)", eta: "±14 hari kerja", icon: "🏗️" },
                  { title: "Izin Usaha Mikro Kecil (IUMK)", eta: "±3 hari kerja", icon: "🏪" },
                  { title: "Izin Lingkungan (SPPL/UKL-UPL)", eta: "±30 hari kerja", icon: "🌿" },
                  { title: "Izin Usaha Restoran & Rumah Makan", eta: "±7 hari kerja", icon: "🍽️" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-[var(--gov-border)] bg-white px-4 py-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="mt-2 text-[14px] font-semibold text-[var(--gov-navy)]">{item.title}</div>
                    <div className="text-[12px] text-[var(--gov-slate)]">{item.eta}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] text-[var(--gov-slate)]">
                <span>ℹ️ Pastikan akun perizinan Anda sudah aktif.</span>
                <Button asChild size="sm" className="h-8 rounded-md bg-[var(--gov-blue)] text-white">
                  <Link href="/site/government/layanan#perizinan">Login / Daftar →</Link>
                </Button>
              </div>
            </section>

            <section id="kependudukan" className="card-base p-6">
              <SectionHeader label="👪 Layanan" title="Administrasi Kependudukan" />
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: "KTP Elektronik (KTP-el)", desc: "Perekaman, penggantian, dan perubahan data.", icon: "🪪" },
                  { title: "Kartu Keluarga (KK)", desc: "Penerbitan baru, perubahan data keluarga.", icon: "📋" },
                  { title: "Akta Kelahiran", desc: "Penerbitan akta kelahiran bayi baru lahir.", icon: "👶" },
                  { title: "Akta Kematian", desc: "Penerbitan akta kematian dan surat keterangan.", icon: "📜" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-[var(--gov-border)] bg-white px-4 py-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="mt-2 text-[14px] font-semibold text-[var(--gov-navy)]">{item.title}</div>
                    <div className="text-[12.5px] text-[var(--gov-text-muted)]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="kesehatan" className="card-base p-6">
              <SectionHeader label="🏥 Layanan" title="Kesehatan" />
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: "RSUD Kota Contoh", meta: "Rumah Sakit Pemerintah · Kelas B", icon: "🏥" },
                  { name: "Puskesmas Kec. Pusat", meta: "Puskesmas BLUD", icon: "🏨" },
                  { name: "Puskesmas Kec. Barat", meta: "Puskesmas Rawat Inap", icon: "🏥" },
                  { name: "RS Swasta Sehat Sejahtera", meta: "Rumah Sakit Swasta · Kelas C", icon: "🏥" },
                ].map((item) => (
                  <div key={item.name} className="rounded-xl border border-[var(--gov-border)] bg-white px-4 py-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="mt-2 text-[14px] font-semibold text-[var(--gov-navy)]">{item.name}</div>
                    <div className="text-[12px] text-[var(--gov-slate)]">{item.meta}</div>
                    <Button variant="outline" size="sm" className="mt-3 h-8 rounded-md border-[var(--gov-blue)] text-[var(--gov-blue)] hover:bg-[var(--gov-blue)] hover:text-white">
                      Lihat Detail →
                    </Button>
                  </div>
                ))}
              </div>
            </section>

            <section id="pendidikan" className="card-base p-6">
              <SectionHeader label="🎓 Layanan" title="Pendidikan" />
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { name: "SDN Kota Contoh 01", meta: "Sekolah Dasar Negeri · Akreditasi A", icon: "🏫" },
                  { name: "SMPN 1 Kota Contoh", meta: "SMP Negeri · Akreditasi A", icon: "🏫" },
                  { name: "SMAN 1 Kota Contoh", meta: "SMA Negeri · Akreditasi A", icon: "🏫" },
                  { name: "SMKN 2 Kota Contoh", meta: "SMK Negeri Teknologi · Akreditasi A", icon: "🏫" },
                ].map((item) => (
                  <div key={item.name} className="rounded-xl border border-[var(--gov-border)] bg-white px-4 py-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="mt-2 text-[14px] font-semibold text-[var(--gov-navy)]">{item.name}</div>
                    <div className="text-[12px] text-[var(--gov-slate)]">{item.meta}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </ContentWrap>

      <GovFooter />
      <BackToTop />
    </div>
  );
}
