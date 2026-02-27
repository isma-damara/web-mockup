"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search, ShoppingCart, Tag, ChevronDown, X, Menu,
} from "lucide-react";
import { products, fmt } from "./EcomData";
import { useSiteBase, withSiteBase } from "./useSiteBase";

type CartItem = { id: number; qty: number; size: string };

interface Props {
  cart: CartItem[];
  totalItems: number;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const navItems = [
  { label: "Home", href: "/#hero" },
  {
    label: "Shop", href: "/#shop",
    sub: ["Wanita", "Pria", "Kids", "New Arrivals", "Sale", "Lookbook"],
  },
  { label: "Collections", href: "/#lookbook" },
  {
    label: "About Us", href: "/#whyus",
    sub: ["Our Story", "Track Order", "Contact Us"],
  },
];

export default function EcomNav({
  cart, totalItems,
  wishlist, toggleWishlist, searchOpen, setSearchOpen,
}: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropTimer = useRef<NodeJS.Timeout | null>(null);
  const siteBase = useSiteBase();

  useEffect(() => {
    setMounted(true);
  }, []);

  const suggestions = searchQuery.length > 1
    ? products
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5)
    : [];

  const getSubMenuHref = (label: string) => {
    if (label === "Track Order") return withSiteBase("/help/track-order", siteBase);
    if (label === "Contact Us") return withSiteBase("/help/hubungi-kami", siteBase);
    if (label === "Our Story") return withSiteBase("/#whyus", siteBase);
    if (label === "Lookbook") return withSiteBase("/#lookbook", siteBase);
    return withSiteBase("/#shop", siteBase);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
      {/* Promo strip */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-center py-1.5 text-xs font-medium">
        Gratis ongkir untuk pesanan di atas Rp 150.000. Yuk, belanja hari ini!
      </div>
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={withSiteBase("/", siteBase)} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
            <Tag className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800">
            Urban<span className="text-emerald-600">Style</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => {
                if (dropTimer.current) clearTimeout(dropTimer.current);
                if (item.sub) setOpenDrop(item.label);
              }}
              onMouseLeave={() => {
                dropTimer.current = setTimeout(() => setOpenDrop(null), 150);
              }}
            >
              <Link
                href={withSiteBase(item.href, siteBase)}
                className="flex items-center gap-1 rounded-full px-3 py-2 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                onClick={() => setOpenDrop(null)}
              >
                {item.label}
                {item.sub && (
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDrop === item.label ? "rotate-180" : ""}`} />
                )}
              </Link>
              {item.sub && openDrop === item.label && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="min-w-[180px] rounded-xl border border-emerald-100 bg-white/95 backdrop-blur-lg shadow-xl shadow-emerald-100/30 p-1.5">
                    {item.sub.map((s) => (
                      <Link
                        key={s}
                        href={getSubMenuHref(s)}
                        className="block rounded-lg px-3.5 py-2 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setOpenDrop(null)}
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-full p-2 hover:bg-emerald-50 text-slate-600 transition-colors"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <Link
            href={withSiteBase("/cart", siteBase)}
            className="relative rounded-full p-2 hover:bg-emerald-50 text-slate-600 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden rounded-full p-2 hover:bg-emerald-50 text-slate-600">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Search bar with autocomplete */}
      {searchOpen && (
        <div className="border-t border-emerald-100 bg-white px-4 py-3 relative">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50/50 px-4 py-2">
              <Search className="h-4 w-4 text-emerald-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk fashion..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-emerald-300"
                autoFocus
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute left-4 right-4 top-full z-50 mx-auto max-w-7xl">
                <div className="rounded-xl border border-emerald-100 bg-white shadow-xl p-2 mt-1">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left text-sm hover:bg-emerald-50 transition-colors"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchOpen(false);
                        router.push(withSiteBase(`/product/${p.id}`, siteBase));
                      }}
                    >
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${p.gradient} shrink-0`} />
                      <div>
                        <div className="font-medium text-slate-700">{p.name}</div>
                        <div className="text-xs text-slate-400">{p.category} - {fmt(p.price)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile slide-out */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-bold text-slate-800">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-emerald-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center">
                  <Link href={withSiteBase(item.href, siteBase)} onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 text-sm font-medium text-slate-600 hover:text-emerald-600">
                    {item.label}
                  </Link>
                  {item.sub && (
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="p-2 text-slate-400">
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.sub && mobileExpanded === item.label && (
                  <div className="ml-4 border-l-2 border-emerald-100 pl-3 pb-2">
                    {item.sub.map((s) => (
                      <Link key={s} href={getSubMenuHref(s)} onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-slate-500 hover:text-emerald-600">{s}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

