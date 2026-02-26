"use client";

import { Newspaper } from "lucide-react";
import GovNav from "../components/GovNav";
import { GovFooter } from "../components/GovSections";
import { news } from "../components/GovData";

export default function BeritaPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
              <Newspaper className="h-3.5 w-3.5" /> Berita
            </span>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Berita <span className="text-emerald-600">Terkini</span></h1>
            <p className="mt-2 text-slate-500 max-w-lg mx-auto">Informasi terbaru seputar kegiatan dan layanan kota.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <div key={i} className="group rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-50 hover:-translate-y-0.5 cursor-pointer">
                <div className={`h-40 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                  <Newspaper className="h-10 w-10 text-white/20" />
                  <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${item.color}`}>{item.category}</span>
                </div>
                <div className="p-5">
                  <div className="text-xs text-slate-400 mb-2">{item.date}</div>
                  <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 text-sm">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <GovFooter />
    </div>
  );
}
