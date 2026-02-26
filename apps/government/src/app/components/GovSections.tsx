"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/ui/button";
import { useSiteBase, withSiteBase } from "./useSiteBase";

export function GovFooter() {
  const siteBase = useSiteBase();
  return (
    <footer className="mt-16 border-t-4 border-[var(--gov-gold)] bg-[var(--gov-navy)] text-white/70">
      <div className="border-b border-white/10 bg-[var(--gov-navy-mid)]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-7 text-center md:flex-row md:text-left">
          <div>
            <div className="font-display text-lg font-bold text-white">Butuh bantuan cepat?</div>
            <div className="text-[13px] text-white/60">
              Laporkan kendala layanan publik atau cari informasi layanan online.
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              className="h-9 rounded-lg bg-[var(--gov-gold)] text-[13px] font-semibold text-white hover:bg-[#a87820]"
            >
              <Link href={withSiteBase("/pengaduan", siteBase)}>📣 Pengaduan</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-9 rounded-lg border-white/30 bg-white/10 text-[13px] font-semibold text-white hover:bg-white/20"
            >
              <Link href={withSiteBase("/layanan", siteBase)}>🏛️ Layanan Online</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gov-gold)] bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] font-display text-[16px] font-extrabold text-[var(--gov-gold-light)]">
              K
            </div>
            <div className="leading-tight">
              <div className="font-display text-[18px] font-bold text-white">Kota Contoh</div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-white/40">
                Portal Pemerintah Resmi
              </div>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-7 text-white/50">
            Portal resmi Pemerintah Kota Contoh. Kami berkomitmen memberikan pelayanan terbaik
            melalui tata kelola pemerintahan yang bersih dan transparan.
          </p>
          <div className="mt-4 flex gap-2">
            {["f", "X", "▶", "📸"].map((icon) => (
              <span
                key={icon}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-[14px] text-white/70"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.06em] text-white">Profil Kota</div>
          <div className="space-y-2 text-[13px] text-white/50">
            <Link href={withSiteBase("/profil#sejarah", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Sejarah
            </Link>
            <Link href={withSiteBase("/profil#visi-misi", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Visi & Misi
            </Link>
            <Link href={withSiteBase("/profil#lambang", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Lambang Daerah
            </Link>
            <Link href={withSiteBase("/profil#pimpinan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Pimpinan Daerah
            </Link>
            <Link href={withSiteBase("/profil#struktur", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Struktur Organisasi
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.06em] text-white">Layanan</div>
          <div className="space-y-2 text-[13px] text-white/50">
            <Link href={withSiteBase("/layanan#perizinan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Perizinan Online
            </Link>
            <Link href={withSiteBase("/pengaduan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Pengaduan
            </Link>
            <Link href={withSiteBase("/layanan#kependudukan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Kependudukan
            </Link>
            <Link href={withSiteBase("/layanan#kesehatan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Kesehatan
            </Link>
            <Link href={withSiteBase("/layanan#pendidikan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Pendidikan
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-3 text-[13px] font-bold uppercase tracking-[0.06em] text-white">Pemerintahan</div>
          <div className="space-y-2 text-[13px] text-white/50">
            <Link href={withSiteBase("/ppid#opd", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              OPD/SKPD
            </Link>
            <Link href={withSiteBase("/ppid#peraturan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Peraturan Daerah
            </Link>
            <Link href={withSiteBase("/ppid#apbd", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              APBD
            </Link>
            <Link href={withSiteBase("/ppid#laporan", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Laporan Kinerja
            </Link>
            <Link href={withSiteBase("/ppid", siteBase)} className="block hover:text-[var(--gov-gold-light)]">
              Informasi Publik
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-[12px] text-white/40 md:flex-row">
        <span>© 2025 Pemerintah Kota Contoh. Hak cipta dilindungi undang-undang.</span>
        <span>Kebijakan Privasi · Syarat & Ketentuan · Aksesibilitas</span>
      </div>
    </footer>
  );
}

export function BackToTop() {
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 h-10 w-10 rounded-xl bg-[var(--gov-navy)] p-0 text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[var(--gov-blue)]"
    >
      ↑
    </Button>
  );
}
