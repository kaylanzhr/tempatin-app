import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Privasi | Tempat.In" };

export default function PrivacyPlaceholderPage() {
  return (
    <PlaceholderPage
      eyebrow="DOKUMEN BELUM TERSEDIA"
      title="Kebijakan privasi sedang disiapkan"
      description="Tim belum menyediakan naskah kebijakan privasi resmi. Halaman ini sengaja tidak memuat ketentuan rekaan."
    />
  );
}

