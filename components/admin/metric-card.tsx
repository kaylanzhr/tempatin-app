import type { DashboardMetric } from "@/lib/admin/dashboard-data";
import styles from "./admin-dashboard.module.css";

export function MetricCard({ metric }: { metric: DashboardMetric }) {
  return (
    <article className={styles.metricCard}>
      <p>{metric.label}</p>
      <strong>{metric.value}</strong>
      <span>{metric.description}</span>
    </article>
  );
}
