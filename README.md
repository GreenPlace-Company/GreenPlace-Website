# Green Place Solutions

Online store for **Green Place Solutions Company**, a Pennsylvania corporation. The mission is a greener world. The store drop-ships high-ticket green products and holds no inventory.

The first catalog lines are portable power stations, solar home-backup kits, and EV home chargers.

This version ships with clearly labeled **sample** products so the pages, cart, and checkout can be reviewed. Replace them before taking real orders. There is no Shopify.

## Run locally

Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

The app uses the Next.js App Router, TypeScript, and Tailwind CSS. Marketing pages are prerendered. Checkout uses one server route, so the app is ready for Vercel. It is not a fully static export.

## Environment variables

Copy `.env.example` to `.env.local`. Do not commit real keys.

| Variable | Where it is used |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server only. Creates the Stripe Checkout Session. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser. Checkout stays disabled until this is set. |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for Stripe return URLs, the sitemap, and Open Graph. Example: `http://localhost:3000`. |

If either Stripe key is missing, the checkout page shows **Checkout is not yet enabled** and the API returns the same message. The cart still works.

## Add or replace products

Edit [`src/data/products.ts`](src/data/products.ts).

1. Delete the sample entries. Every sample name starts with “Sample”, `sample` is `true`, and the drawings live in `public/products/`.
2. Add a `Product`. `id` and `slug` must be unique. `price` and `compareAtPrice` are integer US cents (`189900` is $1,899.00).
3. Put your own images in `public/products/` and list their public paths in `images`. Do not use a real brand name, logo, or copyrighted image unless you have the rights.
4. Set `freeShipping` when that product ships free. A cart ships free only when every line does. Otherwise checkout adds a sample manufacturer freight charge of $149.
5. Set `featured` to show the product on the home page. Set `sample` to `false` for a live product. The sample notice hides itself once no product is marked as a sample.

The server prices the cart. The browser only sends product ids and quantities.

## Order flow (manual capture)

Checkout creates a Stripe Checkout Session with `payment_intent_data.capture_method` set to `'manual'`.

1. The shopper authorizes the card on Stripe. Funds are held, not captured.
2. The order waits for the owner to approve it.
3. After approval, capture the PaymentIntent in the Stripe Dashboard (or a future admin tool). To decline the order, cancel the PaymentIntent instead.
4. **Stripe card authorizations expire after about 7 days.** Approve (capture) or cancel inside that window. If the hold expires, the customer is not charged and has to check out again.

Card numbers are entered on Stripe, not on this site. The cart itself stays in `localStorage` under the key `gps-cart-v1` and is cleared when the shopper returns to the success page with a Checkout Session id.

## Pages

Home, shop (with category filters), product detail, cart, checkout, success, cancel, about, contact (`ceo@greenplacesolutions.com`, mailto only), and draft Shipping, Returns, Privacy, and Terms pages. The drafts are marked on the page, left out of the sitemap, and set to `noindex` until they are reviewed.
