import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero } from "../components/GovPrimitives";
import PpidClient from "./ppid-client";

const ppidDocs = [
  {
    name: "Laporan Keuangan Pemerintah Daerah 2024 (Audited)",
    meta: "PDF • 12.4 MB • Diperbarui: Jan 2025",
    icon: "📕",
    downloadUrl: "#",
  },
  {
    name: "Data Realisasi APBD 2024 per Triwulan",
    meta: "XLSX • 2.1 MB • Diperbarui: Jan 2025",
    icon: "📗",
    downloadUrl: "#",
  },
  {
    name: "Daftar Pengadaan Barang/Jasa 2025",
    meta: "PDF • 5.8 MB • Diperbarui: Jan 2025",
    icon: "📕",
    downloadUrl: "#",
  },
  {
    name: "Profil Kepegawaian ASN Kota Contoh 2024",
    meta: "DOCX • 3.2 MB • Diperbarui: Des 2024",
    icon: "📘",
    downloadUrl: "#",
  },
  {
    name: "Standar Pelayanan Minimum (SPM) 2024",
    meta: "PDF • 4.7 MB • Diperbarui: Jan 2025",
    icon: "📕",
    downloadUrl: "#",
  },
];

const peraturanDocs = [
  {
    number: "No. 1/2025",
    title: "Perda tentang Anggaran Pendapatan dan Belanja Daerah Tahun 2025",
    type: "Perda",
    year: "2025",
    downloadUrl: "#",
  },
  {
    number: "No. 2/2024",
    title: "Perwali tentang Pelayanan Administrasi Kependudukan Secara Online",
    type: "Perwali",
    year: "2024",
    downloadUrl: "#",
  },
  {
    number: "No. 5/2024",
    title: "Perda tentang Pengelolaan dan Perlindungan Lingkungan Hidup",
    type: "Perda",
    year: "2024",
    downloadUrl: "#",
  },
  {
    number: "No. 8/2024",
    title: "SK Walikota tentang Penetapan Kawasan Tanpa Rokok",
    type: "SK Walikota",
    year: "2024",
    downloadUrl: "#",
  },
  {
    number: "No. 3/2023",
    title: "Perda tentang Penanaman Modal dan Kemudahan Berusaha",
    type: "Perda",
    year: "2023",
    downloadUrl: "#",
  },
  {
    number: "No. 10/2023",
    title: "Perwali tentang Standar Pelayanan Publik Kota Contoh",
    type: "Perwali",
    year: "2023",
    downloadUrl: "#",
  },
];

const laporanDocs = [
  {
    name: "Laporan Kinerja Instansi Pemerintah (LKjIP) Kota Contoh Tahun 2024",
    meta: "Januari 2025 · PDF 4.2 MB · 1.248 Unduhan",
    downloadUrl: "#",
  },
  {
    name: "Rencana Pembangunan Jangka Menengah Daerah (RPJMD) 2021–2026",
    meta: "Maret 2021 · PDF 8.7 MB · 3.456 Unduhan",
    downloadUrl: "#",
  },
  {
    name: "Rencana Kerja Pemerintah Daerah (RKPD) Kota Contoh Tahun 2025",
    meta: "Juni 2024 · PDF 5.1 MB · 892 Unduhan",
    downloadUrl: "#",
  },
  {
    name: "Perjanjian Kinerja (PK) Kepala Daerah Tahun 2025",
    meta: "Januari 2025 · PDF 1.3 MB · 645 Unduhan",
    downloadUrl: "#",
  },
];

const opdList = [
  { name: "Sekretariat Daerah Kota Contoh", type: "Sekretariat", head: "Dr. Bambang Sutrisno, M.Hum", icon: "🏛️" },
  { name: "Dinas Pendidikan dan Kebudayaan", type: "Dinas", head: "Dr. Hendra Putra, M.Pd", icon: "📋" },
  { name: "Dinas Kesehatan", type: "Dinas", head: "dr. Ratna Dewi, Sp.A", icon: "🏥" },
  { name: "Dinas Pekerjaan Umum & PR", type: "Dinas", head: "Ir. Yusuf Hakim, M.T", icon: "🏗️" },
  { name: "Satuan Polisi Pamong Praja", type: "Satuan", head: "Kol. (Purn) Agus Santoso", icon: "👮" },
  { name: "Badan Pengelolaan Keuangan Daerah", type: "Badan", head: "Hj. Sri Wahyuni, S.E., M.Ak", icon: "💰" },
  { name: "Dinas Lingkungan Hidup", type: "Dinas", head: "Dr. Anita Sari, M.Sc", icon: "🌿" },
  { name: "Dinas Penanaman Modal & PTSP", type: "Dinas", head: "Ir. Budi Hartono, M.B.A", icon: "💼" },
];

export default function PpidPage() {
  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Informasi Publik" }]} />
      <PageHero
        badge="📂 Transparansi"
        title="Informasi Publik"
        description="Dokumen publik, data terbuka, dan informasi pemerintah yang dapat diakses masyarakat."
      />
      <ContentWrap className="py-10 sm:py-12">
        <PpidClient
          ppidDocs={ppidDocs}
          peraturanDocs={peraturanDocs}
          laporanDocs={laporanDocs}
          opdList={opdList}
          ppidCategories={["Semua", "Keuangan", "Perencanaan", "Pengadaan", "Kepegawaian"]}
          opdCategories={["Semua", "Dinas", "Badan", "Sekretariat", "Kantor", "Kecamatan", "Satuan"]}
          peraturanCategories={["Semua", "Perda", "Perwali", "SK Walikota"]}
        />
      </ContentWrap>
      <GovFooter />
      <BackToTop />
    </div>
  );
}
