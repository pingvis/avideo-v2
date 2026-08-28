-- Initial AVideo v2 portfolio data.
-- Imported read-only from the legacy avideo-videos D1 database on 2026-08-28.
-- The legacy database is not a runtime dependency.
PRAGMA foreign_keys = ON;

-- Remove the Phase 1 integration placeholders if this seed is applied to an
-- existing local database.
DELETE FROM projects
WHERE slug IN (
  'avideo-apparat-v4',
  'dev-vimeo-mountain',
  'dev-vimeo-watchtower'
);

INSERT INTO tags (slug, label, sort_order) VALUES
  ('commercial', 'Reklama', 10),
  ('social', 'Social', 20),
  ('events', 'Renginiai', 30),
  ('fpv', 'FPV', 40),
  ('motion', 'Motion', 50),
  ('music', 'Muzika', 60)
ON CONFLICT(slug) DO UPDATE SET
  label = excluded.label,
  sort_order = excluded.sort_order;

INSERT INTO projects (
  slug,
  title,
  year,
  short_description,
  provider,
  provider_video_id,
  poster_url,
  aspect_ratio,
  featured,
  featured_order,
  showreel,
  published,
  sort_order
) VALUES
  (
    'avideo-showreel',
    'Sveiki atvykę į AVideo',
    2024,
    'Profesionalūs vaizdo sprendimai ir kūrybinis turinys. Susipažinkite su AVideo komanda ir mūsų darbo principais.',
    'youtube',
    'kM0p-mKQQaY',
    'https://img.youtube.com/vi/kM0p-mKQQaY/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    1,
    1,
    0
  ),
  (
    'bestogo-in-slow-motion',
    'BESTOGO In Slow Motion',
    NULL,
    NULL,
    'youtube',
    'CCum5BrDVP4',
    'https://img.youtube.com/vi/CCum5BrDVP4/maxresdefault.jpg',
    '16:9',
    1,
    1,
    0,
    1,
    1
  ),
  (
    'xrf-europe',
    'XRF Europe',
    NULL,
    NULL,
    'youtube',
    '4Ru5HtsqEKU',
    'https://img.youtube.com/vi/4Ru5HtsqEKU/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    2
  ),
  (
    'build-a-bear',
    'Build A Bear',
    NULL,
    NULL,
    'youtube',
    'ViFsU-JNJnY',
    'https://img.youtube.com/vi/ViFsU-JNJnY/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    3
  ),
  (
    'bestogo-miskas',
    'BESTOGO Miškas',
    NULL,
    NULL,
    'youtube',
    'EQStxUsTygw',
    'https://img.youtube.com/vi/EQStxUsTygw/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    4
  ),
  (
    'vilnius-dna',
    'Vilnius DNA',
    NULL,
    NULL,
    'youtube',
    'J5rUHeRsAI0',
    'https://img.youtube.com/vi/J5rUHeRsAI0/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    5
  ),
  (
    'rytojaus-nebus-gedimino-sapnas',
    'Rytojaus Nebus - GEDIMINO SAPNAS',
    NULL,
    NULL,
    'youtube',
    'uQUjt-nG0OA',
    'https://img.youtube.com/vi/uQUjt-nG0OA/maxresdefault.jpg',
    '16:9',
    1,
    6,
    0,
    1,
    6
  ),
  (
    'ekrane-credo',
    'Ekrane - CREDO',
    NULL,
    NULL,
    'youtube',
    'KeVwnxAoSYc',
    'https://img.youtube.com/vi/KeVwnxAoSYc/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    7
  ),
  (
    '360arena-showcase',
    '360Arena Showcase',
    NULL,
    NULL,
    'youtube',
    '0A4UPR0jSBI',
    'https://img.youtube.com/vi/0A4UPR0jSBI/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    8
  ),
  (
    '360-arena-kaledos',
    '360 Arena Kalėdos',
    NULL,
    NULL,
    'youtube',
    'Sg7D2LZjlPY',
    'https://img.youtube.com/vi/Sg7D2LZjlPY/maxresdefault.jpg',
    '16:9',
    1,
    2,
    0,
    1,
    9
  ),
  (
    'moto-sezono-atidarymas-2024',
    'Moto Sezono atidarymas 2024',
    NULL,
    NULL,
    'youtube',
    'E_4v-1zRseQ',
    'https://img.youtube.com/vi/E_4v-1zRseQ/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    10
  ),
  (
    'laukosportas-360arena',
    'LaukoSportas x 360Arena',
    NULL,
    NULL,
    'youtube',
    'JAQ9phJkdOA',
    'https://img.youtube.com/vi/JAQ9phJkdOA/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    11
  ),
  (
    'lieporiu-simtadienis-2025',
    'Lieporių Šimtadienis 2025',
    NULL,
    NULL,
    'youtube',
    '8cnWF88azn4',
    'https://img.youtube.com/vi/8cnWF88azn4/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    12
  ),
  (
    'lieporiu-simtadienis-2024',
    'Lieporių Šimtadienis 2024',
    NULL,
    NULL,
    'youtube',
    'ZkZhtBOoFJE',
    'https://img.youtube.com/vi/ZkZhtBOoFJE/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    13
  ),
  (
    'vejo-jegaines',
    'Vėjo Jegainės',
    NULL,
    NULL,
    'youtube',
    'At3lpub-aNE',
    'https://img.youtube.com/vi/At3lpub-aNE/maxresdefault.jpg',
    '16:9',
    1,
    3,
    0,
    1,
    14
  ),
  (
    'gravity-vilnius',
    'GRAVITY Vilnius',
    NULL,
    NULL,
    'youtube',
    'i8XwCn_H9HY',
    'https://img.youtube.com/vi/i8XwCn_H9HY/maxresdefault.jpg',
    '16:9',
    1,
    8,
    0,
    1,
    15
  ),
  (
    'fpv-vilnius-kaunas',
    'FPV Vilnius + Kaunas',
    NULL,
    NULL,
    'youtube',
    'zFbsCcw3lzY',
    'https://img.youtube.com/vi/zFbsCcw3lzY/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    16
  ),
  (
    'fpv-kaunas',
    'FPV Kaunas',
    NULL,
    NULL,
    'youtube',
    'dNz_DwuXdjg',
    'https://img.youtube.com/vi/dNz_DwuXdjg/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    17
  ),
  (
    'salin-rankas',
    'Šalin Rankas!',
    NULL,
    NULL,
    'youtube',
    'yfmk6dZBIMI',
    'https://img.youtube.com/vi/yfmk6dZBIMI/maxresdefault.jpg',
    '16:9',
    1,
    4,
    0,
    1,
    17
  ),
  (
    'balticnog-2025',
    'BalticNOG 2025',
    NULL,
    NULL,
    'youtube',
    'XnkwpmO3Fvo',
    'https://img.youtube.com/vi/XnkwpmO3Fvo/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    18
  ),
  (
    'cannumo-kaledinis',
    'Cannumo Kalėdinis',
    NULL,
    NULL,
    'youtube',
    '-oFPDQHPIX0',
    'https://img.youtube.com/vi/-oFPDQHPIX0/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    19
  ),
  (
    'hr-klubas',
    'HR Klubas',
    NULL,
    NULL,
    'youtube',
    'q7iDOz6bpLA',
    'https://img.youtube.com/vi/q7iDOz6bpLA/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    20
  ),
  (
    'ogmios-miestas',
    'Ogmios Miestas',
    NULL,
    NULL,
    'youtube',
    'S58TyPvmsY0',
    'https://img.youtube.com/vi/S58TyPvmsY0/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    21
  ),
  (
    'panama-rewind-2023',
    'PANAMA Rewind 2023',
    NULL,
    NULL,
    'youtube',
    'Rlc1xYwr8_U',
    'https://img.youtube.com/vi/Rlc1xYwr8_U/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    22
  ),
  (
    'drmlnd',
    'DrmLnd',
    2026,
    NULL,
    'youtube',
    'ObyK2vAQYRQ',
    'https://img.youtube.com/vi/ObyK2vAQYRQ/maxresdefault.jpg',
    '9:16',
    1,
    5,
    0,
    1,
    20
  ),
  (
    '360-food',
    '360 Food',
    2026,
    NULL,
    'youtube',
    'RlW7k77Dw_s',
    'https://img.youtube.com/vi/RlW7k77Dw_s/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    21
  ),
  (
    'dokipoki-dirg-stadione',
    'DokiPoki DirG stadione',
    NULL,
    NULL,
    'youtube',
    '6NA7GC9x-0g',
    'https://img.youtube.com/vi/6NA7GC9x-0g/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    23
  ),
  (
    '360-valentinas',
    '360 Valentinas',
    NULL,
    NULL,
    'youtube',
    'jc2BvVqq6fo',
    'https://img.youtube.com/vi/jc2BvVqq6fo/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    24
  ),
  (
    'bestogo-names',
    'BESTOGO Names',
    NULL,
    NULL,
    'youtube',
    '-wbbFYIknXQ',
    'https://img.youtube.com/vi/-wbbFYIknXQ/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    25
  ),
  (
    'dokipoki-zalgiris',
    'DokiPoki Žalgiris',
    NULL,
    NULL,
    'youtube',
    'pM3j5tFeyEE',
    'https://img.youtube.com/vi/pM3j5tFeyEE/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    27
  ),
  (
    'nemuno-turas',
    'Nemuno Turas',
    NULL,
    NULL,
    'youtube',
    '_M53MaW2IHo',
    'https://img.youtube.com/vi/_M53MaW2IHo/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    28
  ),
  (
    'cosmo-snacks-background',
    'COSMO SNACKS Background',
    NULL,
    NULL,
    'youtube',
    'EKKkefe_84w',
    'https://img.youtube.com/vi/EKKkefe_84w/maxresdefault.jpg',
    '16:9',
    1,
    7,
    0,
    1,
    29
  ),
  (
    'butrimoniu-gimnazija',
    'Butrimonių Gimnazija',
    NULL,
    NULL,
    'youtube',
    'WlYtfdUCeFs',
    'https://img.youtube.com/vi/WlYtfdUCeFs/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    1,
    30
  ),
  (
    '30-years-30-tricks',
    '30 Years 30 Tricks',
    NULL,
    NULL,
    'youtube',
    '99XwokRahCo',
    'https://img.youtube.com/vi/99XwokRahCo/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    31
  ),
  (
    'adventica-dokipoki',
    'Adventica x DokiPoki',
    NULL,
    NULL,
    'youtube',
    'CfUbNBOBEhA',
    'https://img.youtube.com/vi/CfUbNBOBEhA/maxresdefault.jpg',
    '9:16',
    0,
    NULL,
    0,
    1,
    32
  ),
  (
    'inga-valinskiene-fx30-rs5-2026',
    'Inga Valinskienė / FX30 + RS5 / 2026',
    NULL,
    'FX30 + DJI Ronin RS5',
    'youtube',
    'tUCnaxDaqOk',
    'https://img.youtube.com/vi/tUCnaxDaqOk/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    0,
    0
  ),
  (
    'ba-a7s3-rs3-2024',
    'BA. / A7s3 + RS3 / 2024',
    NULL,
    NULL,
    'youtube',
    'oHobMIQXqJY',
    'https://img.youtube.com/vi/oHobMIQXqJY/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    0,
    33
  ),
  (
    'live-fx30-1359',
    'LIVE fx30 1359',
    NULL,
    NULL,
    'youtube',
    'LJ6uNqgiUo4',
    'https://img.youtube.com/vi/LJ6uNqgiUo4/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    0,
    34
  ),
  (
    'live-fx30-2707',
    'LIVE fx30 2707',
    NULL,
    NULL,
    'youtube',
    'Ki9FBKLe0Pg',
    'https://img.youtube.com/vi/Ki9FBKLe0Pg/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    0,
    35
  ),
  (
    'rec-fx30-4296',
    'REC fx30 4296',
    NULL,
    NULL,
    'youtube',
    'PO5PT3PaYgQ',
    'https://img.youtube.com/vi/PO5PT3PaYgQ/maxresdefault.jpg',
    '16:9',
    0,
    NULL,
    0,
    0,
    36
  )
ON CONFLICT(slug) DO UPDATE SET
  title = excluded.title,
  year = excluded.year,
  short_description = excluded.short_description,
  provider = excluded.provider,
  provider_video_id = excluded.provider_video_id,
  poster_url = excluded.poster_url,
  aspect_ratio = excluded.aspect_ratio,
  featured = excluded.featured,
  featured_order = excluded.featured_order,
  showreel = excluded.showreel,
  published = excluded.published,
  sort_order = excluded.sort_order,
  updated_at = CURRENT_TIMESTAMP;

DELETE FROM project_tags
WHERE project_id IN (
  SELECT id
  FROM projects
  WHERE provider = 'youtube'
    AND provider_video_id IN (
      'kM0p-mKQQaY',
      'CCum5BrDVP4',
      '4Ru5HtsqEKU',
      'ViFsU-JNJnY',
      'EQStxUsTygw',
      'J5rUHeRsAI0',
      'uQUjt-nG0OA',
      'KeVwnxAoSYc',
      '0A4UPR0jSBI',
      'Sg7D2LZjlPY',
      'E_4v-1zRseQ',
      'JAQ9phJkdOA',
      '8cnWF88azn4',
      'ZkZhtBOoFJE',
      'At3lpub-aNE',
      'i8XwCn_H9HY',
      'zFbsCcw3lzY',
      'dNz_DwuXdjg',
      'yfmk6dZBIMI',
      'XnkwpmO3Fvo',
      '-oFPDQHPIX0',
      'q7iDOz6bpLA',
      'S58TyPvmsY0',
      'Rlc1xYwr8_U',
      'ObyK2vAQYRQ',
      'RlW7k77Dw_s',
      '6NA7GC9x-0g',
      'jc2BvVqq6fo',
      '-wbbFYIknXQ',
      'pM3j5tFeyEE',
      '_M53MaW2IHo',
      'EKKkefe_84w',
      'WlYtfdUCeFs',
      '99XwokRahCo',
      'CfUbNBOBEhA',
      'tUCnaxDaqOk',
      'oHobMIQXqJY',
      'LJ6uNqgiUo4',
      'Ki9FBKLe0Pg',
      'PO5PT3PaYgQ'
    )
);

INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug = 'commercial'
WHERE p.slug IN (
  'bestogo-in-slow-motion',
  'xrf-europe',
  'build-a-bear',
  'bestogo-miskas',
  'vilnius-dna',
  '360arena-showcase'
);

INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug = 'music'
WHERE p.slug IN (
  'rytojaus-nebus-gedimino-sapnas',
  'ekrane-credo'
);

INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug = 'events'
WHERE p.slug IN (
  '360-arena-kaledos',
  'moto-sezono-atidarymas-2024',
  'laukosportas-360arena',
  'lieporiu-simtadienis-2025',
  'lieporiu-simtadienis-2024'
);

INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug = 'fpv'
WHERE p.slug IN (
  'vejo-jegaines',
  'gravity-vilnius',
  'fpv-vilnius-kaunas',
  'fpv-kaunas'
);

INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug = 'motion'
WHERE p.slug IN (
  'salin-rankas',
  'balticnog-2025',
  'cannumo-kaledinis',
  'hr-klubas',
  'ogmios-miestas',
  'panama-rewind-2023'
);

INSERT INTO project_tags (project_id, tag_id)
SELECT p.id, t.id
FROM projects p
INNER JOIN tags t ON t.slug = 'social'
WHERE p.slug IN (
  'drmlnd',
  '360-food',
  'dokipoki-dirg-stadione',
  '360-valentinas',
  'bestogo-names',
  'dokipoki-zalgiris',
  'nemuno-turas'
);
