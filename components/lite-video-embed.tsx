"use client";

import { useState, type ReactNode } from "react";

import {
  getAspectRatioCss,
  getAspectRatioDimensions,
  getVideoEmbedUrl,
} from "@/lib/video";
import type { ProjectAspectRatio, VideoProvider } from "@/types/project";

interface LiteVideoEmbedProps {
  provider: VideoProvider;
  providerVideoId: string;
  posterUrl: string;
  posterAlt: string;
  title: string;
  aspectRatio: ProjectAspectRatio;
  playLabel?: string;
  priority?: boolean;
  className?: string;
  posterOverlay?: ReactNode;
}

export function LiteVideoEmbed({
  provider,
  providerVideoId,
  posterUrl,
  posterAlt,
  title,
  aspectRatio,
  playLabel = `Leisti „${title}“`,
  priority = false,
  className,
  posterOverlay,
}: LiteVideoEmbedProps) {
  const [isActive, setIsActive] = useState(false);
  const embedUrl = getVideoEmbedUrl(provider, providerVideoId);
  const dimensions = getAspectRatioDimensions(aspectRatio);

  return (
    <div
      className={["lite-video", className].filter(Boolean).join(" ")}
      style={{ aspectRatio: getAspectRatioCss(aspectRatio) }}
      data-video-provider={provider}
    >
      {isActive && embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${title} vaizdo įrašas`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          data-lite-video-iframe
        />
      ) : (
        <>
          <img
            src={posterUrl}
            alt={posterAlt}
            width={dimensions.width}
            height={dimensions.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
          />
          {posterOverlay}
          {embedUrl ? (
            <button
              className="lite-video__play"
              type="button"
              aria-label={playLabel}
              onClick={() => setIsActive(true)}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
