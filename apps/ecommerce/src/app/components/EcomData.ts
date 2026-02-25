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

export const badgeColor: Record<string, string> = {
  "Best Seller": "bg-amber-500 text-white",
  Hot: "bg-red-500 text-white",
  New: "bg-indigo-500 text-white",
  Sale: "bg-emerald-500 text-white",
};
