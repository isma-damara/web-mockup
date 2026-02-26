"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";
import CatalogNav from "../../components/CatalogNav";
import { CatalogFooter } from "../../components/CatalogSections";

export default function ContactPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3">
          <Link
            href=".."
            className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Bantuan
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Hubungi Kami</h1>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">Tim kami siap membantu secepat mungkin.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Kirim Pesan</div>
            <div className="mt-4 grid gap-3">
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Nama lengkap" />
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Email aktif" />
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Topik" />
              <textarea className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows={4} placeholder="Pesan" />
            </div>
            <button className="mt-4 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-600">
              Kirim Pesan
            </button>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm h-fit">
            <div className="text-sm font-semibold text-slate-800">Kontak Kami</div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rose-500" />
                <span>+62 21 8765 4321</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-rose-500" />
                <span>hello@glowbeauty.id</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose-500" />
                <span>Jl. Kemang Raya No. 45, Jakarta Selatan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CatalogFooter />
    </div>
  );
}
