import Link from "next/link";

import { Hero } from "@/components/hero";
import { ProjectGrid } from "@/components/project-grid";
import { getShowreel, listFeaturedProjects } from "@/lib/db/projects";

export const revalidate = 180;

const capabilities = ["Kamera", "Montažas", "FPV", "Motion", "Live production"];

export default async function HomePage() {
  const [showreel, featuredProjects] = await Promise.all([
    getShowreel(),
    listFeaturedProjects(),
  ]);

  return (
    <main>
      <Hero showreel={showreel} />

      <section className="page-shell section-space" aria-labelledby="selected-work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 id="selected-work-title">Atrinkti darbai</h2>
          </div>
          <Link className="text-link" href="/work" prefetch={false}>
            Visi darbai <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ProjectGrid
          projects={featuredProjects}
          emptyMessage="Atrinkti darbai ruošiami."
        />
      </section>

      <section id="apie" className="capabilities-band" aria-labelledby="capabilities-title">
        <div className="page-shell capabilities-layout">
          <div>
            <p className="eyebrow">Nuo kadro iki transliacijos</p>
            <h2 id="capabilities-title">Daugiau nei viena perspektyva.</h2>
          </div>
          <ul className="capabilities-list" aria-label="Kūrybinės sritys">
            {capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
