"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Search, Heart, Sparkles, ChevronDown, X, Menu, Trash2,
} from "lucide-react";
import { products } from "./CatalogData";
import { useSiteBase, withSiteBase } from "./useSiteBase";

interface Props {
  liked: number[];
  toggleLike: (id: number) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Products", href: "#products" },
  {
    label: "About Brand", href: "#brand",
    sub: ["Our Story", "Store Locator", "Contact Us"],
  },
];

export default function CatalogNav({ liked, toggleLike, searchOpen, setSearchOpen }: Props) {
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const dropTimer = useRef<NodeJS.Timeout | null>(null);
  const siteBase = useSiteBase();

  const navHref = (href: string) => {
    if (href.startsWith("#")) return withSiteBase(`/${href}`, siteBase);
    return withSiteBase(href, siteBase);
  };

  const productHref = (productName: string) => {
    const slug = productName.toLowerCase().replace(/\s+/g, "-");
    return withSiteBase(`/products/${slug}`, siteBase);
  };

  const suggestions = searchQuery.length > 1
    ? products.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  const wishlistProducts = products.filter((p) => liked.includes(p.id));

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-rose-100 shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={withSiteBase("/", siteBase)} className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            Glow<span className="text-rose-500">Beauty</span>
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
              <a
                href={navHref(item.href)}
                className="flex items-center gap-1 rounded-full px-3 py-2 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              >
                {item.label}
                {item.sub && (
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDrop === item.label ? "rotate-180" : ""}`} />
                )}
              </a>
              {item.sub && openDrop === item.label && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="min-w-[180px] rounded-xl border border-rose-100 bg-white/95 backdrop-blur-lg shadow-xl shadow-rose-100/30 p-1.5 animate-fade-up">
                    {item.sub.map((s) => (
                      <a
                        key={s}
                        href={s === "Store Locator"
                          ? withSiteBase("/contact", siteBase)
                          : s === "Contact Us"
                            ? withSiteBase("/help/hubungi-kami", siteBase)
                            : s === "Our Story"
                              ? withSiteBase("/brand", siteBase)
                              : productHref(s)}
                        className="block rounded-lg px-3.5 py-2 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                        onClick={() => setOpenDrop(null)}
                      >
                        {s}
                      </a>
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
            className="rounded-full p-2 hover:bg-rose-50 text-slate-600 transition-colors"
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <button
            onClick={() => setWishlistOpen(true)}
            className="relative rounded-full p-2 hover:bg-rose-50 text-slate-600 transition-colors"
          >
            <Heart className="h-5 w-5" />
            {liked.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {liked.length}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(true)} className="lg:hidden rounded-full p-2 hover:bg-rose-50 text-slate-600">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Search bar with autocomplete */}
      {searchOpen && (
        <div className="border-t border-rose-100 bg-white px-4 py-3 relative">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 rounded-full border border-rose-200 bg-rose-50/50 px-4 py-2">
              <Search className="h-4 w-4 text-rose-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk kecantikan..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-rose-300"
                autoFocus
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute left-4 right-4 top-full z-50 mx-auto max-w-7xl">
                <div className="rounded-xl border border-rose-100 bg-white shadow-xl p-2 mt-1">
                  {suggestions.map((p) => (
                    <button
                      key={p.id}
                      className="flex w-full items-center gap-3 rounded-lg p-2.5 text-left text-sm hover:bg-rose-50 transition-colors"
                      onClick={() => { setSearchQuery(""); setSearchOpen(false); }}
                    >
                      <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${p.gradient} shrink-0`} />
                      <div>
                        <div className="font-medium text-slate-700">{p.name}</div>
                        <div className="text-xs text-slate-400">{p.category}</div>
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
              <button onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-rose-50">
                <X className="h-5 w-5" />
              </button>
            </div>
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center">
                  <a
                    href={navHref(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 py-3 text-sm font-medium text-slate-600 hover:text-rose-600">
                    {item.label}
                  </a>
                  {item.sub && (
                    <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="p-2 text-slate-400">
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {item.sub && mobileExpanded === item.label && (
                  <div className="ml-4 border-l-2 border-rose-100 pl-3 pb-2">
                    {item.sub.map((s) => (
                      <a
                        key={s}
                        href={s === "Store Locator"
                          ? withSiteBase("/contact", siteBase)
                          : s === "Contact Us"
                            ? withSiteBase("/help/hubungi-kami", siteBase)
                            : s === "Our Story"
                              ? withSiteBase("/brand", siteBase)
                              : productHref(s)}
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-sm text-slate-500 hover:text-rose-600"
                      >
                        {s}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist slide-out (cart-style) */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setWishlistOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-lg font-bold text-slate-800">Wishlist ({wishlistProducts.length})</h3>
              <button onClick={() => setWishlistOpen(false)} className="rounded-full p-1 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                  <Heart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>Wishlist kosong</p>
                  <p className="text-xs mt-1">Tambahkan produk melalui tombol &quot;Add to Wishlist&quot;</p>
                </div>
              ) : (
                wishlistProducts.map((p) => (
                  <div key={p.id} className="flex gap-4 rounded-xl border border-slate-100 p-3">
                    <div className={`h-20 w-20 shrink-0 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center text-xs font-bold text-white/40`}>
                      {p.name.split(" ")[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-slate-800 truncate">{p.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{p.category}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => toggleLike(p.id)}
                          className="ml-auto h-6 w-6 rounded border border-slate-200 flex items-center justify-center hover:bg-rose-50 hover:border-rose-200 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="h-3 w-3 text-slate-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer (like checkout) */}
            {wishlistProducts.length > 0 && (
              <div className="p-5 border-t space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Produk</span>
                  <span className="font-bold text-lg text-slate-800">{wishlistProducts.length}</span>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 py-3 text-sm font-semibold text-white hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg shadow-rose-200"
                >
                  Lanjut Belanja
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
