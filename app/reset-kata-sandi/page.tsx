import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { PromoCard } from "@/components/auth/promo-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { resetPassword } from "./actions";
import "../login/login.css";
import "./reset-password.css";

export const metadata: Metadata = {
  title: "Reset Kata Sandi | Tempat.In",
  description: "Buat kata sandi baru untuk akun Tempat.In kamu.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

async function ResetPasswordPanel({ searchParams }: Pick<PageProps<"/reset-kata-sandi">, "searchParams">) {
  const { token_hash: tokenHash } = await searchParams;
  const hasToken = typeof tokenHash === "string" && tokenHash.length > 0 && tokenHash.length <= 256;

  return <ResetPasswordForm action={hasToken ? resetPassword.bind(null, tokenHash) : null} />;
}

export default function ResetPasswordPage({ searchParams }: PageProps<"/reset-kata-sandi">) {
  return (
    <div className="login-page reset-password-page">
      <AuthHeader />
      <main className="login-main">
        <div className="login-content-grid">
          <PromoCard />
          <Suspense fallback={<div className="login-form-panel" role="status">Memuat formulir reset kata sandi…</div>}>
            <ResetPasswordPanel searchParams={searchParams} />
          </Suspense>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
