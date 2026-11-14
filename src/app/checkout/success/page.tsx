import { ClearCart } from "@/components/clear-cart";
import { Container } from "@/components/container";
import { AUTHORIZATION_NOTE, CONTACT_EMAIL } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { getStripe } from "@/lib/stripe";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Order authorized",
  description: "Your Green Place Solutions card authorization is recorded.",
  robots: { index: false, follow: false },
};

export default function SuccessPage({
  searchParams,
}: PageProps<"/checkout/success">) {
  return (
    <Container className="py-12 sm:py-16">
      <Suspense fallback={<p role="status">Confirming your authorization.</p>}>
        <SuccessDetails searchParams={searchParams} />
      </Suspense>
    </Container>
  );
}

async function SuccessDetails({
  searchParams,
}: {
  searchParams: PageProps<"/checkout/success">["searchParams"];
}) {
  const params = await searchParams;
  const sessionId = readParam(params.session_id);
  const summary = sessionId ? await readAuthorization(sessionId) : null;

  return (
    <div className="mx-auto max-w-2xl">
      <ClearCart sessionId={sessionId} />
      <p className="text-xs font-medium tracking-[0.16em] text-moss uppercase">
        Checkout
      </p>
      <h1 className="mt-2 font-display text-4xl text-pine sm:text-5xl">
        {summary?.heading ?? "Authorization received"}
      </h1>
      <p className="mt-4 text-base leading-7 text-ink">
        {summary?.body ??
          "If Stripe confirmed the session, your card was authorized, not captured. We review the order and then capture the payment or cancel the hold."}
      </p>
      {summary?.amountLabel ? (
        <p className="mt-4 text-lg font-medium text-pine">
          Authorized amount {summary.amountLabel}
        </p>
      ) : null}
      <p className="mt-4 text-sm leading-6 text-muted">{AUTHORIZATION_NOTE}</p>
      <p className="mt-4 text-sm leading-6 text-muted">
        Questions about an order go to{" "}
        <a className="text-pine underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-pine px-6 text-sm font-medium text-linen"
      >
        Back to the shop
      </Link>
    </div>
  );
}

function readParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !raw.startsWith("cs_")) return undefined;
  return raw;
}

async function readAuthorization(sessionId: string) {
  const stripe = getStripe();
  if (!stripe) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });
    const intent = session.payment_intent;
    const status = intent && typeof intent !== "string" ? intent.status : null;
    const amount =
      typeof session.amount_total === "number"
        ? formatPrice(session.amount_total)
        : null;

    if (status === "requires_capture") {
      return {
        heading: "Card authorized",
        body: "Your card was authorized. Green Place Solutions will review the order and capture the payment, or cancel the authorization, within the hold window.",
        amountLabel: amount,
      };
    }
    if (status === "succeeded") {
      return {
        heading: "Payment captured",
        body: "Stripe already captured this payment. No further approval step is waiting.",
        amountLabel: amount,
      };
    }
    if (status === "canceled") {
      return {
        heading: "Authorization canceled",
        body: "This authorization was canceled, so the card was not charged.",
        amountLabel: null,
      };
    }
    return {
      heading: "Returned from checkout",
      body: "We found the checkout session. If the card was authorized, capture still waits on approval.",
      amountLabel: amount,
    };
  } catch {
    return null;
  }
}
