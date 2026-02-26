"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Star, ArrowRight, Sparkles, ChevronRight, Eye, X,
  SlidersHorizontal,
} from "lucide-react";
import CatalogNav from "./components/CatalogNav";
import ProductDetail from "./components/ProductDetail";
import { BrandStory, BeforeAfter, BlogSection, InstagramFeed, CatalogFooter } from "./components/CatalogSections";
import { categories, products, badgeColor } from "./components/CatalogData";

const featured = [
  { title: "Summer Glow Collection", desc: "Koleksi terbaru untuk tampil bercahaya sepanjang hari", gradient: "from-rose-400 to-pink-500" },
  { title: "Natural Beauty Series", desc: "Rangkaian skincare berbahan alami untuk kulit sensitif", gradient: "from-emerald-400 to-teal-500" },
];

const testimonials = [
  { name: "Anisa R.", text: "Serum-nya amazing! Kulit jadi glowing dalam 2 minggu.", rating: 5 },
  { name: "Dewi S.", text: "Lipstick velvet matte favorit, warnanya super cantik.", rating: 5 },
  { name: "Rina K.", text: "Hair mask terbaik yang pernah saya coba!", rating: 5 },
];

const sortOptions = ["Paling Populer", "Terbaru", "Rating Tertinggi", "A-Z"];

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [liked, setLiked] = useState<number[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Paling Populer");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const rawCategory = searchParams.get("category");
    if (!rawCategory) return;
    const normalized = rawCategory === "Body Care" ? "Bodycare" : rawCategory;
    if (normalized === "New Arrivals") {
      setActiveBadge("New");
      setActiveCategory("All");
    } else if (normalized === "Best Seller") {
      setActiveBadge("Best Seller");
      setActiveCategory("All");
    } else {
      setActiveBadge(null);
      setActiveCategory(normalized);
    }
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);

  let filtered = activeCategory === "All" ? [...products] : products.filter((p) => p.category === activeCategory);
  if (activeBadge) filtered = filtered.filter((p) => p.badge === activeBadge);
  if (sortBy === "Paling Populer") filtered.sort((a, b) => b.reviews - a.reviews);
  else if (sortBy === "Rating Tertinggi") filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "A-Z") filtered.sort((a, b) => a.name.localeCompare(b.name));

  const toggleLike = (id: number) => setLiked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  const detailProduct = selectedProduct !== null ? products.find((p) => p.id === selectedProduct) : null;

  return (
    <div className="min-h-screen bg-rose-50/30 font-sans">
      <CatalogNav liked={liked} toggleLike={toggleLike} searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

      {/* HERO */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 py-20 sm:py-28">
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-4 py-1.5 text-sm font-medium text-rose-600 mb-6 backdrop-blur-sm border border-rose-200/50">
            <Sparkles className="h-3.5 w-3.5" /> New Collection 2026
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
            Temukan Kecantikan
            <span className="block mt-2 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              Terbaik Untuk Anda
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Koleksi produk kecantikan premium yang terinspirasi dari alam. 100% halal, natural, dan cruelty-free.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 hover:from-rose-600 hover:to-pink-600 transition-all hover:-translate-y-0.5">
              Shop Now <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-rose-300 px-6 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
              Best Seller
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Kategori Produk</h2>
            <p className="mt-2 text-slate-500">Jelajahi berbagai kategori kecantikan kami</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button key={cat.name} onClick={() => { setActiveBadge(null); setActiveCategory(cat.name); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`group flex flex-col items-center gap-3 rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-100 ${activeCategory === cat.name ? "border-rose-300 bg-rose-50 shadow-md shadow-rose-100" : "border-slate-200 bg-white"}`}>
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${cat.color} transition-transform group-hover:scale-110`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-slate-700 text-sm">{cat.name}</div>
                  <div className="text-xs text-slate-400">{cat.count} produk</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((f) => (
              <div key={f.title} className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${f.gradient} p-8 sm:p-10 text-white`}>
                <div className="absolute top-4 right-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                <h3 className="text-2xl font-bold">{f.title}</h3>
                <p className="mt-2 text-white/80 max-w-xs">{f.desc}</p>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
                  Lihat Koleksi <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS with FILTER */}
      <section id="products" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {activeBadge ? (activeBadge === "New" ? "New Arrivals" : activeBadge) : activeCategory === "All" ? "Semua Produk" : activeCategory}
              </h2>
              <p className="mt-1 text-slate-500 text-sm">{filtered.length} produk ditemukan</p>
            </div>
            <div className="flex items-center gap-2">
              {(activeCategory !== "All" || activeBadge) && (
                <button onClick={() => { setActiveCategory("All"); setActiveBadge(null); }} className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50">
                  <X className="h-3 w-3" /> Reset
                </button>
              )}
              <button onClick={() => setFilterOpen(!filterOpen)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filterOpen ? "border-rose-300 bg-rose-50 text-rose-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filter & Sort
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mb-8 rounded-2xl border border-rose-100 bg-rose-50/50 p-5 animate-fade-up">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Kategori</div>
                  <div className="flex flex-wrap gap-2">
                    {["All", ...categories.map((c) => c.name)].map((t) => (
                      <button
                        key={t}
                        onClick={() => { setActiveBadge(null); setActiveCategory(t); }}
                        className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                          activeCategory === t
                            ? "border-rose-400 bg-rose-100 text-rose-600"
                            : "border-slate-200 text-slate-500 hover:border-rose-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Sort By</div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-rose-300"
                  >
                    {sortOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          {isLoading ? (
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-100 bg-white overflow-hidden animate-pulse">
                  <div className="h-56 bg-slate-100" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-24 rounded-full bg-slate-100" />
                    <div className="h-4 w-3/4 rounded-full bg-slate-100" />
                    <div className="h-3 w-full rounded-full bg-slate-100" />
                    <div className="h-3 w-1/2 rounded-full bg-slate-100" />
                    <div className="h-8 w-full rounded-full bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-rose-100 bg-rose-50/60 px-6 py-10 text-center">
              <div className="text-lg font-semibold text-slate-800">Produk tidak ditemukan</div>
              <p className="mt-2 text-sm text-slate-500">Coba reset filter atau pilih kategori lain.</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <X className="h-3 w-3" /> Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
              {filtered.map((product) => (
                <div key={product.id} className="group rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-100 hover:-translate-y-1">
                  <div
                    className={`relative h-56 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden cursor-pointer`}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    <div className="text-4xl font-bold text-white/30">{product.name.split(" ")[0]}</div>
                    {product.badge && (
                      <span className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${badgeColor[product.badge]}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product.id); }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-rose-50 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-medium text-rose-500 mb-1">{product.category}</div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-400 mb-2 line-clamp-2">{product.desc}</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mb-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1">
                        {product.variants.length} varian
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(product.id)}
                      className="mt-3 w-full rounded-full border border-rose-200 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center sm:text-3xl mb-12">Apa Kata Pelanggan</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 border border-rose-100 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="text-sm font-semibold text-slate-800">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandStory />
      <BeforeAfter />
      <BlogSection />

      {/* NEWSLETTER */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Dapatkan Promo Eksklusif</h2>
          <p className="mt-2 text-rose-100 max-w-md mx-auto">Daftar newsletter kami dan dapatkan diskon 15% untuk pembelian pertama.</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Email Anda" className="w-full rounded-full bg-white/20 px-5 py-3 text-sm placeholder:text-rose-200 outline-none backdrop-blur-sm border border-white/25 focus:border-white/50" />
            <button className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <InstagramFeed />
      <CatalogFooter />

      {/* PRODUCT DETAIL MODAL */}
      {detailProduct && (
        <ProductDetail product={detailProduct} onClose={() => setSelectedProduct(null)} onToggleLike={toggleLike} isLiked={liked.includes(detailProduct.id)} />
      )}
    </div>
  );
}
