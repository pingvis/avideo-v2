import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell site-header__inner">
        <Link className="site-logo" href="/" aria-label="AVideo pradinis puslapis">
          AVIDEO
        </Link>
        <nav className="site-nav" aria-label="Pagrindinė navigacija">
          <Link href="/work" prefetch={false}>
            Darbai
          </Link>
          <Link href="/#apie">Apie</Link>
          <Link href="/#kontaktai">Kontaktai</Link>
        </nav>
      </div>
    </header>
  );
}
