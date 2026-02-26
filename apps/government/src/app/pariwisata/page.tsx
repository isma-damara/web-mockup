import GovNav from "../components/GovNav";
import { BackToTop, GovFooter } from "../components/GovSections";
import { Breadcrumbs, ContentWrap, PageHero } from "../components/GovPrimitives";
import { getGovContent } from "../data/getGovContent";
import PariwisataClient from "./pariwisata-client";

export default async function PariwisataPage() {
  const { wisataSpots } = await getGovContent();
  return (
    <div className="min-h-screen bg-[var(--gov-cream)] text-[var(--gov-text)]">
      <GovNav />
      <Breadcrumbs items={[{ label: "Beranda", href: "/" }, { label: "Pariwisata" }]} />
      <PageHero
        badge="🌴 Pariwisata"
        title="Wisata Kota Contoh"
        description="Temukan keindahan alam, budaya, dan kuliner terbaik di Kota Contoh."
        className="bg-gradient-to-br from-[#0c4a6e] via-[#164e63] to-[#065f46]"
        badgeClassName="border-[rgba(16,185,129,0.4)] bg-[rgba(16,185,129,0.2)] text-[#6EE7B7]"
      />
      <ContentWrap>
        <PariwisataClient
          wisataSpots={wisataSpots}
          pariwisataCategories={["Semua", "Alam", "Budaya", "Kuliner", "Sejarah", "Belanja", "Hiburan"]}
        />
      </ContentWrap>
      <GovFooter />
      <BackToTop />
    </div>
  );
}
