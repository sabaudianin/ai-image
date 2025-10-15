## A tiny portfolio project showing:

Micro-frontend: a Vite-built widget embedded in Next.js(Host) via <iframe>.

LLM proxy: the widget calls a server-side Next.js endpoint (/api/ai) which talks to Gemini via @google/genai.

Auth-ready shell: Next hosts layout/auth (magic link & OAuth, optional), widget stays decoupled.

Security: API key lives only in Next (server). Widget never sees it.

Config: widget reads API URL from window.**NEXT_API** (or build-time env).

CORS: WIDGET_ORIGIN must match the widget origin exactly (scheme + host + port).

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
