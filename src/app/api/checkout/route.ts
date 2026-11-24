import { parseCheckoutItems, resolveCart, shippingCents } from "@/lib/cart";
import { getRuntimeSiteUrl } from "@/lib/site";
import { getStripe, isCheckoutConfigured } from "@/lib/stripe";
import { NextResponse } from "next/server";

const NOT_ENABLED = "Checkout is not yet enabled.";

/**
 * Creates a Stripe Checkout Session that only authorizes the card.
 *
 * payment_intent_data.capture_method is "manual": Stripe places a hold and
 * does not capture funds. The owner approves the order later by capturing
 * the PaymentIntent, or cancels it.
 *
 * Stripe card authorizations expire after about 7 days. Approve (capture)
 * or cancel within that window, or the hold drops and the shopper must
 * check out again.
 */
export async function POST(request: Request) {
  if (!isCheckoutConfigured()) {
    return NextResponse.json(
      { error: "checkout_not_enabled", message: NOT_ENABLED },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "The cart could not be read." },
      { status: 400 },
    );
  }

  const items = parseCheckoutItems(body);
  if (!items) {
    return NextResponse.json(
      { error: "invalid_cart", message: "The cart is empty or invalid." },
      { status: 400 },
    );
  }

  const resolved = resolveCart(
    items.map((item) => ({ productId: item.id, quantity: item.quantity })),
  );
  if (resolved.length !== items.length) {
    return NextResponse.json(
      { error: "invalid_cart", message: "A product in the cart is no longer available." },
      { status: 400 },
    );
  }

  const freight = shippingCents(resolved);
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "checkout_not_enabled", message: NOT_ENABLED },
      { status: 503 },
    );
  }

  const siteUrl = getRuntimeSiteUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      billing_address_collection: "required",
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      line_items: resolved.map((line) => ({
        quantity: line.quantity,
        price_data: {
          currency: "usd",
          unit_amount: line.product.price,
          product_data: {
            name: line.product.name,
            description: line.product.shortDescription,
            metadata: {
              product_id: line.product.id,
              sample: line.product.sample ? "true" : "false",
            },
          },
        },
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name:
              freight === 0
                ? "Free shipping, direct from the manufacturer"
                : "Manufacturer freight, ships direct",
            fixed_amount: { amount: freight, currency: "usd" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 15 },
            },
          },
        },
      ],
      metadata: {
        source: "green-place-solutions",
        capture_method: "manual",
      },
      custom_text: {
        submit: {
          message:
            "This authorizes your card. Green Place Solutions captures payment only after approving the order. Card authorizations expire after about 7 days.",
        },
      },
      payment_intent_data: {
        capture_method: "manual",
        description:
          "Green Place Solutions order — authorize only, capture after approval",
        metadata: {
          capture_method: "manual",
          approval_window: "about 7 days",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        {
          error: "checkout_failed",
          message: "Checkout could not be started. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout session was not created", errorName(error));
    return NextResponse.json(
      {
        error: "checkout_failed",
        message: "Checkout could not be started. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}

function errorName(error: unknown) {
  if (error instanceof Error) return error.name;
  return "UnknownError";
}
