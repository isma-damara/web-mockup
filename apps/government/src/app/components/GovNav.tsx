"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Search, Menu, X, ChevronDown, Phone, Mail, Clock, Landmark,
} from "lucide-react";

const navItems = [
  { label: "Beranda", href: "#hero" },
  {
    label: "Profil Kota", href: "#profil",
    sub: ["Sejarah", "Visi & Misi", "Lambang Daerah", "Pimpinan Daerah", "Struktur Organisasi"],
  },
  {
    label: "Pemerintahan", href: "#profil",
    sub: ["OPD/SKPD", "Peraturan Daerah", "APBD", "Laporan Kinerja"],
  },
  {
    label: "Layanan Publik", href: "#layanan",
    sub: ["Perizinan Online", "Pengaduan", "Kependudukan", "Kesehatan", "Pendidikan"],
  },
  { label: "Berita & Agenda", href: "#berita" },
  { label: "Informasi Publik", href: "#ppid" },
  { label: "Pariwisata", href: "#pariwisata" },
  { label: "Kontak", href: "#kontak" },
];

const ticker = [
  "📢 Pendaftaran PPDB 2026/2027 dibuka mulai 1 Maret — kunjungi ppdb.kotanusantara.go.id",
  "🏗️ Penutupan Jl. Merdeka arah utara tanggal 25-28 Feb untuk perbaikan drainase",
  "🏥 Vaksinasi booster gratis di seluruh Puskesmas setiap Sabtu pukul 08:00-12:00",
  "📋 Layanan e-KTP online kini tersedia 24 jam di portal resmi",
];

export default function GovNav() {
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropTimer = useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      {/* Top bar info */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> (021) 555-0100</span>
            <span className="hidden sm:flex items-center gap-1"><Mail className="h-3 w-3" /> info@kotanusantara.go.id</span>
          </div>
          <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> Senin-Jumat, 08:00-16:00</div>
        </div>
      </div>

      {/* News ticker */}
      <div className="bg-emerald-700 text-white py-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-16">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="text-xs font-medium">{t}</span>
          ))}
        </div>
      </div>

      {/* Main Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/government" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 shadow-md">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-800 leading-tight">
                Kota <span className="text-emerald-600">Nusantara</span>
              </div>
              <div className="text-[10px] text-emerald-600 font-medium tracking-widest uppercase">Portal Resmi Pemerintah</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0.5 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => { if (dropTimer.current) clearTimeout(dropTimer.current); if (item.sub) setOpenDrop(item.label); }}
                onMouseLeave={() => { dropTimer.current = setTimeout(() => setOpenDrop(null), 150); }}
              >
                <a href={item.href}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-colors whitespace-nowrap">
                  {item.label}
                  {item.sub && <ChevronDown className={`h-3 w-3 transition-transform ${openDrop === item.label ? "rotate-180" : ""}`} />}
                </a>
                {item.sub && openDrop === item.label && (
                  <div className="absolute top-full left-0 pt-1 z-50">
                    <div className="min-w-[200px] rounded-xl border border-emerald-100 bg-white/95 backdrop-blur-lg shadow-xl shadow-emerald-100/30 p-1.5">
                      {item.sub.map((s) => (
                        <a key={s} href={item.href}
                          className="block rounded-lg px-3.5 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                          onClick={() => setOpenDrop(null)}>
                          {s}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-full p-2 hover:bg-emerald-50 text-slate-600"><Search className="h-5 w-5" /></button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="xl:hidden rounded-full p-2 hover:bg-emerald-50 text-slate-600">
              {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenu && (
          <div className="xl:hidden border-t border-emerald-100 bg-white px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center">
                  <a href={item.href} onClick={() => setMobileMenu(false)}
                    className="flex-1 py-2.5 text-sm font-medium text-slate-600 hover:text-emerald-700 rounded-lg px-4">{item.label}</a>
                  {item.sub && (
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)} className="p-2 text-slate-400">
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.sub && mobileExpanded === item.label && (
                  <div className="ml-4 border-l-2 border-emerald-100 pl-3 pb-2">
                    {item.sub.map((s) => (
                      <a key={s} href={item.href} onClick={() => setMobileMenu(false)}
                        className="block py-2 text-sm text-slate-500 hover:text-emerald-600">{s}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Marquee CSS */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
}
