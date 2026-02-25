"use client";

import { useState } from "react";
import { X, Star, Heart, ShoppingCart, Ruler, ChevronRight } from "lucide-react";
import { fmt } from "./EcomData";

interface Product {
  id: number; name: string; category: string; price: number; originalPrice: number | null;
  rating: number; reviews: number; badge: string | null; gradient: string; gradientAlt: string;
  sizes: string[]; colors: string[]; desc: string; sizeChart: Record<string, string>;
}

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (id: number, size: string) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
  recommended: Product[];
  onSelectProduct: (id: number) => void;
}

export default function ProductDetail({
  product, onClose, onAddToCart, onToggleWishlist, isWishlisted, recommended, onSelectProduct,
}: Props) {
  const [tab, setTab] = useState<"detail" | "sizechart" | "reviews">("detail");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [showHover, setShowHover] = useState(false);

  const tabs = [
    { key: "detail" as const, label: "Detail" },
    { key: "sizechart" as const, label: "Size Chart" },
    { key: "reviews" as const, label: `Reviews (${product.reviews})` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 hover:bg-amber-50 transition-colors">
          <X className="h-5 w-5 text-slate-600" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image with hover second image */}
          <div
            className={`h-72 md:h-full bg-gradient-to-br ${showHover ? product.gradientAlt : product.gradient} flex items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none relative overflow-hidden transition-all duration-500 cursor-pointer`}
            onMouseEnter={() => setShowHover(true)}
            onMouseLeave={() => setShowHover(false)}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 right-8 h-24 w-24 rounded-full border-2 border-white/30" />
              <div className="absolute bottom-8 left-8 h-20 w-20 rounded-lg border-2 border-white/20 rotate-12" />
            </div>
            <div className={`text-5xl font-bold text-white/30 transition-transform duration-500 ${showHover ? "scale-110 rotate-3" : ""}`}>
              {product.name.split(" ")[0]}
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-4 left-4 text-[10px] text-white/50 font-medium">
              Hover to see different angle
            </div>
          </div>

          {/* Info */}
          <div className="p-6 md:p-8">
            <div className="text-xs font-medium text-amber-500 mb-1">{product.category}</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{product.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                ))}
              </div>
              <span className="text-sm text-slate-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-amber-600">{fmt(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">{fmt(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-500">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Color picker */}
            <div className="mb-4">
              <div className="text-sm font-medium text-slate-700 mb-2">Warna: <span className="text-amber-600">{selectedColor}</span></div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all ${
                      selectedColor === c
                        ? "border-amber-400 bg-amber-50 text-amber-600"
                        : "border-slate-200 text-slate-600 hover:border-amber-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-slate-700">Ukuran: <span className="text-amber-600">{selectedSize}</span></div>
                <button onClick={() => setSizeGuideOpen(true)} className="inline-flex items-center gap-1 text-xs text-amber-500 hover:text-amber-600">
                  <Ruler className="h-3 w-3" /> Panduan Ukuran
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-[40px] rounded-lg px-3 py-2 text-xs font-medium border transition-all ${
                      selectedSize === s
                        ? "border-amber-400 bg-amber-50 text-amber-600"
                        : "border-slate-200 text-slate-600 hover:border-amber-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <div className="text-sm font-medium text-slate-700 mb-2">Jumlah:</div>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-sm">-</button>
                <span className="text-sm font-semibold w-8 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-sm">+</button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-4 border-b border-slate-100">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    tab === t.key
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="text-sm text-slate-600 leading-relaxed min-h-[60px] mb-4">
              {tab === "detail" && product.desc}
              {tab === "sizechart" && (
                <div className="space-y-1">
                  {Object.entries(product.sizeChart).map(([size, dim]) => (
                    <div key={size} className="flex justify-between py-1 border-b border-slate-50">
                      <span className="font-medium">{size}</span>
                      <span className="text-slate-400">{dim}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === "reviews" && (
                <div className="space-y-2">
                  <div className="text-lg font-bold text-slate-800">* {product.rating}/5</div>
                  <p className="text-xs text-slate-400">Berdasarkan {product.reviews} ulasan dari pelanggan terverifikasi.</p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { for (let i = 0; i < qty; i++) onAddToCart(product.id, selectedSize); }}
                className="flex-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-semibold text-white shadow-lg shadow-amber-200 hover:from-amber-600 hover:to-orange-600 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`rounded-xl px-4 py-3 border-2 transition-all hover:-translate-y-0.5 ${
                  isWishlisted
                    ? "border-rose-400 bg-rose-50 text-rose-600"
                    : "border-slate-200 text-slate-600 hover:border-amber-200"
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        {recommended.length > 0 && (
          <div className="border-t border-slate-100 px-6 py-6 md:px-8">
            <h3 className="text-sm font-bold text-slate-800 mb-4">You Might Also Like</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {recommended.map((r) => (
                <button key={r.id} onClick={() => onSelectProduct(r.id)}
                  className="group rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all text-left">
                  <div className={`h-24 bg-gradient-to-br ${r.gradient} flex items-center justify-center`}>
                    <span className="text-sm font-bold text-white/30">{r.name.split(" ")[0]}</span>
                  </div>
                  <div className="p-2">
                    <div className="text-[10px] text-slate-800 font-medium truncate">{r.name}</div>
                    <div className="text-[10px] font-bold text-amber-600">{fmt(r.price)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        {sizeGuideOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setSizeGuideOpen(false)}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Panduan Ukuran</h3>
                <button onClick={() => setSizeGuideOpen(false)} className="rounded-full p-1 hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(product.sizeChart).map(([size, dim]) => (
                  <div key={size} className="flex justify-between py-2 border-b border-slate-100 text-sm">
                    <span className="font-semibold text-slate-700">{size}</span>
                    <span className="text-slate-500">{dim}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400">* Ukuran dalam cm. Bisa berbeda +/-1-2cm.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

