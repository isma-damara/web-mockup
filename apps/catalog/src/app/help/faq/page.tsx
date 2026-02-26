"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import CatalogNav from "../../components/CatalogNav";
import { CatalogFooter } from "../../components/CatalogSections";

const faqItems = [
  { q: "Bagaimana cara pilih produk?", a: "Cek kategori dan jenis kulit, lalu pilih yang paling sesuai." },
  { q: "Apakah produk aman?", a: "Produk kami sudah teruji dan berlabel halal serta cruelty-free." },
  { q: "Berapa lama pengiriman?", a: "Rata-rata 1-3 hari kerja untuk kota besar." },
  { q: "Bagaimana cara retur?", a: "Retur bisa diajukan maksimal 7 hari setelah barang diterima." },
];

export default function FaqPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link
              href=".."
              className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Bantuan
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">FAQ</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 border border-rose-100">
            <HelpCircle className="h-4 w-4 text-rose-500" />
            Pertanyaan yang sering ditanyakan
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">Jawaban cepat untuk pertanyaan umum.</p>

        <div className="mt-6 space-y-4">
          {faqItems.map((item) => (
            <div key={item.q} className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">{item.q}</div>
              <div className="mt-2 text-sm text-slate-600">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
      <CatalogFooter />
    </div>
  );
}
