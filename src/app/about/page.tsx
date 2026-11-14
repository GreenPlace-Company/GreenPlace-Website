import { Container } from "@/components/container";
import { AUTHORIZATION_NOTE, COMPANY_NAME, CONTACT_EMAIL } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Green Place Solutions Company is a Pennsylvania corporation. The mission is a greener world, and the store drop-ships without holding inventory.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.16em] text-moss uppercase">
          Pennsylvania corporation
        </p>
        <h1 className="mt-2 font-display text-4xl text-pine sm:text-5xl">
          A greener world, ordered direct.
        </h1>
        <div className="mt-8 space-y-5 text-base leading-7 text-ink">
          <p>
            {COMPANY_NAME} exists for a greener world. The first store lines are
            the equipment that changes how a home uses energy: portable power
            stations, solar home-backup kits, and EV home chargers.
          </p>
          <p>
            The company holds no inventory. A product page is an introduction.
            When an order is approved, the manufacturer ships it. That is the
            whole warehouse plan: there is not one.
          </p>
          <h2 className="pt-4 font-display text-3xl text-pine">How an order moves</h2>
          <ol className="list-decimal space-y-3 pl-5">
            <li>You build a cart in this browser. Prices come from the catalog, not from the cart itself.</li>
            <li>Checkout sends you to Stripe, where the card is authorized and not captured.</li>
            <li>The owner reviews the order and either captures the payment or cancels the hold.</li>
            <li>The manufacturer ships. {AUTHORIZATION_NOTE}</li>
          </ol>
          <h2 className="pt-4 font-display text-3xl text-pine">What is on the site today</h2>
          <p>
            The products are samples. Names start with “Sample,” the drawings
            are original placeholders, and the spec tables are figures for the
            layout. Replace them in the product file before taking a real order.
            The draft policies in the footer are waiting on the same review.
          </p>
          <p>
            Write to{" "}
            <a className="text-moss underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            or read the{" "}
            <Link href="/contact" className="text-moss underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </article>
    </Container>
  );
}
