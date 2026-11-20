"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useState, type FormEvent } from "react";
import { login, type LoginState } from "@/app/login/actions";

type ClientErrors = NonNullable<LoginState["errors"]>;
const initialLoginState: LoginState = {};

function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function LockIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" />{hidden && <path d="m4 4 16 16" />}</svg>;
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialLoginState);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientErrors, setClientErrors] = useState<ClientErrors>({});
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";
  const statusMessage =
    searchParams.get("status") === "akun-tidak-aktif"
      ? "Akunmu sedang tidak aktif. Hubungi pengelola Tempat.In untuk bantuan."
      : null;
  const emailError = clientErrors.email?.[0] ?? state.errors?.email?.[0];
  const passwordError = clientErrors.password?.[0] ?? state.errors?.password?.[0];

  function validate(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const errors: ClientErrors = {};

    if (!email) errors.email = ["Email wajib diisi."];
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = ["Masukkan alamat email yang valid."];
    }
    if (!password) errors.password = ["Kata sandi wajib diisi."];

    setClientErrors(errors);
    if (Object.keys(errors).length > 0) event.preventDefault();
  }

  return (
    <section className="login-form-panel" aria-labelledby="login-heading">
      <div className="login-form-intro">
        <h2 id="login-heading">Balik nugas lagi, yuk!</h2>
        <p>Masuk buat lanjut cari tempat nyamanmu.</p>
      </div>

      {(state.message || statusMessage) && (
        <p className="login-form-error" role="alert" aria-live="assertive">
          {state.message ?? statusMessage}
        </p>
      )}

      <form action={formAction} onSubmit={validate} noValidate aria-busy={pending}>
        <input type="hidden" name="next" value={next} />
        <div className="login-field-group">
          <label htmlFor="email">Email</label>
          <div className={`login-input-shell ${emailError ? "login-input-error" : ""}`}>
            <span className="login-leading-icon"><MailIcon /></span>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setClientErrors((current) => ({ ...current, email: undefined }));
              }}
              autoComplete="username"
              placeholder="Masukkan email kamu"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "email-error" : undefined}
            />
          </div>
          {emailError && <p id="email-error" className="login-inline-error">{emailError}</p>}
        </div>

        <div className="login-field-group">
          <label htmlFor="password">Kata sandi</label>
          <div className={`login-input-shell ${passwordError ? "login-input-error" : ""}`}>
            <span className="login-leading-icon"><LockIcon /></span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setClientErrors((current) => ({ ...current, password: undefined }));
              }}
              autoComplete="current-password"
              placeholder="Masukkan kata sandi"
              aria-invalid={Boolean(passwordError)}
              aria-describedby={passwordError ? "password-error" : undefined}
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              aria-pressed={showPassword}
            >
              <EyeIcon hidden={showPassword} />
            </button>
          </div>
          {passwordError && <p id="password-error" className="login-inline-error">{passwordError}</p>}
        </div>

        <div className="login-form-options">
          <label className="login-remember-label">
            <input type="checkbox" name="remember" />
            <span>Ingat saya</span>
          </label>
          <Link href="/lupa-kata-sandi">Lupa kata sandi?</Link>
        </div>

        <button className="login-submit-button" type="submit" disabled={pending}>
          {pending ? "Sedang masuk..." : "Masuk"}
        </button>

        <p className="login-register-prompt">
          Belum punya akun? <Link href="/daftar">Daftar sekarang</Link>
        </p>
      </form>
    </section>
  );
}

