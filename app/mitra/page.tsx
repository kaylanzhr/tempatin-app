import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ProtectedPlaceholderFallback,
  ProtectedPlaceholderPage,
} from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Dashboard Mitra | Tempat.In" };

export default function PartnerAreaPage() {
  return (
    <Suspense fallback={<ProtectedPlaceholderFallback />}>
      <ProtectedPlaceholderPage
        role="mitra"
        currentPath="/mitra"
        title="Dashboard Mitra"
        description="Tujuan login Mitra sudah terlindungi berdasarkan role akun. Dashboard operasional akan dikerjakan pada tahap Mitra."
      />
    </Suspense>
  );
}

