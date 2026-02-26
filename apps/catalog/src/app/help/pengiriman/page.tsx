"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Truck, Clock, ShieldCheck } from "lucide-react";
import CatalogNav from "../../components/CatalogNav";
import { CatalogFooter } from "../../components/CatalogSections";

export default function ShippingPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3">
          <Link
            href=".."
            className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Bantuan
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Pengiriman</h1>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">Info kurir, estimasi waktu, dan ongkir.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Kurir", desc: "JNE, J&T, dan SiCepat untuk area utama." },
            { title: "Estimasi", desc: "1-3 hari kerja di kota besar, 3-7 hari untuk area lain." },
            { title: "Ongkir", desc: "Gratis ongkir untuk pembelian di atas Rp 300.000." },
          ].map((info) => (
            <div key={info.title} className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">{info.title}</div>
              <div className="mt-2 text-sm text-slate-600">{info.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Truck className="h-4 w-4 text-rose-500" />
            Proses Pengiriman
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Pesanan diproses maksimal 1x24 jam (hari kerja).</li>
            <li>Resi dikirim via email/WhatsApp setelah paket dikirim.</li>
            <li>Pengiriman bisa lebih lama saat promo besar atau cuaca ekstrem.</li>
          </ul>
        </div>

        <div className="mt-6 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Clock className="h-4 w-4 text-rose-500" />
            Catatan
          </div>
          <div className="mt-2 text-sm text-slate-600">Estimasi waktu dihitung setelah paket dikirim.</div>
          <div className="mt-4 flex items-center gap-2 text-xs text-rose-600">
            <ShieldCheck className="h-4 w-4" />
            Paket diasuransikan untuk pengiriman tertentu.
          </div>
        </div>
      </div>
      <CatalogFooter />
    </div>
  );
}
