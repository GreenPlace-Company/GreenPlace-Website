# Next.js 16 needs Node 20.9+. Alpine keeps the runtime image small.
# sharp (image optimization) ships musl builds; libc6-compat is the
# pairing the Next.js Alpine images use.
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public origin baked into prerendered metadata, sitemap, and JSON-LD.
# Not a secret. Omit it and those static URLs fall back to localhost.
# Stripe return URLs use the runtime value instead. Do not pass
# STRIPE_SECRET_KEY here; it would be recoverable from the image.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --chown=node:node docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod 755 /app/docker-entrypoint.sh \
    && mkdir -p /app/.next \
    && chown -R node:node /app

USER node
EXPOSE 8080
ENTRYPOINT ["/app/docker-entrypoint.sh"]
