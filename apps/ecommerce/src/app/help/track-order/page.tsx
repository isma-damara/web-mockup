"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Package, Truck, CheckCircle2, CircleDashed, SearchX } from "lucide-react";
import {
  findMockOrder,
  formatOrderDate,
  getOrderStatusSteps,
  type MockOrder,
} from "../../components/mockOrderStore";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderNo, setOrderNo] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<MockOrder | null>(null);
  const [error, setError] = useState("");
  const [prefilled, setPrefilled] = useState(false);

  const steps = useMemo(
    () => getOrderStatusSteps(result?.status ?? "Diproses"),
    [result],
  );

  const searchOrder = (orderNoValue: string, phoneValue: string) => {
    const found = findMockOrder(orderNoValue, phoneValue);
    if (!found) {
      setResult(null);
      setError("Pesanan tidak ditemukan. Pastikan nomor pesanan dan nomor HP sesuai checkout.");
      return;
    }
    setResult(found);
    setError("");
  };

  useEffect(() => {
    if (prefilled) return;
    const queryOrder = (searchParams.get("orderNo") ?? "").trim();
    const queryPhone = (searchParams.get("phone") ?? "").trim();
    if (!queryOrder || !queryPhone) {
      setPrefilled(true);
      return;
    }
    setOrderNo(queryOrder);
    setPhone(queryPhone);
    searchOrder(queryOrder, queryPhone);
    setPrefilled(true);
  }, [prefilled, searchParams]);

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3">
          <Link
            href=".."
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Bantuan
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Track Order</h1>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          Masukkan nomor pesanan dan nomor HP untuk melihat status pengiriman.
        </p>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-800">Cari Pesanan</div>
          <form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              searchOrder(orderNo, phone);
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Nomor Pesanan (contoh: US2602271234)"
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value.toUpperCase())}
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Nomor HP yang dipakai saat checkout"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              Lacak Pesanan
            </button>
          </form>
          {error && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              <SearchX className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-800">
            <Package className="h-4 w-4 text-emerald-500" />
            {result ? `Status Pesanan ${result.orderNo}` : "Status Pesanan (Contoh)"}
          </div>

          {result && (
            <div className="mt-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-xs text-slate-600">
              <div>Nama: <span className="font-semibold text-slate-800">{result.name}</span></div>
              <div className="mt-1">Dibuat: {formatOrderDate(result.createdAt)}</div>
              <div className="mt-1">Status saat ini: <span className="font-semibold text-emerald-700">{result.status}</span></div>
            </div>
          )}

          <div className="mt-4 space-y-3">
            {steps.map((step) => (
              <div key={step.title} className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full ${step.done ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                  {step.done ? (
                    step.title === "Dikirim" || step.title === "Selesai"
                      ? <Truck className="h-4 w-4" />
                      : <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <CircleDashed className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className={`text-sm font-semibold ${step.active ? "text-emerald-700" : "text-slate-800"}`}>{step.title}</div>
                  <div className="text-xs text-slate-500">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-emerald-50/30" />}>
      <TrackOrderContent />
    </Suspense>
  );
}
