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

type CartItem = { id: number; qty: number; size: string };
const skinTypes = ["All", "Pria", "Wanita", "Aksesoris", "Sepatu"];
const sortOptions = ["Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating Tertinggi"];

export default function EcommercePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Terbaru");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  let filtered = activeCategory === "All" ? [...products] : products.filter((p) => p.category === activeCategory);
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
  if (sortBy === "Harga Terendah") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "Harga Tertinggi") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "Rating Tertinggi") filtered.sort((a, b) => b.rating - a.rating);

  const addToCart = (id: number, size: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id && c.size === size);
      if (existing) return prev.map((c) => c.id === id && c.size === size ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, qty: 1, size }];
    });
  };

  const updateQty = (id: number, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => c.id === id && c.size === size ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  };

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => {
    const p = products.find((x) => x.id === c.id);
    return s + (p?.price ?? 0) * c.qty;
  }, 0);

  const toggleWishlist = (id: number) => setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  const detailProduct = selectedProduct !== null ? products.find((p) => p.id === selectedProduct) : null;
  const recommended = detailProduct ? products.filter((p) => p.id !== detailProduct.id).slice(0, 4) : [];

  return (
    <div className="min-h-screen bg-amber-50/20 font-sans">
      <EcomNav
        cart={cart} totalItems={totalItems} totalPrice={totalPrice}
        cartOpen={cartOpen} setCartOpen={setCartOpen} updateQty={updateQty}
        wishlist={wishlist} toggleWishlist={toggleWishlist}
        searchOpen={searchOpen} setSearchOpen={setSearchOpen}
        onCheckout={() => setCartOpen(false)}
      />

      {/* ---- HERO ---- */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 py-20 sm:py-28">
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-4 py-1.5 text-sm font-medium text-amber-700 mb-6 border border-amber-200/50 backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5" /> Summer Collection 2026
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl md:text-6xl">
                Style yang
                <span className="block mt-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Mendefinisikan Anda
                </span>
              </h1>
              <p className="mt-5 text-lg text-slate-600 max-w-lg">
                Temukan koleksi fashion terbaru yang memadukan kenyamanan dengan gaya. Tampil percaya diri setiap hari.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200 hover:from-amber-600 hover:to-orange-600 transition-all hover:-translate-y-0.5"
                >
                  Shop Now <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => document.getElementById("lookbook")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-300 px-6 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  Lihat Lookbook
                </button>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { g: "from-amber-300 to-orange-300", label: "Jacket" },
                { g: "from-slate-300 to-zinc-300", label: "Sneakers" },
                { g: "from-rose-300 to-pink-300", label: "Dress" },
                { g: "from-yellow-300 to-amber-300", label: "Bag" },
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
      <section className="py-8 bg-white border-y border-amber-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: "Gratis Ongkir" },
              { icon: Shield, text: "Garansi Original" },
              { icon: Clock, text: "24h Pengiriman" },
              { icon: Percent, text: "Diskon Member" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 justify-center">
                <Icon className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-slate-600">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FLASH SALE with COUNTDOWN ---- */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Flash Sale</h2>
                <p className="text-sm text-slate-500">Promo terbatas — jangan sampai kehabisan!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500">Berakhir dalam:</span>
              <CountdownTimer />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {flashSale.map((item) => (
              <div key={item.name} className="group rounded-2xl border border-amber-100 bg-white overflow-hidden transition-all hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1">
                <div className={`h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                  <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">-{item.discount}%</span>
                  <span className="text-3xl font-bold text-white/30">{item.name.split(" ")[0]}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-amber-600">{fmt(item.sale)}</span>
                    <span className="text-xs text-slate-400 line-through">{fmt(item.orig)}</span>
                  </div>
                  <button
                    onClick={() => addToCart(0, "M")}
                    className="mt-3 w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-2 text-sm font-medium text-white hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PRODUCTS with FILTER & VIEW TOGGLE ---- */}
      <section id="shop" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                {activeCategory === "All" ? "Semua Produk" : activeCategory}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{filtered.length} produk ditemukan</p>
            </div>
            <div className="flex items-center gap-2">
              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-slate-200 rounded-lg overflow-hidden">
                <button onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors ${viewMode === "grid" ? "bg-amber-50 text-amber-600" : "text-slate-400 hover:bg-slate-50"}`}>
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors ${viewMode === "list" ? "bg-amber-50 text-amber-600" : "text-slate-400 hover:bg-slate-50"}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
              {activeCategory !== "All" && (
                <button onClick={() => setActiveCategory("All")} className="inline-flex items-center gap-1 rounded-full border border-amber-200 px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50">
                  <X className="h-3 w-3" /> Reset
                </button>
              )}
              <button onClick={() => setFilterOpen(!filterOpen)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${filterOpen ? "border-amber-300 bg-amber-50 text-amber-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filter & Sort
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mb-8 rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Kategori</div>
                  <div className="flex flex-wrap gap-2">
                    {skinTypes.map((t) => (
                      <button key={t} onClick={() => setActiveCategory(t)}
                        className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${activeCategory === t ? "border-amber-400 bg-amber-100 text-amber-600" : "border-slate-200 text-slate-500 hover:border-amber-200"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Price Range</div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{fmt(priceRange[0])}</span>
                    <input type="range" min={0} max={800000} step={50000} value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="flex-1 accent-amber-500" />
                    <span>{fmt(priceRange[1])}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Sort By</div>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 outline-none focus:border-amber-300">
                    {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Grid / List */}
          <div className={viewMode === "grid" ? "grid gap-6 grid-cols-2 lg:grid-cols-4" : "space-y-4"}>
            {filtered.map((product) => (
              viewMode === "grid" ? (
                <div key={product.id} className="group rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-amber-100 hover:-translate-y-1">
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
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-amber-50 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-medium text-amber-500 mb-1">{product.category}</div>
                    <h3 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-slate-700">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-amber-600">{fmt(product.price)}</span>
                      {product.originalPrice && <span className="text-xs text-slate-400 line-through">{fmt(product.originalPrice)}</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.sizes.slice(0, 4).map((s) => (
                        <span key={s} className="rounded border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">{s}</span>
                      ))}
                    </div>
                    <button
                      onClick={() => addToCart(product.id, product.sizes[0])}
                      className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-2 text-xs font-semibold text-white hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ) : (
                /* List view */
                <div key={product.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 hover:shadow-lg hover:shadow-amber-50 transition-shadow cursor-pointer"
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
                    <div className="text-xs font-medium text-amber-500">{product.category}</div>
                    <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">{product.desc}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-slate-700">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-amber-600">{fmt(product.price)}</span>
                      {product.originalPrice && <span className="text-xs text-slate-400 line-through">{fmt(product.originalPrice)}</span>}
                      <div className="flex gap-1 ml-auto">
                        {product.sizes.slice(0, 3).map((s) => (
                          <span key={s} className="rounded border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <Lookbook />

      {/* ---- WHY US ---- */}
      <section id="whyus" className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Mengapa UrbanStyle?</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { icon: "📦", title: "Original 100%", desc: "Semua produk dijamin asli dari brand resmi" },
              { icon: "🚚", title: "Gratis Ongkir", desc: "Pengiriman gratis untuk pembelian di atas Rp 300rb" },
              { icon: "🔄", title: "30 Hari Retur", desc: "Kebijakan pengembalian mudah tanpa ribet" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-2xl">
                  {icon}
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="mt-1 text-sm text-amber-100">{desc}</p>
              </div>
            ))}
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
