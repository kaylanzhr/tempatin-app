import Link from "next/link";
import type { AdminReport, ReportStatus } from "@/lib/admin/dashboard-data";
import { DashboardState, type DataState } from "./dashboard-state";
import styles from "./admin-dashboard.module.css";

export function StatusBadge({ status }: { status: ReportStatus }) {
  const className = status === "Baru" ? styles.statusNew : styles.statusProgress;
  return <span className={className}>{status}</span>;
}

export function ReportsTable({
  reports,
  state = "ready",
}: {
  reports: AdminReport[];
  state?: DataState;
}) {
  return (
    <section className={styles.reportsCard} aria-labelledby="reports-title">
      <div className={styles.sectionHeadingRow}>
        <h2 id="reports-title">Laporan yang perlu ditangani</h2>
        <Link href="/admin/laporan">Lihat semua <span aria-hidden="true">→</span></Link>
      </div>
      {state !== "ready" ? (
        <DashboardState state={state} emptyMessage="Tidak ada laporan yang perlu ditangani." />
      ) : reports.length === 0 ? (
        <DashboardState state="empty" emptyMessage="Tidak ada laporan yang perlu ditangani." />
      ) : (
        <div className={styles.tableScroller}>
          <table className={styles.reportsTable}>
            <thead>
              <tr>
                <th scope="col">ID / kafe</th>
                <th scope="col">Masalah</th>
                <th scope="col">Masuk</th>
                <th scope="col">Status</th>
                <th scope="col">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <strong>{report.id} · {report.cafe}</strong>
                    <small>{report.category}</small>
                  </td>
                  <td>{report.issue}</td>
                  <td>{report.submittedAt}</td>
                  <td><StatusBadge status={report.status} /></td>
                  <td><Link href={`/admin/laporan/${report.id.toLowerCase()}`}>Lihat detail <span aria-hidden="true">→</span></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
