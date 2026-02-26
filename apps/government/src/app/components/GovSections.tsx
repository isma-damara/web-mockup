"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Clock, Newspaper, Calendar, Building, Eye, TrendingUp, Award,
  CheckCircle, Send, FileText, Download, Image, Play, ChevronRight, Landmark,
  Instagram, Twitter, Youtube, Search, ExternalLink, Upload, Camera, Ticket,
  Mountain, Waves, Palmtree, Map, Globe,
} from "lucide-react";
import { stats, agenda, touristSpots, galleryItems, ppidDocs } from "./GovData";
import { useSiteBase, withSiteBase } from "./useSiteBase";

/* ---- ANIMATED STATS ---- */
export function AnimatedStats() {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(stats.map((s) => Math.round(s.value * eased)));
      if (step >= steps) clearInterval(t);
    }, interval);
    return () => clearInterval(t);
  }, [visible]);

  const formatCount = (val: number, i: number) => {
    if (i === 0) return val >= 1000000 ? (val / 1000000).toFixed(1) + " Juta" : val.toLocaleString("id-ID");
    return val.toLocaleString("id-ID") + stats[i].suffix;
  };

  return (
    <section ref={ref} className="bg-white border-b border-emerald-100 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-emerald-600 sm:text-3xl tabular-nums">
                {formatCount(counts[i], i)}
              </div>
              <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- PARIWISATA BANNER ---- */
export function PariwisataSection() {
  return (
    <section id="pariwisata" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
            <Mountain className="h-3.5 w-3.5" /> Pariwisata & Investasi
          </span>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Destinasi <span className="text-emerald-600">Unggulan</span>
          </h2>
          <p className="mt-2 text-slate-500 max-w-lg mx-auto">Jelajahi keindahan alam dan budaya Kota Nusantara.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {touristSpots.map((spot) => (
            <div key={spot.name} className="group rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-emerald-50 hover:-translate-y-1 transition-all duration-300">
              <div className={`h-44 bg-gradient-to-br ${spot.gradient} flex items-center justify-center relative`}>
                <span className="text-3xl font-bold text-white/20">{spot.name.split(" ")[0]}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-slate-800">{spot.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{spot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- GALERI FOTO & VIDEO ---- */
export function GaleriSection() {
  return (
    <section id="galeri" className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
            <Camera className="h-3.5 w-3.5" /> Galeri
          </span>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Foto & Video <span className="text-emerald-600">Kegiatan</span>
          </h2>
        </div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {galleryItems.map((item, i) => (
            <div key={i} className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "md:row-span-2 h-48 md:h-auto" : "h-44"}`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-2xl font-bold text-white/20 group-hover:text-white/60 transition-colors">{item.title.split(" ")[0]}</span>
              </div>
              {item.type === "video" && (
                <div className="absolute top-3 right-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm">
                    <Play className="h-3.5 w-3.5 text-emerald-600 fill-current" />
                  </div>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="text-white text-sm font-medium">{item.title}</div>
                <div className="text-white/70 text-[10px] mt-0.5 uppercase">{item.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- PPID SECTION ---- */
export function PPIDSection() {
  return (
    <section id="ppid" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
            <FileText className="h-3.5 w-3.5" /> Informasi Publik
          </span>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            PPID - <span className="text-emerald-600">Dokumen Publik</span>
          </h2>
          <p className="mt-2 text-slate-500 max-w-lg mx-auto">Akses dokumen pemerintahan yang terbuka untuk publik.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ppidDocs.map((doc) => (
            <div key={doc.title} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-800 truncate">{doc.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{doc.category} • {doc.size}</div>
              </div>
              <Download className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- PENGADUAN FORM (ENHANCED) ---- */
export function PengaduanSection() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [trackingInput, setTrackingInput] = useState("");
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ticket = "ADU-" + Date.now().toString().slice(-6);
    setTicketNumber(ticket);
    setSubmitted(true);
  };

  const handleTracking = (e: FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      setTrackingResult("Sedang Diproses — Pengaduan Anda telah diterima dan sedang ditindaklanjuti oleh OPD terkait.");
    }
  };

  return (
    <section id="kontak" className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">Kontak & Pengaduan</span>
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl">Hubungi <span className="text-emerald-600">Kami</span></h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info + tracking */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, title: "Alamat Kantor Walikota", detail: "Jl. Pemerintahan No. 1, Kota Nusantara 10110" },
              { icon: Phone, title: "Telepon", detail: "(021) 555-0100" },
              { icon: Mail, title: "Email", detail: "info@kotanusantara.go.id" },
              { icon: Clock, title: "Jam Operasional", detail: "Senin-Jumat, 08:00-16:00 WIB" },
            ].map((c) => (
              <div key={c.title} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><c.icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="text-sm text-slate-500">{c.detail}</div>
                </div>
              </div>
            ))}

            {/* Tracking pengaduan */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="h-5 w-5 text-emerald-600" />
                <h3 className="font-semibold text-slate-800 text-sm">Tracking Pengaduan</h3>
              </div>
              <form onSubmit={handleTracking} className="flex gap-2">
                <input
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="Nomor tiket (ADU-XXXXXX)"
                  className="flex-1 h-9 rounded-lg border border-emerald-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button type="submit" className="rounded-lg bg-emerald-600 px-4 h-9 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                  Cek
                </button>
              </form>
              {trackingResult && (
                <div className="mt-3 rounded-lg bg-white border border-emerald-200 p-3 text-xs text-slate-600">
                  <div className="font-semibold text-emerald-600 mb-1">Status:</div>
                  {trackingResult}
                </div>
              )}
            </div>
          </div>

          {/* Pengaduan form */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Form Pengaduan Masyarakat</h3>
            <p className="text-sm text-slate-500 mb-6">Sampaikan keluhan atau aspirasi Anda kepada pemerintah kota.</p>
            {submitted ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold">Terkirim!</h3>
                <p className="mt-2 text-slate-500">Pengaduan Anda telah diterima.</p>
                <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2">
                  <span className="text-xs text-slate-500">Nomor Tiket:</span>
                  <span className="ml-2 font-bold text-emerald-600">{ticketNumber}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">Simpan nomor tiket untuk tracking status pengaduan Anda.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-emerald-600 hover:underline">Kirim pengaduan baru</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Nama Lengkap</label>
                    <input required placeholder="Masukkan nama" className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">NIK</label>
                    <input required placeholder="16 digit NIK" className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Nomor HP</label>
                    <input required placeholder="08xx-xxxx-xxxx" className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Kategori Pengaduan</label>
                    <select required className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 outline-none focus:ring-2 focus:ring-emerald-500">
                      <option value="">Pilih kategori...</option>
                      <option>Infrastruktur</option>
                      <option>Pelayanan Publik</option>
                      <option>Kebersihan</option>
                      <option>Keamanan</option>
                      <option>Kesehatan</option>
                      <option>Pendidikan</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Deskripsi Pengaduan</label>
                  <textarea required rows={4} placeholder="Jelaskan masalah secara detail..." className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Upload Foto (opsional)</label>
                  <div className="flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                    <div className="text-center">
                      <Upload className="h-6 w-6 text-slate-300 mx-auto mb-1" />
                      <span className="text-xs text-slate-400">Klik atau drag foto ke sini</span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 text-sm font-semibold text-white hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-200">
                  <Send className="h-4 w-4" /> Kirim Pengaduan
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- GOOGLE MAPS + SOCIAL MEDIA ---- */
export function MapSocialSection() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Map */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Map className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800">Peta <span className="text-emerald-600">Kota Nusantara</span></h3>
            </div>
            <div className="rounded-2xl overflow-hidden border border-emerald-200 shadow-sm h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65295653775!2d106.68942931835937!3d-6.229386899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Kota Nusantara"
              />
            </div>
          </div>

          {/* Social media feed */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-800">Media <span className="text-emerald-600">Sosial</span></h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: Instagram, handle: "@kotanusantara", content: "Suasana Festival Budaya Nusantara 2026 🎭✨ Ribuan warga antusias menikmati rangkaian acara...", time: "2 jam lalu", color: "from-pink-500 to-purple-600" },
                { icon: Twitter, handle: "@pemkotnusantara", content: "📢 Info penting: Pendaftaran PPDB 2026/2027 dibuka mulai 1 Maret. Segera daftarkan putra-putri Anda!", time: "5 jam lalu", color: "from-blue-400 to-blue-600" },
                { icon: Youtube, handle: "Kota Nusantara Official", content: "🎥 Video baru: Peresmian Taman Kota Nusantara oleh Walikota. Tonton selengkapnya di channel kami.", time: "1 hari lalu", color: "from-red-500 to-red-600" },
              ].map((social, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${social.color} text-white`}>
                    <social.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">{social.handle}</span>
                      <span className="text-[10px] text-slate-400">{social.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{social.content}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-300 shrink-0 mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- ENHANCED FOOTER ---- */
export function GovFooter() {
  const siteBase = useSiteBase();
  return (
    <footer className="bg-emerald-900 text-emerald-200 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700"><Landmark className="h-5 w-5 text-white" /></div>
              <div>
                <span className="text-lg font-bold text-white">Kota Nusantara</span>
                <div className="text-[10px] text-emerald-400 tracking-wider uppercase">Portal Resmi</div>
              </div>
            </div>
            <p className="text-sm text-emerald-300 mb-4">Pemerintah Kota Nusantara berkomitmen melayani masyarakat dengan transparansi dan inovasi.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Jl. Pemerintahan No. 1, Kota Nusantara 10110</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>(021) 555-0100</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-300">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Senin-Jumat, 08:00-16:00 WIB</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Layanan", links: ["Kependudukan", "Perizinan Online", "Pendidikan", "Kesehatan", "Pengaduan"] },
            { title: "Tentang", links: ["Profil Kota", "Visi & Misi", "Struktur Organisasi", "Pimpinan Daerah", "LKJIP"] },
            { title: "Link Cepat", links: ["PPID", "APBD", "Peraturan Daerah", "Presiden RI", "Kemendagri", "DPRD Kota"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    {col.title === "Layanan" ? (
                      <Link href={withSiteBase(l === "Pengaduan" ? "/pengaduan" : "/layanan", siteBase)} className="text-sm text-emerald-300 hover:text-white transition-colors">
                        {l}
                      </Link>
                    ) : col.title === "Tentang" ? (
                      <Link href={withSiteBase("/profil", siteBase)} className="text-sm text-emerald-300 hover:text-white transition-colors">
                        {l}
                      </Link>
                    ) : (
                      <Link href={withSiteBase(l === "PPID" ? "/ppid" : "/ppid", siteBase)} className="text-sm text-emerald-300 hover:text-white transition-colors">
                        {l}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-emerald-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-emerald-400">
            <span>&copy; {new Date().getFullYear()} Pemerintah Kota Nusantara. All rights reserved.</span>
            <span className="text-xs text-emerald-500">Disclaimer: Portal ini adalah situs resmi Pemerintah Kota Nusantara.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
