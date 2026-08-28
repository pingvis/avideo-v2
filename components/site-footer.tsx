export function SiteFooter() {
  return (
    <footer id="kontaktai" className="site-footer">
      <div className="page-shell site-footer__inner">
        <div>
          <p className="eyebrow">Kontaktai</p>
          <h2>Naujiems projektams ir bendradarbiavimui.</h2>
        </div>
        <address>
          Augustas Laurinavičius
          <br />
          Lietuva
          <br />
          <a href="mailto:info@avideo.lt">info@avideo.lt</a>
          <br />
          <a
            href="https://instagram.com/augislauris"
            target="_blank"
            rel="noopener noreferrer"
          >
            @augislauris
          </a>
        </address>
        <div className="site-footer__bottom">
          <span>© {new Date().getUTCFullYear()} AVideo</span>
          <a href="#top">Į viršų ↑</a>
        </div>
      </div>
    </footer>
  );
}
