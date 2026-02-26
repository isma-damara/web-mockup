import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero, SectionHeader } from "../components/GovPrimitives";

const agendaItems = [
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
  {
    day: "08",
    month: "Feb",
    title: "Rapat Paripurna DPRD — Pembahasan Ranperda 2025",
    time: "13.00 WIB",
    place: "Gedung DPRD",
    badge: "Livestream",
    badgeClass: "bg-[rgba(26,86,219,0.1)] text-[var(--gov-blue)]",
  },
  {
    day: "12",
    month: "Feb",
    title: "Vaksinasi Massal Gratis untuk Seluruh Warga",
    time: "08.00 WIB",
    place: "GOR Kota Contoh",
    badge: "Terbuka",
    badgeClass: "bg-[rgba(22,163,74,0.12)] text-[var(--gov-green)]",
  },
  {
    day: "17",
    month: "Feb",
    title: "Seminar Investasi & Peluang Bisnis Kota Contoh 2025",
    time: "09.00 WIB",
    place: "Hotel Grand Contoh",
    badge: "Daftar",
    badgeClass: "bg-[rgba(201,151,43,0.18)] text-[var(--gov-gold)]",
  },
];

export default function AgendaPage() {
  return (
    <div className="min-h-screen bg-(--gov-cream) text-(--gov-text)">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Agenda Kota" }]} />
      <PageHero
        badge="📅 Agenda"
        title="Agenda Kota"
        description="Jadwal kegiatan pemerintah, acara publik, dan agenda resmi Kota Contoh."
      />
      <ContentWrap className="py-10 sm:py-12">
        <SectionHeader
          label="📌 Mendatang"
          title="Agenda Terdekat"
          description="Pantau agenda terbaru dan rencanakan kehadiran Anda."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {agendaItems.map((item) => (
            <div key={item.title} className="card-base flex gap-4 px-4 py-4">
              <div className="flex h-14 w-12 flex-col items-center justify-center rounded-xl bg-(--gov-navy) text-white">
                <div className="font-display text-[20px] font-bold">{item.day}</div>
                <div className="text-[10px] font-semibold uppercase text-(--gov-gold-light)]">{item.month}</div>
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
      </ContentWrap>
      <GovFooter />
      <BackToTop />
    </div>
  );
}
