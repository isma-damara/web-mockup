"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { useSiteBase, withSiteBase } from "../components/useSiteBase";

const helpLinks = [
  { label: "FAQ", href: "/help/faq", desc: "Jawaban singkat untuk pertanyaan yang paling sering muncul." },
  { label: "Track Order", href: "/help/track-order", desc: "Cek status pesanan kamu secara cepat." },
  { label: "Pengiriman", href: "/help/pengiriman", desc: "Info kurir, estimasi waktu, dan ongkir." },
  { label: "Kebijakan Retur", href: "/help/kebijakan-retur", desc: "Syarat retur, tukar size, dan refund." },
  { label: "Hubungi Kami", href: "/help/hubungi-kami", desc: "Butuh bantuan? Tim kami siap bantu." },
];

export default function HelpHomePage() {
  const siteBase = useSiteBase();
  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={withSiteBase("/", siteBase)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali Belanja
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Bantuan</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 border border-emerald-100">
            <HelpCircle className="h-4 w-4 text-emerald-500" />
            Pusat informasi & bantuan
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          Cari jawaban cepat atau pilih topik bantuan yang kamu butuhkan. Tim kami siap membantu kapan pun diperlukan.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {helpLinks.map((item) => (
            <Link
              key={item.label}
              href={withSiteBase(item.href, siteBase)}
              className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-100/50"
            >
              <div className="text-sm font-semibold text-emerald-600">{item.label}</div>
              <div className="mt-2 text-sm text-slate-600">{item.desc}</div>
              <div className="mt-4 text-xs font-semibold text-emerald-600">Buka halaman</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
