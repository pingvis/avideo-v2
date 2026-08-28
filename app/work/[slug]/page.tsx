import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import { LiteVideoEmbed } from "@/components/lite-video-embed";
import { getProjectBySlug, listProjectTags } from "@/lib/db/projects";

export const revalidate = 180;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

const getProject = cache(getProjectBySlug);

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Darbas nerastas",
      robots: { index: false, follow: false },
    };
  }

  const description =
    project.shortDescription ?? `${project.title} — AVideo portfolio projektas.`;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      type: "video.other",
      title: project.title,
      description,
      url: `/work/${project.slug}`,
      images: [
        {
          url: project.posterUrl,
          alt: `Projekto „${project.title}“ kadras`,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const tags = await listProjectTags(project.id);
  const metadata = [
    project.client,
    project.year?.toString(),
    project.roles.length > 0 ? project.roles.join(" · ") : null,
  ].filter(Boolean);

  return (
    <main className="page-shell project-page">
      <Link className="back-link" href="/work" prefetch={false}>
        <span aria-hidden="true">←</span> Visi darbai
      </Link>

      <header className="project-header">
        <div>
          <p className="eyebrow">Projektas</p>
          <h1 className="project-title">{project.title}</h1>
          {metadata.length > 0 ? (
            <ul className="project-meta">
              {metadata.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </header>

      <LiteVideoEmbed
        provider={project.provider}
        providerVideoId={project.providerVideoId}
        posterUrl={project.posterUrl}
        posterAlt={`Projekto „${project.title}“ kadras`}
        title={project.title}
        aspectRatio={project.aspectRatio}
        priority
      />

      {project.shortDescription ? (
        <p className="project-copy">{project.shortDescription}</p>
      ) : null}

      {tags.length > 0 ? (
        <ul className="project-tags" aria-label="Projekto sritys">
          {tags.map((tag) => (
            <li key={tag.id}>
              <span>{tag.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
