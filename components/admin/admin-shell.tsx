"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Icon, type IconName } from "@/components/icon";
import { logoutAdmin } from "@/app/admin/actions";
import styles from "./admin-dashboard.module.css";

const mainNavigation: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Dashboard", href: "/admin", icon: "dashboard" },
  { label: "Database Mitra", href: "/admin/mitra", icon: "database" },
  { label: "User & Role", href: "/admin/pengguna", icon: "users" },
  { label: "Laporan", href: "/admin/laporan", icon: "report" },
  { label: "Log Aktivitas", href: "/admin/log-aktivitas", icon: "activity" },
];

function Brand() {
  return (
    <Link href="/admin" className={styles.brand} aria-label="Tempat.In, dashboard admin">
      <span className={styles.brandMark} aria-hidden="true"><Icon name="cup" /></span>
      <span>Tempat.In</span>
    </Link>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className={styles.sidebarTop}>
        <Brand />
        <p className={styles.sidebarEyebrow}>Ruang Admin</p>
        <div className={styles.contextPanel}>
          <strong>Kelola Tempat.In</strong>
          <span>Akses administrator</span>
        </div>
        <nav className={styles.navigation} aria-label="Navigasi admin">
          {mainNavigation.map((item) => {
            const active = item.href === "/admin";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? styles.navItemActive : styles.navItem}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className={styles.sidebarBottom}>
        <Link href="/admin/pengaturan" className={styles.navItem} onClick={onNavigate}>
          <Icon name="settings" />
          <span>Pengaturan Akun</span>
        </Link>
        <form action={logoutAdmin}>
          <button type="submit" className={styles.logoutButton}>
            <Icon name="logout" />
            <span>Keluar</span>
          </button>
        </form>
      </div>
    </>
  );
}

export function AdminShell({
  adminName,
  children,
}: {
  adminName: string;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  }

  function handleDrawerKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className={styles.adminShell}>
      <a href="#konten-utama" className="skip-link">Lewati ke konten utama</a>
      <aside className={styles.sidebar} aria-label="Menu admin">
        <SidebarContent />
      </aside>

      {menuOpen && (
        <div
          className={styles.drawerLayer}
          role="presentation"
        >
          <button className={styles.drawerBackdrop} tabIndex={-1} onClick={closeMenu} aria-label="Tutup menu admin" />
          <aside
            ref={drawerRef}
            className={styles.drawer}
            aria-label="Menu admin seluler"
            aria-modal="true"
            role="dialog"
            onKeyDown={handleDrawerKeyDown}
          >
            <button ref={closeButtonRef} type="button" className={styles.drawerClose} onClick={closeMenu} aria-label="Tutup menu">
              <Icon name="close" />
            </button>
            <SidebarContent onNavigate={closeMenu} />
          </aside>
        </div>
      )}

      <div className={styles.pageColumn}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              aria-label="Buka menu admin"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <p className={styles.breadcrumb}><span>Tempat.In</span><span>/</span><span>Admin</span><span>/</span><strong>Dashboard</strong></p>
          </div>
          <div className={styles.adminIdentity}>
            <span className={styles.simulationBadge}>Data simulasi</span>
            <span className={styles.avatar} aria-hidden="true">AD</span>
            <span className={styles.identityCopy}>
              <strong>{adminName}</strong>
              <small>Administrator</small>
            </span>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
