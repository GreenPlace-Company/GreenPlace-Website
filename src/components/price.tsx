import { formatPrice } from "@/lib/format";

export function Price({
  price,
  compareAtPrice,
  size = "md",
}: {
  price: number;
  compareAtPrice?: number;
  size?: "md" | "lg";
}) {
  const showCompare = compareAtPrice !== undefined && compareAtPrice > price;
  return (
    <p className={size === "lg" ? "text-3xl" : "text-lg"}>
      <span className="sr-only">Price </span>
      <span className="font-medium text-pine">{formatPrice(price)}</span>
      {showCompare ? (
        <>
          <span className="sr-only">, regular price </span>
          <s className="ml-2 text-base font-normal text-muted">
            {formatPrice(compareAtPrice)}
          </s>
        </>
      ) : null}
    </p>
  );
}
