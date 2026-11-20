import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Lupa Kata Sandi | Tempat.In" };

export default function ForgotPasswordPlaceholderPage() {
  return (
    <PlaceholderPage
      eyebrow="TAHAP BERIKUTNYA"
      title="Pemulihan akun belum tersedia"
      description="Rute lupa kata sandi sudah disiapkan, tetapi pengiriman tautan reset belum termasuk tahap login ini. Tidak ada email yang akan dikirim dari halaman ini."
    />
  );
}

