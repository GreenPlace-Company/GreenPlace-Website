import { getProductById, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export const MAX_QUANTITY = 5;
export const CART_STORAGE_KEY = "gps-cart-v1";

/** Sample freight used when any line in the cart does not include free shipping. */
export const MANUFACTURER_FREIGHT_CENTS = 14900;

export type CartLine = {
  productId: string;
  quantity: number;
};

export type ResolvedLine = {
  product: Product;
  quantity: number;
  lineTotal: number;
};

export function clampQuantity(quantity: number) {
  if (!Number.isInteger(quantity)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, quantity));
}

export function parseStoredCart(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const lines: CartLine[] = [];
    for (const entry of data) {
      if (!entry || typeof entry !== "object") continue;
      const productId =
        "productId" in entry && typeof entry.productId === "string"
          ? entry.productId
          : null;
      const quantity =
        "quantity" in entry && typeof entry.quantity === "number"
          ? entry.quantity
          : null;
      if (!productId || quantity === null || !getProductById(productId)) continue;
      if (!Number.isInteger(quantity) || quantity < 1) continue;
      lines.push({ productId, quantity: clampQuantity(quantity) });
    }
    return lines;
  } catch {
    return [];
  }
}

export function resolveCart(lines: readonly CartLine[]): ResolvedLine[] {
  const resolved: ResolvedLine[] = [];
  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product) continue;
    const quantity = clampQuantity(line.quantity);
    resolved.push({
      product,
      quantity,
      lineTotal: product.price * quantity,
    });
  }
  return resolved;
}

export function merchandiseSubtotal(lines: readonly ResolvedLine[]) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}

export function shippingCents(lines: readonly ResolvedLine[]) {
  if (lines.length === 0) return 0;
  return lines.every((line) => line.product.freeShipping)
    ? 0
    : MANUFACTURER_FREIGHT_CENTS;
}

export function formatShippingLabel(cents: number) {
  if (cents === 0) {
    return "Free shipping. Every item in this cart offers it.";
  }
  return `Manufacturer freight of ${formatPrice(cents)} applies because at least one item does not include free shipping.`;
}

export type CheckoutItem = {
  id: string;
  quantity: number;
};

export function parseCheckoutItems(input: unknown): CheckoutItem[] | null {
  if (!input || typeof input !== "object" || !("items" in input)) return null;
  const items = input.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
    return null;
  }

  const merged = new Map<string, number>();
  for (const item of items) {
    if (!item || typeof item !== "object") return null;
    const id = "id" in item && typeof item.id === "string" ? item.id : null;
    const quantity =
      "quantity" in item && typeof item.quantity === "number"
        ? item.quantity
        : null;
    if (!id || quantity === null || !Number.isInteger(quantity) || quantity < 1) {
      return null;
    }
    merged.set(id, (merged.get(id) ?? 0) + quantity);
  }

  const parsed: CheckoutItem[] = [];
  for (const [id, quantity] of merged) {
    if (quantity > MAX_QUANTITY || !getProductById(id)) return null;
    parsed.push({ id, quantity });
  }
  return parsed;
}
