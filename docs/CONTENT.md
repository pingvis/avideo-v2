# Content workflow

D1 is the canonical project store. `seed/portfolio.sql` is the repeatable initial import of verified AVideo records; it is not read by the application at runtime.

## Local setup

```bash
npm run db:migrate:local
npm run db:seed:local
```

Add a local project with Wrangler:

```bash
npx wrangler d1 execute avideo-v2 --local --command "INSERT INTO projects (slug, title, client, year, short_description, provider, provider_video_id, poster_url, aspect_ratio, roles, featured, featured_order, published, sort_order) VALUES ('project-slug', 'Project title', NULL, 2026, 'Short project summary.', 'youtube', 'kM0p-mKQQaY', 'https://example.com/poster-1600x900.jpg', '16:9', 'Kamera|Montažas', 1, 10, 1, 10);"
```

## Production setup

The new production `avideo-v2` database is already configured as `DB` in `wrangler.jsonc`. Authenticate and initialize it:

```bash
npx wrangler login
npm run cf-typegen
npm run db:migrate:remote
npm run db:seed:remote
```

Use the same `wrangler d1 execute` command with `--remote` instead of `--local` to add or update production content. Do not run arbitrary SQL through a public endpoint; none exists.

The initial import maps legacy categories to normalized tags. Legacy `MISC` projects intentionally receive no `misc` tag. Legacy `ZALIA` rows are retained with `published = 0`.

## Flags and ordering

- Publish: `published = 1`; hide without deletion: `published = 0`.
- Feature on the homepage: `featured = 1`.
- `featured_order`: lower numbers appear first; `NULL` appears after numbered featured projects.
- Archive order: lower `sort_order` appears first.
- Showreel: exactly one row may have `showreel = 1`.

Switch the showreel atomically:

```bash
npx wrangler d1 execute avideo-v2 --local --command "UPDATE projects SET showreel = 0, updated_at = CURRENT_TIMESTAMP WHERE showreel = 1; UPDATE projects SET showreel = 1, updated_at = CURRENT_TIMESTAMP WHERE slug = 'project-slug';"
```

## Tags

Create a tag and assign it to a project:

```bash
npx wrangler d1 execute avideo-v2 --local --command "INSERT OR IGNORE INTO tags (slug, label, sort_order) VALUES ('fpv', 'FPV', 40); INSERT OR IGNORE INTO project_tags (project_id, tag_id) SELECT p.id, t.id FROM projects p, tags t WHERE p.slug = 'project-slug' AND t.slug = 'fpv';"
```

A project can have multiple tags. Delete an assignment from `project_tags`, not the project. There is no `misc` tag.

## Media requirements

- Accepted providers: `youtube` and `vimeo`.
- Store only the provider's video ID, never iframe HTML or an embed URL.
- YouTube IDs must be 11 characters using letters, numbers, `_`, or `-`.
- Vimeo IDs must be 6–12 digits and cannot begin with zero.
- `poster_url` must be a stable HTTPS URL or a root-relative local path. Do not depend on provider thumbnail discovery at request time.
- Prepare a reasonably compressed poster near its display size; 1280–1920 px wide is usually sufficient for 16:9 work.
- Accepted aspect ratios: `16:9`, `4:5`, `1:1`, and `9:16`.
- Separate roles with `|`, for example `Kamera|Montažas|FPV`.

When changing a row, also set `updated_at = CURRENT_TIMESTAMP`. Cached pages normally refresh within about three minutes.
