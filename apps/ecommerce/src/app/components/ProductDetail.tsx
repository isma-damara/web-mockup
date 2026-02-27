"use client";

import { useEffect, useState } from "react";
import { X, Star, Heart, ShoppingCart, Ruler, ChevronRight, ChevronLeft } from "lucide-react";
import { fmt, productImageById, getProductDetailContent, getProductReviews } from "./EcomData";

interface Product {
  id: number; name: string; category: string; price: number; originalPrice: number | null;
  rating: number; reviews: number; badge: string | null; gradient: string; gradientAlt: string;
  sizes: string[]; colors: string[]; desc: string; sizeChart: Record<string, string>;
}

interface Props {
  product: Product;
  onClose?: () => void;
  onAddToCart: (id: number, size: string) => void;
  onBuyNow?: (id: number, size: string, qty: number) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
  recommended: Product[];
  onSelectProduct: (id: number) => void;
  mode?: "modal" | "page";
  initialOrderAction?: "cart" | "buy" | null;
}

export default function ProductDetail({
  product, onClose, onAddToCart, onBuyNow, onToggleWishlist, isWishlisted, recommended, onSelectProduct, mode = "modal", initialOrderAction = null,
}: Props) {
  type OrderPreviewAction = "cart" | "buy";
  const [tab, setTab] = useState<"detail" | "sizechart" | "reviews">("detail");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [orderPreviewAction, setOrderPreviewAction] = useState<OrderPreviewAction | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const gallerySlides = [
    { key: "main", image: productImageById(product.id, 0), label: "Front View", note: "Tampilan utama produk" },
    { key: "alt", image: productImageById(product.id, 1), label: "Side View", note: "Sudut berbeda untuk melihat bentuk" },
    { key: "detail", image: productImageById(product.id, 2), label: "Detail Material", note: `Warna ${selectedColor} - close-up texture` },
    { key: "style", image: productImageById(product.id, 3), label: "Styled Look", note: "Inspirasi mix & match harian" },
  ];

  useEffect(() => {
    setTab("detail");
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQty(1);
    setActiveSlide(0);
    setIsCarouselPaused(false);
    setOrderPreviewAction(initialOrderAction ?? null);
  }, [product.id, initialOrderAction]);

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % gallerySlides.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [product.id, isCarouselPaused, gallerySlides.length]);

  const tabs = [
    { key: "detail" as const, label: "Detail" },
    { key: "sizechart" as const, label: "Size Chart" },
    { key: "reviews" as const, label: `Reviews (${product.reviews})` },
  ];
  const detailContent = getProductDetailContent(product.id);
  const reviewList = getProductReviews(product.id);
  const avgReviewRating = reviewList.length > 0
    ? (reviewList.reduce((sum, item) => sum + item.rating, 0) / reviewList.length).toFixed(1)
    : product.rating.toFixed(1);
  const isPageMode = mode === "page";
  const addSelectedQtyToCart = () => {
    for (let i = 0; i < qty; i++) onAddToCart(product.id, selectedSize);
  };
  const executeBuyNow = () => {
    if (onBuyNow) onBuyNow(product.id, selectedSize, qty);
    else addSelectedQtyToCart();
  };
  const openOrderPreview = (action: OrderPreviewAction) => setOrderPreviewAction(action);
  const confirmOrderPreview = () => {
    if (!orderPreviewAction) return;
    if (orderPreviewAction === "cart") addSelectedQtyToCart();
    else executeBuyNow();
    setOrderPreviewAction(null);
  };
  const renderDetailTabContent = () => (
    <div className="space-y-4">
      <p>{detailContent?.summary ?? product.desc}</p>
      <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Highlight Produk</div>
        <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
          {(detailContent?.highlights ?? []).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 p-2.5">
          <div className="text-[11px] text-slate-400">Material</div>
          <div className="mt-0.5 text-sm font-medium text-slate-700">{detailContent?.material ?? "-"}</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-2.5">
          <div className="text-[11px] text-slate-400">Fit</div>
          <div className="mt-0.5 text-sm font-medium text-slate-700">{detailContent?.fit ?? "-"}</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-2.5">
          <div className="text-[11px] text-slate-400">Perawatan</div>
          <div className="mt-0.5 text-sm font-medium text-slate-700">{detailContent?.care ?? "-"}</div>
        </div>
        <div className="rounded-lg border border-slate-200 p-2.5">
          <div className="text-[11px] text-slate-400">Asal Produksi</div>
          <div className="mt-0.5 text-sm font-medium text-slate-700">{detailContent?.origin ?? "-"}</div>
        </div>
      </div>
    </div>
  );
  const renderReviewTabContent = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold text-slate-800">{avgReviewRating}/5</div>
        <div className="text-xs text-slate-400">{product.reviews} ulasan terverifikasi</div>
      </div>
      <div className="space-y-2.5">
        {reviewList.map((item, idx) => (
          <div key={`${item.name}-${idx}`} className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-slate-800">{item.name}</div>
              <div className="text-[11px] text-slate-400">{item.date}</div>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={`${item.name}-${idx}-${i}`}
                    className={`h-3.5 w-3.5 ${i < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                  />
                ))}
              </div>
              <div className="text-[11px] text-slate-500">{item.variant}</div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{item.comment}</p>
            <div className="mt-2 text-[11px] text-slate-400">Membantu {item.helpful} orang</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={isPageMode ? "" : "fixed inset-0 z-50 flex items-center justify-center p-4"}
      onClick={!isPageMode ? onClose : undefined}
    >
      {!isPageMode && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />}
      <div
        className={isPageMode
          ? "relative w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          : "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"}
        onClick={!isPageMode ? (e) => e.stopPropagation() : undefined}
      >
        {onClose && (
          <button
            onClick={onClose}
            className={`absolute z-10 rounded-full p-2 transition-colors ${
              isPageMode
                ? "top-4 right-4 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                : "top-4 right-4 bg-white/80 hover:bg-amber-50"
            }`}
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        )}

        <div className={isPageMode ? "grid md:grid-cols-2 xl:grid-cols-[19rem_minmax(0,1fr)] md:items-stretch" : "grid md:grid-cols-2"}>
          {/* Auto image slider */}
          <div className={isPageMode ? "border-b md:border-b-0 md:border-r border-slate-200 bg-white" : ""}>
            <div
              className={`relative overflow-hidden ${
                isPageMode
                  ? "h-[17rem] sm:h-[19rem] md:h-[21rem] xl:h-[24rem]"
                  : "h-72 md:h-full rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
              }`}
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              {gallerySlides.map((slide, idx) => (
                <div
                  key={slide.key}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
                    activeSlide === idx ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={activeSlide !== idx}
                >
                  <img src={slide.image} alt={`${product.name} ${slide.label}`} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                  <div className="text-center px-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      {slide.label}
                    </div>
                    <div className="mt-1 text-[11px] text-white/70">
                      {slide.note}
                    </div>
                  </div>
                </div>
              ))}
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold text-white ${
                  isPageMode ? "rounded bg-orange-500" : "rounded-full bg-amber-500"
                }`}>
                  {product.badge}
                </span>
              )}

              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 backdrop-blur-sm text-slate-700 flex items-center justify-center hover:bg-white"
                aria-label="Slide sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % gallerySlides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 backdrop-blur-sm text-slate-700 flex items-center justify-center hover:bg-white"
                aria-label="Slide berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {!isPageMode && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <div className="text-[10px] text-white/70 font-medium rounded-full bg-black/15 px-2.5 py-1 backdrop-blur-sm">
                    {isCarouselPaused ? "Slide dijeda" : "Slide otomatis"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {gallerySlides.map((slide, idx) => (
                      <button
                        key={`${slide.key}-dot`}
                        type="button"
                        onClick={() => setActiveSlide(idx)}
                        className={`h-2 rounded-full transition-all ${
                          activeSlide === idx ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Pilih slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isPageMode && (
              <div className="border-t border-slate-200 p-3">
                <div className="grid grid-cols-4 gap-2">
                  {gallerySlides.map((slide, idx) => (
                    <button
                      key={`${slide.key}-thumb`}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={`rounded border p-1.5 text-left transition-colors ${
                        activeSlide === idx
                          ? "border-orange-500 ring-1 ring-orange-200"
                          : "border-slate-200 hover:border-orange-300"
                      }`}
                      aria-label={`Thumbnail ${idx + 1}`}
                    >
                      <img src={slide.image} alt={`${product.name} thumbnail ${idx + 1}`} className="h-14 w-full rounded object-cover" />
                      <div className="mt-1 truncate text-[10px] text-slate-500 hidden sm:block">{slide.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className={isPageMode ? "p-0 h-full" : "p-6 md:p-8"}>
            <div>
              <div className={isPageMode ? "min-w-0 h-full flex flex-col" : "min-w-0"}>
                <div className={isPageMode ? "px-6 pt-4 pb-3" : ""}>
                  {!isPageMode && <div className="text-xs font-medium text-amber-500 mb-1">{product.category}</div>}
                  <h2 className={`text-2xl font-bold text-slate-800 ${isPageMode ? "mb-1.5" : "mb-2"}`}>{product.name}</h2>

                  <div className={`flex items-center gap-2 ${isPageMode ? "mb-3" : "mb-4"}`}>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                      ))}
                    </div>
                    <span className="text-sm text-slate-500">{product.rating} ({product.reviews} reviews)</span>
                    {isPageMode && <span className="text-xs text-slate-300">|</span>}
                    {isPageMode && <span className="text-xs text-slate-500">Brand: UrbanStyle</span>}
                  </div>
                </div>

                {isPageMode ? (
                  <div className="mx-6 mb-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-3xl font-bold text-orange-600">{fmt(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">{fmt(product.originalPrice)}</span>
                      )}
                      {product.originalPrice && (
                        <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">Harga inkl. PPN, belum termasuk ongkir</div>
                  </div>
                ) : (
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
                )}

                {/* Color picker */}
                <div className={isPageMode ? "mx-6 mb-2 pb-2 border-b border-slate-100" : "mb-4"}>
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    {isPageMode ? "Warna yang tersedia" : <>Warna: <span className="text-amber-600">{selectedColor}</span></>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {isPageMode
                      ? product.colors.map((c) => (
                        <span
                          key={c}
                          className="rounded-full px-4 py-1.5 text-xs font-medium border border-slate-200 text-slate-600 bg-white"
                        >
                          {c}
                        </span>
                      ))
                      : product.colors.map((c) => (
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
                <div className={isPageMode ? "mx-6 mb-2 pb-2 border-b border-slate-100" : "mb-4"}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-slate-700">
                        {isPageMode ? "Ukuran yang tersedia" : <>Ukuran: <span className="text-amber-600">{selectedSize}</span></>}
                      </div>
                    <button onClick={() => setSizeGuideOpen(true)} className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700">
                      <Ruler className="h-3 w-3" /> Panduan Ukuran
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {isPageMode
                      ? product.sizes.map((s) => (
                        <span
                          key={s}
                          className="min-w-[40px] rounded-lg px-3 py-2 text-xs font-medium border border-slate-200 text-slate-600 text-center bg-white"
                        >
                          {s}
                        </span>
                      ))
                      : product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-[40px] rounded-lg px-3 py-2 text-xs font-medium border transition-all ${
                            selectedSize === s
                              ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 text-slate-600 hover:border-emerald-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                  </div>

                </div>

                {isPageMode && (
                  <div className="mx-6 mt-auto mb-3 pt-3">
                    <div className="mt-1">
                      <div className="grid gap-2 sm:grid-cols-2 sm:min-w-[22rem]">
                        <button
                          onClick={() => openOrderPreview("cart")}
                          className="w-full rounded-md border border-emerald-500 bg-white py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors inline-flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </button>
                        <button
                          onClick={() => openOrderPreview("buy")}
                          className="w-full rounded-md border border-emerald-600 bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                        >
                          Beli Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {!isPageMode && (
                  <div className="mb-6">
                    <div className="text-sm font-medium text-slate-700 mb-2">Jumlah:</div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-sm">-</button>
                      <span className="text-sm font-semibold w-8 text-center">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="h-8 w-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-sm">+</button>
                    </div>
                  </div>
                )}

                {/* Tabs (modal only). Page mode tabs rendered below the main layout. */}
                {!isPageMode && (
                  <div>
                    <div className="mb-4 flex flex-wrap justify-center gap-1 border-b border-slate-100">
                      {tabs.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => setTab(t.key)}
                          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
                            tab === t.key
                              ? "border-emerald-500 text-emerald-700"
                              : "border-transparent text-slate-500 hover:text-slate-700"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <div className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[60px]">
                      {tab === "detail" && renderDetailTabContent()}
                      {tab === "sizechart" && (
                        <div className="space-y-1">
                          {Object.entries(product.sizeChart).map(([size, dim]) => (
                            <div key={size} className="flex justify-between py-1 border-b border-slate-50 gap-3">
                              <span className="font-medium">{size}</span>
                              <span className="text-slate-400 text-right">{dim}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {tab === "reviews" && renderReviewTabContent()}
                    </div>
                  </div>
                )}

                {!isPageMode && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => openOrderPreview("cart")}
                      className="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" /> Add to Cart
                    </button>
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`rounded-xl px-4 py-3 border-2 transition-all hover:-translate-y-0.5 ${
                        isWishlisted
                          ? "border-rose-400 bg-rose-50 text-rose-600"
                          : "border-slate-200 text-slate-600 hover:border-emerald-300"
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {isPageMode && (
          <section className="border-t border-slate-200 bg-white px-6 py-5 md:px-8">
            <div className="mb-4 flex flex-wrap justify-center gap-1 border-b border-slate-100">
              {tabs.map((t) => (
                <button
                  key={`page-${t.key}`}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px whitespace-nowrap ${
                    tab === t.key
                      ? "border-emerald-500 text-emerald-700"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-600 leading-relaxed min-h-[12rem]">
              {tab === "detail" && renderDetailTabContent()}
              {tab === "sizechart" && (
                <div className="space-y-1">
                  {Object.entries(product.sizeChart).map(([size, dim]) => (
                    <div key={`page-${size}`} className="flex justify-between py-2 border-b border-slate-50 gap-3">
                      <span className="font-medium">{size}</span>
                      <span className="text-slate-400 text-right">{dim}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === "reviews" && renderReviewTabContent()}
            </div>

          </section>
        )}

        {/* You Might Also Like */}
        {recommended.length > 0 && (
          <div className="border-t border-slate-100 px-6 py-6 md:px-8">
            <h3 className="text-sm font-bold text-slate-800 mb-4">You Might Also Like</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {recommended.map((r) => (
                <button key={r.id} onClick={() => onSelectProduct(r.id)}
                  className="group rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-all text-left">
                  <img src={productImageById(r.id)} alt={r.name} className="h-24 w-full object-cover" />
                  <div className="p-2">
                    <div className="text-[10px] text-slate-800 font-medium truncate">{r.name}</div>
                    <div className="text-[10px] font-bold text-amber-600">{fmt(r.price)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {orderPreviewAction && (
          <div className="fixed inset-0 z-[75] flex items-center justify-center p-4" onClick={() => setOrderPreviewAction(null)}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
            <div
              className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-800">Detail Pesanan</h3>
                  <p className="text-xs text-slate-500">
                    {orderPreviewAction === "cart" ? "Konfirmasi tambah ke keranjang" : "Konfirmasi beli sekarang"}
                  </p>
                </div>
                <button onClick={() => setOrderPreviewAction(null)} className="rounded-full p-1.5 hover:bg-slate-100">
                  <X className="h-4 w-4 text-slate-600" />
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 p-4 sm:p-5">
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] md:items-start">
                  <div>
                    <div className="mb-3 truncate text-lg font-semibold leading-snug text-slate-800 sm:text-xl">
                      {product.name}
                    </div>
                    <div className="relative h-52 sm:h-60 md:h-[18.5rem] overflow-hidden rounded-xl">
                      <img src={productImageById(product.id)} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                  <div>
                    <div className="mb-2 text-xs font-medium text-slate-600">Pilih warna</div>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={`order-color-${c}`}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${
                            selectedColor === c
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500">Warna yang tersedia: {product.colors.join(", ")}</div>
                  </div>

                  <div>
                    <div className="mb-2 text-xs font-medium text-slate-600">Pilih ukuran</div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={`order-size-${s}`}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-[42px] rounded-lg px-3 py-2 text-xs font-medium border transition-colors ${
                            selectedSize === s
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500">Ukuran yang tersedia: {product.sizes.join(", ")}</div>
                  </div>

                  <div>
                    <div className="mb-2 text-xs font-medium text-slate-600">Jumlah</div>
                    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
                      <button
                        type="button"
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="h-8 w-8 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                        aria-label="Kurangi jumlah"
                      >
                        -
                      </button>
                      <span className="min-w-[2.5rem] text-center text-sm font-semibold text-slate-800">{qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(qty + 1)}
                        className="h-8 w-8 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                        aria-label="Tambah jumlah"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2 border-t border-slate-100 pt-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Varian dipilih</span>
                      <span className="text-right font-medium text-slate-800">{selectedColor} / {selectedSize}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-slate-500">Jumlah</span>
                      <span className="font-medium text-slate-800">{qty}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-2">
                      <span className="text-slate-600">Estimasi total</span>
                      <span className="text-base font-bold text-orange-600">{fmt(product.price * qty)}</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setOrderPreviewAction(null)}
                  className="rounded-md border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  onClick={confirmOrderPreview}
                  className="rounded-md bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  {orderPreviewAction === "cart" ? "Tambah ke Keranjang" : "Lanjut Beli"}
                </button>
              </div>
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


