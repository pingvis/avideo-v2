import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
}

export function ProjectGrid({
  projects,
  emptyMessage = "Darbai ruošiami.",
}: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
