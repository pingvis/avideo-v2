PRAGMA foreign_keys = ON;

CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE CHECK (length(slug) BETWEEN 1 AND 120),
  title TEXT NOT NULL CHECK (length(title) BETWEEN 1 AND 180),
  client TEXT,
  year INTEGER CHECK (year IS NULL OR year BETWEEN 1900 AND 2100),
  short_description TEXT,
  provider TEXT NOT NULL CHECK (provider IN ('youtube', 'vimeo')),
  provider_video_id TEXT NOT NULL CHECK (length(provider_video_id) BETWEEN 1 AND 32),
  poster_url TEXT NOT NULL CHECK (
    poster_url GLOB 'https://*' OR
    (poster_url GLOB '/*' AND poster_url NOT GLOB '//*')
  ),
  aspect_ratio TEXT NOT NULL DEFAULT '16:9'
    CHECK (aspect_ratio IN ('16:9', '4:5', '1:1', '9:16')),
  roles TEXT,
  featured INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  featured_order INTEGER CHECK (featured_order IS NULL OR featured_order >= 0),
  showreel INTEGER NOT NULL DEFAULT 0 CHECK (showreel IN (0, 1)),
  published INTEGER NOT NULL DEFAULT 1 CHECK (published IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE CHECK (length(slug) BETWEEN 1 AND 80),
  label TEXT NOT NULL CHECK (length(label) BETWEEN 1 AND 80),
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0)
);

CREATE TABLE project_tags (
  project_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (project_id, tag_id),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE INDEX idx_projects_published_sort
  ON projects (published, sort_order, id);

CREATE INDEX idx_projects_featured_order
  ON projects (published, featured, featured_order, sort_order);

CREATE UNIQUE INDEX idx_projects_single_showreel
  ON projects (showreel)
  WHERE showreel = 1;

CREATE INDEX idx_project_tags_tag_project
  ON project_tags (tag_id, project_id);
