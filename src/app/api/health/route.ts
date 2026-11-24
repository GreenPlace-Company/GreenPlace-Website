/**
 * Cloud Run startup and liveness probe. It does not check Stripe or any
 * other dependency: a missing key must not fail the probe.
 */
export function GET() {
  return Response.json(
    { status: "ok" },
    {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
