import { PolicyLayout, draftPolicyMetadata } from "@/components/policy-layout";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = draftPolicyMetadata(
  "Returns",
  "Draft returns policy for Green Place Solutions Company.",
);

export default function ReturnsPage() {
  return (
    <PolicyLayout title="Returns">
      <p>
        Because orders ship from the manufacturer, a return has to follow that
        manufacturer’s process. Do not send a product back until the company
        confirms where it should go.
      </p>
      <p>
        Write to{" "}
        <a className="text-moss underline" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>{" "}
        with the order details before shipping anything. This draft does not
        set a return window, a restocking fee, or a condition standard. Those
        terms need a real policy before the store opens.
      </p>
      <p>
        An authorization that has not been captured can be canceled instead of
        refunded. Once a payment is captured, a refund is a separate step.
      </p>
    </PolicyLayout>
  );
}
