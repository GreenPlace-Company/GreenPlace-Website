import { getCategory, type Product } from "@/data/products";
import { Price } from "@/components/price";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  return (
    <article className="h-full">
      <Link
        href={`/product/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-paper shadow-sm transition-transform hover:-translate-y-0.5"
      >
        <div className="relative">
          <Image
            src={product.images[0]}
            alt=""
            width={800}
            height={800}
            unoptimized
            className="aspect-square w-full bg-sand object-cover"
          />
          {product.sample ? (
            <span className="absolute top-3 left-3 rounded-full bg-paper/95 px-2.5 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-pine uppercase">
              Sample
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-xs font-medium tracking-[0.14em] text-moss uppercase">
            {category.name}
          </p>
          <h3 className="font-display text-2xl leading-tight text-pine group-hover:underline">
            {product.name}
          </h3>
          <p className="text-sm leading-6 text-muted">{product.shortDescription}</p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <Price price={product.price} compareAtPrice={product.compareAtPrice} />
            <span className="pb-1 text-xs text-muted">
              {product.freeShipping ? "Free shipping" : "Freight may apply"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
