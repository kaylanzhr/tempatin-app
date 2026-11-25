import { AdminShell } from "@/components/admin/admin-shell";
import styles from "@/components/admin/admin-dashboard.module.css";

export default function LoadingAdminDashboard() {
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
