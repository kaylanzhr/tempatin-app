export type DashboardMetric = {
  label: string;
  value: string;
  description: string;
};

export type ReservationPoint = {
  date: string;
  shortDate: string;
  count: number;
};

export type ReportStatus = "Baru" | "Ditindaklanjuti" | "Selesai";

export type AdminReport = {
  id: string;
  cafe: string;
  category: string;
  issue: string;
  submittedAt: string;
  status: ReportStatus;
};

export type AdminDashboardData = {
  source: "simulation";
  metrics: DashboardMetric[];
  reservations: ReservationPoint[];
  reports: AdminReport[];
};

export const demoAdminDashboardData: AdminDashboardData = {
  source: "simulation",
  metrics: [
    { label: "Mitra aktif", value: "6", description: "Dari 8 mitra terdaftar" },
    { label: "Akun pengguna", value: "48", description: "Termasuk akun demo" },
    { label: "Reservasi hari ini", value: "24", description: "Di seluruh kafe" },
    { label: "Laporan terbuka", value: "3", description: "1 baru · 2 ditindaklanjuti" },
  ],
  reservations: [
    { date: "18 November 2026", shortDate: "18 Nov", count: 9 },
    { date: "19 November 2026", shortDate: "19 Nov", count: 13 },
    { date: "20 November 2026", shortDate: "20 Nov", count: 11 },
    { date: "21 November 2026", shortDate: "21 Nov", count: 17 },
    { date: "22 November 2026", shortDate: "22 Nov", count: 14 },
    { date: "23 November 2026", shortDate: "23 Nov", count: 20 },
    { date: "24 November 2026", shortDate: "24 Nov", count: 24 },
  ],
  reports: [
    {
      id: "LP-024",
      cafe: "Kafe Nusa",
      category: "Informasi fasilitas",
      issue: "Colokan tidak sesuai",
      submittedAt: "24 Nov · 13.40",
      status: "Baru",
    },
    {
      id: "LP-023",
      cafe: "Ruang Teduh",
      category: "Informasi ketersediaan",
      issue: "Kapasitas perlu diperbarui",
      submittedAt: "24 Nov · 12.10",
      status: "Ditindaklanjuti",
    },
    {
      id: "LP-022",
      cafe: "Sudut Sore",
      category: "Jam operasional",
      issue: "Jam tutup tidak sesuai",
      submittedAt: "23 Nov · 18.20",
      status: "Ditindaklanjuti",
    },
  ],
};
