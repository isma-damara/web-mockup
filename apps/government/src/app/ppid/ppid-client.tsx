"use client";

import { useMemo, useState } from "react";
import { Button } from "@workspace/ui/ui/button";
import { Input } from "@workspace/ui/ui/input";
import { Textarea } from "@workspace/ui/ui/textarea";
import { SectionHeader } from "../components/GovPrimitives";

type PpidDoc = { name: string; meta: string; icon: string; downloadUrl: string };
type PeraturanDoc = { number: string; title: string; type: string; year: string; downloadUrl: string };
type LaporanDoc = { name: string; meta: string; downloadUrl: string };
type OpdItem = { name: string; type: string; head: string; icon: string };

type Props = {
  ppidDocs: PpidDoc[];
  peraturanDocs: PeraturanDoc[];
  laporanDocs: LaporanDoc[];
  opdList: OpdItem[];
  ppidCategories: string[];
  opdCategories: string[];
  peraturanCategories: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const inferDocCategory = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("keuangan") || lower.includes("apbd")) return "Keuangan";
  if (lower.includes("pengadaan")) return "Pengadaan";
  if (lower.includes("kepegawaian") || lower.includes("asn")) return "Kepegawaian";
  return "Perencanaan";
};

export default function PpidClient({
  ppidDocs,
  peraturanDocs,
  laporanDocs,
  opdList,
  ppidCategories,
  opdCategories,
  peraturanCategories,
}: Props) {
  const [docCategory, setDocCategory] = useState(ppidCategories[0] ?? "Semua");
  const [opdCategory, setOpdCategory] = useState(opdCategories[0] ?? "Semua");
  const [opdSearch, setOpdSearch] = useState("");
  const [peraturanCategory, setPeraturanCategory] = useState(peraturanCategories[0] ?? "Semua");
  const [peraturanSearch, setPeraturanSearch] = useState("");

  const filteredDocs = useMemo(() => {
    if (docCategory === "Semua") return ppidDocs;
    return ppidDocs.filter((doc) => inferDocCategory(doc.name) === docCategory);
  }, [ppidDocs, docCategory]);

  const filteredOpd = useMemo(() => {
    const query = opdSearch.trim().toLowerCase();
    return opdList.filter((opd) => {
      const matchCategory = opdCategory === "Semua" || opd.type === opdCategory;
      const matchQuery =
        !query ||
        opd.name.toLowerCase().includes(query) ||
        opd.head.toLowerCase().includes(query) ||
        opd.type.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });
  }, [opdList, opdCategory, opdSearch]);

  const filteredPeraturan = useMemo(() => {
    const query = peraturanSearch.trim().toLowerCase();
    return peraturanDocs.filter((row) => {
      const matchCategory = peraturanCategory === "Semua" || row.type === peraturanCategory;
      const matchQuery =
        !query ||
        row.title.toLowerCase().includes(query) ||
        row.number.toLowerCase().includes(query) ||
        row.year.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });
  }, [peraturanDocs, peraturanCategory, peraturanSearch]);

  return (
    <div className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionHeader label="📂 Dokumen" title="Daftar Informasi Publik" />
          <div className="filter-bar mb-4">
            {ppidCategories.map((tag) => {
              const active = tag === docCategory;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setDocCategory(tag)}
                  className={`filter-chip ${active ? "filter-chip--active" : "filter-chip--idle"}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <div id="dokumen" className="space-y-3">
            {filteredDocs.map((doc) => (
              <div key={doc.name} className="flex items-center gap-4 rounded-xl border border-[var(--gov-border)] bg-white px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(220,38,38,0.1)] text-lg">
                  {doc.icon}
                </div>
                <div className="flex-1">
                  <div className="text-[13.5px] font-semibold text-[var(--gov-navy)]">{doc.name}</div>
                  <div className="text-[12px] text-[var(--gov-slate)]">{doc.meta}</div>
                </div>
                <Button asChild size="sm" className="h-8 rounded-md bg-[var(--gov-blue)] text-white">
                  <a href={doc.downloadUrl}>📥 Unduh</a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader label="📋 Formulir" title="Permohonan Informasi" />
          <div id="permohonan" className="card-base p-6">
            <p className="mb-4 text-[13.5px] leading-6 text-[var(--gov-text-muted)]">
              Ajukan permohonan informasi publik sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik.
            </p>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Nama *</label>
                <Input placeholder="Nama lengkap pemohon" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Instansi/Organisasi</label>
                <Input placeholder="Nama instansi (opsional)" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Email *</label>
                <Input placeholder="Email untuk pengiriman informasi" />
              </div>
              <div>
                <label className="mb-2 block text-[13px] font-semibold">Informasi yang Diminta *</label>
                <Textarea rows={4} placeholder="Jelaskan informasi yang ingin Anda minta..." />
              </div>
              <Button asChild className="w-full rounded-xl bg-[var(--gov-blue)] text-white">
                <a href="/site/government/ppid#permohonan">Kirim Permohonan</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <section id="opd">
        <SectionHeader label="🏢 Pemerintahan" title="OPD / SKPD" />
        <div className="card-base mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="text-[15px] font-semibold text-[var(--gov-navy)]">{opdList.length} OPD/SKPD Aktif</div>
          <Input
            className="max-w-[240px]"
            placeholder="🔍 Cari nama OPD/SKPD..."
            value={opdSearch}
            onChange={(event) => setOpdSearch(event.target.value)}
          />
        </div>
        <div className="filter-bar mb-4">
          {opdCategories.map((tag) => {
            const active = tag === opdCategory;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setOpdCategory(tag)}
                className={`filter-chip ${active ? "filter-chip--active" : "filter-chip--idle"}`}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {filteredOpd.map((opd) => {
            const id = `opd-${slugify(opd.name)}`;
            return (
              <div
                key={opd.name}
                id={id}
                className="card-base flex items-center justify-between px-4 py-4 hover:border-[var(--gov-blue)]"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(26,86,219,0.1)] text-xl">
                    {opd.icon}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[var(--gov-navy)]">{opd.name}</div>
                    <div className="text-[12px] text-[var(--gov-slate)]">{opd.type}</div>
                    <div className="text-[12.5px] text-[var(--gov-text-muted)]">👤 {opd.head}</div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="h-8 rounded-md border-[var(--gov-blue)] text-[var(--gov-blue)] hover:bg-[var(--gov-blue)] hover:text-white">
                  <a href={`/site/government/ppid#${id}`}>Detail →</a>
                </Button>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-center text-[12px] text-[var(--gov-slate)]">
          Menampilkan {filteredOpd.length} dari {opdList.length} OPD/SKPD.
        </div>
      </section>

      <section id="peraturan">
        <SectionHeader label="📋 Regulasi" title="Peraturan Daerah" />
        <div className="card-base mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[12px] font-semibold text-[var(--gov-slate)]">Jenis:</span>
            <div className="filter-bar border-0 p-0">
              {peraturanCategories.map((tag) => {
                const active = tag === peraturanCategory;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setPeraturanCategory(tag)}
                    className={`filter-chip ${active ? "filter-chip--active" : "filter-chip--idle"}`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
          <Input
            className="max-w-[220px]"
            placeholder="🔍 Cari peraturan..."
            value={peraturanSearch}
            onChange={(event) => setPeraturanSearch(event.target.value)}
          />
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--gov-border)] bg-white">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[var(--gov-cream)] text-[11px] uppercase tracking-[0.06em] text-[var(--gov-slate)]">
              <tr>
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">Nomor</th>
                <th className="px-4 py-3">Judul Peraturan</th>
                <th className="px-4 py-3">Jenis</th>
                <th className="px-4 py-3">Tahun</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeraturan.map((row, index) => (
                <tr key={row.number} className="border-b border-[var(--gov-border)] hover:bg-[rgba(26,86,219,0.04)]">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{row.number}</td>
                  <td className="px-4 py-3 font-semibold text-[var(--gov-navy)]">{row.title}</td>
                  <td className="px-4 py-3">{row.type}</td>
                  <td className="px-4 py-3">{row.year}</td>
                  <td className="px-4 py-3">
                    <Button asChild size="sm" className="h-8 rounded-md bg-[var(--gov-blue)] text-white">
                      <a href={row.downloadUrl}>📥 Unduh</a>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="apbd">
        <SectionHeader label="💰 Transparansi" title="Ringkasan APBD 2025" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Total Pendapatan", value: "Rp 3,85 T", sub: "📈 +8.2% dari 2024", color: "bg-[var(--gov-green)]" },
            { label: "Total Belanja", value: "Rp 3,92 T", sub: "📊 Realisasi 78.4%", color: "bg-[var(--gov-red)]" },
            { label: "Surplus/Defisit", value: "- Rp 72 M", sub: "⚖️ Defisit terencana", color: "bg-[var(--gov-blue)]" },
          ].map((card) => (
            <div key={card.label} className="relative overflow-hidden rounded-xl border border-[var(--gov-border)] bg-white p-5">
              <div className={`absolute left-0 right-0 top-0 h-[3px] ${card.color}`} />
              <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--gov-slate)]">{card.label}</div>
              <div className="font-display text-[22px] font-bold text-[var(--gov-navy)]">{card.value}</div>
              <div className="text-[12px] text-[var(--gov-text-muted)]">{card.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="laporan">
        <SectionHeader label="📊 Akuntabilitas" title="Laporan Kinerja" />
        <div className="space-y-3">
          {laporanDocs.map((doc) => (
            <div key={doc.name} className="card-base flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] text-xl text-white">
                  📄
                </div>
                <div>
                  <div className="text-[14px] font-bold text-[var(--gov-navy)]">{doc.name}</div>
                  <div className="text-[12px] text-[var(--gov-slate)]">{doc.meta}</div>
                </div>
              </div>
              <Button asChild size="sm" className="h-8 rounded-md bg-[var(--gov-blue)] text-white">
                <a href={doc.downloadUrl}>📥 Unduh</a>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
