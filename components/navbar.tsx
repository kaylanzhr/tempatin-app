"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";
import { DemoDialog } from "./demo-dialog";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return <>
    <header className="site-header" onKeyDown={(event) => { if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); } }}>
      <div className="shell flex min-h-[68px] items-center justify-between gap-4">
        <Link href="/" className="header-brand" aria-label="Tempat.In, beranda">
          <Image src="/images/tempatin-logo.png" alt="Logo Tempat.In" width={282} height={295} className="header-logo" preload />
          <span className="wordmark" aria-hidden="true">Tempat<span>.In</span></span>
        </Link>
        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 md:flex"><a href="#cari-kafe">Cari Kafe</a><a href="#cara-kerja">Cara Kerja</a><a href="#faq">FAQ</a></nav>
        <div className="hidden items-center gap-3 md:flex"><button className="button button-quiet" onClick={() => setLoginOpen(true)}>Masuk</button><a href="#cari-kafe" className="button button-primary">Mulai Cari <Icon name="arrow" /></a></div>
        <button ref={menuButton} className="icon-button md:hidden" aria-label={menuOpen ? "Tutup menu" : "Buka menu"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
      </div>
      <nav id="mobile-menu" aria-label="Navigasi seluler" className={`${menuOpen ? "flex" : "hidden"} shell flex-col gap-2 pb-5 md:hidden`}>
        {[ ["#cari-kafe", "Cari Kafe"], ["#cara-kerja", "Cara Kerja"], ["#faq", "FAQ"] ].map(([href, label]) => <a key={href} className="py-3" href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <button className="button button-outline" onClick={() => setLoginOpen(true)}>Masuk</button>
        <a href="#cari-kafe" className="button button-primary" onClick={() => setMenuOpen(false)}>Mulai Cari <Icon name="arrow" /></a>
      </nav>
    </header>
    {loginOpen && <DemoDialog title="Fitur masuk belum tersedia" onClose={() => setLoginOpen(false)}><div className="feature-icon"><Icon name="cup" /></div><p>Fitur login akan tersedia pada tahap pengembangan berikutnya. Saat ini kamu bisa mencari kafe dan melihat detail demo tanpa akun.</p><p className="notice">Belum ada proses login atau reservasi pada demo ini.</p></DemoDialog>}
  </>;
}
