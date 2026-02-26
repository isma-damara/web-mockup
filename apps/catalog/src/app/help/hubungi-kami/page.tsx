"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle,
} from "lucide-react";
import CatalogNav from "../../components/CatalogNav";
import { CatalogFooter } from "../../components/CatalogSections";

export default function ContactSupportPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href=".."
            className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Bantuan
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Hubungi Tim Support</h1>
            <p className="mt-1 text-sm text-slate-500">Kami siap bantu semua pertanyaan seputar produk dan pesanan.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800">Kirim Pesan</div>
                <div className="text-xs text-slate-500">Balasan maksimal 1x24 jam kerja.</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Nama lengkap" />
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Email aktif" />
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Topik" />
              <textarea className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows={5} placeholder="Pesan Anda" />
            </div>
            <button className="mt-4 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-600">
              Kirim Pesan
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">Kontak Cepat</div>
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
              <button className="mt-4 w-full rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                Chat WhatsApp
              </button>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">Jam Operasional</div>
              <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                <Clock className="h-4 w-4 text-rose-500 mt-0.5" />
                <div>
                  <div>Senin–Jumat: 09.00–18.00</div>
                  <div>Sabtu: 10.00–16.00</div>
                  <div>Minggu & Libur Nasional: Tutup</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <HelpCircle className="h-4 w-4 text-rose-500" /> Pertanyaan Umum
              </div>
              <ul className="mt-3 space-y-2 text-xs text-slate-600">
                <li>• Status pengiriman & estimasi tiba</li>
                <li>• Panduan retur & pengembalian dana</li>
                <li>• Konsultasi produk & rekomendasi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CatalogFooter />
    </div>
  );
}
