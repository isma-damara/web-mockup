# Web Mockup Monorepo

![Next.js](https://img.shields.io/badge/Next.js-16.x-black)
![Turborepo](https://img.shields.io/badge/Turborepo-2.x-black)
![Node](https://img.shields.io/badge/Node-%3E%3D18-339933)
![License](https://img.shields.io/badge/License-Private-lightgrey)

Monorepo **Next.js + Turborepo** untuk kumpulan mockup website. Fokus utama saat ini ada di **e-commerce** dengan alur cart, checkout, dan help center yang lengkap.

---

## Daftar Isi

- [Ringkasan](#ringkasan)
- [Struktur Apps](#struktur-apps)
- [Tech Stack](#tech-stack)
- [Preview](#preview)
- [Quick Start](#quick-start)
- [URL Lokal](#url-lokal-default)
- [Fitur E-commerce](#fitur-e-commerce-highlight)
- [Routing E-commerce](#routing-e-commerce)
- [Help Center](#help-center)
- [Scripts Utama](#script-utama)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Deploy (Vercel)](#deploy-vercel)
- [Kontribusi](#kontribusi)
- [Catatan Konten & Layout](#catatan-konten--layout)

---

## Ringkasan

- **Apps** di `apps/*` (Next.js App Router)
- **Shared packages** di `packages/*`
- **Turborepo** untuk orkestrasi dev/build

## Struktur Apps

- `apps/main` (`@workspace/main`) - portal / landing
- `apps/company-profile` (`@workspace/company-profile`)
- `apps/catalog` (`@workspace/catalog`)
- `apps/ecommerce` (`@workspace/ecommerce`) - fokus utama
- `apps/government` (`@workspace/government`)

## Tech Stack

- **Next.js** (App Router)
- **Turborepo** (task runner)
- **Tailwind CSS** (styling)
- **Lucide Icons**

## Preview

> Tambahkan screenshot di folder `docs/` (contoh: `docs/preview-ecommerce.png`).

```
/docs/preview-ecommerce.png
/docs/preview-portal.png
```

Contoh penggunaan di README:

```md
![E-commerce Preview](docs/preview-ecommerce.png)
![Portal Preview](docs/preview-portal.png)
```

## Quick Start

Install dependencies dari root:

```bash
npm install
```

Jalankan semua apps (Turbo):

```bash
npm run dev
```

Jalankan satu app saja:

```bash
npm run dev --workspace @workspace/main
npm run dev --workspace @workspace/company-profile
npm run dev --workspace @workspace/catalog
npm run dev --workspace @workspace/ecommerce
npm run dev --workspace @workspace/government
```

## URL Lokal (default)

- `apps/main` -> http://localhost:3000
- `apps/company-profile` -> http://localhost:3001
- `apps/ecommerce` -> http://localhost:3002
- `apps/government` -> http://localhost:3003
- `apps/catalog` -> http://localhost:3004

## Fitur E-commerce (Highlight)

- **Cart & Checkout flow** (page-based)
- **Size picker** di card produk dan cart
- **Cart page** dengan update qty + delete item
- **Checkout page** dengan validasi sederhana
- **Confirm page** dengan ringkasan pesanan
- **Help Center** lengkap

## Routing E-commerce

- Home: `/`
- Cart: `/cart`
- Checkout: `/checkout`
- Confirm: `/checkout/confirm`

## Help Center

- `/help`
- `/help/faq`
- `/help/track-order`
- `/help/pengiriman`
- `/help/kebijakan-retur`
- `/help/hubungi-kami`

> Semua routing e-commerce dibuat **public** dan link sudah tersambung di footer dan navigasi.

## Script Utama

```bash
npm run dev
npm run build
npm run lint
```

## Environment Variables

Jika dibutuhkan, buat `.env.local` di masing-masing app (contoh untuk `apps/main`):

```env
MOCKUP_ADMIN_KEY=admin-demo-2026
MOCKUP_SESSION_SECRET=demo-session-secret-2026
```

## Troubleshooting

- **Port bentrok**: cek proses yang berjalan di port 3000-3004 lalu hentikan proses.
- **Turbopack error**: coba matikan turbopack dengan `NEXT_DISABLE_TURBOPACK=1`.
- **Lint error path**: jalankan lint per app (`cd apps/ecommerce && npm run lint`).

## Deploy (Vercel)

Set **Root Directory** ke folder app yang ingin dideploy:

- `apps/main`
- `apps/company-profile`
- `apps/catalog`
- `apps/ecommerce`
- `apps/government`

Gunakan preset Next.js standar:
- Install Command: `npm install`
- Build Command: `npm run build`

## Kontribusi

- Buat branch baru untuk tiap perubahan besar.
- Pastikan build selesai sebelum merge.

## Catatan Konten & Layout

<<<<<<< HEAD
```json
{
  "ecom-demo": { "site": "ecommerce", "label": "Client Ecommerce", "active": true },
  "catalog-demo": { "site": "catalog", "label": "Client Catalog", "active": true },
  "gov-demo": { "site": "government", "label": "Client Government", "active": true },
  "company-demo": { "site": "company-profile", "label": "Client Company Profile", "active": true }
}
```
=======
- Copywriting menggunakan tone **ramah** dan konsisten.
- Spacing dan typography sudah dirapikan untuk tampilan yang lebih rapi.
>>>>>>> 22a4653 (update readme)
