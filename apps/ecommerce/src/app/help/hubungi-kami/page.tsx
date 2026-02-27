"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !topic.trim() || !message.trim()) {
      setError("Semua field wajib diisi sebelum mengirim pesan.");
      setSent(false);
      return;
    }
    setError("");
    setSent(true);
    setName("");
    setEmail("");
    setTopic("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-emerald-50/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3">
          <Link
            href=".."
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Bantuan
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Hubungi Kami</h1>
        </div>
        <p className="mt-3 text-sm text-slate-500 max-w-2xl">
          Ceritakan kendala kamu, tim kami akan bantu secepat mungkin.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-800">Kirim Pesan</div>
            <form className="mt-4 grid gap-3" onSubmit={submitMessage}>
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Email aktif"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="Topik (contoh: Retur / Pembayaran)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <textarea
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                rows={4}
                placeholder="Tulis pesan kamu di sini"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                  {error}
                </div>
              )}
              {sent && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                  Pesan berhasil dikirim. Tim kami akan menghubungi kamu secepatnya.
                </div>
              )}
              <button className="mt-1 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
                Kirim Pesan
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm h-fit">
            <div className="text-sm font-semibold text-slate-800">Kontak Kami</div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500" />
                <span>+62 21 5555 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500" />
                <span>hello@urbanstyle.id</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>Jl. Sudirman No. 88, Jakarta Pusat</span>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
              Jam operasional: Senin - Jumat, 09:00 - 18:00 WIB. Balasan biasanya dalam 1x24 jam kerja.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
