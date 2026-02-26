"use client";

import { useState } from "react";
import { X, Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  badge: string | null;
  gradient: string;
  desc: string;
  ingredients: string;
  howToUse: string;
  variants: string[];
}

interface Props {
  product: Product;
  onClose: () => void;
  onToggleLike: (id: number) => void;
  isLiked: boolean;
}

export default function ProductDetail({ product, onClose, onToggleLike, isLiked }: Props) {
  const [tab, setTab] = useState<"detail" | "ingredients" | "howto">("detail");
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const tabs = [
    { key: "detail" as const, label: "Deskripsi" },
    { key: "ingredients" as const, label: "Komposisi" },
    { key: "howto" as const, label: "Cara Pakai" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 rounded-full bg-white/80 p-2 hover:bg-rose-50 transition-colors">
          <X className="h-5 w-5 text-slate-600" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image gallery */}
          <div className={`h-72 md:h-full bg-gradient-to-br ${product.gradient} flex items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 right-8 h-24 w-24 rounded-full border-2 border-white/30" />
              <div className="absolute bottom-8 left-8 h-20 w-20 rounded-lg border-2 border-white/20 rotate-12" />
            </div>
            <div className="text-5xl font-bold text-white/30">{product.name.split(" ")[0]}</div>
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8">
            <div className="text-xs font-medium text-rose-500 mb-1">{product.category}</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{product.name}</h2>

            <div className="mb-5 flex flex-wrap gap-2 text-[11px] text-slate-500">
              {["Halal", "Natural", "Derm Tested"].map((item) => (
                <span key={item} className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                  {item}
                </span>
              ))}
            </div>

            {/* Variant selector */}
            <div className="mb-6">
              <div className="text-sm font-medium text-slate-700 mb-2">Pilih Varian:</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
                      selectedVariant === v
                        ? "border-rose-400 bg-rose-50 text-rose-600"
                        : "border-slate-200 text-slate-600 hover:border-rose-200"
                    }`}
                  >
                    {v}
                  </button>
                ))}
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
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="text-sm text-slate-600 leading-relaxed min-h-[80px]">
              {tab === "detail" && product.desc}
              {tab === "ingredients" && (
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 mb-2">
                    ✓ Halal Certified
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 mb-2 ml-2">
                    ✓ Natural Ingredients
                  </span>
                  <p className="mt-2">{product.ingredients}</p>
                </div>
              )}
              {tab === "howto" && product.howToUse}
            </div>

            <button
              onClick={() => onToggleLike(product.id)}
              className={`mt-6 w-full rounded-full py-3 text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 ${
                isLiked
                  ? "bg-white border-2 border-rose-400 text-rose-600 shadow-rose-100 hover:bg-rose-50"
                  : "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-200 hover:from-rose-600 hover:to-pink-600"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? "Sudah di Wishlist ✓" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
