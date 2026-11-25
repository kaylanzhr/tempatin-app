import Link from "next/link";
import { Icon } from "@/components/icon";
import styles from "./admin-dashboard.module.css";

export function PartnerActionPanel() {
  return (
    <aside className={styles.partnerPanel} aria-labelledby="partner-panel-title">
      <div>
        <h2 id="partner-panel-title">Tambahkan mitra baru</h2>
        <p>Siapkan data kafe dan akun mitranya agar bisa mulai memakai Tempat.In.</p>
        <Link href="/admin/mitra/tambah" className={styles.primaryAction}>
          <Icon name="plus" />
          Tambah Mitra
        </Link>
      </div>
      <small>Mitra dibuat dan diaktifkan oleh admin.</small>
    </aside>
  );
}
