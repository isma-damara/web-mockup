"use client";

import { useState } from "react";
import {
  Star, ArrowRight, Zap, Heart, Eye, X, ShoppingCart,
  SlidersHorizontal, Clock, Truck, Shield, Percent, Grid3X3, List,
} from "lucide-react";
import EcomNav from "./components/EcomNav";
import ProductDetail from "./components/ProductDetail";
import { CountdownTimer, Lookbook, BlogSection, ReviewSection, EcomFooter } from "./components/EcomSections";
import { products, flashSale, fmt, badgeColor } from "./components/EcomData";
import { useCart } from "./components/useCart";

const skinTypes = ["All", "Pria", "Wanita", "Aksesoris", "Sepatu"];
const sortOptions = ["Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating Tertinggi"];
const categoryCards = [
  {
    title: "Pakaian Harian",
    desc: "Pilihan nyaman untuk kerja, santai, dan aktivitas harian.",
    count: "120+",
    gradient: "from-emerald-100 to-teal-100",
  },
  {
    title: "Sepatu & Sneaker",
    desc: "Ringan, empuk, dan enak dipakai seharian.",
    count: "80+",
    gradient: "from-teal-100 to-cyan-100",
  },
  {
    title: "Aksesoris",
    desc: "Aksen kecil yang bikin gaya makin hidup.",
    count: "60+",
    gradient: "from-emerald-100 to-lime-100",
  },
  {
    title: "Outerwear",
    desc: "Layering rapi yang tetap hangat dan stylish.",
    count: "45+",
    gradient: "from-emerald-50 to-green-100",
  },
];

const promoBanners = [
  {
    title: "Harga Bersahabat",
    desc: "Bundle 3 item, diskon 20% untuk koleksi harian.",
    badge: "Bundle Deal",
  },
  {
    title: "Hadiah Akhir Pekan",
    desc: "Belanja minimal Rp 350rb, dapat tote bag eksklusif.",
    badge: "Bonus",
  },
];
const trustBadges = [
  { title: "Pembayaran Aman", desc: "Transaksi terenkripsi dan notifikasi jelas." },
  { title: "Pengiriman Cepat", desc: "Estimasi 1-2 hari kerja untuk kota besar." },
  { title: "Retur Mudah", desc: "Ajukan retur dengan langkah yang mudah dipahami." },
  { title: "Support Ramah", desc: "Tim siap bantu lewat chat, email, atau telepon." },
];
const faqItems = [
  { q: "Bagaimana cara cek ukuran?", a: "Gunakan panduan size di detail produk atau tanya tim kami." },
  { q: "Apakah bisa bayar di tempat?", a: "Saat ini kami fokus pada transfer dan e-wallet." },
  { q: "Berapa lama pengiriman?", a: "Rata-rata 1-3 hari kerja, tergantung lokasi pengiriman." },
];

export default function EcommercePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Terbaru");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const { cart, addToCart } = useCart();

  let filtered = activeCategory === "All"
    ? [...products]
    : products.filter((p) => p.category === activeCategory);
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
  if (sortBy === "Harga Terendah") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "Harga Tertinggi") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "Rating Tertinggi") filtered.sort((a, b) => b.rating - a.rating);

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => {
    const p = products.find((x) => x.id === c.id);
    return s + (p?.price ?? 0) * c.qty;
  }, 0);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  const detailProduct = selectedProduct !== null ? products.find((p) => p.id === selectedProduct) : null;
  const recommended = detailProduct
    ? products.filter((p) => p.id !== detailProduct.id).slice(0, 4)
    : [];
  const checkoutPreviewItems = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <EcomNav
        cart={cart} totalItems={totalItems}
        wishlist={wishlist} toggleWishlist={toggleWishlist}
        searchOpen={searchOpen} setSearchOpen={setSearchOpen}
      />

      {/* ---- HERO ---- */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-lime-50 py-20 sm:py-28">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(16,185,129,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-6 border border-emerald-200/60 backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5" /> Pilihan Ramah 2026
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
                Gaya yang
                <span className="block mt-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-500 bg-clip-text text-transparent">
                  Mendefinisikan Anda
                </span>
              </h1>
              <p className="mt-5 text-lg text-slate-600 max-w-lg leading-relaxed">
                Temukan koleksi terbaru yang nyaman dipakai dan tetap stylish. Biar percaya diri setiap hari.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 transition-all hover:-translate-y-0.5"
                >
                  Belanja Sekarang <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => document.getElementById("lookbook")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
                >
                  Lihat Lookbook
                </button>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { g: "from-emerald-200 to-teal-200", label: "Jacket" },
                { g: "from-slate-300 to-zinc-300", label: "Sneakers" },
                { g: "from-rose-300 to-pink-300", label: "Dress" },
                { g: "from-lime-200 to-emerald-200", label: "Bag" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl bg-gradient-to-br ${item.g} h-44 flex items-center justify-center text-white/50 text-2xl font-bold ${i === 1 ? "translate-y-6" : ""} ${i === 2 ? "-translate-y-6" : ""}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- BENEFITS ---- */}
      <section className="py-10 sm:py-12 bg-white border-y border-emerald-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: "Gratis Ongkir" },
              { icon: Shield, text: "Produk Terjamin" },
              { icon: Clock, text: "Proses Cepat" },
              { icon: Percent, text: "Member Discount" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 justify-center">
                <Icon className="h-5 w-5 text-emerald-500" />
                <span className="text-sm font-medium text-slate-600">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PROMO BANNERS ---- */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {promoBanners.map((banner) => (
              <div
                key={banner.title}
                className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {banner.badge}
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-800">{banner.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{banner.desc}</p>
                <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                  Lihat Promo <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CATEGORIES ---- */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Kategori Favorit</h2>
              <p className="mt-1 text-sm text-slate-500">Pilih kategori sesuai kebutuhan dan gaya kamu.</p>
            </div>
            <span className="hidden sm:inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Pilihan Favorit
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((cat) => (
              <button
                key={cat.title}
                onClick={() =>
                  setActiveCategory(
                    cat.title === "Sepatu & Sneaker"
                      ? "Sepatu"
                      : cat.title === "Aksesoris"
                        ? "Aksesoris"
                        : cat.title === "Pakaian Harian"
                          ? "Wanita"
                          : "Pria",
                  )}
                className="group text-left rounded-3xl border border-emerald-100 bg-white p-5 transition-all hover:shadow-lg hover:shadow-emerald-100"
              >
                <div className={`h-24 w-full rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center`}>
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {cat.count} item
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-800">{cat.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FLASH SALE with COUNTDOWN ---- */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Flash Sale</h2>
                <p className="text-sm text-slate-500">Promo terbatas, buruan sebelum habis.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500">Berakhir dalam:</span>
              <CountdownTimer />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {flashSale.map((item) => (
              <div key={item.name} className="group rounded-2xl border border-emerald-100 bg-white overflow-hidden transition-all hover:shadow-xl hover:shadow-emerald-100 hover:-translate-y-1">
                <div className={`h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                  <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">-{item.discount}%</span>
                  <span className="text-3xl font-bold text-white/30">{item.name.split(" ")[0]}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-emerald-600">{fmt(item.sale)}</span>
                    <span className="text-xs text-slate-400 line-through">{fmt(item.orig)}</span>
                  </div>
                  <button
                    onClick={() => {
                      const product = products.find((p) => p.id === item.productId);
                      if (!product) return;
                      addToCart(product.id, product.sizes[0]);
                    }}
                    className="mt-3 w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 py-2 text-sm font-medium text-white hover:from-emerald-600 hover:to-teal-600 transition-all"
                  >
                    Ambil Promo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PRODUCTS with FILTER & VIEW TOGGLE ---- */}
      <section id="shop" className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {activeCategory === "All" ? "Semua Produk" : activeCategory}
              </h2>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">{filtered.length} produk siap kamu pilih</p>
            </div>
            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-emerald-50 text-emerald-600" : "text-slate-400 hover:bg-slate-50"}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-emerald-50 text-emerald-600" : "text-slate-400 hover:bg-slate-50"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              {activeCategory !== "All" && (
                <button onClick={() => setActiveCategory("All")} className="inline-flex items-center gap-1 rounded-full border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50">
                  <X className="h-3 w-3" /> Reset
                </button>
              )}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filterOpen ? "border-emerald-300 bg-emerald-50 text-emerald-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filter & Sort
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Kategori</div>
                  <div className="flex flex-wrap gap-2">
                    {skinTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveCategory(t)}
                        className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${activeCategory === t ? "border-emerald-400 bg-emerald-100 text-emerald-600" : "border-slate-200 text-slate-500 hover:border-emerald-200"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
              <div className="text-sm font-medium text-slate-700 mb-2">Rentang Harga</div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{fmt(priceRange[0])}</span>
                    <input type="range" min={0} max={800000} step={50000} value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="flex-1 accent-emerald-500" />
                    <span>{fmt(priceRange[1])}</span>
                  </div>
                </div>
                <div>
              <div className="text-sm font-medium text-slate-700 mb-2">Urutkan</div>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-emerald-300">
                    {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Grid / List */}
          <div className={viewMode === "grid" ? "grid gap-6 md:gap-7 grid-cols-2 lg:grid-cols-4" : "space-y-4"}>
            {filtered.map((product) => (
              viewMode === "grid" ? (
                <div key={product.id} className="group rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100 hover:-translate-y-1">
                  <div className={`relative h-56 bg-gradient-to-br ${product.gradient} group-hover:bg-gradient-to-br group-hover:${product.gradientAlt} flex items-center justify-center overflow-hidden cursor-pointer`}
                    onClick={() => setSelectedProduct(product.id)}>
                    <div className="text-4xl font-bold text-white/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">{product.name.split(" ")[0]}</div>
                    {product.badge && (
                      <span className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-bold ${badgeColor[product.badge] ?? "bg-slate-500 text-white"}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                        className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${wishlist.includes(product.id) ? "bg-rose-500 text-white" : "bg-white/80 text-slate-600 hover:bg-rose-50"}`}>
                        <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedProduct(product.id); }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-emerald-50 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-medium text-emerald-500 mb-1">{product.category}</div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
                      <span className="text-xs font-medium text-slate-700">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-emerald-600">{fmt(product.price)}</span>
                      {product.originalPrice && <span className="text-xs text-slate-400 line-through">{fmt(product.originalPrice)}</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.sizes.slice(0, 4).map((s) => {
                        const active = (selectedSizes[product.id] ?? product.sizes[0]) === s;
                        return (
                          <button
                            key={s}
                            onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: s }))}
                            className={`rounded border px-2 py-0.5 text-[10px] transition-colors ${
                              active
                                ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                                : "border-slate-200 text-slate-500 hover:border-emerald-200"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => addToCart(product.id, selectedSizes[product.id] ?? product.sizes[0])}
                      className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 py-2 text-xs font-semibold text-white hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ) : (
                /* List view */
                <div key={product.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 hover:shadow-lg hover:shadow-emerald-50 transition-shadow cursor-pointer"
                  onClick={() => setSelectedProduct(product.id)}>
                  <div className={`h-32 w-32 shrink-0 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <span className="text-2xl font-bold text-white/30">{product.name.split(" ")[0]}</span>
                    {product.badge && (
                      <span className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9px] font-bold ${badgeColor[product.badge] ?? "bg-slate-500 text-white"}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-emerald-500">{product.category}</div>
                    <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">{product.desc}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 fill-emerald-400 text-emerald-400" />
                      <span className="text-xs font-medium text-slate-700">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-600">{fmt(product.price)}</span>
                      {product.originalPrice && <span className="text-xs text-slate-400 line-through">{fmt(product.originalPrice)}</span>}
                      <div className="flex gap-1 ml-auto">
                        {product.sizes.slice(0, 3).map((s) => {
                          const active = (selectedSizes[product.id] ?? product.sizes[0]) === s;
                          return (
                            <button
                              key={s}
                              onClick={(e) => { e.stopPropagation(); setSelectedSizes((prev) => ({ ...prev, [product.id]: s })); }}
                              className={`rounded border px-2 py-0.5 text-[10px] transition-colors ${
                                active
                                  ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 text-slate-500 hover:border-emerald-200"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ---- CART / CHECKOUT PREVIEW ---- */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Preview Keranjang & Checkout</h2>
              <p className="mt-1 text-sm text-slate-500">Lihat alur belanja yang simpel dan jelas.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Aman - Cepat - Jelas
            </span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Ringkasan Keranjang</h3>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {checkoutPreviewItems.length} item
                </span>
              </div>
              <div className="space-y-4">
                {checkoutPreviewItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3">
                    <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-xs font-bold text-white/40`}>
                      {item.name.split(" ")[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-800 truncate">{item.name}</div>
                      <div className="text-xs text-slate-400">Qty 1 - Size {item.sizes[0]}</div>
                    </div>
                    <div className="text-sm font-semibold text-emerald-600">{fmt(item.price)}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-800">
                  {fmt(checkoutPreviewItems.reduce((s, i) => s + i.price, 0))}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">Checkout Preview</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                  <div className="text-xs font-semibold text-emerald-700">Alamat Pengiriman</div>
                  <div className="mt-1 text-slate-600">Jl. Melati No. 12, Bandung</div>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <div className="text-xs font-semibold text-slate-700">Metode Pembayaran</div>
                  <div className="mt-1 text-slate-600">Transfer Bank / E-Wallet</div>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <div className="text-xs font-semibold text-slate-700">Estimasi Pengiriman</div>
                  <div className="mt-1 text-slate-600">1-2 hari kerja - Gratis Ongkir</div>
                </div>
              </div>
              <button className="mt-6 w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
                Lanjut ke Pembayaran
              </button>
              <p className="mt-3 text-center text-xs text-slate-400">
                Pembayaran aman dengan enkripsi standar industri.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Lookbook />

      {/* ---- WHY US ---- */}
      <section id="whyus" className="py-16 sm:py-24 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Mengapa UrbanStyle?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { icon: "Package", title: "Original 100%", desc: "Produk terjamin asli dari brand resmi." },
              { icon: "Delivery", title: "Gratis Ongkir", desc: "Gratis ongkir untuk pembelian di atas Rp 300rb." },
              { icon: "Return", title: "30 Hari Retur", desc: "Retur mudah sampai 30 hari setelah diterima." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-2xl">
                  {icon}
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="mt-1 text-sm text-emerald-100">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- TRUST & FAQ ---- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Belanja dengan Tenang</h2>
              <p className="mt-2 text-sm text-slate-500 max-w-xl leading-relaxed">
                Fokus kami bikin belanja nyaman, jelas, dan ramah untuk semua orang.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {trustBadges.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                    <div className="text-sm font-semibold text-emerald-700">{item.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">FAQ Singkat</h3>
              <div className="mt-4 space-y-4">
                {faqItems.map((item) => (
                  <div key={item.q} className="rounded-2xl border border-slate-100 p-4">
                    <div className="text-sm font-semibold text-slate-800">{item.q}</div>
                    <div className="mt-1 text-xs text-slate-500">{item.a}</div>
                  </div>
                ))}
              </div>
              <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors">
                Lihat Semua FAQ
              </button>
            </div>
          </div>
        </div>
      </section>

      <BlogSection />
      <ReviewSection />
      <EcomFooter />

      {/* PRODUCT DETAIL MODAL */}
      {detailProduct && (
        <ProductDetail
          product={detailProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlist.includes(detailProduct.id)}
          recommended={recommended}
          onSelectProduct={setSelectedProduct}
        />
      )}
    </div>
  );
}
