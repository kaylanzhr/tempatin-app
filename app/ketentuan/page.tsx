import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Ketentuan | Tempat.In" };

export default function TermsPlaceholderPage() {
  return (
    <PlaceholderPage
      eyebrow="DOKUMEN BELUM TERSEDIA"
      title="Ketentuan layanan sedang disiapkan"
      description="Tim belum menyediakan naskah ketentuan resmi. Halaman ini sengaja tidak memuat aturan yang belum disepakati."
    />
  );
}

