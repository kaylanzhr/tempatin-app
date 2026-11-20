import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { LoginForm } from "@/components/auth/login-form";
import { PromoCard } from "@/components/auth/promo-card";
import "./login.css";

export const metadata: Metadata = {
  title: "Masuk | Tempat.In",
  description: "Masuk ke Tempat.In untuk melanjutkan pencarian dan reservasi tempat nyamanmu.",
};

export default function LoginPage() {
  return (
    <div className="login-page">
      <AuthHeader />
      <main className="login-main">
        <div className="login-content-grid">
          <PromoCard />
          <Suspense fallback={<div className="login-form-panel" aria-label="Memuat formulir masuk" />}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}

