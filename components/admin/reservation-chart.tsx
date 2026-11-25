import type { ReservationPoint } from "@/lib/admin/dashboard-data";
import { DashboardState, type DataState } from "./dashboard-state";
import styles from "./admin-dashboard.module.css";

export function ReservationChart({
  data,
  state = "ready",
}: {
  data: ReservationPoint[];
  state?: DataState;
}) {
  const maxValue = Math.max(...data.map((point) => point.count), 1);
  const accessibleSummary = data
    .map((point) => `${point.shortDate}: ${point.count} reservasi`)
    .join(", ");

  return (
    <section className={styles.chartCard} aria-labelledby="reservation-chart-title">
      <div>
        <h2 id="reservation-chart-title">Reservasi 7 hari terakhir</h2>
        <p>Seluruh kafe · jumlah reservasi per hari</p>
      </div>
      {state !== "ready" ? (
        <DashboardState state={state} emptyMessage="Belum ada reservasi pada periode ini." />
      ) : data.length === 0 ? (
        <DashboardState state="empty" emptyMessage="Belum ada reservasi pada periode ini." />
      ) : (
        <div
          className={styles.chart}
          role="img"
          aria-label={`Grafik reservasi tujuh hari terakhir. ${accessibleSummary}.`}
        >
          {data.map((point, index) => (
            <div
              className={styles.chartColumn}
              key={point.date}
              title={`${point.date}: ${point.count} reservasi`}
            >
              <span className={styles.chartValue}>{point.count}</span>
              <span
                className={index === data.length - 1 ? styles.chartBarLatest : styles.chartBar}
                style={{ height: `${Math.max((point.count / maxValue) * 104, 18)}px` }}
                aria-hidden="true"
              />
              <span className={styles.chartLabel}>{point.shortDate}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
