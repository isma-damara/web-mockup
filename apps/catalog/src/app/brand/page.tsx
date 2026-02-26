"use client";

import { useState } from "react";
import CatalogNav from "../components/CatalogNav";
import { BrandStory, CatalogFooter } from "../components/CatalogSections";

export default function Page() {
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-slate-900">About Brand</h1>
        <p className="mt-2 text-sm text-slate-600">Kenali perjalanan dan nilai GlowBeauty.</p>
      </section>
      <BrandStory />
      <CatalogFooter />
    </div>
  );
}


