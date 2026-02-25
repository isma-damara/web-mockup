import type { Metadata } from "next";
import "../../../../../catalog/src/app/globals.css";
import MockSiteShell from "@/components/mock-site-shell";

export const metadata: Metadata = {
  title: "Catalog | Workspace Mockup",
  description: "Product Showcase Hub",
};

export default function CatalogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MockSiteShell>{children}</MockSiteShell>;
}
