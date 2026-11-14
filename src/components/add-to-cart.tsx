"use client";

import { useCart } from "@/components/cart-provider";
import { MAX_QUANTITY } from "@/lib/cart";
import Link from "next/link";
import { useState } from "react";

export function AddToCart({
  productId,
  name,
}: {
  productId: string;
  name: string;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const inputId = `qty-${productId}`;

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        addItem(productId, quantity);
        setAdded(true);
      }}
    >
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor={inputId} className="block text-sm font-medium text-ink">
            Quantity
          </label>
          <input
            id={inputId}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_QUANTITY}
            value={quantity}
            onChange={(event) => {
              const next = Number(event.target.value);
              if (!Number.isInteger(next)) return;
              setQuantity(Math.min(MAX_QUANTITY, Math.max(1, next)));
              setAdded(false);
            }}
            className="mt-1 h-12 w-24 rounded-2xl border border-sand bg-paper px-3 text-base"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-full bg-pine px-6 text-sm font-medium text-linen"
        >
          Add to cart
        </button>
      </div>
      <p className="text-xs text-muted">Up to {MAX_QUANTITY} of each sample item.</p>
      {added ? (
        <p role="status" className="text-sm text-moss">
          Added {name} to your cart.{" "}
          <Link href="/cart" className="underline">
            View cart
          </Link>
        </p>
      ) : null}
    </form>
  );
}
