"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star, ArrowRight, Zap, Eye, X, ShoppingCart,
  SlidersHorizontal, Clock, Truck, Shield, Percent, Grid3X3, List,
} from "lucide-react";
import EcomNav from "./components/EcomNav";
import ProductDetail from "./components/ProductDetail";
import { CountdownTimer, Lookbook, ReviewSection, EcomFooter } from "./components/EcomSections";
import { products, flashSale, fmt, badgeColor, productImageById } from "./components/EcomData";
import { useCart } from "./components/useCart";
import { useSiteBase, withSiteBase } from "./components/useSiteBase";

const skinTypes = ["All", "Pria", "Wanita", "Aksesoris", "Sepatu"];
const sortOptions = ["Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating Tertinggi"];
const categoryCards = [
  {
    title: "Pakaian Harian",
    filter: "Wanita",
    image: "/assets/kategori/pakaianharian.jpg",
  },
  {
    title: "Sepatu & Sneaker",
    filter: "Sepatu",
    image: "/assets/kategori/sepatu.jpg",
  },
  {
    title: "Aksesoris",
    filter: "Aksesoris",
    image: "/assets/kategori/aksesoris.jpg",
  },
  {
    title: "Outerwear",
    filter: "Pria",
    image: "/assets/kategori/outwear.jpg",
  },
  {
    title: "Basic Pria",
    filter: "Pria",
    image: "/assets/kategori/basicpria.jpg",
  },
  {
    title: "Essentials Wanita",
    filter: "Wanita",
    image: "/assets/kategori/essentialswanita.jpg",
  },
];

const promoBanners = [
  {
    title: "Harga Bersahabat",
    desc: "Bundle 3 item, diskon 20% untuk koleksi harian.",
    badge: "Bundle Deal",
    cta: "Pakai Bundle",
    tone: "from-emerald-500 via-teal-500 to-cyan-500",
    glow: "bg-emerald-300/40",
    chips: ["Min. 3 item", "Hemat hingga Rp120rb"],
    icon: Percent,
  },
  {
    title: "Hadiah Akhir Pekan",
    desc: "Belanja minimal Rp 350rb, dapat tote bag eksklusif.",
    badge: "Bonus",
    cta: "Klaim Hadiah",
    tone: "from-teal-500 via-emerald-500 to-lime-500",
    glow: "bg-lime-300/40",
    chips: ["Min. Rp350rb", "Weekend Only"],
    icon: Zap,
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
const heroSlides = [
  "/assets/hero/hero1.jpg",
  "/assets/hero/hero2.jpg",
  "/assets/hero/hero3.jpg",
  "/assets/hero/hero4.jpg",
  "/assets/hero/hero5.jpg",
];

export default function EcommercePage() {
  const router = useRouter();
  const siteBase = useSiteBase();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Terbaru");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quickOrderAction, setQuickOrderAction] = useState<"cart" | "buy" | null>(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  let filtered = activeCategory === "All"
    ? [...products]
    : products.filter((p) => p.category === activeCategory);
  filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
  if (sortBy === "Harga Terendah") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "Harga Tertinggi") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "Rating Tertinggi") filtered.sort((a, b) => b.rating - a.rating);
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  const goToShopSection = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const selectCategoryAndGoToProducts = (category: string) => {
    setActiveCategory(category);
    requestAnimationFrame(() => {
      goToShopSection();
    });
  };
  const openProductDetail = (id: number) => router.push(withSiteBase(`/product/${id}`, siteBase));
  const closeProductModal = () => {
    setSelectedProductId(null);
    setQuickOrderAction(null);
  };
  const openQuickCartPopup = (id: number) => {
    setSelectedProductId(id);
    setQuickOrderAction("cart");
  };
  const selectedProduct = selectedProductId === null
    ? null
    : products.find((p) => p.id === selectedProductId) ?? null;
  const recommendedForSelected = selectedProduct
    ? products.filter((p) => p.id !== selectedProduct.id).slice(0, 4)
    : [];
  const buyNow = (id: number, size: string, qty: number) => {
    for (let i = 0; i < qty; i++) addToCart(id, size);
    closeProductModal();
    router.push(withSiteBase("/checkout", siteBase));
  };

  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <EcomNav
        cart={cart} totalItems={totalItems}
        wishlist={wishlist} toggleWishlist={toggleWishlist}
        searchOpen={searchOpen} setSearchOpen={setSearchOpen}
      />

      {/* ---- HERO ---- */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
        {heroSlides.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`Hero ${idx + 1}`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              idx === activeHeroSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl rounded-3xl border border-white/20 bg-black/20 p-6 text-white backdrop-blur-sm sm:p-8">
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-emerald-100">
              <Zap className="h-3.5 w-3.5" /> Pilihan Ramah 2026
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Gaya yang
              <span className="mt-1 block text-emerald-200">
                Mendefinisikan Anda
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-100">
              Temukan koleksi terbaru yang nyaman dipakai dan tetap stylish. Biar percaya diri setiap hari.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={goToShopSection}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:from-emerald-600 hover:to-teal-600 transition-all hover:-translate-y-0.5"
              >
                Belanja Sekarang <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => document.getElementById("lookbook")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Lihat Lookbook
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 backdrop-blur-sm">
          {heroSlides.map((_, idx) => (
            <button
              key={`hero-dot-${idx}`}
              onClick={() => setActiveHeroSlide(idx)}
              aria-label={`Pilih hero slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === activeHeroSlide ? "w-6 bg-emerald-400" : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categoryCards.map((cat) => (
              <button
                key={cat.title}
                onClick={() => selectCategoryAndGoToProducts(cat.filter)}
                className="group text-center"
              >
                <div className="mx-auto aspect-square w-32 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-transform duration-300 group-hover:scale-[1.02] sm:w-40 md:w-40">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-800">{cat.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PROMO BANNERS ---- */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Promo Spesial</h2>
              <p className="mt-1 text-sm text-slate-500">Penawaran pilihan dengan benefit yang lebih terasa.</p>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {promoBanners.map((banner) => (
              <article
                key={banner.title}
                className="group rounded-3xl bg-gradient-to-br from-emerald-200/70 to-teal-200/70 p-[1px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-100/70"
              >
                <div className={`relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-br ${banner.tone} p-6 sm:p-7 text-white`}>
                  <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full ${banner.glow} blur-2xl`} />
                  <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide">
                        {banner.badge}
                      </span>
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/15">
                        <banner.icon className="h-5 w-5" />
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold leading-tight sm:text-2xl">{banner.title}</h3>
                    <p className="mt-2 text-sm text-white/90">{banner.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {banner.chips.map((chip) => (
                        <span key={chip} className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                          {chip}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={goToShopSection}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
                    >
                      {banner.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
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
              <div
                key={item.name}
                onClick={() => openProductDetail(item.productId)}
                className="group cursor-pointer rounded-2xl border border-emerald-100 bg-white overflow-hidden transition-all hover:shadow-xl hover:shadow-emerald-100 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={productImageById(item.productId)}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-20`} />
                  <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">-{item.discount}%</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-emerald-600">{fmt(item.sale)}</span>
                    <span className="text-xs text-slate-400 line-through">{fmt(item.orig)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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

      {/* ---- FEATURED PRODUCTS ---- */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Produk Unggulan</h2>
              <p className="mt-1 text-sm text-slate-500">Pilihan paling diminati berdasarkan rating pelanggan.</p>
            </div>
              <button
                onClick={goToShopSection}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
              </button>
          </div>

          <div className="grid gap-6 md:gap-7 grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={`featured-${product.id}`} className="group rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100 hover:-translate-y-1">
                <div className={`relative h-56 bg-gradient-to-br ${product.gradient} group-hover:bg-gradient-to-br group-hover:${product.gradientAlt} flex items-center justify-center overflow-hidden cursor-pointer`}
                  onClick={() => openProductDetail(product.id)}>
                  <img
                    src={productImageById(product.id)}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold ${badgeColor[product.badge] ?? "bg-slate-500 text-white"}`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); openProductDetail(product.id); }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-emerald-50 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
                <div className="p-4">
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
                  <button
                    onClick={() => openQuickCartPopup(product.id)}
                    className="mt-1 w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 py-2 text-xs font-semibold text-white hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" /> Tambah ke Keranjang
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- INSPIRATION ---- */}
      <Lookbook />

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
                  onClick={() => openProductDetail(product.id)}>
                  <img
                    src={productImageById(product.id)}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold ${badgeColor[product.badge] ?? "bg-slate-500 text-white"}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); openProductDetail(product.id); }}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur-sm hover:bg-emerald-50 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
                <div className="p-4">
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
                    <button
                      onClick={() => openQuickCartPopup(product.id)}
                      className="mt-1 w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 py-2 text-xs font-semibold text-white hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              ) : (
                /* List view */
                <div key={product.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 hover:shadow-lg hover:shadow-emerald-50 transition-shadow cursor-pointer"
                  onClick={() => openProductDetail(product.id)}>
                  <div className={`h-32 w-32 shrink-0 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <img
                      src={productImageById(product.id)}
                      alt={product.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                    {product.badge && (
                      <span className={`absolute top-2 left-2 z-10 rounded-full px-2 py-0.5 text-[9px] font-bold ${badgeColor[product.badge] ?? "bg-slate-500 text-white"}`}>
                        {product.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 z-10 rounded-full bg-white/80 px-2 py-0.5 text-[9px] font-semibold text-emerald-700 backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
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
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

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
              <button
                onClick={() => router.push(withSiteBase("/help/faq", siteBase))}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                Lihat Semua FAQ
              </button>
            </div>
          </div>
        </div>
      </section>

      <ReviewSection />
      <EcomFooter />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={closeProductModal}
          onAddToCart={addToCart}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          recommended={recommendedForSelected}
          onSelectProduct={(id) => {
            setSelectedProductId(id);
            setQuickOrderAction(null);
          }}
          initialOrderAction={quickOrderAction}
        />
      )}

    </div>
  );
}
