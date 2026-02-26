"use client";

import { usePathname } from "next/navigation";

const PORTAL_BASE = "/site/government";

export function useSiteBase() {
  const pathname = usePathname();
  return pathname?.startsWith(PORTAL_BASE) ? PORTAL_BASE : "";
}

export function withSiteBase(path: string, base: string) {
  if (!path || path.startsWith("#")) return path;
  if (!base) return path;
  if (path.startsWith(base)) return path;
  if (path.startsWith("/")) return `${base}${path}`;
  return `${base}/${path}`;
}
