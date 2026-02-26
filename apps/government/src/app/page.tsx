import Link from "next/link";
import GovNav from "./components/GovNav";
import { BackToTop, GovFooter } from "./components/GovSections";
import { ContentWrap, SectionHeader } from "./components/GovPrimitives";
import { Button } from "@workspace/ui/ui/button";
import { getGovContent } from "./data/getGovContent";

export default async function GovernmentPage() {
  const { agendaItems, beritaHighlight, heroCards, quickAccess, stats } = await getGovContent();

  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />

      <div className="bg-[var(--gov-navy-mid)] py-2 text-white/70">
        <ContentWrap className="flex flex-wrap items-center gap-3">
          <span className="rounded bg-[var(--gov-gold)] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
            📢 Pengumuman
          </span>
          <span className="text-[13px]">
            Pendaftaran PPDB 2025 dibuka mulai 1 Juni 2025 — Vaksinasi Gratis Puskesmas Seluruh Kota
            Contoh — APBD 2025 telah disahkan oleh DPRD Kota Contoh — Festival Budaya Tahunan 17
            Agustus 2025
          </span>
        </ContentWrap>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--gov-navy)] via-[var(--gov-navy-mid)] to-[var(--gov-blue)]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(26,86,219,0.2)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_80%,rgba(201,151,43,0.12)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>
        <ContentWrap className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(201,151,43,0.3)] bg-[rgba(201,151,43,0.15)] px-4 py-1 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[var(--gov-gold-light)]">
              ✦ Portal Resmi Pemerintahan
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Melayani dengan <span className="text-[var(--gov-gold-light)]">Tulus</span>, Membangun
              dengan Amanah
            </h1>
            <p className="mt-4 max-w-xl text-[15.5px] leading-7 text-white/70">
              Selamat datang di portal resmi Pemerintah Kota Contoh. Dapatkan akses mudah ke layanan
              publik, informasi pemerintahan, dan berbagai program untuk warga Kota Contoh.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 rounded-xl bg-[var(--gov-gold)] text-[14px] font-semibold text-white shadow-[0_6px_20px_rgba(201,151,43,0.35)] hover:bg-[#a87820]"
              >
                <Link href="/site/government/layanan">🏛️ Layanan Publik</Link>
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-xl border-white/30 bg-white/10 text-[14px] font-semibold text-white hover:bg-white/20"
                asChild
              >
                <Link href="/site/government/pengaduan">📣 Sampaikan Aspirasi</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6 text-white">
              {[
                { value: "1.2 Jt", label: "Penduduk" },
                { value: "38", label: "OPD/SKPD" },
                { value: "245", label: "Layanan Digital" },
                { value: "96%", label: "Kepuasan Warga" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-display text-2xl font-bold">{item.value}</div>
                  <div className="text-[11.5px] uppercase tracking-[0.06em] text-white/50">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 animate-fade-up animation-delay-200">
            {heroCards.map((card, index) => (
              <Link
                key={card.title}
                href={card.href}
                className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white backdrop-blur transition hover:translate-x-1 hover:bg-white/20 animate-fade-up ${
                  index === 1
                    ? "animation-delay-200"
                    : index === 2
                      ? "animation-delay-400"
                      : index === 3
                        ? "animation-delay-600"
                        : ""
                }`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.color}`}>
                  <span className="text-xl">{card.icon}</span>
                </div>
                <div>
                  <div className="text-[13.5px] font-semibold">{card.title}</div>
                  <div className="text-[12px] text-white/50">{card.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </ContentWrap>
      </section>

      <section className="section-band py-9 sm:py-11 animate-fade-up animation-delay-200">
        <ContentWrap>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {quickAccess.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`card-base px-4 py-5 text-center transition hover:-translate-y-1 hover:border-[var(--gov-blue)] hover:bg-[rgba(26,86,219,0.04)] animate-fade-up ${
                  index === 1
                    ? "animation-delay-200"
                    : index === 2
                      ? "animation-delay-400"
                      : index === 3
                        ? "animation-delay-600"
                        : index === 4
                          ? "animation-delay-800"
                          : ""
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="mt-2 text-[12.5px] font-semibold text-[var(--gov-text)]">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </ContentWrap>
      </section>

      <section className="py-11 sm:py-14 animate-fade-up animation-delay-200">
        <ContentWrap>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionHeader label="📰 Terbaru" title="Berita Kota" />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg border-[var(--gov-blue)] px-4 text-[var(--gov-blue)] hover:bg-[var(--gov-blue)] hover:text-white"
                  asChild
                >
                  <Link href="/site/government/berita">Lihat Semua →</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {beritaHighlight.map((item) => (
                  <div key={item.title} className="card-base flex overflow-hidden">
                    <div className={`flex w-[110px] items-center justify-center text-3xl ${item.color} text-white/90`}>
                      {item.icon}
                    </div>
                    <div className="px-4 py-3">
                      <div className="mb-1 flex items-center gap-2 text-[11px] text-[var(--gov-slate)]">
                        <span className="rounded-full bg-[rgba(26,86,219,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--gov-blue)]">
                          {item.badge}
                        </span>
                        {item.date}
                      </div>
                      <div className="text-[13.5px] font-semibold text-[var(--gov-navy)]">
                        {item.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <SectionHeader label="📅 Jadwal" title="Agenda Kota" />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg border-[var(--gov-blue)] px-4 text-[var(--gov-blue)] hover:bg-[var(--gov-blue)] hover:text-white"
                  asChild
                >
                  <Link href="/site/government/agenda">Lihat Semua →</Link>
                </Button>
              </div>
              <div className="space-y-3">
                {agendaItems.slice(0, 4).map((item) => (
                  <div key={item.title} className="card-base flex gap-4 px-4 py-3 hover:border-[var(--gov-blue)]">
                    <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-[var(--gov-navy)] text-white">
                      <div className="font-display text-lg font-bold leading-none">{item.day}</div>
                      <div className="text-[10px] font-semibold uppercase text-[var(--gov-gold-light)]">
                        {item.month}
                      </div>
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[var(--gov-navy)]">{item.title}</div>
                      <div className="mt-1 flex flex-wrap gap-3 text-[12px] text-[var(--gov-slate)]">
                        <span>⏰ {item.time}</span>
                        <span>📍 {item.place}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <SectionHeader label="📊 Data" title="Statistik Kota Contoh" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="card-base flex items-center gap-4 p-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-[var(--gov-navy)]">{stat.value}</div>
                    <div className="text-[12.5px] text-[var(--gov-text-muted)]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentWrap>
      </section>

      <GovFooter />
      <BackToTop />
    </div>
  );
}

