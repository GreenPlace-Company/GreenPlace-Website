# Cloud Run

This store can run as a container on the shared Cloud Run platform (`orbitem-platform`, `us-central1`) without changing the Vercel deployment. Vercel sets `VERCEL=1` during its build and keeps the default Next.js output. Every other build, including the image build, uses `output: "standalone"`.

The image does not include a database. The catalog is `src/data/products.ts`. The cart stays in the browser under `localStorage` key `gps-cart-v1`.

Keep the image entrypoint. It forces the listen address to `0.0.0.0` because Docker and Cloud Run set `HOSTNAME` to the instance name, and the standalone server would otherwise bind to that name.

Do not put secret values in this file, in build args, or in the image.

## What the container runs

The Dockerfile is a multi-stage build. The final stage copies the standalone server, `public`, and `.next/static`, then drops to the non-root `node` user. The entrypoint listens on `0.0.0.0` and `$PORT` (default `8080`). Cloud Run sets `PORT` and sends traffic there.

`GET /api/health` returns `200` and `{"status":"ok"}`. It does not call Stripe. Use it as the Cloud Run startup probe and, if you configure one, the liveness probe.

## Runtime environment

Set these on the Cloud Run service. Secret Manager is the right place for the Stripe keys. None of them are required for the process to boot.

| Name | Visibility | When it is read | If it is missing |
| --- | --- | --- | --- |
| `STRIPE_SECRET_KEY` | Secret | Request time, server only. Never pass it as a build arg. | Checkout stays off. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Public | Request time, server only. The name is historical: the browser does not embed it. Stripe Checkout collects the card. | Checkout stays off. |
| `NEXT_PUBLIC_SITE_URL` | Public | Request time for Stripe return URLs (`/checkout/success` and `/checkout/cancel`). | Those URLs fall back to `http://localhost:3000`. |
| `PORT` | Set by Cloud Run | Process start. Default in the image is `8080`. | The image default is `8080`. |

Checkout is on only when both Stripe keys are non-empty. Otherwise the checkout page shows **Checkout is not yet enabled**, the cart still works, and `POST /api/checkout` returns `503` with `{"error":"checkout_not_enabled","message":"Checkout is not yet enabled."}`. The home page, catalog, and `/api/health` keep working.

`NEXT_PUBLIC_SITE_URL` is also read at **image build** time for prerendered metadata, the sitemap, and JSON-LD. Pass the public origin as a build arg when those URLs should match production, and set the same value at runtime so Stripe sends shoppers back to that origin. It is not a secret. A direct `process.env.NEXT_PUBLIC_*` reference would be frozen for the whole server; return URLs use a runtime lookup instead.

## Example build and deploy

Replace `REPOSITORY` and `TAG`. This is an example. It does not deploy this repo, and it does not change DNS.

```bash
# Local check. No Stripe keys: the site serves, checkout stays disabled.
docker build -t green-place-solutions .
docker run --rm -p 8080:8080 -e PORT=8080 green-place-solutions

# Public origin for prerendered URLs, then Artifact Registry via Cloud Build.
gcloud builds submit \
  --project=orbitem-platform \
  --region=us-central1 \
  --tag=us-central1-docker.pkg.dev/orbitem-platform/REPOSITORY/green-place-solutions:TAG \
  .

# The --tag form does not take Docker build args. To bake the public site
# origin into prerendered pages, submit a config that runs the same Dockerfile:
gcloud builds submit \
  --project=orbitem-platform \
  --region=us-central1 \
  --substitutions=_IMAGE=us-central1-docker.pkg.dev/orbitem-platform/REPOSITORY/green-place-solutions:TAG,_SITE_URL=https://greenplacesolutions.com \
  --config=- \
  <<'EOF'
steps:
  - name: gcr.io/cloud-builders/docker
    args:
      - build
      - --build-arg
      - NEXT_PUBLIC_SITE_URL=${_SITE_URL}
      - -t
      - ${_IMAGE}
      - .
images:
  - ${_IMAGE}
EOF

# Runtime env comes from the service, not the image. Map your own Secret
# Manager secret names; the values below are names, not keys.
gcloud run deploy green-place-solutions \
  --project=orbitem-platform \
  --region=us-central1 \
  --image=us-central1-docker.pkg.dev/orbitem-platform/REPOSITORY/green-place-solutions:TAG \
  --port=8080 \
  --startup-probe=httpGet.path=/api/health,httpGet.port=8080,timeoutSeconds=5,periodSeconds=10,failureThreshold=3 \
  --set-env-vars=NEXT_PUBLIC_SITE_URL=https://greenplacesolutions.com \
  --set-secrets=STRIPE_SECRET_KEY=stripe-secret-key:latest,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=stripe-publishable-key:latest
```

Leave the service's ingress and invoker settings to the platform. This example does not grant public access and does not attach a domain.
