"use client";

import Link from "next/link";
import { useActionState, useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { requestPasswordReset, type ForgotPasswordState } from "./actions";
import { maxEmailLength, validateEmail } from "./email";

const initialState: ForgotPasswordState = { status: "idle" };

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18v14H3zM3 6l9 8 9-8" />
    </svg>
  );
}

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);
  const [editedEmail, setEditedEmail] = useState<string>();
  const [clientError, setClientError] = useState<string>();
  const email = editedEmail ?? (state.status === "idle" ? "" : state.email);
  const responseApplies =
    !pending && !clientError && state.status !== "idle" && state.email === email.trim();
  const emailError =
    clientError ?? (responseApplies && state.status === "invalid" ? state.message : undefined);
  const requestError = responseApplies && state.status === "error" ? state.message : undefined;
  const accepted = responseApplies && state.status === "accepted";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const field = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const error = validateEmail(field.value);
    setClientError(error);
    if (error) {
      event.preventDefault();
      field.focus();
    }
  }

  return (
    <section
      className="login-form-panel forgot-password-panel"
      aria-labelledby="forgot-password-heading"
    >
      <div className="login-form-intro">
        <h2 id="forgot-password-heading">Lupa kata sandi?</h2>
        <p>Tenang, kita bantu kamu masuk lagi.</p>
      </div>

      <Link href="/login" className="forgot-password-back">
        <Icon name="arrow" />
        Kembali ke Masuk
      </Link>

      <form action={formAction} onSubmit={handleSubmit} noValidate aria-busy={pending}>
        <div className="login-field-group">
          <label htmlFor="recovery-email">Email</label>
          <div className={`login-input-shell${emailError ? " login-input-error" : ""}`}>
            <span className="login-leading-icon"><MailIcon /></span>
            <input
              id="recovery-email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              maxLength={maxEmailLength}
              placeholder="Email yang kamu daftarkan"
              value={email}
              onChange={(event) => {
                setEditedEmail(event.target.value);
                setClientError(undefined);
              }}
              readOnly={pending}
              required
              aria-invalid={Boolean(emailError)}
              aria-describedby={
                emailError ? "recovery-email-error recovery-email-hint" : "recovery-email-hint"
              }
            />
          </div>
          {emailError && (
            <p id="recovery-email-error" className="login-inline-error" role="alert">
              {emailError}
            </p>
          )}
        </div>

        <p id="recovery-email-hint" className="forgot-password-hint">
          Kami akan kirim tautan untuk mengatur ulang kata sandi ke email kamu.
        </p>

        <button className="login-submit-button" type="submit" disabled={pending}>
          {pending ? "Mengirim tautan..." : "Kirim Tautan Reset"}
        </button>
        {requestError && <p className="login-form-error" role="alert">{requestError}</p>}
      </form>

      <div className="forgot-password-notice" data-accepted={accepted} role="status">
        <MailIcon />
        <div>
          <p>Cek inbox dan folder spam, ya.</p>
          <p>
            {accepted
              ? "Jika email kamu terdaftar, kamu akan menerima tautan untuk mengatur ulang kata sandi."
              : "Pastikan email yang kamu isi sudah benar."}
          </p>
        </div>
      </div>
    </section>
  );
}
