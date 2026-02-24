import type { Metadata } from "next";
import "../../../../ecommerce/src/app/globals.css";
import MockSiteShell from "@/components/mock-site-shell";

export const metadata: Metadata = {
  title: "Ecommerce | Workspace Mockup",
  description: "UrbanStyle Fashion Store",
};

export default function EcommerceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MockSiteShell slug="ecommerce">{children}</MockSiteShell>;
}
