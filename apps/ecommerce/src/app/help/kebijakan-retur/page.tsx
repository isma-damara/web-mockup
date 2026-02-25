import Link from "next/link";
import { ArrowLeft, RefreshCcw, ShieldCheck } from "lucide-react";

const rules = [
  "Ajukan retur maksimal 7 hari setelah barang diterima.",
  "Produk harus baru, belum dipakai, dan belum dicuci.",
  "Tag dan kemasan asli harus disertakan.",
  "Tukar size bisa dilakukan jika stok tersedia.",
  "Refund diproses 3-5 hari kerja setelah barang kami terima.",
];

export default function ReturnPolicyPage() {
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
          <h1 className="text-2xl font-bold text-slate-800">Kebijakan Retur</h1>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          Baca syarat retur dan langkah pengajuannya agar proses lebih cepat.
        </p>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <RefreshCcw className="h-4 w-4 text-emerald-500" />
            Aturan Retur
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {rules.map((rule) => (
              <li key={rule}>- {rule}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Cara Pengajuan
          </div>
          <ol className="mt-3 space-y-2 text-sm text-slate-600">
            <li>1. Hubungi tim support melalui halaman Hubungi Kami.</li>
            <li>2. Kirim nomor pesanan dan foto produk.</li>
            <li>3. Tim kami akan kirim instruksi retur.</li>
            <li>4. Kirim barang sesuai panduan, lalu tunggu konfirmasi.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
