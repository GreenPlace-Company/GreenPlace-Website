import { Container } from "@/components/container";
import { SampleNotice } from "@/components/sample-notice";
import { ShopCatalog } from "@/components/shop-catalog";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop sample portable power stations, solar home-backup kits, and EV home chargers from Green Place Solutions.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const category = (await searchParams).category;
  return (
    <Container className="py-12 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl text-pine sm:text-5xl">Shop</h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Portable power stations, solar home-backup kits, and EV home chargers.
          Filter by category. Every item currently on this page is a sample.
        </p>
      </div>
      <div className="mt-6">
        <SampleNotice />
      </div>
      <div className="mt-8">
        <ShopCatalog category={category} />
      </div>
    </Container>
  );
}
