import styles from "./admin-dashboard.module.css";

export type DataState = "ready" | "loading" | "empty" | "error";

export function DashboardState({
  state,
  emptyMessage,
}: {
  state: Exclude<DataState, "ready">;
  emptyMessage: string;
}) {
  if (state === "loading") {
    return <div className={styles.sectionState} role="status">Memuat data dashboard...</div>;
  }

  if (state === "error") {
    return <div className={styles.sectionState} role="alert">Data belum dapat dimuat. Coba lagi beberapa saat.</div>;
  }

  return <div className={styles.sectionState}>{emptyMessage}</div>;
}
