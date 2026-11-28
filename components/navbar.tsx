"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header className="site-header" onKeyDown={(event) => { if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <div className="shell flex min-h-[68px] items-center justify-between gap-4">
        <Link href="/" className="header-brand" aria-label="Tempat.In, beranda">
          <Image src="/images/tempatin-logo.png" alt="Logo Tempat.In" width={282} height={295} className="header-logo" preload />
          <span className="wordmark" aria-hidden="true">Tempat<span>.In</span></span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex"><Link href="/jelajah-tempat">Jelajah Tempat</Link><Link href="/#cara-kerja">Cara Kerja</Link><Link href="/#faq">FAQ</Link></nav>
        <div className="hidden items-center gap-3 md:flex"><Link className="button button-quiet" href="/login">Masuk</Link><Link href="/jelajah-tempat" className="button button-primary">Mulai Cari <Icon name="arrow" /></Link></div>
        <button ref={menuButton} className="icon-button md:hidden" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
      </div>
      <nav id="mobile-menu" aria-label="Navigasi seluler" className={`${menuOpen ? "flex" : "hidden"} shell flex-col gap-2 pb-5 md:hidden`}>
        {[ ["/jelajah-tempat", "Jelajah Tempat"], ["/#cara-kerja", "Cara Kerja"], ["/#faq", "FAQ"] ].map(([href, label]) => <Link key={href} className="py-3" href={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
        <Link className="button button-outline" href="/login" onClick={() => setMenuOpen(false)}>Masuk</Link>
        <Link href="/jelajah-tempat" className="button button-primary" onClick={() => setMenuOpen(false)}>Mulai Cari <Icon name="arrow" /></Link>
      </nav>
    </header>
  );
}
