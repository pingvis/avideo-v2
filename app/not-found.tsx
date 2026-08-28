import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <h1>404</h1>
        <p>Šio darbo čia nėra.</p>
        <Link className="text-link" href="/work" prefetch={false}>
          Grįžti į darbus <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
