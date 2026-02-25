This repository is an `npm workspaces` + `Turborepo` monorepo with multiple Next.js apps in `apps/*`.

## Getting Started

Install dependencies once from the repo root:

```bash
npm install
```

Run all apps in development (via Turbo):

```bash
npm run dev
```

Or run a single app:

```bash
npm run dev --workspace @workspace/main
npm run dev --workspace @workspace/company-profile
npm run dev --workspace @workspace/catalog
npm run dev --workspace @workspace/ecommerce
npm run dev --workspace @workspace/government
```

## Apps

- `apps/main` (`@workspace/main`)
- `apps/company-profile` (`@workspace/company-profile`)
- `apps/catalog` (`@workspace/catalog`)
- `apps/ecommerce` (`@workspace/ecommerce`)
- `apps/government` (`@workspace/government`)

## Mockup Access (Single Vercel Project)

This repo supports a single Vercel project using `apps/main` as a portal + guarded mockup routes.

Local setup (`apps/main/.env.local`) example:

```env
MOCKUP_ADMIN_KEY=admin-demo-2026
MOCKUP_SESSION_SECRET=demo-session-secret-2026
MOCKUP_ADMIN_SESSION_MAX_AGE_SECONDS=43200
MOCKUP_CLIENT_SESSION_MAX_AGE_SECONDS=1209600
MOCKUP_CLIENT_SHARE_TOKENS_JSON='{"ecom-demo":{"site":"ecommerce","label":"Client Ecommerce","active":true},"catalog-demo":{"site":"catalog","label":"Client Catalog","active":true},"gov-demo":{"site":"government","label":"Client Government","active":true},"company-demo":{"site":"company-profile","label":"Client Company Profile","active":true}}'
```

Usage:

- Admin login: `/admin-access?key=admin-demo-2026`
- Client ecommerce: `/share/ecom-demo`
- Client catalog: `/share/catalog-demo`
- Client government: `/share/gov-demo`
- Client company profile: `/share/company-demo`

Notes:

- `MOCKUP_SESSION_SECRET` is used to sign session cookies.
- Client token JSON can later be extended with `expiresAt` if you need expiry.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel (Monorepo)

Important: set Vercel `Root Directory` to a specific app folder, not to `apps`.

Examples:

- `apps/main`
- `apps/company-profile`
- `apps/catalog`
- `apps/ecommerce`
- `apps/government`

Suggested Vercel settings for each project:

- Framework Preset: `Next.js`
- Root Directory: one of the app folders above
- Install Command: `npm install` (default is usually fine)
- Build Command: `npm run build` (default is usually fine)

Vercel will detect the monorepo and install workspace dependencies from the repository root (including `packages/ui` and `packages/lib`).

### Vercel Setup for Single Mockup Project (`apps/main`)

- Framework Preset: `Next.js`
- Root Directory: `apps/main`
- Install Command: `npm install`
- Build Command: `npm run build`

Add these Environment Variables in Vercel (`Production` and `Preview`):

- `MOCKUP_ADMIN_KEY`
- `MOCKUP_SESSION_SECRET`
- `MOCKUP_ADMIN_SESSION_MAX_AGE_SECONDS`
- `MOCKUP_CLIENT_SESSION_MAX_AGE_SECONDS`
- `MOCKUP_CLIENT_SHARE_TOKENS_JSON`

For `MOCKUP_CLIENT_SHARE_TOKENS_JSON` in Vercel, paste plain JSON (without outer single quotes), for example:

```json
{
  "ecom-demo": { "site": "ecommerce", "label": "Client Ecommerce", "active": true },
  "catalog-demo": { "site": "catalog", "label": "Client Catalog", "active": true },
  "gov-demo": { "site": "government", "label": "Client Government", "active": true },
  "company-demo": { "site": "company-profile", "label": "Client Company Profile", "active": true }
}
```