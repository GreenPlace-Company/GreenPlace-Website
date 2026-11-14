import { PolicyLayout, draftPolicyMetadata } from "@/components/policy-layout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = draftPolicyMetadata(
  "Shipping",
  "Draft shipping policy for Green Place Solutions Company.",
);

export default function ShippingPage() {
  return (
    <PolicyLayout title="Shipping">
      <p>
        Green Place Solutions Company does not hold inventory. Orders ship
        direct from the manufacturer to the address collected at checkout.
      </p>
      <p>
        Free shipping is offered only on products that say so. If a cart
        includes any item without free shipping, a sample manufacturer freight
        charge is added on the Stripe checkout page. That charge is a
        placeholder amount until real carrier rates replace it.
      </p>
      <p>
        Transit time depends on the manufacturer. The checkout estimate of 5 to
        15 business days is a sample window, not a guarantee.
      </p>
      <p>
        Questions about a shipment:{" "}
        <a className="text-moss underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </PolicyLayout>
  );
}
