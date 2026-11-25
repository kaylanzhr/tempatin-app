import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ProtectedPlaceholderFallback,
  ProtectedPlaceholderPage,
} from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Area Pengguna | Tempat.In" };

export default function UserAreaPage() {
  return (
    <Suspense fallback={<ProtectedPlaceholderFallback />}>
      <ProtectedPlaceholderPage
        role="pengguna"
        currentPath="/pengguna"
        title="Kamu berhasil masuk"
        description="Ini adalah tujuan sementara untuk akun Pengguna. Fitur pencarian tetap dapat diakses dari beranda."
      />
    </Suspense>
  );
}

