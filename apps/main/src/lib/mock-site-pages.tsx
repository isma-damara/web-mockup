import type { ReactNode } from "react";
import CatalogPage from "@mock-sites/catalog";
import CompanyProfilePage from "@mock-sites/company-profile";
import EcommercePage from "@mock-sites/ecommerce";
import GovernmentPage from "@mock-sites/government";

export function renderMockSitePage(slug: string): ReactNode {
  switch (slug) {
    case "company-profile":
      return <CompanyProfilePage />;
    case "ecommerce":
      return <EcommercePage />;
    case "government":
      return <GovernmentPage />;
    case "catalog":
      return <CatalogPage />;
    default:
      return null;
  }
}
