import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product-card";
import { SampleNotice } from "@/components/sample-notice";
import { categories, getFeaturedProducts, products } from "@/data/products";
import { COMPANY_NAME, CONTACT_EMAIL, getSiteUrl, SITE_NAME } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const trust = [
  {
    title: "Free shipping where offered",
    body: "Some sample items ship free. If any item in the cart does not, a sample manufacturer freight charge is added at checkout.",
  },
  {
    title: "Ships direct from the manufacturer",
    body: "Green Place Solutions holds no inventory. The maker packs the order and ships it to you.",
  },
  {
    title: "Secure checkout",
    body: "Card details stay with Stripe. Checkout authorizes the payment, and we capture it only after the order is approved.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY_NAME,
          url: siteUrl,
          email: CONTACT_EMAIL,
          description:
            "A Pennsylvania corporation with a mission for a greener world. The store drop-ships portable power stations, solar home-backup kits, and EV home chargers.",
          areaServed: "US",
        }}
      />
      <section className="on-dark bg-pine text-linen">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-lime uppercase">
              Pennsylvania · A greener world
            </p>
            <h1 className="mt-4 max-w-xl font-display text-5xl leading-[1.05] sm:text-6xl">
              Power a greener home.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-linen/85">
              {SITE_NAME} Company is a Pennsylvania corporation. The mission is
              a greener world, starting with the power, backup, and charging
              equipment people use at home. We drop-ship. We do not keep a
              warehouse.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center rounded-full bg-linen px-6 text-sm font-medium text-pine"
              >
                Shop the catalog
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-linen/30 px-6 text-sm font-medium text-linen"
              >
                Read the mission
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/products/sample-power-station-2000.svg"
              alt="Illustrated sample portable power station"
              width={800}
              height={800}
              priority
              unoptimized
              className="w-full rounded-[2rem] border border-white/10"
            />
            <p className="absolute right-4 bottom-4 rounded-full bg-linen px-3 py-1 text-xs font-medium text-pine">
              Sample catalog
            </p>
          </div>
        </Container>
      </section>

      <section aria-label="Why shop here" className="border-b border-sand">
        <Container className="grid gap-8 py-10 md:grid-cols-3">
          {trust.map((item) => (
            <div key={item.title}>
              <h2 className="font-display text-2xl text-pine">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl text-pine">Shop by category</h2>
            <p className="mt-3 text-muted">
              Three lines to start: portable power stations, solar home-backup
              kits, then EV home chargers.
            </p>
          </div>
          <ul className="mt-8 grid gap-5 lg:grid-cols-3">
            {categories.map((category) => {
              const image = products.find(
                (product) => product.category === category.slug && product.featured,
              )?.images[0];
              return (
                <li key={category.slug}>
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-paper"
                  >
                    {image ? (
                      <Image
                        src={image}
                        alt=""
                        width={800}
                        height={800}
                        unoptimized
                        className="aspect-[4/3] w-full object-cover"
                      />
                    ) : null}
                    <span className="flex flex-1 flex-col p-5">
                      <span className="font-display text-3xl text-pine group-hover:underline">
                        {category.name}
                      </span>
                      <span className="mt-2 text-sm leading-6 text-muted">
                        {category.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-4xl text-pine">Featured products</h2>
              <p className="mt-3 max-w-xl text-muted">
                One piece from each line, so the first version of the store has
                a face.
              </p>
            </div>
            <Link href="/shop" className="text-sm font-medium text-moss underline">
              View the full shop
            </Link>
          </div>
          <div className="mt-6">
            <SampleNotice />
          </div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-sand bg-leaf/60">
        <Container className="grid gap-6 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <h2 className="font-display text-4xl text-pine">
            Nothing sits on our shelf.
          </h2>
          <p className="text-base leading-7 text-ink">
            High-ticket gear stays with the manufacturer until you order it.
            {COMPANY_NAME} introduces the catalog. You authorize payment. After
            the order is approved, the shipment leaves their dock — and the
            card is captured.{" "}
            <Link href="/about" className="text-moss underline">
              How an order moves
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
