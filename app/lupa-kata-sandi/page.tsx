import type { Metadata } from "next";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { PromoCard } from "@/components/auth/promo-card";
import { ForgotPasswordForm } from "./forgot-password-form";
import "../login/login.css";
import "./forgot-password.css";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi | Tempat.In",
  description: "Minta tautan untuk mengatur ulang kata sandi akun Tempat.In.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="login-page forgot-password-page">
      <AuthHeader />
      <main className="login-main">
        <div className="login-content-grid">
          <PromoCard />
          <ForgotPasswordForm />
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}

