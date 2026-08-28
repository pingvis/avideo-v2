export const VIDEO_PROVIDERS = ["youtube", "vimeo"] as const;

export type VideoProvider = (typeof VIDEO_PROVIDERS)[number];

export const PROJECT_ASPECT_RATIOS = ["16:9", "4:5", "1:1", "9:16"] as const;

export type ProjectAspectRatio = (typeof PROJECT_ASPECT_RATIOS)[number];

export interface Project {
  id: number;
  slug: string;
  title: string;
  client: string | null;
  year: number | null;
  shortDescription: string | null;
  provider: VideoProvider;
  providerVideoId: string;
  posterUrl: string;
  aspectRatio: ProjectAspectRatio;
  roles: string[];
  featured: boolean;
  featuredOrder: number | null;
  showreel: boolean;
  sortOrder: number;
}

export interface ProjectTag {
  id: number;
  slug: string;
  label: string;
}
