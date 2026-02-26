"use client";

import { useMemo, useState } from "react";
import { Button } from "@workspace/ui/ui/button";

type Spot = {
  name: string;
  type: string;
  price: string;
  rating: string;
  icon: string;
  color: string;
};

type Props = {
  wisataSpots: Spot[];
  pariwisataCategories: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function PariwisataClient({ wisataSpots, pariwisataCategories }: Props) {
  const [activeCategory, setActiveCategory] = useState(pariwisataCategories[0] ?? "Semua");

  const filteredSpots = useMemo(() => {
    if (activeCategory === "Semua") return wisataSpots;
    return wisataSpots.filter((spot) => spot.type === activeCategory);
  }, [wisataSpots, activeCategory]);

  return (
    <div className="py-10 sm:py-12">
      <div className="filter-bar mb-6">
        {pariwisataCategories.map((tag) => {
          const active = tag === activeCategory;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveCategory(tag)}
              className={`filter-chip ${active ? "filter-chip--active" : "filter-chip--idle"}`}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div id="destinasi" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSpots.map((spot) => {
          const id = `spot-${slugify(spot.name)}`;
          return (
            <div key={spot.name} id={id} className="card-base overflow-hidden hover:-translate-y-1 hover:shadow-lg">
              <div className={`relative flex h-[200px] items-center justify-center text-5xl text-white ${spot.color}`}>
                {spot.icon}
                <div className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 text-[12px] font-semibold text-[var(--gov-gold-light)]">
                  ⭐ {spot.rating}
                </div>
              </div>
              <div className="p-4">
                <span className="inline-flex rounded-full bg-[rgba(26,86,219,0.1)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--gov-blue)]">
                  {spot.type}
                </span>
                <div className="mt-2 text-[15px] font-bold text-[var(--gov-navy)]">{spot.name}</div>
                <div className="mt-1 flex items-center gap-2 text-[12px] text-[var(--gov-slate)]">
                  <span>📍 Kota Contoh</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-[13px] text-[var(--gov-slate)]">
                  <span>🎟 {spot.price}</span>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-8 border-[var(--gov-blue)] text-[var(--gov-blue)] hover:bg-[var(--gov-blue)] hover:text-white"
                  >
                    <a href={`/site/government/pariwisata#${id}`}>Detail</a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div id="peta" className="mt-10 rounded-2xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] px-6 py-8 text-center text-white">
        <div className="text-3xl">✈️</div>
        <div className="mt-2 font-display text-[22px] font-bold">Rencanakan Perjalanan Anda ke Kota Contoh</div>
        <div className="mt-2 text-[13.5px] text-white/70">
          Hubungi Dinas Pariwisata untuk panduan wisata, paket tur, dan informasi akomodasi.
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-[var(--gov-gold)] text-white hover:bg-[#a87820]">
            <a href="/site/government/pariwisata#peta">📍 Peta Wisata</a>
          </Button>
          <Button asChild variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
            <a href="/site/government/kontak">📞 Hubungi Dinas</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
