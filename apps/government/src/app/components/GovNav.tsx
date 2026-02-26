"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@workspace/ui/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/ui/sheet";
import { useSiteBase, withSiteBase } from "./useSiteBase";
import { cn } from "@workspace/lib/utils";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
  disableActive?: boolean;
};

const navItems: NavItem[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil Kota",
    href: "/profil",
    children: [
      { label: "📜 Sejarah", href: "/profil#sejarah" },
      { label: "🎯 Visi & Misi", href: "/profil#visi-misi" },
      { label: "🏛️ Lambang Daerah", href: "/profil#lambang" },
      { label: "👤 Pimpinan Daerah", href: "/profil#pimpinan" },
      { label: "🗂️ Struktur Organisasi", href: "/profil#struktur" },
    ],
  },
  {
    label: "Pemerintahan",
    href: "/ppid",
    disableActive: true,
    children: [
      { label: "🏢 OPD/SKPD", href: "/ppid#opd" },
      { label: "📋 Peraturan Daerah", href: "/ppid#peraturan" },
      { label: "💰 APBD", href: "/ppid#apbd" },
      { label: "📊 Laporan Kinerja", href: "/ppid#laporan" },
    ],
  },
  {
    label: "Layanan Publik",
    href: "/layanan",
    children: [
      { label: "📝 Perizinan Online", href: "/layanan#perizinan" },
      { label: "📣 Pengaduan", href: "/pengaduan" },
      { label: "👪 Kependudukan", href: "/layanan#kependudukan" },
      { label: "🏥 Kesehatan", href: "/layanan#kesehatan" },
      { label: "🎓 Pendidikan", href: "/layanan#pendidikan" },
    ],
  },
  { label: "Berita & Agenda", href: "/berita" },
  { label: "Informasi Publik", href: "/ppid" },
  { label: "Pariwisata", href: "/pariwisata" },
  { label: "Kontak", href: "/kontak" },
];

export default function GovNav() {
  const siteBase = useSiteBase();
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.disableActive) return false;
    const resolved = withSiteBase(item.href, siteBase);
    if (!resolved) return false;
    return pathname === resolved || pathname?.startsWith(resolved + "/");
  };

  return (
    <>
      <div className="border-b border-white/10 bg-[var(--gov-navy)] text-[12px] text-[rgba(255,255,255,0.72)]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            <span>📍 Jl. Merdeka No. 1, Kota Contoh</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[var(--gov-gold)]" />
            <span>☎ (021) 123-4567</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[var(--gov-gold)]" />
            <span>✉ info@kotacontoh.go.id</span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link href="#" className="text-[11px] text-white/60 hover:text-[var(--gov-gold-light)]">
              Peta Situs
            </Link>
            <Link href="#" className="text-[11px] text-white/60 hover:text-[var(--gov-gold-light)]">
              Aksesibilitas
            </Link>
            <Link href="#" className="text-[11px] text-white/60 hover:text-[var(--gov-gold-light)]">
              English
            </Link>
            <Link
              href={withSiteBase("/ppid", siteBase)}
              className="text-[11px] text-white/60 hover:text-[var(--gov-gold-light)]"
            >
              PPID
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b-4 border-[var(--gov-gold)] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <Link href={withSiteBase("/", siteBase)} className="flex items-center gap-3">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[var(--gov-gold)] bg-gradient-to-br from-[var(--gov-navy)] to-[var(--gov-blue)] font-display text-[20px] font-extrabold text-[var(--gov-gold-light)]">
              K
            </div>
            <div className="leading-tight">
              <div className="font-display text-[18px] font-bold text-[var(--gov-navy)]">Kota Contoh</div>
              <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--gov-slate)]">
                Portal Pemerintah Resmi
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={withSiteBase(item.href, siteBase)}
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium text-[var(--gov-text)] transition-all hover:bg-[rgba(26,86,219,0.06)] hover:text-[var(--gov-blue)]",
                    isActive(item) && "bg-[rgba(26,86,219,0.06)] text-[var(--gov-blue)]",
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3 w-3" />}
                </Link>
                {item.children && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-[220px] rounded-xl border border-[var(--gov-border)] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] opacity-0 invisible translate-y-[-6px] transition-all group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={withSiteBase(child.href, siteBase)}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-[13px] text-[var(--gov-text)] transition-all hover:bg-[rgba(26,86,219,0.06)] hover:text-[var(--gov-blue)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-[var(--gov-border)] text-[var(--gov-slate)] hover:border-[var(--gov-blue)] hover:text-[var(--gov-blue)]"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              asChild
              className="hidden h-9 rounded-lg bg-gradient-to-br from-[var(--gov-blue)] to-[var(--gov-navy)] text-[13px] font-semibold text-white shadow-sm hover:shadow-md md:inline-flex"
            >
              <Link href={withSiteBase("/pengaduan", siteBase)}>📣 Pengaduan</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 border-[var(--gov-border)] lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] p-0">
                <div className="border-b border-[var(--gov-border)] px-5 py-4">
                  <div className="font-display text-[16px] font-bold text-[var(--gov-navy)]">Kota Contoh</div>
                  <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--gov-slate)]">
                    Portal Pemerintah Resmi
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-3 py-3">
                  {navItems.map((item) => (
                    <div key={item.label} className="rounded-lg border border-transparent px-2 py-1">
                      <Link
                        href={withSiteBase(item.href, siteBase)}
                        className="flex items-center justify-between rounded-md px-3 py-2 text-[13.5px] font-medium text-[var(--gov-text)] hover:bg-[rgba(26,86,219,0.06)]"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="mt-1 flex flex-col gap-1 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={withSiteBase(child.href, siteBase)}
                              className="rounded-md px-3 py-2 text-[12.5px] text-[var(--gov-slate)] hover:bg-[rgba(26,86,219,0.06)] hover:text-[var(--gov-blue)]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-[var(--gov-border)] px-5 py-4">
                  <Button
                    asChild
                    className="w-full rounded-lg bg-gradient-to-br from-[var(--gov-blue)] to-[var(--gov-navy)] text-[13px] font-semibold text-white"
                  >
                    <Link href={withSiteBase("/pengaduan", siteBase)}>📣 Pengaduan</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
