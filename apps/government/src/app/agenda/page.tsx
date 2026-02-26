"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import GovNav from "../components/GovNav";
import { GovFooter } from "../components/GovSections";
import { agenda } from "../components/GovData";

export default function AgendaPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
              <Calendar className="h-3.5 w-3.5" /> Agenda
            </span>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Agenda <span className="text-emerald-600">Mendatang</span></h1>
            <p className="mt-2 text-slate-500 max-w-lg mx-auto">Kegiatan resmi pemerintah kota dalam waktu dekat.</p>
          </div>
          <div className="space-y-3">
            {agenda.map((a, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl border border-emerald-200 bg-white p-4">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <div className="text-lg font-bold leading-none">{a.date.split(" ")[0]}</div>
                  <div className="text-[10px] font-medium">{a.date.split(" ")[1]}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-sm">{a.title}</h3>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.location}</span>
                  </div>
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
