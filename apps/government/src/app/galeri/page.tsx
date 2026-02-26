import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero, SectionHeader } from "../components/GovPrimitives";

const galleryItems = [
  { title: "Peresmian Balai Kota", label: "Pemerintahan" },
  { title: "Festival Budaya Nusantara", label: "Budaya" },
  { title: "Program Kota Hijau", label: "Lingkungan" },
  { title: "Layanan Publik Mobile", label: "Pelayanan" },
  { title: "Kegiatan UMKM", label: "Ekonomi" },
  { title: "Karnaval Kemerdekaan", label: "Event" },
  { title: "Pembangunan Jalan", label: "Infrastruktur" },
  { title: "Pelatihan Digital", label: "Pendidikan" },
];

export default function GaleriPage() {
  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Galeri" }]} />
      <PageHero
        badge="📸 Galeri"
        title="Galeri Kota"
        description="Dokumentasi kegiatan, program, dan momen penting Pemerintah Kota Contoh."
      />
      <ContentWrap className="py-10 sm:py-12">
        <SectionHeader label="🖼️ Kegiatan" title="Sorotan Foto" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div key={item.title} className="card-base overflow-hidden">
              <div className="flex h-[190px] items-center justify-center bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] text-4xl text-white">
                🏙️
              </div>
              <div className="p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--gov-gold)]">
                  {item.label}
                </div>
                <div className="mt-1 text-[14px] font-semibold text-[var(--gov-navy)]">{item.title}</div>
                <div className="mt-2 text-[12px] text-[var(--gov-text-muted)]">12 foto · 3 menit</div>
              </div>
            </div>
          ))}
        </div>
      </ContentWrap>
      <GovFooter />
      <BackToTop />
    </div>
  );
}
