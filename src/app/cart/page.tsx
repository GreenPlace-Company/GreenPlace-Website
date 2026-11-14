import { CartView } from "@/components/cart-view";
import { Container } from "@/components/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the Green Place Solutions cart saved in this browser.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl text-pine sm:text-5xl">Cart</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Quantities and removals stay in this browser. The subtotal uses catalog
        prices. Shipping is added on the secure checkout page.
      </p>
      <div className="mt-8">
        <CartView />
      </div>
    </Container>
  );
}
