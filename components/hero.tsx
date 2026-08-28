import { LiteVideoEmbed } from "@/components/lite-video-embed";
import type { Project } from "@/types/project";

interface HeroProps {
  showreel: Project | null;
}

export function Hero({ showreel }: HeroProps) {
  return (
    <section className="hero" aria-label="AVideo pristatymas">
      <div className="page-shell">
        {showreel ? (
          <LiteVideoEmbed
            className="hero-player"
            provider={showreel.provider}
            providerVideoId={showreel.providerVideoId}
            posterUrl={showreel.posterUrl}
            posterAlt={`AVideo showreel kadras iš „${showreel.title}“`}
            title={showreel.title}
            aspectRatio={showreel.aspectRatio}
            playLabel="Leisti AVideo showreel"
            priority
            posterOverlay={
              <div className="hero-overlay">
                <div className="hero-identity">
                  <p>Augustas Laurinavičius</p>
                  <h1 id="hero-title">
                    <span>Kamera · Montažas</span>
                    <span>FPV · Motion</span>
                  </h1>
                </div>
                <div className="hero-bottomline">
                  <p>Play showreel</p>
                  <p>Tiems, kurie ieško nebijančio iššūkių.</p>
                </div>
              </div>
            }
          />
        ) : (
          <div className="hero-empty">
            <div>
              <p>Augustas Laurinavičius</p>
              <h1 id="hero-title">
                <span>Kamera · Montažas</span>
                <span>FPV · Motion</span>
              </h1>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
