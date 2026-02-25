import Link from "next/link";
import { ArrowLeft, Truck, Clock, ShieldCheck } from "lucide-react";

const shippingInfo = [
  {
    title: "Kurir Tersedia",
    desc: "JNE, J&T, dan SiCepat untuk area utama.",
  },
  {
    title: "Estimasi Waktu",
    desc: "1-3 hari kerja di kota besar, 3-7 hari untuk area lain.",
  },
  {
    title: "Ongkir",
    desc: "Gratis ongkir untuk pembelian di atas Rp 300.000.",
  },
];

export default function ShippingPage() {
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
          <h1 className="text-2xl font-bold text-slate-800">Pengiriman</h1>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          Info lengkap tentang kurir, estimasi waktu, dan ketentuan ongkir.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {shippingInfo.map((info) => (
            <div key={info.title} className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">{info.title}</div>
              <div className="mt-2 text-sm text-slate-600">{info.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Truck className="h-4 w-4 text-emerald-500" />
            Proses Pengiriman
          </div>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Pesanan diproses maksimal 1x24 jam (hari kerja).</li>
            <li>Nomor resi akan dikirim via email/WhatsApp setelah paket dikirim.</li>
            <li>Pengiriman bisa lebih lama saat promo besar atau cuaca ekstrem.</li>
          </ul>
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Clock className="h-4 w-4 text-emerald-500" />
            Catatan
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Estimasi waktu pengiriman dihitung setelah paket dikirim oleh kurir.
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600">
            <ShieldCheck className="h-4 w-4" />
            Paket diasuransikan untuk pengiriman tertentu.
          </div>
        </div>
      </div>
    </div>
  );
}
