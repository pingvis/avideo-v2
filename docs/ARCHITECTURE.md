# Architecture

## Platform

AVideo v2 is an App Router application deployed to Cloudflare Workers. It was scaffolded with the current `create-vinext-app` Cloudflare path. `vinext` implements the Next.js API surface on Vite; Next.js 16 remains an explicit project dependency. `@cloudflare/vite-plugin` supplies the Workers runtime and `@vinext/cloudflare` supplies the CDN cache adapter. OpenNext and Cloudflare Pages are not used.

`wrangler.jsonc` defines a D1 binding named `DB`. The binding intentionally has no committed production ID. Local scripts share an explicit `.wrangler/state` persistence path, including the built-Worker preview; production setup adds the non-secret D1 ID returned by `wrangler d1 create avideo-v2`. Secrets and account credentials remain outside the repository.

## Data flow

```text
D1 DB binding -> lib/db/projects.ts -> Server Components -> presentational props
                                                    -> LiteVideoEmbed on click only
```

D1 is the only project content source. There is no JSON fallback, browser API fetch, or duplicated hardcoded project collection. `lib/db/projects.ts` owns parameterized SQL, row mapping, validation, and server-side error logging. Query failures return empty/null results so pages retain visitor-safe states.

The normalized model is:

- `projects`: media identity, poster, display metadata, publication and ordering flags.
- `tags`: reusable filter labels.
- `project_tags`: many-to-many assignment with cascading foreign keys.

Roles remain a pipe-separated text field for Phase 1. Tags are normalized because they are queried and filtered independently.

## Server and client boundaries

Pages, layout, navigation, grids, cards, metadata, and D1 queries are Server Components. `components/lite-video-embed.tsx` is the only intentional Client Component because it owns the click state that creates an iframe. Provider URLs are constructed from a validated provider and ID in `lib/video.ts`; D1 never supplies iframe HTML or an arbitrary embed URL.

Phase 1 renders normalized tags as a lightweight archive taxonomy without interactive filtering. Reading `searchParams` made the archive dynamic in the current vinext build, so functional filters are postponed to preserve ISR caching. Grid project links set `prefetch={false}` to avoid eager route requests when the archive grows.

## Caching

Homepage and Work routes export `revalidate = 180`. vinext's generated Cloudflare CDN adapter uses Workers caching with stale-while-revalidate behavior, and `wrangler.jsonc` enables that cache. This provides an approximately three-minute refresh window without adding KV or a custom cache. Local development can query D1 on each request; production page responses absorb repeat traffic.

The project route wraps its slug lookup in React `cache()` so metadata and page rendering can share a request-scoped result. No experimental Cache Components or custom distributed caching is used.

## Extension path

A later authenticated admin can validate input and write to the same tables. It should call a focused server-side mutation layer rather than bypass this model. Existing read components do not need content-specific edits when projects change.

Deliberately postponed: admin/authentication, contact backend, functional tag filters, case studies, full About content, analytics, uploads, search, animation systems, image optimization infrastructure, arbitrary video providers, and richer editorial layouts.
