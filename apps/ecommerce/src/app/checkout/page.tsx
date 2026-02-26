"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { products, fmt } from "../components/EcomData";
import { useCart } from "../components/useCart";
import { useSiteBase, withSiteBase } from "../components/useSiteBase";

const paymentMethods = [
  { name: "Kartu Debit/Kredit", icon: CreditCard, detail: "Visa, Mastercard" },
  { name: "E-Wallet", icon: Smartphone, detail: "GoPay, OVO, Dana" },
  { name: "QRIS", icon: QrCode, detail: "Scan & bayar instan" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const siteBase = useSiteBase();
  const { cart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [wallet, setWallet] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const totalPrice = useMemo(() => {
    return cart.reduce((s, c) => {
      const p = products.find((x) => x.id === Number(c.id));
      return s + (p?.price ?? 0) * Number(c.qty);
    }, 0);
  }, [cart]);

  const submit = () => {
    const nextErrors: string[] = [];
    if (!name.trim()) nextErrors.push("Nama wajib diisi.");
    if (!phone.trim()) nextErrors.push("Nomor HP wajib diisi.");
    if (!address.trim()) nextErrors.push("Alamat wajib diisi.");
    if (!selectedPayment) nextErrors.push("Pilih metode pembayaran.");
    if (selectedPayment === "Kartu Debit/Kredit") {
      if (!cardNumber.trim()) nextErrors.push("Nomor kartu wajib diisi.");
      if (!cardExpiry.trim()) nextErrors.push("Expiry wajib diisi.");
      if (!cardCvv.trim()) nextErrors.push("CVV wajib diisi.");
    }
    if (selectedPayment === "E-Wallet" && !wallet) {
      nextErrors.push("Pilih e-wallet.");
    }
    setErrors(nextErrors);
    if (nextErrors.length === 0) {
      try {
        window.sessionStorage.setItem(
          "ecom_checkout",
          JSON.stringify({
            name,
            phone,
            address,
            payment: selectedPayment,
            wallet,
          }),
        );
      } catch {
        // ignore session storage errors
      }
      router.push(withSiteBase("/checkout/confirm", siteBase));
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-emerald-50/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl border border-emerald-100 bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-800">Checkout</h1>
            <p className="mt-2 text-sm text-slate-500">Keranjangmu masih kosong.</p>
            <Link
              href={withSiteBase("/", siteBase)}
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

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link
              href={withSiteBase("/cart", siteBase)}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Keranjang
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">Checkout</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 border border-emerald-100">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Checkout aman dan terenkripsi
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm space-y-5">
            <div>
              <div className="text-sm font-semibold text-slate-800">Data Pengiriman</div>
              <div className="mt-3 grid gap-3">
                <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Nama lengkap" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Nomor HP" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <textarea className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows={3} placeholder="Alamat lengkap" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-800">Metode Pembayaran</div>
              <div className="mt-3 space-y-3">
                {paymentMethods.map(({ name: method, icon: Icon, detail }) => (
                  <button
                    key={method}
                    onClick={() => setSelectedPayment(method)}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                      selectedPayment === method
                        ? "border-emerald-300 bg-emerald-50/60"
                        : "border-slate-100 hover:bg-emerald-50/40"
                    }`}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{method}</div>
                      <div className="text-xs text-slate-500">{detail}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedPayment === "Kartu Debit/Kredit" && (
              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="text-sm font-semibold text-slate-800">Detail Kartu</div>
                <div className="mt-3 grid gap-3">
                  <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Nomor Kartu" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} />
                    <input className="rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="CVV" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {selectedPayment === "E-Wallet" && (
              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="text-sm font-semibold text-slate-800">Pilih E-Wallet</div>
                <div className="mt-3 grid gap-2">
                  {['GoPay', 'OVO', 'Dana'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWallet(w)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                        wallet === w
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-emerald-200 bg-emerald-50/40 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedPayment === "QRIS" && (
              <div className="rounded-2xl border border-slate-100 p-4">
                <div className="text-sm font-semibold text-slate-800">Scan QRIS</div>
                <div className="mt-3 flex items-center gap-4">
                  <div className="h-24 w-24 rounded-xl border border-emerald-200 bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-semibold">
                    QR CODE
                  </div>
                  <div className="text-xs text-slate-500">
                    Scan kode QR menggunakan aplikasi pembayaran favoritmu.
                  </div>
                </div>
              </div>
            )}

            {errors.length > 0 && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-700">
                {errors.map((e) => <div key={e}>- {e}</div>)}
              </div>
            )}
          </section>

          <aside className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm h-fit">
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
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <span className="text-slate-600">Total</span>
              <span className="text-xl font-bold text-emerald-600">{fmt(totalPrice)}</span>
            </div>
            <button
              onClick={submit}
              className="mt-5 w-full rounded-full bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Konfirmasi Pembayaran
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
