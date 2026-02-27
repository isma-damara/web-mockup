"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EcomNav from "../../components/EcomNav";
import ProductDetail from "../../components/ProductDetail";
import { EcomFooter } from "../../components/EcomSections";
import { products } from "../../components/EcomData";
import { useCart } from "../../components/useCart";
import { useSiteBase, withSiteBase } from "../../components/useSiteBase";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const siteBase = useSiteBase();
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { cart, addToCart } = useCart();

  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const productId = Number(rawId);
  const product = Number.isFinite(productId) ? products.find((p) => p.id === productId) : undefined;
  const recommended = useMemo(
    () => (product ? products.filter((p) => p.id !== product.id).slice(0, 4) : []),
    [product],
  );

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  const goShop = () => router.push(withSiteBase("/#shop", siteBase));
  const goToProduct = (id: number) => router.push(withSiteBase(`/product/${id}`, siteBase));
  const buyNow = (id: number, size: string, qty: number) => {
    for (let i = 0; i < qty; i++) addToCart(id, size);
    router.push(withSiteBase("/checkout", siteBase));
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-emerald-50/20 font-sans">
        <EcomNav
          cart={cart}
          totalItems={totalItems}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm text-center">
            <h1 className="text-2xl font-bold text-slate-800">Produk tidak ditemukan</h1>
            <p className="mt-2 text-sm text-slate-500">
              Produk yang Anda buka tidak tersedia atau ID tidak valid.
            </p>
              <button
                onClick={goShop}
                className="mt-6 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Kembali ke katalog
            </button>
          </div>
        </main>
        <EcomFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <EcomNav
        cart={cart}
        totalItems={totalItems}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
          <div className="text-xs text-slate-500">
            Detail Produk / <span className="font-medium text-slate-700">{product.name}</span>
          </div>
          <button
            onClick={goShop}
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            Kembali ke Produk
          </button>
        </div>

        <ProductDetail
          product={product}
          onAddToCart={addToCart}
          onBuyNow={buyNow}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlist.includes(product.id)}
          recommended={recommended}
          onSelectProduct={goToProduct}
          mode="page"
        />

        <section className="mt-8 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Informasi Tambahan</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="text-sm font-semibold text-emerald-700">Pengiriman</div>
              <p className="mt-1 text-xs text-slate-600">Estimasi 1-3 hari kerja, gratis ongkir untuk minimum belanja tertentu.</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="text-sm font-semibold text-emerald-700">Retur</div>
              <p className="mt-1 text-xs text-slate-600">Retur mudah hingga 30 hari selama produk belum dipakai dan label masih lengkap.</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="text-sm font-semibold text-emerald-700">Bantuan Ukuran</div>
              <p className="mt-1 text-xs text-slate-600">Hubungi tim support jika perlu rekomendasi size sebelum checkout.</p>
            </div>
          </div>
        </section>
      </main>

      <EcomFooter />
    </div>
  );
}
