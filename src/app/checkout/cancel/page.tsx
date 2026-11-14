import { Container } from "@/components/container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout canceled",
  description: "The Green Place Solutions checkout was canceled. The cart is unchanged.",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-pine sm:text-5xl">
          Checkout canceled
        </h1>
        <p className="mt-4 text-base leading-7 text-ink">
          No authorization was completed. Your cart is still in this browser,
          with the same quantities.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/cart"
            className="inline-flex h-12 items-center justify-center rounded-full bg-pine px-6 text-sm font-medium text-linen"
          >
            Return to cart
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-full border border-sand bg-paper px-6 text-sm font-medium text-pine"
          >
            Keep shopping
          </Link>
        </div>
      </div>
    </Container>
  );
}
