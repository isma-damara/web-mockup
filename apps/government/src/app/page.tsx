"use client";

import { useState } from "react";
import {
  ChevronRight, Newspaper, MapPin, Clock, Users, Building,
  Eye, TrendingUp, Award, Calendar, ArrowRight, Landmark,
} from "lucide-react";
import GovNav from "./components/GovNav";
import { AnimatedStats, PariwisataSection, GaleriSection, PPIDSection, PengaduanSection, MapSocialSection, GovFooter } from "./components/GovSections";
import { news, services, agenda } from "./components/GovData";

export default function GovernmentPage() {
  const [agendaView, setAgendaView] = useState<"list" | "calendar">("list");

  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />

      {/* ---- HERO ---- */}
      <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 text-white py-24 sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-emerald-100 mb-6 backdrop-blur-sm border border-white/10">
              <Landmark className="h-3.5 w-3.5" /> Portal Resmi Pemerintah Kota
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Selamat Datang di
              <span className="block mt-2 text-emerald-200">Kota Nusantara</span>
            </h1>
            <p className="mt-5 text-lg text-emerald-100 max-w-xl leading-relaxed">
              Kota modern, berkelanjutan, dan inklusif. Melayani masyarakat dengan transparansi, inovasi, dan dedikasi untuk kesejahteraan bersama.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById("layanan")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg hover:bg-emerald-50 transition-all hover:-translate-y-0.5"
              >
                Layanan Online <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm border border-white/15 hover:bg-white/20 transition-colors"
              >
                Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- ANIMATED STATS ---- */}
      <AnimatedStats />

      {/* ---- LAYANAN PUBLIK ---- */}
      <section id="layanan" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
              Layanan Publik
            </span>
            <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Layanan untuk <span className="text-emerald-600">Masyarakat</span>
            </h2>
            <p className="mt-2 text-slate-500 max-w-lg mx-auto">Akses berbagai layanan pemerintahan secara online, cepat, dan transparan.</p>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {services.map((svc) => (
              <button key={svc.name} className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100 hover:border-emerald-200">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${svc.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                  <svc.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm text-slate-700">{svc.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{svc.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---- BERITA TERKINI ---- */}
      <section id="berita" className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3"> <Newspaper className="h-3.5 w-3.5" /> Berita</span>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Berita <span className="text-emerald-600">Terkini</span></h2>
            </div>
            <button className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700">Lihat Semua <ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <div key={i} className="group rounded-2xl border border-slate-100 bg-white overflow-hidden transition-all hover:shadow-lg hover:shadow-emerald-50 hover:-translate-y-0.5 cursor-pointer">
                <div className={`h-40 bg-gradient-to-br ${item.gradient} flex items-center justify-center relative`}>
                  <Newspaper className="h-10 w-10 text-white/20" />
                  <span className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${item.color}`}>{item.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
                    <Calendar className="h-3 w-3" /> {item.date}
                  </div>
                  <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 text-sm">{item.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- PROFIL & AGENDA ---- */}
      <section id="profil" className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Profil Kota */}
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-4"><Building className="h-3.5 w-3.5" /> Profil Kota</span>
              <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl mb-4">Visi & Misi <span className="text-emerald-600">Kota Nusantara</span></h2>
              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-2"><Eye className="h-5 w-5 text-emerald-600" /><h3 className="font-semibold text-slate-800">Visi</h3></div>
                  <p className="text-sm text-slate-600 leading-relaxed">Mewujudkan Kota Nusantara sebagai kota modern, inklusif, dan berkelanjutan yang menjadi kebanggaan masyarakat Indonesia.</p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-2"><TrendingUp className="h-5 w-5 text-emerald-600" /><h3 className="font-semibold text-slate-800">Misi</h3></div>
                  <ul className="text-sm text-slate-600 space-y-1.5">
                    {[
                      "Meningkatkan kualitas pelayanan publik berbasis digital",
                      "Membangun infrastruktur hijau dan berkelanjutan",
                      "Mendorong pertumbuhan ekonomi inklusif",
                      "Memperkuat budaya dan pariwisata lokal",
                    ].map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />{m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Agenda */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-4"><Calendar className="h-3.5 w-3.5" /> Agenda</span>
                  <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Agenda <span className="text-emerald-600">Mendatang</span></h2>
                </div>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button onClick={() => setAgendaView("list")}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${agendaView === "list" ? "bg-emerald-50 text-emerald-600" : "text-slate-400 hover:bg-slate-50"}`}>
                    List
                  </button>
                  <button onClick={() => setAgendaView("calendar")}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${agendaView === "calendar" ? "bg-emerald-50 text-emerald-600" : "text-slate-400 hover:bg-slate-50"}`}>
                    Calendar
                  </button>
                </div>
              </div>

              {agendaView === "list" ? (
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
              ) : (
                /* Calendar view */
                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                  <div className="text-center font-bold text-slate-800 mb-4">Februari — Maret 2026</div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
                      <div key={d} className="py-1 text-slate-400 font-medium">{d}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => {
                      const day = i - 1;
                      const hasEvent = [24, 26, 28, 30, 32].includes(i);
                      return (
                        <div key={i} className={`py-2 rounded-lg text-sm ${day < 0 || day > 30 ? "text-slate-200" : hasEvent ? "bg-emerald-100 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50"} cursor-pointer transition-colors`}>
                          {day >= 0 && day <= 30 ? day + 1 : ""}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    <div className="h-3 w-3 rounded bg-emerald-100" /> Ada kegiatan
                  </div>
                </div>
              )}

              {/* Achievement */}
              <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-6 w-6" /><h3 className="font-bold">Penghargaan</h3>
                </div>
                <p className="text-sm text-emerald-100">
                  Kota Nusantara meraih penghargaan <strong>Kota Layak Anak</strong> dan <strong>Adipura Kencana</strong> tahun 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PariwisataSection />
      <GaleriSection />
      <PPIDSection />
      <PengaduanSection />
      <MapSocialSection />
      <GovFooter />
    </div>
  );
}
