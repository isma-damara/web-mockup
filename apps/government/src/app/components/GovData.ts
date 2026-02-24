import { Users, FileText, GraduationCap, HeartPulse, Shield, TreePine, Briefcase, AlertCircle, Newspaper, Calendar, Building } from "lucide-react";

export const news = [
  {
    title: "Program Kota Hijau 2026: 10.000 Pohon Ditanam di Sepanjang Jalan Utama",
    date: "22 Feb 2026", category: "Lingkungan",
    excerpt: "Pemerintah Kota Nusantara meluncurkan program penghijauan masif sebagai komitmen terhadap kota berkelanjutan.",
    color: "bg-emerald-100 text-emerald-700", gradient: "from-emerald-200 to-teal-200",
  },
  {
    title: "Pelayanan e-KTP Kini Tersedia Secara Online Melalui Portal Resmi",
    date: "20 Feb 2026", category: "Pelayanan",
    excerpt: "Masyarakat kini dapat mengurus e-KTP dari rumah melalui sistem digital terintegrasi.",
    color: "bg-blue-100 text-blue-700", gradient: "from-blue-200 to-indigo-200",
  },
  {
    title: "Festival Budaya Nusantara 2026 Dibuka dengan Meriah di Alun-Alun Kota",
    date: "18 Feb 2026", category: "Budaya",
    excerpt: "Ribuan warga memenuhi alun-alun kota untuk pembukaan festival budaya tahunan.",
    color: "bg-amber-100 text-amber-700", gradient: "from-amber-200 to-orange-200",
  },
  {
    title: "Pembangunan Rumah Sakit Regional Baru Ditargetkan Selesai Kuartal III",
    date: "15 Feb 2026", category: "Infrastruktur",
    excerpt: "RS Regional baru dengan kapasitas 500 bed akan memperkuat layanan kesehatan kota.",
    color: "bg-rose-100 text-rose-700", gradient: "from-rose-200 to-pink-200",
  },
  {
    title: "Smart City Award 2026: Kota Nusantara Raih Peringkat 3 Nasional",
    date: "12 Feb 2026", category: "Teknologi",
    excerpt: "Penerapan teknologi smart city mendapat apresiasi tinggi dari Kementerian Kominfo.",
    color: "bg-violet-100 text-violet-700", gradient: "from-violet-200 to-purple-200",
  },
  {
    title: "Bantuan Sosial untuk 5.000 KK Terdampak Banjir Telah Disalurkan",
    date: "10 Feb 2026", category: "Sosial",
    excerpt: "Pemerintah kota memastikan bantuan sosial tersalurkan tepat sasaran kepada masyarakat terdampak.",
    color: "bg-cyan-100 text-cyan-700", gradient: "from-cyan-200 to-teal-200",
  },
];

export const services = [
  { name: "Kependudukan", icon: Users, desc: "e-KTP, KK, Akta Lahir", color: "from-emerald-500 to-teal-500" },
  { name: "Perizinan", icon: FileText, desc: "IMB, SIUP, Izin Usaha", color: "from-blue-500 to-indigo-500" },
  { name: "Pendidikan", icon: GraduationCap, desc: "PPDB, Beasiswa, Data Sekolah", color: "from-amber-500 to-orange-500" },
  { name: "Kesehatan", icon: HeartPulse, desc: "BPJS, RS, Puskesmas", color: "from-rose-500 to-pink-500" },
  { name: "Keamanan", icon: Shield, desc: "Laporan, Kehilangan", color: "from-slate-500 to-zinc-500" },
  { name: "Lingkungan", icon: TreePine, desc: "Sampah, Taman, Drainase", color: "from-green-500 to-emerald-500" },
  { name: "Pekerjaan", icon: Briefcase, desc: "Lowongan, Pelatihan", color: "from-purple-500 to-violet-500" },
  { name: "Pengaduan", icon: AlertCircle, desc: "Lapor Masalah Kota", color: "from-red-500 to-rose-500" },
];

export const stats = [
  { label: "Penduduk", value: 1200000, display: "1.2 Juta", suffix: "" },
  { label: "Kelurahan", value: 87, display: "87", suffix: "" },
  { label: "Kecamatan", value: 12, display: "12", suffix: "" },
  { label: "Luas Wilayah", value: 385, display: "385", suffix: " km²" },
];

export const agenda = [
  { title: "Musrenbang Kecamatan Utara", date: "25 Feb 2026", time: "09:00 WIB", location: "Aula Kecamatan Utara" },
  { title: "Rapat Koordinasi Penanggulangan Banjir", date: "27 Feb 2026", time: "10:00 WIB", location: "Balai Kota" },
  { title: "Peresmian Taman Kota Baru", date: "1 Mar 2026", time: "08:00 WIB", location: "Taman Nusantara" },
  { title: "Sosialisasi Program UMKM Digital", date: "3 Mar 2026", time: "13:00 WIB", location: "Gedung Serbaguna" },
  { title: "Peringatan Hari Lingkungan Hidup", date: "5 Mar 2026", time: "07:30 WIB", location: "Alun-Alun Kota" },
];

export const touristSpots = [
  { name: "Taman Nasional Nusantara", desc: "Hutan tropis dengan keanekaragaman hayati yang luar biasa", gradient: "from-emerald-300 to-green-400" },
  { name: "Pantai Mutiara", desc: "Pantai berpasir putih dengan sunset yang memukau", gradient: "from-cyan-300 to-blue-400" },
  { name: "Museum Sejarah Kota", desc: "Mengenal sejarah dan budaya Kota Nusantara", gradient: "from-amber-300 to-orange-400" },
  { name: "Air Terjun Pelangi", desc: "Air terjun alami setinggi 50 meter di pegunungan", gradient: "from-teal-300 to-emerald-400" },
];

export const galleryItems = [
  { title: "Upacara HUT Kota", gradient: "from-emerald-200 to-teal-300", type: "foto" },
  { title: "Musrenbang 2026", gradient: "from-blue-200 to-indigo-300", type: "foto" },
  { title: "Festival Budaya", gradient: "from-amber-200 to-orange-300", type: "video" },
  { title: "Peresmian Jembatan", gradient: "from-slate-200 to-zinc-300", type: "foto" },
  { title: "Vaksinasi Massal", gradient: "from-rose-200 to-pink-300", type: "foto" },
  { title: "Kunjungan Presiden", gradient: "from-violet-200 to-purple-300", type: "video" },
];

export const ppidDocs = [
  { title: "APBD 2026", category: "Keuangan", size: "2.4 MB" },
  { title: "LKJIP 2025", category: "Kinerja", size: "3.1 MB" },
  { title: "Perda No. 5/2025", category: "Peraturan", size: "1.8 MB" },
  { title: "Rencana Tata Ruang", category: "Perencanaan", size: "5.2 MB" },
  { title: "Laporan Tahunan 2025", category: "Laporan", size: "4.0 MB" },
];
