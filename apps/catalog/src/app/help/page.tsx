"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import CatalogNav from "../components/CatalogNav";
import { CatalogFooter } from "../components/CatalogSections";
import { useSiteBase, withSiteBase } from "../components/useSiteBase";

const helpLinks = [
  { label: "FAQ", href: "/help/faq", desc: "Jawaban singkat untuk pertanyaan umum." },
  { label: "Pengiriman", href: "/help/pengiriman", desc: "Info kurir, estimasi, dan ongkir." },
  { label: "Kebijakan Retur", href: "/help/kebijakan-retur", desc: "Syarat retur dan proses refund." },
  { label: "Hubungi Kami", href: "/help/hubungi-kami", desc: "Butuh bantuan? Tim kami siap bantu." },
];

export default function HelpHomePage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  const siteBase = useSiteBase();

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={withSiteBase("/", siteBase)}
              className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali Belanja
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Bantuan</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 border border-rose-100">
            <HelpCircle className="h-4 w-4 text-rose-500" />
            Pusat informasi & bantuan
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          Cari jawaban cepat atau pilih topik bantuan yang kamu butuhkan.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {helpLinks.map((item) => (
            <Link
              key={item.label}
              href={withSiteBase(item.href, siteBase)}
              className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-100/50"
            >
              <div className="text-sm font-semibold text-rose-600">{item.label}</div>
              <div className="mt-2 text-sm text-slate-600">{item.desc}</div>
              <div className="mt-4 text-xs font-semibold text-rose-600">Buka halaman</div>
            </Link>
          ))}
        </div>
      </div>
      <CatalogFooter />
    </div>
  );
}
