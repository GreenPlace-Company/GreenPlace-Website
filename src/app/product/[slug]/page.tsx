import { AddToCart } from "@/components/add-to-cart";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { Price } from "@/components/price";
import { ProductGallery } from "@/components/product-gallery";
import { SampleNotice } from "@/components/sample-notice";
import { getCategory, getProductBySlug, products } from "@/data/products";
import { getSiteUrl } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const category = getCategory(product.category);
  const siteUrl = getSiteUrl();

  return (
    <Container className="py-12 sm:py-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.shortDescription,
          image: product.images.map((image) => `${siteUrl}${image}`),
          brand: { "@type": "Brand", name: product.brand },
          sku: product.id,
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: (product.price / 100).toFixed(2),
            url: `${siteUrl}/product/${product.slug}`,
            availability: "https://schema.org/PreOrder",
          },
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/shop" className="underline">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/shop?category=${category.slug}`} className="underline">
              {category.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>
      <div className="mt-6">
        <SampleNotice />
      </div>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-moss uppercase">
            {product.brand} · {category.name}
          </p>
          <h1 className="mt-2 font-display text-4xl text-pine sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4">
            <Price
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
          </div>
          <p className="mt-4 text-base leading-7 text-ink">{product.description}</p>
          <div className="mt-6 rounded-2xl border border-sand bg-paper p-4">
            <h2 className="text-sm font-medium tracking-[0.14em] text-pine uppercase">
              Shipping
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{product.supplierNote}</p>
          </div>
          <div className="mt-6">
            <AddToCart productId={product.id} name={product.name} />
          </div>
        </div>
      </div>
      <section className="mt-14">
        <h2 className="font-display text-3xl text-pine">Specifications</h2>
        <p className="mt-2 text-sm text-muted">
          Sample figures for the layout. Do not engineer from this table.
        </p>
        <dl className="mt-6 divide-y divide-sand rounded-3xl border border-sand bg-paper">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="text-sm font-medium text-pine">{spec.label}</dt>
              <dd className="text-sm text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </Container>
  );
}
