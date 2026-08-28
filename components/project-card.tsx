import Link from "next/link";

import { getAspectRatioCss, getAspectRatioDimensions } from "@/lib/video";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const dimensions = getAspectRatioDimensions(project.aspectRatio);
  const metadata = [project.client, project.roles.join(" · ")].filter(Boolean).join(" · ");

  return (
    <article className="project-card">
      <Link
        className="project-card__link"
        href={`/work/${project.slug}`}
        prefetch={false}
      >
        <div
          className="project-card__media"
          style={{ aspectRatio: getAspectRatioCss(project.aspectRatio) }}
        >
          <img
            src={project.posterUrl}
            alt={`Projekto „${project.title}“ kadras`}
            width={dimensions.width}
            height={dimensions.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-card__caption">
          <h3>{project.title}</h3>
          {metadata ? <p>{metadata}</p> : null}
        </div>
      </Link>
    </article>
  );
}
