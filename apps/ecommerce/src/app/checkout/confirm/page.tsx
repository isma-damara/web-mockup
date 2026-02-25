"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  QrCode,
  Smartphone,
} from "lucide-react";
import { products, fmt } from "../../components/EcomData";
import { useCart } from "../../components/useCart";

type CheckoutData = {
  name: string;
  phone: string;
  address: string;
  payment: string;
  wallet?: string | null;
};

function makePreviewImage(label: string) {
  const safe = encodeURIComponent(label.split(" ").slice(0, 2).join(" "));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d1fae5"/><stop offset="1" stop-color="#99f6e4"/></linearGradient></defs><rect width="100%" height="100%" rx="28" fill="url(#g)"/><text x="50%" y="52%" text-anchor="middle" font-family="system-ui" font-size="24" font-weight="700" fill="rgba(15,118,110,0.35)">${safe}</text></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
}

function paymentIcon(payment?: string) {
  if (payment === "Kartu Debit/Kredit") return CreditCard;
  if (payment === "E-Wallet") return Smartphone;
  if (payment === "QRIS") return QrCode;
  return CreditCard;
}

export default function CheckoutConfirmPage() {
  const { cart, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = window.sessionStorage.getItem("ecom_checkout");
      if (raw) {
        setCheckoutData(JSON.parse(raw) as CheckoutData);
      }
    } catch {
      // ignore
    }
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((s, c) => {
      const p = products.find((x) => x.id === Number(c.id));
      return s + (p?.price ?? 0) * Number(c.qty);
    }, 0);
  }, [cart]);

  const displayCart = mounted ? cart : [];
  const displayTotalPrice = mounted ? totalPrice : 0;

  const confirmOrder = () => {
    clearCart();
    try {
      window.sessionStorage.removeItem("ecom_checkout");
    } catch {
      // ignore
    }
    setDone(true);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-emerald-50/30" />;
  }

  if (displayCart.length === 0) {
    return (
      <div className="min-h-screen bg-emerald-50/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-800">Konfirmasi Checkout</h1>
            <p className="mt-2 text-sm text-slate-500">
              Keranjangmu kosong atau pesanan sudah dikonfirmasi.
            </p>
            <Link
              href="../.."
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-emerald-50/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-800">Pesanan diterima</h1>
            <p className="mt-2 text-sm text-slate-500">
              Terima kasih! Pesananmu sedang kami proses.
            </p>
            <Link
              href="../.."
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Kembali Belanja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = paymentIcon(checkoutData?.payment);

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link
              href=".."
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Ubah Checkout
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Konfirmasi Pembayaran</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 border border-emerald-100">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Ringkasan pesanan
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Produk dalam pesanan</div>
            <div className="mt-4 space-y-4">
              {displayCart.map((item) => {
                const productId = Number(item.id);
                const p = products.find((x) => x.id === productId);
                if (!p) return null;
                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-100 p-4"
                  >
                    <img
                      src={makePreviewImage(p.name)}
                      alt={p.name}
                      className="h-16 w-16 rounded-xl object-cover border border-emerald-100 bg-white"
                    />
                    <div className="flex-1 min-w-[200px]">
                      <div className="text-sm font-semibold text-slate-800">{p.name}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Size {item.size} - {item.qty} item
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-emerald-600">
                      {fmt(p.price * Number(item.qty))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">Data Pengiriman</h2>
              {checkoutData ? (
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <div className="font-semibold text-slate-800">{checkoutData.name}</div>
                  <div>{checkoutData.phone}</div>
                  <div>{checkoutData.address}</div>
                </div>
              ) : (
                <div className="mt-4 text-sm text-slate-500">
                  Data checkout tidak ditemukan. Silakan ulangi checkout.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">Metode Pembayaran</h2>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    {checkoutData?.payment ?? "Metode belum dipilih"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {checkoutData?.payment === "E-Wallet" && checkoutData.wallet
                      ? `E-Wallet ${checkoutData.wallet}`
                      : checkoutData?.payment === "QRIS"
                        ? "QR akan dibuat setelah konfirmasi"
                        : "Detail aman tersimpan"}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-800">Ringkasan</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">{fmt(displayTotalPrice)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Ongkir</span>
                  <span className="font-semibold text-emerald-600">Gratis</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                <span className="text-slate-600">Total</span>
                <span className="text-xl font-bold text-emerald-600">{fmt(displayTotalPrice)}</span>
              </div>
              <button
                onClick={confirmOrder}
                className="mt-5 w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Konfirmasi & Buat Pesanan
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
