-- Development-only records. Vimeo rows are provider integration samples,
-- not AVideo work or credentials. Do not apply this file to production.
PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO tags (slug, label, sort_order) VALUES
  ('commercial', 'Reklama', 10),
  ('social', 'Social', 20),
  ('events', 'Renginiai', 30),
  ('fpv', 'FPV', 40),
  ('motion', 'Motion', 50),
  ('music', 'Muzika', 60);

INSERT INTO projects (
  slug,
  title,
  short_description,
  provider,
  provider_video_id,
  poster_url,
  aspect_ratio,
  roles,
  featured,
  featured_order,
  showreel,
  published,
  sort_order
) VALUES (
  'avideo-apparat-v4',
  'AVideo Apparat v4',
  'Archyvinis AVideo vaizdo įrašas, naudojamas Phase 1 grotuvo architektūrai patikrinti.',
  'youtube',
  'kM0p-mKQQaY',
  'https://i.ytimg.com/vi/kM0p-mKQQaY/maxresdefault.jpg',
  '16:9',
  'Kamera|Montažas',
  1,
  1,
  1,
  1,
  0
), (
  'dev-vimeo-mountain',
  '[DEV] Vimeo 16:9 patikra',
  'Trečiosios šalies Vimeo pavyzdys, skirtas tik integracijai patikrinti. Tai nėra AVideo darbas.',
  'vimeo',
  '22439234',
  'https://i.vimeocdn.com/video/145027281-cf3e3e047a52e2210b26bbcf42fcde909a80a7dd023a757b95af01936d065ec0-d_1280?region=us',
  '16:9',
  'Vimeo integracijos testas',
  1,
  2,
  0,
  1,
  10
), (
  'dev-vimeo-watchtower',
  '[DEV] Vimeo kortelės patikra',
  'Trečiosios šalies Vimeo pavyzdys, skirtas tik integracijai patikrinti. Tai nėra AVideo darbas.',
  'vimeo',
  '108018156',
  'https://i.vimeocdn.com/video/491616871-7e3841ae9f24660351fdf93b86ea71b263522b88b4332dec727e8686d699b61f-d_1280?region=us',
  '16:9',
  'Vimeo integracijos testas',
  1,
  3,
  0,
  1,
  20
)
ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  short_description = excluded.short_description,
  provider = excluded.provider,
  provider_video_id = excluded.provider_video_id,
  poster_url = excluded.poster_url,
  aspect_ratio = excluded.aspect_ratio,
  roles = excluded.roles,
  featured = excluded.featured,
  featured_order = excluded.featured_order,
  showreel = excluded.showreel,
  published = excluded.published,
  sort_order = excluded.sort_order,
  updated_at = CURRENT_TIMESTAMP;

INSERT OR IGNORE INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug IN ('events', 'motion')
WHERE p.slug = 'dev-vimeo-mountain';

INSERT OR IGNORE INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug IN ('commercial', 'fpv')
WHERE p.slug = 'dev-vimeo-watchtower';
