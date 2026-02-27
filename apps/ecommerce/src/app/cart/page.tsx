"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { products, fmt, productImageById } from "../components/EcomData";
import { useCart } from "../components/useCart";
import { useSiteBase, withSiteBase } from "../components/useSiteBase";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, updateSize } = useCart();
  const siteBase = useSiteBase();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((s, c) => {
      const p = products.find((x) => x.id === Number(c.id));
      return s + (p?.price ?? 0) * Number(c.qty);
    }, 0);
  }, [cart]);

  const totalItems = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const displayCart = mounted ? cart : [];
  const displayTotalItems = mounted ? totalItems : 0;
  const displayTotalPrice = mounted ? totalPrice : 0;

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={withSiteBase("/#shop", siteBase)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali Belanja
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Keranjang</h1>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {displayTotalItems} item
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 border border-emerald-100">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Checkout aman dan terenkripsi
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            {displayCart.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-semibold text-slate-600">Keranjang masih kosong</p>
                <p className="mt-2 text-sm">Pilih ukuran lalu tambahkan produk favoritmu.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayCart.map((item) => {
                  const productId = Number(item.id);
                  const p = products.find((x) => x.id === productId);
                  if (!p) return null;
                  return (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex flex-wrap items-start gap-4 rounded-2xl border border-slate-100 p-4"
                    >
                      <img
                        src={productImageById(productId)}
                        alt={p.name}
                        className="h-20 w-20 rounded-xl object-cover border border-emerald-100 bg-white"
                      />
                      <div className="flex-1 min-w-[220px]">
                        <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                          <span>{p.category}</span>
                          {p.badge ? (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-700">
                              {p.badge}
                            </span>
                          ) : null}
                        </div>
                        <div className="text-sm font-semibold text-slate-800">{p.name}</div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.round(p.rating) ? "fill-emerald-400 text-emerald-400" : "text-slate-200"}`}
                            />
                          ))}
                          <span className="ml-1">{p.rating} ({p.reviews})</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500 line-clamp-2">{p.desc}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-700">
                            Size: {item.size}
                          </span>
                          {p.sizeChart?.[item.size] ? (
                            <span className="rounded-full border border-slate-200 px-2 py-0.5 text-slate-500">
                              {p.sizeChart[item.size]}
                            </span>
                          ) : null}
                          <span className="rounded-full border border-slate-200 px-2 py-0.5 text-slate-500">
                            Warna: {p.colors[0]}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {p.sizes.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateSize(item.id, item.size, s)}
                              className={`rounded border px-2 py-0.5 text-[10px] transition-colors ${
                                s === item.size
                                  ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                                  : "border-slate-200 text-slate-500 hover:border-emerald-200"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="text-sm font-bold text-emerald-600 mt-2">{fmt(p.price)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.size, -1)}
                          className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.size, 1)}
                          className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="ml-auto inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">Ringkasan</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">{fmt(totalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Ongkir</span>
                  <span className="font-semibold text-emerald-600">Gratis</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Diskon</span>
                  <span className="font-semibold text-slate-800">-</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                <span className="text-slate-600">Total</span>
                <span className="text-xl font-bold text-emerald-600">{fmt(displayTotalPrice)}</span>
              </div>
              <Link
                href={withSiteBase("/checkout", siteBase)}
                className="mt-5 block w-full rounded-full bg-emerald-600 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Lanjut ke Pembayaran
              </Link>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
