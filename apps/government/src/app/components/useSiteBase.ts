"use client";

import { usePathname } from "next/navigation";

export function useSiteBase() {
  const pathname = usePathname() ?? "";
  return pathname.startsWith("/site/government") ? "/site/government" : "";
}

export function withSiteBase(href: string, siteBase = "") {
  if (!href) return href;
  if (href.startsWith("#")) return href;
  if (href.startsWith("http")) return href;
  if (siteBase && href.startsWith(siteBase)) return href;
  if (siteBase && href.startsWith("/")) return `${siteBase}${href}`;
  return href;
}
