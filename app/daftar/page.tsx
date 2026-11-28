import type { Metadata } from "next";
import { AuthFooter } from "@/components/auth/auth-footer";
import { AuthHeader } from "@/components/auth/auth-header";
import { PromoCard } from "@/components/auth/promo-card";
import { RegisterForm } from "@/components/auth/register-form";
import "../login/login.css";
import "./register.css";

export const metadata: Metadata = {
  title: "Daftar | Tempat.In",
  description: "Bikin akun Tempat.In dan temukan tempat nugas favoritmu.",
};

export default function RegisterPage() {
  return (
    <div className="login-page register-page">
      <AuthHeader />
      <main className="register-main">
        <div className="register-grid">
          <RegisterForm />
          <PromoCard headingLevel={2} />
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}

