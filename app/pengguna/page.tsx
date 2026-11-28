import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { ProtectedPlaceholderFallback } from "@/components/placeholder-page";
import { requireRole } from "@/lib/auth/guards";

export const metadata: Metadata = { title: "Area Pengguna | Tempat.In" };

async function RedirectUserHome() {
  await requireRole("pengguna", "/pengguna");
  redirect("/");
  return null;
}

export default function UserAreaPage() {
  return (
    <Suspense fallback={<ProtectedPlaceholderFallback />}>
      <RedirectUserHome />
    </Suspense>
  );
}
