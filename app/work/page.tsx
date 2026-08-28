import type { Metadata } from "next";
import { ProjectGrid } from "@/components/project-grid";
import { listPublishedProjects, listPublishedTags } from "@/lib/db/projects";

export const metadata: Metadata = {
  title: "Darbai",
  description: "AVideo publikuotų video projektų archyvas.",
  alternates: {
    canonical: "/work",
  },
};

export const revalidate = 180;

export default async function WorkPage() {
  const [tags, projects] = await Promise.all([
    listPublishedTags(),
    listPublishedProjects(),
  ]);

  return (
    <main className="page-shell">
      <header className="archive-header">
        <div>
          <p className="eyebrow">Portfolio archyvas</p>
          <h1>Darbai</h1>
        </div>
        <p className="archive-count">
          {projects.length} {projects.length === 1 ? "projektas" : "projektai"}
        </p>

        {tags.length > 0 ? (
          <div className="archive-filters" aria-label="Projektų sritys">
            <ul className="tag-filter">
              {tags.map((tag) => (
                <li key={tag.id}>
                  <span>{tag.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </header>

      <section className="archive-grid-space" aria-label="Publikuoti darbai">
        <ProjectGrid projects={projects} emptyMessage="Publikuotų darbų kol kas nėra." />
      </section>
    </main>
  );
}
