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
