import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero, SectionHeader, SidebarMenu } from "../components/GovPrimitives";

const profileMenu = [
  { label: "📜 Sejarah", href: "/profil#sejarah" },
  { label: "🎯 Visi & Misi", href: "/profil#visi-misi" },
  { label: "🏛️ Lambang Daerah", href: "/profil#lambang" },
  { label: "👤 Pimpinan Daerah", href: "/profil#pimpinan" },
  { label: "🗂️ Struktur Organisasi", href: "/profil#struktur" },
];

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Profil Kota" }]} />
      <PageHero
        badge="🏛️ Profil Kota"
        title="Profil Kota Contoh"
        description="Mengenal sejarah, visi misi, dan struktur Pemerintah Kota Contoh secara lengkap."
      />

      <ContentWrap className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <SidebarMenu title="Profil Kota" items={profileMenu} />
          <div className="space-y-10">
            <section id="sejarah" className="card-base p-6">
              <SectionHeader label="📜 Sejarah" title="Sejarah Kota Contoh" />
              <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
                <div className="flex h-[220px] items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] text-5xl text-white">
                  🏙️
                </div>
                <div className="space-y-4 text-[14.5px] leading-7 text-[var(--gov-text-muted)]">
                  <p>
                    Kota Contoh didirikan pada tahun <strong className="text-[var(--gov-navy)]">1742</strong> oleh Raden Kusuma
                    Wijaya sebagai pusat perdagangan dan pertanian di tepi sungai besar.
                  </p>
                  <p>
                    Pada abad ke-18, kawasan ini berkembang pesat menjadi pusat niaga yang ramai dengan keberagaman budaya.
                  </p>
                  <p>
                    Pada tahun 1956, Kota Contoh resmi menjadi kota otonom dan terus berbenah menuju tata kelola pemerintahan
                    modern.
                  </p>
                </div>
              </div>
            </section>

            <section id="visi-misi" className="card-base p-6">
              <SectionHeader label="🎯 Arah" title="Visi & Misi" />
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] p-6 text-white">
                  <div className="text-[12px] uppercase tracking-[0.08em] text-white/70">Visi 2021–2026</div>
                  <div className="mt-3 font-display text-[20px] font-bold">
                    "Terwujudnya Kota Contoh yang Maju, Mandiri, Sejahtera, dan Berkeadilan"
                  </div>
                  <p className="mt-3 text-[13px] text-white/70">
                    Visi ini mencerminkan cita-cita bersama seluruh elemen masyarakat Kota Contoh.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "Tata kelola pemerintahan yang bersih dan akuntabel.",
                    "Meningkatkan kualitas SDM yang berdaya saing.",
                    "Mengembangkan perekonomian daerah berbasis potensi lokal.",
                    "Membangun infrastruktur kota yang merata dan ramah lingkungan.",
                  ].map((text, index) => (
                    <div key={text} className="flex gap-3 rounded-xl border border-[var(--gov-border)] bg-white px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gov-blue)] text-[12px] font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="text-[13.5px] text-[var(--gov-text)]">{text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="lambang" className="card-base p-6">
              <SectionHeader label="🏛️ Lambang" title="Lambang Daerah" />
              <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                <div className="flex h-[220px] items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] text-5xl text-white">
                  ⚜️
                </div>
                <div className="space-y-3 text-[13.5px] text-[var(--gov-text-muted)]">
                  {[
                    "Bintang emas melambangkan ketuhanan dan cita-cita luhur.",
                    "Pohon beringin sebagai simbol keteduhan dan persatuan.",
                    "Ombak biru mencerminkan dinamika dan semangat perkembangan.",
                    "Padi & kapas melambangkan kemakmuran dan kesejahteraan.",
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--gov-gold)]" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="pimpinan" className="card-base p-6">
              <SectionHeader label="👤 Pimpinan" title="Pimpinan Daerah" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Drs. H. Ahmad Wijaya, M.Si", role: "Walikota Kota Contoh", period: "2021–2026" },
                  { name: "Hj. Sari Rahayu, S.E., M.M", role: "Wakil Walikota", period: "2021–2026" },
                  { name: "Dr. Bambang Sutrisno, M.Hum", role: "Sekretaris Daerah", period: "2022–Sekarang" },
                ].map((item) => (
                  <div key={item.name} className="rounded-2xl border border-[var(--gov-border)] bg-white text-center">
                    <div className="flex h-[180px] items-center justify-center rounded-t-2xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] text-5xl text-white">
                      👤
                    </div>
                    <div className="p-4">
                      <div className="font-display text-[15px] font-bold text-[var(--gov-navy)]">{item.name}</div>
                      <div className="text-[12.5px] font-semibold text-[var(--gov-blue)]">{item.role}</div>
                      <div className="mt-1 text-[12px] text-[var(--gov-slate)]">📅 {item.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="struktur" className="card-base p-6">
              <SectionHeader label="🗂️ Struktur" title="Struktur Organisasi" />
              <div className="rounded-xl border border-[var(--gov-border)] bg-white p-6 text-center">
                <div className="inline-flex flex-col items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] px-6 py-3 text-[13px] font-semibold text-white">
                    Walikota & Wakil Walikota
                  </div>
                  <div className="h-6 w-1 bg-[var(--gov-border)]" />
                  <div className="rounded-xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] px-6 py-3 text-[13px] font-semibold text-white">
                    Sekretaris Daerah
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {["Asisten I Pemerintahan", "Asisten II Perekonomian", "Asisten III Administrasi"].map((item) => (
                      <div key={item} className="rounded-xl border border-[var(--gov-blue)] px-4 py-3 text-[12.5px] font-semibold text-[var(--gov-navy)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
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
