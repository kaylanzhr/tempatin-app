import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Daftar | Tempat.In" };

export default function RegisterPlaceholderPage() {
  return (
    <PlaceholderPage
      eyebrow="TAHAP BERIKUTNYA"
      title="Pendaftaran belum tersedia"
      description="Rute pendaftaran sudah disiapkan agar tautan dari halaman masuk tidak buntu. Formulir pendaftaran akan dikerjakan pada tahap registrasi pengguna."
    />
  );
}

