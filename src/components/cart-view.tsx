"use client";

import { useCart } from "@/components/cart-provider";
import {
  MAX_QUANTITY,
  formatShippingLabel,
  merchandiseSubtotal,
  resolveCart,
  shippingCents,
} from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

export function CartView() {
  const { lines, setQuantity, removeItem } = useCart();
  const resolved = resolveCart(lines);
  const subtotal = merchandiseSubtotal(resolved);
  const freight = shippingCents(resolved);

  if (resolved.length === 0) {
    return (
      <div className="rounded-3xl border border-sand bg-paper px-6 py-12 text-center">
        <h2 className="font-display text-3xl text-pine">Your cart is empty</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Add a sample product to see quantities, removal, and the subtotal.
          The cart stays in this browser.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-pine px-6 text-sm font-medium text-linen"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <ul className="space-y-4">
        {resolved.map((line) => {
          const inputId = `cart-qty-${line.product.id}`;
          return (
            <li
              key={line.product.id}
              className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 rounded-3xl border border-sand bg-paper p-4 sm:grid-cols-[7.5rem_minmax(0,1fr)_auto]"
            >
              <Image
                src={line.product.images[0]}
                alt=""
                width={160}
                height={160}
                unoptimized
                className="aspect-square w-full rounded-2xl bg-sand object-cover"
              />
              <div>
                <p className="text-xs font-medium tracking-[0.14em] text-moss uppercase">
                  {line.product.brand}
                </p>
                <h2 className="mt-1 font-display text-2xl text-pine">
                  <Link href={`/product/${line.product.slug}`} className="hover:underline">
                    {line.product.name}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {line.product.freeShipping
                    ? "Free shipping on this item"
                    : "Manufacturer freight may apply"}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div>
                    <label htmlFor={inputId} className="sr-only">
                      Quantity for {line.product.name}
                    </label>
                    <input
                      id={inputId}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={MAX_QUANTITY}
                      value={line.quantity}
                      onChange={(event) => {
                        const next = Number(event.target.value);
                        if (!Number.isInteger(next)) return;
                        setQuantity(line.product.id, next);
                      }}
                      className="h-11 w-20 rounded-2xl border border-sand bg-linen px-3"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.product.id)}
                    className="inline-flex h-11 items-center rounded-full px-3 text-sm text-clay underline-offset-4 hover:underline"
                  >
                    Remove <span className="sr-only"> {line.product.name}</span>
                  </button>
                </div>
              </div>
              <p className="col-span-2 text-right text-lg font-medium text-pine sm:col-span-1 sm:self-start">
                <span className="sr-only">Line total </span>
                {formatPrice(line.lineTotal)}
              </p>
            </li>
          );
        })}
      </ul>
      <aside className="h-fit rounded-3xl border border-sand bg-paper p-6">
        <h2 className="font-display text-2xl text-pine">Summary</h2>
        <p className="mt-4 flex items-baseline justify-between gap-4" aria-live="polite">
          <span>Subtotal</span>
          <span className="text-xl font-medium text-pine">{formatPrice(subtotal)}</span>
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">
          {formatShippingLabel(freight)} Shipping is confirmed on the secure
          checkout page and is not included in the subtotal.
        </p>
        <Link
          href="/checkout"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-pine text-sm font-medium text-linen"
        >
          Continue to checkout
        </Link>
        <p className="mt-4 text-xs leading-5 text-muted">
          Checkout authorizes the card. Payment is captured only after the
          order is approved.
        </p>
      </aside>
    </div>
  );
}
