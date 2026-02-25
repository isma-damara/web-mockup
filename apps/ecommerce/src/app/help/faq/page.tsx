import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

const faqItems = [
  {
    q: "Bagaimana cara cek ukuran?",
    a: "Cek panduan size di detail produk. Kalau bingung, chat kami untuk rekomendasi ukuran.",
  },
  {
    q: "Apakah bisa bayar di tempat?",
    a: "Untuk saat ini kami hanya menerima transfer dan e-wallet agar transaksi lebih aman.",
  },
  {
    q: "Berapa lama pengiriman?",
    a: "Rata-rata 1-3 hari kerja untuk kota besar. Area tertentu bisa lebih lama.",
  },
  {
    q: "Bagaimana jika produk cacat atau salah kirim?",
    a: "Tenang, kami bantu proses retur/tukar sesuai kebijakan yang berlaku.",
  },
  {
    q: "Apakah bisa ganti size?",
    a: "Bisa, selama stok tersedia dan pengajuan masih dalam masa retur.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link
              href=".."
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Bantuan
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">FAQ</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 border border-emerald-100">
            <HelpCircle className="h-4 w-4 text-emerald-500" />
            Pertanyaan yang sering ditanyakan
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          Berikut beberapa pertanyaan yang paling sering ditanyakan pelanggan.
        </p>
        <div className="mt-6 space-y-4">
          {faqItems.map((item) => (
            <div key={item.q} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">{item.q}</div>
              <div className="mt-2 text-sm text-slate-600">{item.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
