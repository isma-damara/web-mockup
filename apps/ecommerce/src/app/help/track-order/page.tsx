import Link from "next/link";
import { ArrowLeft, Package, Truck, CheckCircle2 } from "lucide-react";

const steps = [
  { title: "Pesanan dibuat", desc: "Pesanan kamu sudah tercatat di sistem kami." },
  { title: "Diproses", desc: "Tim gudang menyiapkan barang dan pengepakan." },
  { title: "Dikirim", desc: "Kurir menjemput dan mengantar paket ke alamat kamu." },
  { title: "Selesai", desc: "Paket tiba dan pesanan dinyatakan selesai." },
];

export default function TrackOrderPage() {
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
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Nomor Pesanan (contoh: US123456)"
            />
            <input
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="Nomor HP yang dipakai saat checkout"
            />
          </div>
          <button className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Lacak Pesanan
          </button>
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Package className="h-4 w-4 text-emerald-500" />
            Status Pesanan (Contoh)
          </div>
          <div className="mt-4 space-y-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  {idx < 2 ? <CheckCircle2 className="h-4 w-4" /> : <Truck className="h-4 w-4" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{step.title}</div>
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
