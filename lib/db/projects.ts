import { env } from "cloudflare:workers";

import {
  isProjectAspectRatio,
  isValidVideoId,
  isVideoProvider,
} from "@/lib/video";
import type { Project, ProjectTag } from "@/types/project";

interface ProjectRow {
  id: number;
  slug: string;
  title: string;
  client: string | null;
  year: number | null;
  short_description: string | null;
  provider: string;
  provider_video_id: string;
  poster_url: string;
  aspect_ratio: string;
  roles: string | null;
  featured: number;
  featured_order: number | null;
  showreel: number;
  sort_order: number;
}

interface ProjectTagRow {
  id: number;
  slug: string;
  label: string;
}

const PROJECT_FIELDS = `
  p.id,
  p.slug,
  p.title,
  p.client,
  p.year,
  p.short_description,
  p.provider,
  p.provider_video_id,
  p.poster_url,
  p.aspect_ratio,
  p.roles,
  p.featured,
  p.featured_order,
  p.showreel,
  p.sort_order
`;

function isSafePosterUrl(value: string): boolean {
  if (value.startsWith("/")) {
    return !value.startsWith("//");
  }

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function mapProject(row: ProjectRow): Project | null {
  if (
    !isVideoProvider(row.provider) ||
    !isValidVideoId(row.provider, row.provider_video_id) ||
    !isProjectAspectRatio(row.aspect_ratio) ||
    !isSafePosterUrl(row.poster_url)
  ) {
    console.error(`[D1] Project ${row.id} contains invalid media data.`);
    return null;
  }

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: row.client,
    year: row.year,
    shortDescription: row.short_description,
    provider: row.provider,
    providerVideoId: row.provider_video_id,
    posterUrl: row.poster_url,
    aspectRatio: row.aspect_ratio,
    roles: row.roles
      ? row.roles
          .split("|")
          .map((role) => role.trim())
          .filter(Boolean)
      : [],
    featured: row.featured === 1,
    featuredOrder: row.featured_order,
    showreel: row.showreel === 1,
    sortOrder: row.sort_order,
  };
}

function mapProjects(rows: ProjectRow[]): Project[] {
  return rows.flatMap((row) => {
    const project = mapProject(row);
    return project ? [project] : [];
  });
}

function logQueryError(operation: string, error: unknown): void {
  const detail = error instanceof Error ? error.message : "Unknown D1 error";
  console.error(`[D1] ${operation} failed: ${detail}`);
}

export async function listPublishedProjects(): Promise<Project[]> {
  try {
    const { results } = await env.DB.prepare(`
      SELECT ${PROJECT_FIELDS}
      FROM projects p
      WHERE p.published = 1
      ORDER BY p.sort_order ASC, p.id DESC
    `).all<ProjectRow>();
    return mapProjects(results);
  } catch (error) {
    logQueryError("listPublishedProjects", error);
    return [];
  }
}

export async function listFeaturedProjects(): Promise<Project[]> {
  try {
    const { results } = await env.DB.prepare(`
      SELECT ${PROJECT_FIELDS}
      FROM projects p
      WHERE p.published = 1 AND p.featured = 1
      ORDER BY
        COALESCE(p.featured_order, 2147483647) ASC,
        p.sort_order ASC,
        p.id DESC
    `).all<ProjectRow>();

    return mapProjects(results);
  } catch (error) {
    logQueryError("listFeaturedProjects", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const row = await env.DB.prepare(`
      SELECT ${PROJECT_FIELDS}
      FROM projects p
      WHERE p.slug = ? AND p.published = 1
      LIMIT 1
    `)
      .bind(slug)
      .first<ProjectRow>();

    return row ? mapProject(row) : null;
  } catch (error) {
    logQueryError("getProjectBySlug", error);
    return null;
  }
}

export async function getShowreel(): Promise<Project | null> {
  try {
    const row = await env.DB.prepare(`
      SELECT ${PROJECT_FIELDS}
      FROM projects p
      WHERE p.published = 1 AND p.showreel = 1
      LIMIT 1
    `).first<ProjectRow>();

    return row ? mapProject(row) : null;
  } catch (error) {
    logQueryError("getShowreel", error);
    return null;
  }
}

export async function listPublishedTags(): Promise<ProjectTag[]> {
  try {
    const { results } = await env.DB.prepare(`
      SELECT DISTINCT t.id, t.slug, t.label
      FROM tags t
      INNER JOIN project_tags pt ON pt.tag_id = t.id
      INNER JOIN projects p ON p.id = pt.project_id
      WHERE p.published = 1
      ORDER BY t.sort_order ASC, t.label ASC
    `).all<ProjectTagRow>();

    return results;
  } catch (error) {
    logQueryError("listPublishedTags", error);
    return [];
  }
}

export async function listProjectTags(projectId: number): Promise<ProjectTag[]> {
  try {
    const { results } = await env.DB.prepare(`
      SELECT t.id, t.slug, t.label
      FROM tags t
      INNER JOIN project_tags pt ON pt.tag_id = t.id
      WHERE pt.project_id = ?
      ORDER BY t.sort_order ASC, t.label ASC
    `)
      .bind(projectId)
      .all<ProjectTagRow>();

    return results;
  } catch (error) {
    logQueryError("listProjectTags", error);
    return [];
  }
}
