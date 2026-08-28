# Performance rules

## Initial page load

- Render zero YouTube/Vimeo iframes until a visitor explicitly activates a player.
- Load zero provider JavaScript and no provider player APIs initially.
- Never use an autoplaying background YouTube/Vimeo embed.
- Render posters with an explicit aspect ratio and width/height attributes.
- Load the showreel poster eagerly; default below-fold cards to `loading="lazy"` and async decoding.
- Send external posters directly rather than proxying every image through a runtime optimizer.
- Keep pages, project grids, cards, navigation, and metadata as Server Components.
- Keep the player as the only Phase 1 stateful Client Component.
- Do not add an animation framework, smooth-scroll runtime, large UI library, or provider SDK.
- Keep project-grid route prefetch disabled so a large archive does not prefetch every detail page.

`LiteVideoEmbed` initially renders only an image and a real button. After activation it validates the provider ID again, builds a fixed provider URL, replaces the poster with one iframe, and requests autoplay. Layout dimensions do not change.

## Targets

- LCP below 2.5 seconds on a normal mobile connection.
- CLS below 0.1.
- INP below 200 milliseconds.

These are engineering targets, not guaranteed lab results. Re-test them when real poster assets and production traffic are available.

## Dependency budget

Runtime dependencies are limited to React, Next.js 16, vinext, and the Cloudflare vinext adapter. Cloudflare/Vite, Tailwind, TypeScript, Wrangler, ESLint, and Playwright are build, quality, or verification tooling and do not ship to the browser. Any future dependency that materially increases client JavaScript must be recorded here with its reason.
