import Link from "next/link";

export function AuthFooter() {
  return (
    <footer className="login-footer">
      <div className="login-footer-inner">
        <span>© 2026 Tempat.In</span>
        <span className="login-footer-tagline">Find. Book. Chill.</span>
        <nav aria-label="Tautan legal" className="login-legal-nav">
          <Link href="/privasi">Privasi</Link>
          <span aria-hidden="true">·</span>
          <Link href="/ketentuan">Ketentuan</Link>
        </nav>
      </div>
    </footer>
  );
}

