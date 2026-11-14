import { ProductCard } from "@/components/product-card";
import {
  categories,
  isCategorySlug,
  products,
  type CategorySlug,
} from "@/data/products";
import Link from "next/link";

function readCategory(
  value: string | string[] | undefined,
): CategorySlug | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !isCategorySlug(raw)) return undefined;
  return raw;
}

export function ShopCatalog({
  category: categoryParam,
}: {
  category?: string | string[];
}) {
  const category = readCategory(categoryParam);
  const visible = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <>
      <CategoryFilters active={category} />
      <p className="mt-6 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "product" : "products"}
      </p>
      <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </>
  );
}

function CategoryFilters({ active }: { active?: CategorySlug }) {
  const filters = [
    { href: "/shop", label: "All", slug: undefined },
    ...categories.map((category) => ({
      href: `/shop?category=${category.slug}`,
      label: category.name,
      slug: category.slug,
    })),
  ];

  return (
    <nav aria-label="Product categories">
      <ul className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((filter) => {
          const selected = filter.slug === active;
          return (
            <li key={filter.label}>
              <Link
                href={filter.href}
                aria-current={selected ? "page" : undefined}
                className={`inline-flex h-11 items-center rounded-full px-4 text-sm whitespace-nowrap ${
                  selected
                    ? "bg-pine text-linen"
                    : "border border-sand bg-paper text-ink hover:border-pine"
                }`}
              >
                {filter.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
