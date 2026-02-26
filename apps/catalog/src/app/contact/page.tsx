"use client";

import { useState } from "react";
import CatalogNav from "../components/CatalogNav";
import { CatalogFooter } from "../components/CatalogSections";
import { MapPin, Phone, Clock, Navigation, Search } from "lucide-react";

const stores = [
  {
    name: "GlowBeauty Flagship Kemang",
    address: "Jl. Kemang Raya No. 45, Jakarta Selatan",
    hours: "09.00–21.00",
    phone: "+62 21 8765 4321",
    status: "Open",
  },
  {
    name: "GlowBeauty Central Park",
    address: "Mall Central Park Lt. 2, Jakarta Barat",
    hours: "10.00–22.00",
    phone: "+62 21 8899 7788",
    status: "Open",
  },
  {
    name: "GlowBeauty Kota Kasablanka",
    address: "Kota Kasablanka Lt. 1, Jakarta Selatan",
    hours: "10.00–22.00",
    phone: "+62 21 5566 1122",
    status: "Open",
  },
  {
    name: "GlowBeauty Bandung",
    address: "Jl. Riau No. 99, Bandung",
    hours: "09.00–20.00",
    phone: "+62 22 7000 3311",
    status: "Closed",
  },
];

export default function StoreLocatorPage() {
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">Store Locator</span>
          <h1 className="text-3xl font-bold text-slate-900">Temukan Toko Resmi GlowBeauty</h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Cari toko terdekat untuk konsultasi produk, mencoba sampel, dan belanja langsung.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-800">Peta Lokasi</div>
              <button className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                <Navigation className="h-3.5 w-3.5" /> Buka di Maps
              </button>
            </div>
            <div className="mt-4 h-[360px] w-full rounded-2xl bg-gradient-to-br from-rose-100 via-pink-100 to-fuchsia-100 flex items-center justify-center text-slate-400">
              <MapPin className="h-10 w-10" />
              <span className="ml-2 text-sm">Preview peta akan tampil di sini</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">Filter Lokasi</div>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm">
                  <Search className="h-4 w-4 text-rose-400" />
                  <input className="w-full bg-transparent outline-none" placeholder="Cari kota atau mall" />
                </div>
                <select className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600">
                  <option>Semua Kota</option>
                  <option>Jakarta</option>
                  <option>Bandung</option>
                  <option>Surabaya</option>
                </select>
                <label className="flex items-center gap-2 text-xs text-slate-500">
                  <input type="checkbox" className="accent-rose-500" />
                  Tampilkan hanya toko yang buka
                </label>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">Daftar Toko</div>
              <div className="mt-4 space-y-3">
                {stores.map((store) => (
                  <div key={store.name} className="rounded-2xl border border-slate-100 p-4 hover:border-rose-200 hover:bg-rose-50/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{store.name}</div>
                        <div className="mt-1 flex items-start gap-2 text-xs text-slate-500">
                          <MapPin className="h-3.5 w-3.5 text-rose-400 mt-0.5" />
                          <span>{store.address}</span>
                        </div>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${store.status === "Open" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                        {store.status}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-rose-400" /> {store.hours}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-rose-400" /> {store.phone}
                      </span>
                    </div>
                    <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                      Detail Toko
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CatalogFooter />
    </div>
  );
}
