# AVideo v2

Phase 1 foundation for Augustas Laurinavičius' video portfolio. The application uses the Next.js App Router API through vinext and deploys as a Cloudflare Worker with D1 as the portfolio source of truth.

## Prerequisites

- Node.js 22+
- npm 10+
- A Cloudflare account for remote D1 and deployment

## Install and develop

```bash
npm install
npm run cf-typegen
npm run db:migrate:local
npm run db:seed:local
npm run dev
```

Open `http://localhost:3000`. The repeatable portfolio seed contains verified AVideo records imported from the legacy D1 database.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run preview
```

`preview` builds the Worker and serves the generated `dist/server/wrangler.json` locally.

## Cloudflare

The production `avideo-v2` D1 database is already bound as `DB` in `wrangler.jsonc`. Initialize it once, then deploy:

```bash
npm run cf-typegen
npm run db:migrate:remote
npm run db:seed:remote
npm run deploy
```

`seed/portfolio.sql` bootstraps the new canonical database; the legacy database is not queried by the application. Cloudflare credentials belong in Wrangler's login/token workflow, never in source.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Content workflow](docs/CONTENT.md)
- [Performance rules](docs/PERFORMANCE.md)
