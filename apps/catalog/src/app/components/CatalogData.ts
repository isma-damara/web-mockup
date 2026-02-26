import { Droplets, Palette, Scissors, Sun, Leaf, Sparkles } from "lucide-react";

export const categories = [
  { name: "Skincare", icon: Droplets, count: 42, color: "bg-pink-100 text-pink-600" },
  { name: "Makeup", icon: Palette, count: 38, color: "bg-rose-100 text-rose-600" },
  { name: "Bodycare", icon: Sun, count: 24, color: "bg-fuchsia-100 text-fuchsia-600" },
  { name: "Haircare", icon: Scissors, count: 18, color: "bg-purple-100 text-purple-600" },
  { name: "Fragrance", icon: Sparkles, count: 15, color: "bg-violet-100 text-violet-600" },
  { name: "Natural", icon: Leaf, count: 20, color: "bg-emerald-100 text-emerald-600" },
];

export const products = [
  {
    id: 1, name: "Rose Glow Serum", category: "Skincare", price: 289000, originalPrice: 350000,
    rating: 4.9, reviews: 234, badge: "Best Seller" as const,
    gradient: "from-rose-200 to-pink-200", skinType: "All Skin",
    desc: "Serum wajah dengan ekstrak mawar dan hyaluronic acid untuk kulit glowing dan terhidrasi.",
    ingredients: "Rose Extract, Hyaluronic Acid, Niacinamide, Vitamin E, Aloe Vera",
    howToUse: "Gunakan 2-3 tetes pada wajah bersih, tepuk lembut hingga meresap. Gunakan pagi & malam.",
    variants: ["30ml", "50ml"],
  },
  {
    id: 2, name: "Velvet Matte Lipstick", category: "Makeup", price: 159000, originalPrice: null,
    rating: 4.8, reviews: 189, badge: "New" as const,
    gradient: "from-red-200 to-rose-200", skinType: "All Skin",
    desc: "Lipstick matte dengan formula ringan dan tahan lama hingga 12 jam.",
    ingredients: "Jojoba Oil, Vitamin E, Beeswax, Natural Pigments, Shea Butter",
    howToUse: "Aplikasikan langsung pada bibir dari tengah ke ujung. Bisa dilayer untuk warna lebih intens.",
    variants: ["Rosewood", "Berry Crush", "Nude Peach", "Coral Dream"],
  },
  {
    id: 3, name: "Hydra Moisture Cream", category: "Skincare", price: 245000, originalPrice: 299000,
    rating: 4.7, reviews: 312, badge: "Sale" as const,
    gradient: "from-blue-200 to-indigo-200", skinType: "Dry Skin",
    desc: "Krim pelembab intensif dengan ceramide dan squalane untuk kulit kering dan dehidrasi.",
    ingredients: "Ceramide NP, Squalane, Shea Butter, Glycerin, Centella Asiatica",
    howToUse: "Aplikasikan pada wajah dan leher setelah serum. Gunakan pagi dan malam hari.",
    variants: ["30ml", "50ml"],
  },
  {
    id: 4, name: "Silk Body Lotion", category: "Bodycare", price: 189000, originalPrice: null,
    rating: 4.6, reviews: 156, badge: null,
    gradient: "from-amber-200 to-orange-200", skinType: "All Skin",
    desc: "Body lotion dengan tekstur sutra yang melembabkan kulit hingga 48 jam.",
    ingredients: "Silk Protein, Argan Oil, Vitamin B5, Almond Oil, Honey Extract",
    howToUse: "Aplikasikan merata pada seluruh tubuh setelah mandi. Fokus pada area kering.",
    variants: ["200ml", "400ml"],
  },
  {
    id: 5, name: "Luminous Foundation", category: "Makeup", price: 325000, originalPrice: 400000,
    rating: 4.9, reviews: 278, badge: "Best Seller" as const,
    gradient: "from-yellow-200 to-amber-200", skinType: "All Skin",
    desc: "Foundation dengan coverage medium-to-full dan finish luminous natural.",
    ingredients: "Hyaluronic Acid, Vitamin C, SPF 30, Silica, Niacinamide",
    howToUse: "Gunakan beauty sponge atau brush. Blend dari tengah wajah ke luar. Layer untuk coverage lebih.",
    variants: ["Light", "Medium", "Tan", "Deep"],
  },
  {
    id: 6, name: "Keratin Hair Mask", category: "Haircare", price: 199000, originalPrice: null,
    rating: 4.5, reviews: 98, badge: "New" as const,
    gradient: "from-purple-200 to-violet-200", skinType: "All Skin",
    desc: "Hair mask dengan keratin dan argan oil untuk rambut rusak dan kering.",
    ingredients: "Keratin, Argan Oil, Coconut Oil, Biotin, Silk Amino Acid",
    howToUse: "Aplikasikan setelah keramas, diamkan 5-10 menit, lalu bilas bersih.",
    variants: ["150ml", "300ml"],
  },
  {
    id: 7, name: "Vitamin C Brightening", category: "Skincare", price: 275000, originalPrice: 350000,
    rating: 4.8, reviews: 445, badge: "Best Seller" as const,
    gradient: "from-orange-200 to-yellow-200", skinType: "Oily Skin",
    desc: "Serum vitamin C 15% untuk mencerahkan dan meratakan warna kulit.",
    ingredients: "Ascorbic Acid 15%, Ferulic Acid, Vitamin E, Green Tea, Niacinamide",
    howToUse: "Teteskan 3-4 tetes pada wajah bersih setiap pagi. Lanjutkan dengan sunscreen.",
    variants: ["15ml", "30ml"],
  },
  {
    id: 8, name: "Floral Eau de Parfum", category: "Fragrance", price: 450000, originalPrice: null,
    rating: 4.9, reviews: 167, badge: "Premium" as const,
    gradient: "from-pink-200 to-fuchsia-200", skinType: "All Skin",
    desc: "Parfum mewah dengan aroma bunga rose dan jasmine yang tahan lama.",
    ingredients: "Rose Absolute, Jasmine, Peony, Musk, Sandalwood",
    howToUse: "Semprotkan pada titik nadi: pergelangan tangan, belakang telinga, dan leher.",
    variants: ["30ml", "50ml", "100ml"],
  },
];

export const blogPosts = [
  {
    title: "10 Langkah Korean Skincare Routine",
    excerpt: "Panduan lengkap merawat kulit ala Korea untuk hasil glowing maksimal.",
    date: "20 Feb 2026",
    category: "Skincare Tips",
    gradient: "from-rose-300 to-pink-400",
  },
  {
    title: "Cara Memilih Foundation Sesuai Skin Tone",
    excerpt: "Tips menemukan shade foundation yang sempurna untuk warna kulit Anda.",
    date: "18 Feb 2026",
    category: "Makeup Guide",
    gradient: "from-amber-300 to-orange-400",
  },
  {
    title: "Manfaat Bahan Alami untuk Kulit Sensitif",
    excerpt: "Kenali ingredien alami yang aman dan efektif untuk kulit sensitif.",
    date: "15 Feb 2026",
    category: "Ingredients",
    gradient: "from-emerald-300 to-teal-400",
  },
];

export const badgeColor: Record<string, string> = {
  "Best Seller": "bg-rose-500 text-white",
  New: "bg-indigo-500 text-white",
  Sale: "bg-emerald-500 text-white",
  Premium: "bg-amber-500 text-white",
};

