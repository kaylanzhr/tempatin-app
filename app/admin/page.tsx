import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { MetricCard } from "@/components/admin/metric-card";
import { PartnerActionPanel } from "@/components/admin/partner-action-panel";
import { ReportsTable } from "@/components/admin/reports-table";
import { ReservationChart } from "@/components/admin/reservation-chart";
import styles from "@/components/admin/admin-dashboard.module.css";
import { requireRole } from "@/lib/auth/guards";
import { demoAdminDashboardData } from "@/lib/admin/dashboard-data";

export const metadata: Metadata = {
  title: "Dashboard Admin | Tempat.In",
  description: "Pantau aktivitas platform dan kelola data Tempat.In yang perlu ditindaklanjuti.",
};

function formatDashboardDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(date);
}

async function AdminDashboardContent() {
  const profile = await requireRole("admin", "/admin");
  const adminName = profile.fullName?.trim() || "Admin Tempat.In";
  const dashboardDate = formatDashboardDate(new Date());
  const data = demoAdminDashboardData;

  return (
    <AdminShell adminName={adminName}>
      <main className={styles.main} id="konten-utama">
        <div className={styles.content}>
          <section className={styles.intro} aria-labelledby="admin-dashboard-title">
            <div>
              <h1 id="admin-dashboard-title">Dashboard Admin</h1>
              <p>Pantau aktivitas platform dan kelola data yang perlu ditindaklanjuti.</p>
            </div>
            <time className={styles.datePill} dateTime={new Date().toISOString()}>{dashboardDate}</time>
          </section>

          <section className={styles.metricsGrid} aria-label="Ringkasan platform, data simulasi">
            {data.metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
          </section>

          <div className={styles.activityGrid}>
            <ReservationChart data={data.reservations} />
            <PartnerActionPanel />
          </div>

          <ReportsTable reports={data.reports} />

          <footer className={styles.footer}>
            <span>© 2026 Tempat.In · Ruang Admin</span>
            <span>Find. Book. Chill.</span>
          </footer>
        </div>
      </main>
    </AdminShell>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<AdminDashboardLoading />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

function AdminDashboardLoading() {
  return (
    <AdminShell adminName="Administrator">
      <main className={styles.main} id="konten-utama" aria-busy="true">
        <div className={styles.content}>
          <div className={styles.intro}><div><h1>Dashboard Admin</h1><p>Memuat aktivitas platform...</p></div></div>
          <div className={styles.metricsGrid}>{Array.from({ length: 4 }, (_, index) => <div className={styles.skeletonCard} key={index} />)}</div>
          <div className={styles.activityGrid}><div className={styles.skeletonWide} /><div className={styles.skeletonWide} /></div>
          <div className={styles.skeletonWide} />
        </div>
      </main>
    </AdminShell>
  );
}
