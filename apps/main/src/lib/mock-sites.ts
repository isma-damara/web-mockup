import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Landmark,
  LayoutGrid,
  ShoppingCart,
} from "lucide-react";

export type MockSiteDefinition = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  shadow: string;
};

export const mockSites: MockSiteDefinition[] = [
  {
    slug: "company-profile",
    title: "Company Profile",
    description: "NexaTech Business Solutions",
    icon: Building2,
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
  },
  {
    slug: "ecommerce",
    title: "Ecommerce",
    description: "UrbanStyle Fashion Store",
    icon: ShoppingCart,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
  },
  {
    slug: "government",
    title: "Government",
    description: "City Service Portal",
    icon: Landmark,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
  },
  {
    slug: "catalog",
    title: "Catalog",
    description: "Product Showcase Hub",
    icon: LayoutGrid,
    color: "from-purple-500 to-pink-600",
    shadow: "shadow-purple-500/20",
  },
];

export function getMockSiteBySlug(slug: string) {
  return mockSites.find((site) => site.slug === slug);
}
