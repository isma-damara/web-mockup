import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero, SectionHeader } from "../components/GovPrimitives";
import { Button } from "@workspace/ui/ui/button";
import Link from "next/link";

const beritaItems = [
  {
    title: "Program Tanam 10.000 Pohon Dukung Kota Contoh Menuju Kota Hijau 2030",
    category: "Lingkungan",
    date: "22 Jan 2025",
    excerpt: "Dinas Lingkungan Hidup bersama warga mulai menanam 10.000 pohon di seluruh sudut kota.",
    icon: "🌱",
    accent: "bg-[rgba(22,163,74,0.12)] text-[var(--gov-green)]",
  },
  {
    title: "Pelajar Kota Contoh Raih Juara 1 Olimpiade Sains Nasional 2025",
    category: "Pendidikan",
    date: "20 Jan 2025",
    excerpt: "Komitmen pemerintah daerah meningkatkan kualitas pendidikan membuahkan prestasi nasional.",
    icon: "📚",
    accent: "bg-[rgba(201,151,43,0.12)] text-[var(--gov-gold)]",
  },
  {
    title: "Proyek Jalan Layang Bypass Kota Contoh Ditargetkan Selesai 2026",
    category: "Infrastruktur",
    date: "18 Jan 2025",
    excerpt: "Pembangunan jalan layang sepanjang 12 km yang menghubungkan dua kawasan utama kota.",
    icon: "🏗️",
    accent: "bg-[rgba(13,148,136,0.12)] text-[var(--gov-teal)]",
  },
];

const agendaPreview = [
  {
    day: "30",
    month: "Jan",
    title: "Rapat Koordinasi Pembangunan Infrastruktur Q1 2025",
    time: "09.00 WIB",
    place: "Balaikota Lt.3",
    badge: "Tertutup",
    badgeClass: "bg-[rgba(26,86,219,0.1)] text-[var(--gov-blue)]",
  },
  {
    day: "01",
    month: "Feb",
    title: "Musrenbang Kecamatan Tahun Anggaran 2026",
    time: "08.00 WIB",
    place: "12 Kecamatan",
    badge: "Terbuka",
    badgeClass: "bg-[rgba(22,163,74,0.12)] text-[var(--gov-green)]",
  },
  {
    day: "05",
    month: "Feb",
    title: "Festival Kuliner & Budaya Nusantara 2025",
    time: "10.00 WIB",
    place: "Alun-alun Kota",
    badge: "Terbuka",
    badgeClass: "bg-[rgba(22,163,74,0.12)] text-[var(--gov-green)]",
  },
];

export default function BeritaPage() {
  return (
    <div className="min-h-screen bg-(--gov-cream) text-(--gov-text)">
      <GovNav />
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Berita & Agenda" },
        ]}
      />
      <PageHero
        badge="📰 Media"
        title="Berita Kota"
        description="Informasi terbaru seputar program pemerintah, pembangunan kota, dan aktivitas masyarakat Kota Contoh."
      />

      <ContentWrap className="py-10 sm:py-12">
        <div className="card-base mb-10 grid overflow-hidden md:grid-cols-2">
          <div className="flex items-center justify-center bg-linear-to-br from-(--gov-navy) to-(--gov-blue) text-5xl text-white">
            🏛️
          </div>
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[rgba(26,86,219,0.1)] px-3 py-1 text-[11px] font-semibold text-(--gov-blue)">
                Utama
              </span>
              <span className="rounded-full bg-[rgba(201,151,43,0.12)] px-3 py-1 text-[11px] font-semibold text-(--gov-gold)">
                Pemerintahan
              </span>
            </div>
            <h2 className="font-display text-[22px] font-bold text-(--gov-navy)">
              Walikota Luncurkan Program 1.000 Taman Kota untuk Ruang Terbuka Hijau
            </h2>
            <p className="mt-3 text-[13.5px] leading-7 text-(--gov-text-muted)">
              Program ambisius Pemerintah Kota Contoh untuk menambah ruang terbuka hijau seluas 500 hektar dalam
              3 tahun demi kualitas udara yang lebih baik.
            </p>
            <div className="mt-5 flex items-center justify-between text-[12px] text-(--gov-slate)">
              <span>📅 27 Januari 2025 · 👁 4.821 Dibaca</span>
              <Button asChild size="sm" className="h-8 rounded-md bg-(--gov-blue) text-white">
                <Link href="/site/government/berita">Baca Selengkapnya →</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="filter-bar mb-6">
          <span className="text-[12px] font-semibold text-(--gov-slate)">Kategori:</span>
          {[
            "Semua",
            "Pemerintahan",
            "Pembangunan",
            "Ekonomi",
            "Lingkungan",
            "Pendidikan",
            "Kesehatan",
          ].map((tag, index) => (
            <button
              key={tag}
              type="button"
              className={`filter-chip ${index === 0 ? "filter-chip--active" : "filter-chip--idle"}`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beritaItems.map((item) => (
            <article key={item.title} className="card-base overflow-hidden">
              <div className="flex h-42.5 items-center justify-center bg-linear-to-br from-(--gov-navy) to-(--gov-blue) text-4xl text-white">
                {item.icon}
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center gap-2 text-[11.5px] text-(--gov-slate)">
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${item.accent}`}>
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-[15px] font-bold text-(--gov-navy)">{item.title}</h3>
                <p className="mt-2 text-[12.5px] leading-6 text-(--gov-text-muted)">{item.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-[12px] text-(--gov-slate)">Dinas Kominfo</div>
                  <Button asChild variant="ghost" size="sm" className="h-8">
                    <Link href="/site/government/berita">Baca →</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeader label="📅 Jadwal" title="Agenda Mendatang" />
            <div className="space-y-3">
              {agendaPreview.map((item) => (
                <div key={item.title} className="card-base flex items-start gap-4 px-4 py-4">
                  <div className="flex h-14 w-12 flex-col items-center justify-center rounded-xl bg-(--gov-navy) text-white">
                    <div className="font-display text-[20px] font-bold">{item.day}</div>
                    <div className="text-[10px] font-semibold uppercase text-(--gov-gold-light)">{item.month}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-(--gov-navy)">{item.title}</div>
                    <div className="mt-1 flex flex-wrap gap-3 text-[12px] text-(--gov-slate)">
                      <span>⏰ {item.time}</span>
                      <span>📍 {item.place}</span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-base flex flex-col justify-between p-6">
            <div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-(--gov-gold)">
                Kalender
              </div>
              <div className="mt-2 font-display text-[22px] font-bold text-(--gov-navy)">
                Lihat agenda lengkap pemerintah kota.
              </div>
              <p className="mt-2 text-[13.5px] text-(--gov-text-muted)">
                Pantau jadwal kegiatan, rapat publik, dan acara warga melalui halaman agenda resmi.
              </p>
            </div>
            <Button asChild className="mt-6 h-9 rounded-lg bg-(--gov-blue) text-white">
              <Link href="/site/government/agenda">Lihat Agenda →</Link>
            </Button>
          </div>
        </div>
      </ContentWrap>

      <GovFooter />
      <BackToTop />
    </div>
  );
}
