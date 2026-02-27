"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star, Zap, Clock, Camera, Instagram, Twitter, Facebook, Youtube,
  CreditCard, Smartphone, QrCode, Truck, Shield, Package, Tag,
  MapPin, Phone, Mail, ChevronRight, Sparkles,
} from "lucide-react";
import { customerReviews } from "./EcomData";
import { useSiteBase, withSiteBase } from "./useSiteBase";

/* ---- COUNTDOWN TIMER ---- */
export function CountdownTimer() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-2">
      {[
        { v: time.h, l: "Jam" },
        { v: time.m, l: "Min" },
        { v: time.s, l: "Det" },
      ].map(({ v, l }) => (
        <div key={l} className="flex flex-col items-center">
          <div className="bg-red-500 text-white rounded-lg px-3 py-1.5 text-lg font-bold min-w-[48px] text-center tabular-nums">
            {String(v).padStart(2, "0")}
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5">{l}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- LOOKBOOK / STYLE INSPIRATION ---- */
export function Lookbook() {
  const looks = [
    {
      title: "Street Casual",
      items: "Denim Jacket + Cargo Pants + Sneakers",
      image: "/assets/inspiration/streetcasual.jpg",
      layout: "md:col-span-3",
    },
    {
      title: "Office Chic",
      items: "Blazer + Silk Dress + Heels",
      image: "/assets/inspiration/officechic.jpg",
      layout: "md:col-span-3",
    },
    {
      title: "Weekend Vibes",
      items: "Linen Shirt + Canvas Bag + Sunglasses",
      image: "/assets/inspiration/weekendvibes.jpg",
      layout: "md:col-span-2",
    },
    {
      title: "Night Out",
      items: "Platform Boots + Crossbody Bag",
      image: "/assets/inspiration/nightput.jpg",
      layout: "md:col-span-2",
    },
    {
      title: "Athleisure",
      items: "Sneakers + Cargo Pants + Tote Bag",
      image: "/assets/inspiration/Athleisure.jpg",
      layout: "md:col-span-2",
    },
  ];
  return (
    <section id="lookbook" className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-600 mb-4 border border-emerald-200/50">
            <Sparkles className="h-3.5 w-3.5" /> Style Inspiration
          </span>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Lookbook & <span className="text-emerald-600">Inspirasi</span>
          </h2>
          <p className="mt-2 text-slate-500 max-w-lg mx-auto leading-relaxed">Temukan kombinasi outfit yang pas untuk setiap momen.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-6">
          {looks.map((look) => (
            <div
              key={look.title}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm ${look.layout} h-56`}
            >
              <img
                src={look.image}
                alt={look.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className="text-white font-bold text-sm sm:text-base">{look.title}</div>
                <div className="text-white/80 text-xs sm:text-sm mt-1">{look.items}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- CUSTOMER REVIEWS ---- */
export function ReviewSection() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Apa Kata <span className="text-emerald-600">Pelanggan</span>
          </h2>
          <p className="mt-2 text-slate-500 leading-relaxed">Ulasan asli dari pelanggan yang sudah berbelanja.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {customerReviews.map((rev, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-white p-5 hover:shadow-lg hover:shadow-emerald-50 transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-sm font-bold text-white">
                  {rev.name.split(" ")[0][0]}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{rev.name}</div>
                  <div className="text-[10px] text-slate-400">{rev.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`h-3 w-3 ${j < rev.rating ? "fill-emerald-400 text-emerald-400" : "text-slate-200"}`} />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-2">&ldquo;{rev.comment}&rdquo;</p>
              <div className="text-[10px] text-emerald-500 font-medium">{rev.product}</div>
              {/* Photo upload preview placeholder */}
              <div className="mt-3 flex gap-2">
                <div className="h-12 w-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-emerald-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- ENHANCED FOOTER ---- */
export function EcomFooter() {
  const siteBase = useSiteBase();
  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://x.com", label: "X" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];
  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                <Tag className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Urban<span className="text-emerald-400">Style</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-4">
              Koleksi fashion yang nyaman dipakai, gampang dipadukan, dan selalu up to date.
            </p>
            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Jl. Sudirman No. 88, Jakarta Pusat</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+62 21 5555 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>hello@urbanstyle.id</span>
              </div>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Kategori", links: ["Pria", "Wanita", "Kids", "Aksesoris", "Sepatu", "Sale"] },
            { title: "Bantuan", links: ["FAQ", "Track Order", "Pengiriman", "Kebijakan Retur", "Hubungi Kami"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    {col.title === "Bantuan" ? (
                      <Link
                        href={withSiteBase(
                          l === "FAQ"
                            ? "/help/faq"
                            : l === "Track Order"
                              ? "/help/track-order"
                              : l === "Pengiriman"
                                ? "/help/pengiriman"
                                : l === "Kebijakan Retur"
                                  ? "/help/kebijakan-retur"
                                  : "/help/hubungi-kami",
                          siteBase
                        )}
                        className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {l}
                      </Link>
                    ) : (
                      <Link
                        href={withSiteBase("/#shop", siteBase)}
                        className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                      >
                        {l}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">Pembayaran</h4>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { name: "Visa", icon: CreditCard },
                { name: "GoPay", icon: Smartphone },
                { name: "QRIS", icon: QrCode },
                { name: "BCA", icon: CreditCard },
                { name: "OVO", icon: Smartphone },
                { name: "Dana", icon: Smartphone },
              ].map(({ name, icon: Icon }) => (
                <div key={name} className="flex flex-col items-center gap-1 rounded-lg bg-slate-800 px-2 py-2">
                  <Icon className="h-4 w-4 text-emerald-400" />
                  <span className="text-[9px] text-slate-400">{name}</span>
                </div>
              ))}
            </div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">Pengiriman</h4>
            <div className="grid grid-cols-3 gap-2">
              {["JNE", "J&T", "SiCepat"].map((name) => (
                <div key={name} className="flex items-center justify-center rounded-lg bg-slate-800 px-2 py-2">
                  <span className="text-[10px] text-slate-400 font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} UrbanStyle. Semua hak dilindungi. | 100% Original | 30 Hari Retur
        </div>
      </div>
    </footer>
  );
}

