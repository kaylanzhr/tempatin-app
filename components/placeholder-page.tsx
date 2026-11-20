import Link from "next/link";
import type { ReactNode } from "react";
import { requireRole } from "@/lib/auth/guards";
import type { AccountRole } from "@/lib/auth/roles";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  children,
}: PlaceholderPageProps) {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-5 py-12">
      <section className="w-full max-w-xl rounded-3xl border border-line bg-paper p-7 shadow-[0_18px_60px_#3b23140d] sm:p-10">
        <Link href="/" className="header-brand mb-10" aria-label="Tempat.In, beranda">
          <span className="wordmark">Tempat<span>.In</span></span>
        </Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-5 leading-7 text-muted">{description}</p>
        {children}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="button button-primary" href="/login">Kembali ke halaman masuk</Link>
          <Link className="button button-outline" href="/">Ke beranda</Link>
        </div>
      </section>
    </main>
  );
}

export async function ProtectedPlaceholderPage({
  role,
  currentPath,
  title,
  description,
}: {
  role: AccountRole;
  currentPath: string;
  title: string;
  description: string;
}) {
  await requireRole(role, currentPath);

  return (
    <PlaceholderPage
      eyebrow="PLACEHOLDER TERLINDUNGI"
      title={title}
      description={description}
    >
      <p className="notice mt-6">
        Sesi dan role sudah diverifikasi di server. Isi dashboard belum termasuk tahap implementasi login ini.
      </p>
    </PlaceholderPage>
  );
}

export function ProtectedPlaceholderFallback() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-5">
      <p className="text-sm text-muted" role="status">Memeriksa akses akun...</p>
    </main>
  );
}

