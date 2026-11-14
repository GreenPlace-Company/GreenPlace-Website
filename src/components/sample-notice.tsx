import { catalogIsSampleOnly, products } from "@/data/products";

export function SampleNotice() {
  if (products.length === 0) return null;

  const message = catalogIsSampleOnly()
    ? "Sample catalog. Every product here is a placeholder for layout and checkout. Replace the entries in the product file before opening the store."
    : "Some products are still samples. Anything named Sample is a placeholder, not a live product.";

  return (
    <p
      role="note"
      className="rounded-2xl border border-sand bg-paper px-4 py-3 text-sm leading-6 text-muted"
    >
      {message}
    </p>
  );
}
