import { Suspense } from "react";
import CatalogPageClient from "./CatalogPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-rose-50/30" />}>
      <CatalogPageClient />
    </Suspense>
  );
}
