import { Zap, Clock, Truck, Shield, Percent, Package } from "lucide-react";

/* ---- PRODUCTS ---- */
export const products = [
  {
    id: 1, name: "Urban Denim Jacket", category: "Pria", price: 459000,
    originalPrice: 599000, rating: 4.8, reviews: 124, badge: "Hot" as string | null,
    gradient: "from-amber-200 to-orange-200", gradientAlt: "from-orange-200 to-amber-300",
    sizes: ["S", "M", "L", "XL"], colors: ["Indigo", "Black", "Washed Blue"],
    desc: "Jaket denim premium dengan cutting modern. Bahan denim 100% cotton yang nyaman dan tahan lama.",
    sizeChart: { S: "Chest 96, Length 64", M: "Chest 100, Length 66", L: "Chest 104, Length 68", XL: "Chest 108, Length 70" } as Record<string, string>,
  },
  {
    id: 2, name: "Silk Wrap Dress", category: "Wanita", price: 389000,
    originalPrice: null, rating: 4.9, reviews: 89, badge: "New" as string | null,
    gradient: "from-rose-200 to-pink-200", gradientAlt: "from-pink-200 to-rose-300",
    sizes: ["S", "M", "L"], colors: ["Blush", "Ivory", "Wine"],
    desc: "Dress elegan berbahan silk premium dengan siluet wrap yang flattering. Cocok untuk acara formal maupun casual.",
    sizeChart: { S: "Bust 82, Length 110", M: "Bust 86, Length 112", L: "Bust 90, Length 114" } as Record<string, string>,
  },
  {
    id: 3, name: "Leather Crossbody Bag", category: "Aksesoris", price: 275000,
    originalPrice: 350000, rating: 4.7, reviews: 203, badge: "Sale" as string | null,
    gradient: "from-yellow-200 to-amber-200", gradientAlt: "from-amber-200 to-yellow-300",
    sizes: ["One Size"], colors: ["Tan", "Black", "Burgundy"],
    desc: "Tas crossbody kulit sintetis premium dengan kompartemen multifungsi. Tali adjustable untuk kenyamanan.",
    sizeChart: { "One Size": "Width 24, Height 18, Depth 8" } as Record<string, string>,
  },
  {
    id: 4, name: "Classic Sneakers", category: "Sepatu", price: 549000,
    originalPrice: null, rating: 4.9, reviews: 312, badge: "Best Seller" as string | null,
    gradient: "from-slate-200 to-zinc-200", gradientAlt: "from-zinc-200 to-slate-300",
    sizes: ["39", "40", "41", "42", "43"], colors: ["White", "Black", "Grey"],
    desc: "Sneakers klasik dengan sol cushion premium. Desain timeless yang cocok dipadukan dengan outfit apapun.",
    sizeChart: { "39": "25cm", "40": "25.5cm", "41": "26cm", "42": "26.5cm", "43": "27cm" } as Record<string, string>,
  },
  {
    id: 5, name: "Oversized Blazer", category: "Wanita", price: 525000,
    originalPrice: 699000, rating: 4.6, reviews: 78, badge: "Sale" as string | null,
    gradient: "from-orange-200 to-red-200", gradientAlt: "from-red-200 to-orange-300",
    sizes: ["S", "M", "L"], colors: ["Camel", "Black", "Navy"],
    desc: "Blazer oversized yang stylish dengan cutting modern. Bahan polyester blend yang rapi dan nyaman.",
    sizeChart: { S: "Chest 106, Length 72", M: "Chest 110, Length 74", L: "Chest 114, Length 76" } as Record<string, string>,
  },
  {
    id: 6, name: "Cargo Pants", category: "Pria", price: 329000,
    originalPrice: null, rating: 4.5, reviews: 167, badge: null,
    gradient: "from-emerald-200 to-teal-200", gradientAlt: "from-teal-200 to-emerald-300",
    sizes: ["M", "L", "XL"], colors: ["Olive", "Black", "Sand"],
    desc: "Celana cargo dengan banyak saku fungsional. Bahan cotton twill yang ringan dan breathable.",
    sizeChart: { M: "Waist 78, Length 105", L: "Waist 82, Length 107", XL: "Waist 86, Length 109" } as Record<string, string>,
  },
  {
    id: 7, name: "Statement Sunglasses", category: "Aksesoris", price: 199000,
    originalPrice: 250000, rating: 4.8, reviews: 445, badge: "Hot" as string | null,
    gradient: "from-violet-200 to-purple-200", gradientAlt: "from-purple-200 to-violet-300",
    sizes: ["One Size"], colors: ["Black", "Tortoise", "Clear"],
    desc: "Kacamata hitam statement dengan lensa UV400. Frame ringan dan nyaman untuk digunakan seharian.",
    sizeChart: { "One Size": "Lens 52mm, Bridge 18mm, Temple 145mm" } as Record<string, string>,
  },
  {
    id: 8, name: "Platform Boots", category: "Sepatu", price: 689000,
    originalPrice: null, rating: 4.7, reviews: 56, badge: "New" as string | null,
    gradient: "from-stone-200 to-neutral-200", gradientAlt: "from-neutral-200 to-stone-300",
    sizes: ["36", "37", "38", "39", "40"], colors: ["Black", "Brown"],
    desc: "Platform boots dengan chunky sole untuk tampilan edgy. Bahan kulit sintetis premium dan sol anti-slip.",
    sizeChart: { "36": "23cm", "37": "23.5cm", "38": "24cm", "39": "24.5cm", "40": "25cm" } as Record<string, string>,
  },
];

export interface ProductDetailContent {
  summary: string;
  highlights: string[];
  material: string;
  fit: string;
  care: string;
  origin: string;
}

export interface ProductReviewItem {
  name: string;
  rating: number;
  date: string;
  variant: string;
  comment: string;
  helpful: number;
}

export const productDetailContent: Record<number, ProductDetailContent> = {
  1: {
    summary: "Jaket denim harian dengan konstruksi kokoh, cutting modern, dan detail jahitan kontras untuk tampilan casual premium.",
    highlights: [
      "Denim 12oz dengan struktur tebal namun tetap nyaman dipakai harian.",
      "2 saku dada + 2 saku samping dengan akses cepat.",
      "Kancing metal antikarat dengan finishing matte.",
    ],
    material: "100% Cotton Denim 12oz",
    fit: "Regular Fit",
    care: "Cuci terbalik dengan air dingin, hindari bleach, setrika suhu sedang.",
    origin: "Bandung, Indonesia",
  },
  2: {
    summary: "Dress wrap dengan siluet yang membentuk tubuh secara natural, cocok untuk acara formal maupun semi-casual.",
    highlights: [
      "Potongan wrap membantu menyesuaikan lingkar pinggang.",
      "Lining lembut untuk kenyamanan pemakaian panjang.",
      "Kerah V yang elegan dan mudah dipadukan dengan outer.",
    ],
    material: "Silk Blend Premium",
    fit: "Slim Fit",
    care: "Hand wash lembut, jangan peras berlebihan, gantung di tempat teduh.",
    origin: "Jakarta, Indonesia",
  },
  3: {
    summary: "Crossbody bag berkompartemen rapi untuk kebutuhan harian, dari gadget hingga wallet tetap tertata.",
    highlights: [
      "Kompartemen utama luas + saku zipper internal.",
      "Tali adjustable untuk dipakai sling atau shoulder.",
      "Hardware metal ringan dan tahan gores.",
    ],
    material: "PU Leather + Polyester Lining",
    fit: "One Size",
    care: "Lap dengan kain lembap, simpan dengan silica gel, hindari panas langsung.",
    origin: "Tangerang, Indonesia",
  },
  4: {
    summary: "Sneakers klasik dengan bantalan empuk dan outsole fleksibel untuk mobilitas tinggi sepanjang hari.",
    highlights: [
      "Insole cushion responsif untuk pijakan lebih nyaman.",
      "Outsole anti-slip untuk grip lebih stabil.",
      "Upper breathable untuk sirkulasi udara lebih baik.",
    ],
    material: "Mesh + Synthetic Leather",
    fit: "True to Size",
    care: "Bersihkan dengan sikat halus, jangan direndam, keringkan suhu ruang.",
    origin: "Semarang, Indonesia",
  },
  5: {
    summary: "Blazer oversized dengan siluet tegas, memberi tampilan smart-casual yang mudah dipadukan ke banyak outfit.",
    highlights: [
      "Shoulder line rapi untuk look lebih structured.",
      "Lapel klasik dengan detail minimalis.",
      "Inner lining halus untuk kenyamanan aktivitas kantor.",
    ],
    material: "Polyester Blend Twill",
    fit: "Oversized Fit",
    care: "Dry clean disarankan, setrika uap suhu rendah.",
    origin: "Surabaya, Indonesia",
  },
  6: {
    summary: "Cargo pants fungsional dengan banyak saku utilitarian, ideal untuk daily wear dan aktivitas outdoor ringan.",
    highlights: [
      "6 saku aktif dengan flap yang aman.",
      "Kain twill ringan dan tidak mudah kusut.",
      "Pinggang nyaman dipakai seharian.",
    ],
    material: "Cotton Twill 98% + Spandex 2%",
    fit: "Relaxed Fit",
    care: "Machine wash normal, pisahkan warna gelap, jemur terbalik.",
    origin: "Yogyakarta, Indonesia",
  },
  7: {
    summary: "Sunglasses statement dengan perlindungan UV400 dan frame ringan, cocok untuk aktivitas luar ruang.",
    highlights: [
      "Lensa UV400 membantu mengurangi paparan sinar matahari.",
      "Frame ringan untuk pemakaian lama.",
      "Desain modern untuk gaya kasual maupun streetwear.",
    ],
    material: "Polycarbonate Lens + Acetate Frame",
    fit: "One Size",
    care: "Bersihkan dengan microfiber, simpan dalam hard case.",
    origin: "Bekasi, Indonesia",
  },
  8: {
    summary: "Platform boots dengan karakter edgy dan kenyamanan langkah, cocok untuk tampilan bold di berbagai occasion.",
    highlights: [
      "Chunky sole dengan grip kuat di berbagai permukaan.",
      "Siluet ankle tinggi untuk dukungan lebih stabil.",
      "Resleting samping memudahkan pemakaian.",
    ],
    material: "Synthetic Leather + Rubber Outsole",
    fit: "True to Size",
    care: "Lap kering setelah dipakai, gunakan conditioner sintetis berkala.",
    origin: "Bogor, Indonesia",
  },
};

export const productReviewContent: Record<number, ProductReviewItem[]> = {
  1: [
    { name: "Ardi P.", rating: 5, date: "3 hari lalu", variant: "Indigo / L", comment: "Denim-nya tebal tapi tetap enak dipakai. Jahitan rapi dan cutting pas.", helpful: 18 },
    { name: "Rama K.", rating: 5, date: "1 minggu lalu", variant: "Black / M", comment: "Warna sesuai foto, detail kancing bagus. Cocok buat daily outfit.", helpful: 11 },
    { name: "Fikri N.", rating: 4, date: "2 minggu lalu", variant: "Washed Blue / XL", comment: "Fit oke dan nyaman. Pengiriman cepat, packaging aman.", helpful: 7 },
  ],
  2: [
    { name: "Nadia S.", rating: 5, date: "2 hari lalu", variant: "Blush / M", comment: "Bahannya halus dan jatuhnya bagus banget. Cocok untuk acara formal.", helpful: 15 },
    { name: "Mira L.", rating: 5, date: "6 hari lalu", variant: "Ivory / S", comment: "Model wrap bikin badan kelihatan proporsional. Sangat puas.", helpful: 9 },
    { name: "Tasya R.", rating: 4, date: "9 hari lalu", variant: "Wine / L", comment: "Warna elegan, stitching rapi. Akan repeat order.", helpful: 5 },
  ],
  3: [
    { name: "Dewi L.", rating: 5, date: "4 hari lalu", variant: "Tan / One Size", comment: "Kompartemennya banyak dan muat barang penting harian.", helpful: 13 },
    { name: "Sari W.", rating: 4, date: "1 minggu lalu", variant: "Black / One Size", comment: "Ringan dipakai, strap nyaman. Kualitas sesuai harga.", helpful: 8 },
    { name: "Nina C.", rating: 5, date: "2 minggu lalu", variant: "Burgundy / One Size", comment: "Finishing tas rapi, tampilannya premium.", helpful: 6 },
  ],
  4: [
    { name: "Budi R.", rating: 5, date: "3 hari lalu", variant: "White / 42", comment: "Sangat nyaman buat dipakai seharian. Sol empuk dan stabil.", helpful: 21 },
    { name: "Aji M.", rating: 5, date: "8 hari lalu", variant: "Black / 41", comment: "Desain clean, gampang dipaduin ke banyak outfit.", helpful: 12 },
    { name: "Gilang D.", rating: 4, date: "11 hari lalu", variant: "Grey / 43", comment: "Ukuran pas dan grip outsole bagus. Recommended.", helpful: 7 },
  ],
  5: [
    { name: "Sarah M.", rating: 5, date: "5 hari lalu", variant: "Camel / M", comment: "Potongannya bagus, bikin look jadi lebih classy.", helpful: 16 },
    { name: "Vina A.", rating: 4, date: "1 minggu lalu", variant: "Black / S", comment: "Material rapi dan nyaman. Cocok untuk kerja.", helpful: 9 },
    { name: "Rena P.", rating: 5, date: "13 hari lalu", variant: "Navy / L", comment: "Oversized fit-nya pas, tidak berlebihan. Suka banget.", helpful: 6 },
  ],
  6: [
    { name: "Andra H.", rating: 5, date: "2 hari lalu", variant: "Olive / L", comment: "Banyak saku, sangat fungsional. Nyaman untuk aktivitas luar.", helpful: 14 },
    { name: "Dimas T.", rating: 4, date: "1 minggu lalu", variant: "Black / XL", comment: "Kainnya ringan dan cutting-nya enak dipakai jalan.", helpful: 8 },
    { name: "Reza B.", rating: 4, date: "2 minggu lalu", variant: "Sand / M", comment: "Worth it, jahitan rapi dan bahan tidak panas.", helpful: 5 },
  ],
  7: [
    { name: "Luthfi Z.", rating: 5, date: "4 hari lalu", variant: "Black / One Size", comment: "Frame ringan, lensanya nyaman dipakai saat siang terik.", helpful: 12 },
    { name: "Kevin J.", rating: 5, date: "9 hari lalu", variant: "Tortoise / One Size", comment: "Modelnya keren, feel premium ketika dipakai.", helpful: 9 },
    { name: "Rani F.", rating: 4, date: "12 hari lalu", variant: "Clear / One Size", comment: "Sesuai ekspektasi, datang dalam kondisi sangat baik.", helpful: 4 },
  ],
  8: [
    { name: "Maya Q.", rating: 5, date: "3 hari lalu", variant: "Black / 38", comment: "Boots kokoh, nyaman dipakai lama, dan tampilannya standout.", helpful: 17 },
    { name: "Indah G.", rating: 4, date: "1 minggu lalu", variant: "Brown / 39", comment: "Ukuran pas, zipper lancar, sol tidak licin.", helpful: 10 },
    { name: "Caca N.", rating: 5, date: "2 minggu lalu", variant: "Black / 37", comment: "Kualitas material bagus, cocok untuk outfit edgy.", helpful: 6 },
  ],
};

export function getProductDetailContent(id: number) {
  return productDetailContent[id];
}

export function getProductReviews(id: number) {
  return productReviewContent[id] ?? [];
}

export const flashSale = [
  { id: 101, productId: 1, name: "Knit Cardigan", orig: 399000, sale: 199000, gradient: "from-amber-300 to-orange-300", discount: 50 },
  { id: 102, productId: 3, name: "Canvas Tote Bag", orig: 249000, sale: 149000, gradient: "from-yellow-300 to-amber-300", discount: 40 },
  { id: 103, productId: 6, name: "Linen Shirt", orig: 329000, sale: 197000, gradient: "from-orange-300 to-red-300", discount: 40 },
];

export const blogPosts = [
  { title: "5 Cara Mix & Match Outfit Kantor", category: "Style Guide", date: "20 Feb 2026", gradient: "from-amber-200 to-orange-200", excerpt: "Tips tampil stylish di kantor tanpa melanggar dress code." },
  { title: "Tren Fashion 2026 yang Wajib Dicoba", category: "Trend Alert", date: "18 Feb 2026", gradient: "from-rose-200 to-pink-200", excerpt: "Dari oversized blazer hingga platform shoes, ini yang sedang hits." },
  { title: "Panduan Memilih Jeans yang Tepat", category: "Guide", date: "15 Feb 2026", gradient: "from-blue-200 to-indigo-200", excerpt: "Kenali body type kamu dan temukan jeans yang paling cocok." },
];

export const customerReviews = [
  { name: "Andi P.", rating: 5, comment: "Kualitas jaket denimnya luar biasa, jahitannya rapi dan bahannya tebal.", product: "Urban Denim Jacket", date: "2 hari lalu" },
  { name: "Sarah M.", rating: 5, comment: "Dress-nya cantik banget, bahannya halus dan cutting-nya pas.", product: "Silk Wrap Dress", date: "5 hari lalu" },
  { name: "Budi R.", rating: 4, comment: "Sneakers-nya nyaman banget, cocok untuk daily wear. Pengiriman cepat!", product: "Classic Sneakers", date: "1 minggu lalu" },
  { name: "Dewi L.", rating: 5, comment: "Tas-nya bagus, ukurannya pas dan banyak kompartemen. Worth it!", product: "Leather Crossbody Bag", date: "1 minggu lalu" },
];

export function fmt(n: number) { return "Rp " + n.toLocaleString("id-ID"); }

const productImageSets: Record<number, string[]> = {
  1: [1, 2, 3, 4, 5].map((n) => `/assets/product/denim/denim${n}.jpg`),
  2: [1, 2, 3, 4, 5].map((n) => `/assets/product/dress/dress${n}.jpg`),
  3: [1, 2, 3, 4, 5].map((n) => `/assets/product/bag/bag${n}.jpg`),
  4: [1, 2, 3, 4, 5].map((n) => `/assets/product/sneakers/sneakers${n}.jpg`),
  5: [1, 2, 3, 4, 5].map((n) => `/assets/product/blazer/blazer${n}.jpg`),
  6: [1, 2, 3, 4, 5].map((n) => `/assets/product/cargo/cargo${n}.jpg`),
  7: [1, 2, 3, 4, 5].map((n) => `/assets/product/sungglas/sunglass${n}.jpg`),
  8: [1, 2, 3, 4, 5].map((n) => `/assets/product/boots/boots${n}.jpg`),
};

export function productImagesById(id: number) {
  return productImageSets[id] ?? productImageSets[1];
}

export function productImageById(id: number, index = 0) {
  const images = productImagesById(id);
  if (!images || images.length === 0) return "/assets/product/denim/denim1.jpg";
  const safe = ((index % images.length) + images.length) % images.length;
  return images[safe];
}

export const badgeColor: Record<string, string> = {
  "Best Seller": "bg-amber-500 text-white",
  Hot: "bg-red-500 text-white",
  New: "bg-indigo-500 text-white",
  Sale: "bg-emerald-500 text-white",
};
