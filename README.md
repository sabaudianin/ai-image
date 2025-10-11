This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Running Transformers directly in the browser caused several issues in Next.js — mainly due to RSC/SSR bundling conflicts and incorrect WASM paths.

To solve this, I moved all model logic into a separate micro-frontend built with Vite, and embedded it inside the main Next.js + Supabase application using an iframe.

Both apps communicate via a clearly defined postMessage contract, while all data storage and authentication stay safely on the Next.js side through Supabase with Row Level Security (RLS).

This approach provides:

Stable and secure architecture — the model runs in isolation, without exposing secrets.

Fast load times — models and WASM files are cached by the browser’s Service Worker.

Independent release cycle — the widget can be updated without redeploying the main app.

Clean separation of concerns — ML logic is decoupled from the application logic.

As a result, the app remains fast, maintainable, and production-ready, while showcasing a professional micro-frontend architecture that solves a real-world integration problem.
