import {
  PROJECT_ASPECT_RATIOS,
  VIDEO_PROVIDERS,
  type ProjectAspectRatio,
  type VideoProvider,
} from "@/types/project";

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const VIMEO_ID_PATTERN = /^[1-9][0-9]{5,11}$/;

const ASPECT_RATIO_CSS: Record<ProjectAspectRatio, string> = {
  "16:9": "16 / 9",
  "4:5": "4 / 5",
  "1:1": "1 / 1",
  "9:16": "9 / 16",
};

const ASPECT_RATIO_DIMENSIONS: Record<
  ProjectAspectRatio,
  { width: number; height: number }
> = {
  "16:9": { width: 1600, height: 900 },
  "4:5": { width: 1280, height: 1600 },
  "1:1": { width: 1400, height: 1400 },
  "9:16": { width: 900, height: 1600 },
};

export function isVideoProvider(value: string): value is VideoProvider {
  return VIDEO_PROVIDERS.some((provider) => provider === value);
}

export function isProjectAspectRatio(value: string): value is ProjectAspectRatio {
  return PROJECT_ASPECT_RATIOS.some((ratio) => ratio === value);
}

export function isValidVideoId(provider: VideoProvider, videoId: string): boolean {
  return provider === "youtube"
    ? YOUTUBE_ID_PATTERN.test(videoId)
    : VIMEO_ID_PATTERN.test(videoId);
}

export function getVideoEmbedUrl(
  provider: VideoProvider,
  videoId: string,
): string | null {
  if (!isValidVideoId(provider, videoId)) {
    return null;
  }

  if (provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  return `https://player.vimeo.com/video/${videoId}?autoplay=1&dnt=1`;
}

export function getAspectRatioCss(aspectRatio: ProjectAspectRatio): string {
  return ASPECT_RATIO_CSS[aspectRatio];
}

export function getAspectRatioDimensions(
  aspectRatio: ProjectAspectRatio,
): { width: number; height: number } {
  return ASPECT_RATIO_DIMENSIONS[aspectRatio];
}
