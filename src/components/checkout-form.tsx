"use client";

import { useCart } from "@/components/cart-provider";
import {
  formatShippingLabel,
  merchandiseSubtotal,
  resolveCart,
  shippingCents,
} from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { AUTHORIZATION_NOTE } from "@/lib/site";
import Link from "next/link";
import { useState } from "react";

const NOT_ENABLED = "Checkout is not yet enabled.";

export function CheckoutForm({ configured }: { configured: boolean }) {
  // The server reads both Stripe keys at request time. Checkout redirects to
  // Stripe, so the publishable key is not loaded in the browser.
  const enabled = configured;
  const { lines } = useCart();
  const resolved = resolveCart(lines);
  const subtotal = merchandiseSubtotal(resolved);
  const freight = shippingCents(resolved);
  const [message, setMessage] = useState<string | null>(
    enabled ? null : NOT_ENABLED,
  );
  const [pending, setPending] = useState(false);

  if (resolved.length === 0) {
    return (
      <div className="rounded-3xl border border-sand bg-paper px-6 py-12">
        <h2 className="font-display text-3xl text-pine">Nothing to check out</h2>
        <p className="mt-3 text-muted">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-12 items-center rounded-full bg-pine px-6 text-sm font-medium text-linen"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) {
      setMessage(NOT_ENABLED);
      return;
    }
    setPending(true);
    setMessage(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: resolved.map((line) => ({
            id: line.product.id,
            quantity: line.quantity,
          })),
        }),
      });
      const data: unknown = await response.json().catch(() => null);
      const payload =
        data && typeof data === "object"
          ? (data as { url?: unknown; message?: unknown; error?: unknown })
          : {};
      if (payload.error === "checkout_not_enabled") {
        setMessage(NOT_ENABLED);
        return;
      }
      if (!response.ok || typeof payload.url !== "string") {
        setMessage(
          typeof payload.message === "string"
            ? payload.message
            : "Checkout could not be started. Please try again in a moment.",
        );
        return;
      }
      window.location.assign(payload.url);
    } catch {
      setMessage("Checkout could not be started. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-4">
        {enabled ? (
          <div className="rounded-3xl border border-sand bg-paper p-6">
            <h2 className="font-display text-3xl text-pine">Authorize with Stripe</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              You will authorize the card on Stripe. Green Place Solutions
              captures the payment only after the order is approved.{" "}
              {AUTHORIZATION_NOTE}
            </p>
          </div>
        ) : null}
        <ul className="divide-y divide-sand rounded-3xl border border-sand bg-paper">
          {resolved.map((line) => (
            <li key={line.product.id} className="flex items-start justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium text-pine">{line.product.name}</p>
                <p className="text-sm text-muted">Quantity {line.quantity}</p>
              </div>
              <p className="font-medium">{formatPrice(line.lineTotal)}</p>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit rounded-3xl border border-sand bg-paper p-6">
        <h2 className="font-display text-2xl text-pine">Order</h2>
        <p className="mt-4 flex justify-between gap-4">
          <span>Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </p>
        <p className="mt-3 text-sm leading-6 text-muted">{formatShippingLabel(freight)}</p>
        {enabled ? (
          <button
            type="submit"
            disabled={pending}
            className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-pine text-sm font-medium text-linen disabled:opacity-60"
          >
            {pending ? "Starting checkout…" : "Continue to secure checkout"}
          </button>
        ) : null}
        {message && enabled ? (
          <p role="alert" className="mt-4 text-sm text-clay">
            {message}
          </p>
        ) : null}
        <p className="mt-4 text-xs leading-5 text-muted">
          Card numbers are entered on Stripe, not on this site.
        </p>
      </aside>
    </form>
  );
}
