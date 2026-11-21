import { CheckoutForm } from "@/components/checkout-form";
import { Container } from "@/components/container";
import { AUTHORIZATION_NOTE, CONTACT_EMAIL } from "@/lib/site";
import { isCheckoutConfigured } from "@/lib/stripe";
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Authorize payment for a Green Place Solutions order. The card is captured only after the order is approved.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-pine sm:text-5xl">Checkout</h1>
      <Suspense fallback={<p className="mt-3 text-muted">Loading checkout…</p>}>
        <CheckoutBody />
      </Suspense>
    </Container>
  );
}

async function CheckoutBody() {
  // Stripe keys arrive at process start. Wait for the request so the
  // prerendered shell does not freeze "not enabled" from build time.
  await connection();
  const configured = isCheckoutConfigured();
  return (
    <>
      {configured ? (
        <p className="mt-3 max-w-2xl text-muted">{AUTHORIZATION_NOTE}</p>
      ) : (
        <div
          role="status"
          className="mt-6 max-w-2xl rounded-3xl border border-sand bg-paper p-6"
        >
          <h2 className="font-display text-3xl text-pine">Checkout is not yet enabled.</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Payments turn on when Stripe keys are added. You can keep a cart in
            this browser, or email{" "}
            <a className="text-pine underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      )}
      <div className="mt-8">
        <CheckoutForm configured={configured} />
      </div>
    </>
  );
}
