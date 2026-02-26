"use client";

import Link from "next/link";
import { Star, Sparkles, MapPin, Phone, Mail, Instagram, Twitter, Facebook, Youtube, Clock } from "lucide-react";
import { blogPosts } from "./CatalogData";
import { useSiteBase, withSiteBase } from "./useSiteBase";

/* ---- BRAND STORY ---- */
export function BrandStory() {
  return (
    <section id="brand" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="h-96 rounded-2xl bg-gradient-to-br from-rose-200 via-pink-200 to-fuchsia-200 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-12 right-12 h-32 w-32 rounded-full border-2 border-white/40" />
                <div className="absolute bottom-12 left-12 h-24 w-24 rounded-full bg-white/20" />
              </div>
              <div className="text-center relative z-10">
                <div className="mx-auto h-28 w-28 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-rose-600 mb-4">
                  SA
                </div>
                <div className="text-lg font-semibold text-rose-700">Sarah Amalia</div>
                <div className="text-sm text-rose-500">Founder & CEO</div>
              </div>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-600 mb-4 border border-rose-200">
              <Sparkles className="h-3.5 w-3.5" /> Our Story
            </span>
            <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl mb-4">
              Terinspirasi dari <span className="text-rose-500">Kecantikan Alam</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              GlowBeauty didirikan pada tahun 2018 oleh Sarah Amalia, seorang dermatologis yang percaya bahwa setiap wanita berhak mendapatkan produk kecantikan yang aman, efektif, dan terjangkau.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Semua produk kami menggunakan bahan-bahan alami berkualitas tinggi, berlabel halal, dan telah teruji secara dermatologis. Kami berkomitmen untuk tidak melakukan uji coba pada hewan dan menggunakan kemasan ramah lingkungan.
            </p>
            <div className="flex flex-wrap gap-3">
              {["🌿 100% Natural", "☪️ Halal Certified", "🐰 Cruelty Free", "♻️ Eco Packaging"].map((b) => (
                <span key={b} className="rounded-full bg-rose-50 border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- BEFORE & AFTER ---- */
export function BeforeAfter() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-4 py-1.5 text-sm font-medium text-rose-600 mb-4 border border-rose-200/50">
            Real Results
          </span>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Before & After <span className="text-rose-500">Transformasi</span>
          </h2>
          <p className="mt-2 text-slate-500 max-w-lg mx-auto">
            Hasil nyata dari pelanggan setia GlowBeauty setelah penggunaan rutin.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { name: "Anita, 28", product: "Rose Glow Serum", duration: "4 Minggu", before: "from-slate-300 to-slate-400", after: "from-rose-300 to-pink-400" },
            { name: "Dewi, 32", product: "Vitamin C Brightening", duration: "6 Minggu", before: "from-gray-300 to-gray-400", after: "from-amber-300 to-orange-400" },
            { name: "Rina, 25", product: "Hydra Moisture Cream", duration: "3 Minggu", before: "from-zinc-300 to-zinc-400", after: "from-blue-300 to-indigo-400" },
          ].map((item) => (
            <div key={item.name} className="rounded-2xl bg-white border border-rose-100 overflow-hidden shadow-sm">
              <div className="grid grid-cols-2 h-48">
                <div className={`bg-gradient-to-br ${item.before} flex items-center justify-center`}>
                  <span className="text-sm font-bold text-white/60">Before</span>
                </div>
                <div className={`bg-gradient-to-br ${item.after} flex items-center justify-center`}>
                  <span className="text-sm font-bold text-white/60">After</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="font-semibold text-slate-800 text-sm">{item.name}</div>
                <div className="text-xs text-rose-500 mt-0.5">{item.product} · {item.duration}</div>
                <div className="flex justify-center gap-0.5 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- BLOG / BEAUTY TIPS ---- */
export function BlogSection() {
  return (
    <section id="blog" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Beauty Tips & <span className="text-rose-500">Insights</span>
          </h2>
          <p className="mt-2 text-slate-500">Artikel terbaru seputar kecantikan dan perawatan kulit.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.title} className="group rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-rose-100 hover:-translate-y-1 transition-all duration-300">
              <div className={`h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20"><div className="absolute top-4 right-4 h-16 w-16 rounded-full border-2 border-white/30" /></div>
                <span className="text-white/30 text-3xl font-bold">{post.category.split(" ")[0]}</span>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-rose-500">{post.category}</span>
                <h3 className="mt-1 text-sm font-semibold text-slate-800 group-hover:text-rose-600 transition-colors">{post.title}</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{post.excerpt}</p>
                <div className="mt-3 text-xs text-slate-400">{post.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- INSTAGRAM FEED ---- */
export function InstagramFeed() {
  const colors = [
    "from-rose-300 to-pink-400", "from-fuchsia-300 to-purple-400", "from-pink-300 to-rose-400",
    "from-violet-300 to-indigo-400", "from-amber-300 to-orange-400", "from-emerald-300 to-teal-400",
  ];
  return (
    <section className="py-16 sm:py-20 bg-rose-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Follow Us on <span className="text-rose-500">Instagram</span>
        </h2>
        <p className="mt-2 text-slate-500 text-sm">@glowbeauty.id</p>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {colors.map((c, i) => (
            <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${c} flex items-center justify-center group cursor-pointer overflow-hidden relative`}>
              <Instagram className="h-6 w-6 text-white/0 group-hover:text-white/80 transition-all z-10" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- ENHANCED FOOTER ---- */
export function CatalogFooter() {
  const siteBase = useSiteBase();
  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Glow<span className="text-rose-400">Beauty</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-3">
              Produk kecantikan alami, halal, dan cruelty-free untuk kulit sehat dan bercahaya.
            </p>
            <div className="space-y-1.5 mb-4 text-[13px]">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-rose-400 shrink-0" />
                <span>Jl. Kemang Raya No. 45, Jakarta Selatan</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Phone className="h-4 w-4 text-rose-400 shrink-0" />
                <span>+62 21 8765 4321</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Mail className="h-4 w-4 text-rose-400 shrink-0" />
                <span>hello@glowbeauty.id</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">Kepercayaan</h4>
            <div className="flex flex-wrap gap-2">
              {["Halal Certified", "BPOM Registered", "Cruelty-Free"].map((item) => (
                <span key={item} className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-slate-300">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-rose-400" />
                <span>Senin-Jumat, 09.00-18.00</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="h-3.5 w-3.5 text-rose-400" />
                <span>Sabtu, 10.00-16.00</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">Bantuan</h4>
            <ul className="space-y-1.5">
              {[
                { label: "FAQ", href: "/help/faq" },
                { label: "Pengiriman", href: "/help/pengiriman" },
                { label: "Retur & Refund", href: "/help/kebijakan-retur" },
                { label: "Hubungi Kami", href: "/help/hubungi-kami" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={withSiteBase(item.href, siteBase)} className="text-sm text-slate-400 hover:text-rose-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} GlowBeauty. All rights reserved. | Halal Certified | BPOM Registered
        </div>
      </div>
    </footer>
  );
}
