import Image from "next/image";
import Link from "next/link";

export function AuthHeader() {
  return (
    <header className="login-header">
      <div className="login-header-inner">
        <Link href="/" className="login-brand" aria-label="Tempat.In, beranda">
          <Image
            src="/images/tempatin-logo.png"
            alt=""
            width={282}
            height={295}
            className="login-logo"
            preload
          />
          <span>Tempat.In</span>
        </Link>
        <nav className="login-header-nav" aria-label="Navigasi autentikasi">
          <Link href="/#cari-kafe">Jelajah Tempat</Link>
          <Link href="/#faq">
            <span className="login-help-desktop">Butuh bantuan?</span>
            <span className="login-help-mobile">Bantuan</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

