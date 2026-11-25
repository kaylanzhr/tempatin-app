"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import styles from "@/components/admin/admin-dashboard.module.css";

export default function AdminDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AdminShell adminName="Administrator">
      <main className={styles.main} id="konten-utama">
        <div className={styles.content}>
          <section className={styles.reportsCard} role="alert">
            <div className={styles.sectionHeadingRow}><h1>Dashboard belum dapat dimuat</h1></div>
            <p>Terjadi kendala saat mengambil data. Coba muat ulang dashboard atau kembali ke halaman masuk.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" className="button button-primary" onClick={reset}>Coba lagi</button>
              <Link href="/login" className="button button-outline">Kembali ke halaman masuk</Link>
            </div>
          </section>
        </div>
      </main>
    </AdminShell>
  );
}
