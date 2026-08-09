# Portfolio v2

Akshar Patel's personal portfolio, built with React and Vite.

## Development

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```

## Lifetime view counter

The portfolio reads and increments its view count through `api/views.js`. The connected Vercel Marketplace resource supplies these server-only environment variables:

```text
UPSTASH_REDIS_REST_KV_REST_API_URL
UPSTASH_REDIS_REST_KV_REST_API_TOKEN
```

Standard `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` names are also supported. The counter records one view per browser session. Requests fail closed when storage is not configured, and Redis credentials are never sent to the browser.
