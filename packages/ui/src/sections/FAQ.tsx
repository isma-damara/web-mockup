"use client";

import { useState } from "react";
import { Badge } from "@workspace/ui/ui/badge";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    q: "Berapa lama waktu pengerjaan proyek?",
    a: "Durasi proyek bervariasi tergantung kompleksitas. Website sederhana 2-4 minggu, aplikasi mobile 2-4 bulan, dan platform enterprise 4-8 bulan. Kami selalu memberikan timeline detail saat proposal.",
  },
  {
    q: "Teknologi apa saja yang digunakan NexaTech?",
    a: "Kami menggunakan teknologi terkini termasuk React, Next.js, React Native, Node.js, Python, AWS, Google Cloud, TensorFlow, dan Kubernetes. Tim kami selalu update dengan perkembangan teknologi.",
  },
  {
    q: "Bagaimana proses konsultasi awal?",
    a: "Konsultasi awal gratis! Anda cukup mengisi form kontak atau menghubungi via WhatsApp. Tim kami akan menjadwalkan meeting untuk mendiskusikan kebutuhan, scope, timeline, dan estimasi biaya.",
  },
  {
    q: "Apakah ada garansi setelah proyek selesai?",
    a: "Ya, kami memberikan garansi maintenance 3-6 bulan setelah launch. Jika ditemukan bug atau masalah teknis, tim kami akan segera memperbaikinya tanpa biaya tambahan.",
  },
  {
    q: "Bisakah NexaTech menangani proyek skala enterprise?",
    a: "Tentu! Kami berpengalaman menangani proyek enterprise dengan 1M+ pengguna. Tim kami memiliki expertise dalam arsitektur scalable, high-availability system, dan security compliance.",
  },
  {
    q: "Apakah ada dukungan setelah proyek selesai?",
    a: "Ya, kami menawarkan paket maintenance bulanan yang mencakup monitoring, update keamanan, backup berkala, dan support ticket. Kami juga menyediakan SLA untuk respon cepat.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full px-4 py-1.5 text-sm border border-indigo-200 bg-indigo-50 text-indigo-700"
          >
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Pertanyaan yang Sering{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ditanyakan
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Temukan jawaban atas pertanyaan umum tentang layanan dan proses kerja
            kami.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-200 bg-indigo-50/30 shadow-sm shadow-indigo-100"
                    : "border-border bg-card hover:border-indigo-100"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span
                    className={`font-medium pr-4 ${
                      isOpen ? "text-indigo-700" : "text-foreground"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 text-indigo-600"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="px-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
