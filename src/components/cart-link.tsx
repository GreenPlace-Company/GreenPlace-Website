"use client";

import { useCart } from "@/components/cart-provider";
import Link from "next/link";

export function CartLink() {
  const { count } = useCart();
  const label = `Cart, ${count} ${count === 1 ? "item" : "items"}`;

  return (
    <Link
      href="/cart"
      aria-label={label}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-sand bg-paper px-3 text-sm font-medium text-pine"
    >
      <CartIcon />
      <span className="hidden sm:inline">Cart</span>
      {count > 0 ? (
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-pine px-1.5 text-xs text-linen">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M3 4h1.4l1.2 7.2a1.5 1.5 0 0 0 1.5 1.3h5.7a1.5 1.5 0 0 0 1.5-1.2L15.6 6H5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7.2" cy="15" r="0.9" fill="currentColor" />
      <circle cx="13" cy="15" r="0.9" fill="currentColor" />
    </svg>
  );
}
