"use client";

import Link from "next/link";
import { useActionState, useState, type FormEvent } from "react";
import type { ResetPasswordState } from "@/app/reset-kata-sandi/actions";
import {
  minimumPasswordLength,
  validatePasswords,
  type PasswordErrors,
} from "@/app/reset-kata-sandi/validation";

type ResetAction = (state: ResetPasswordState, formData: FormData) => Promise<ResetPasswordState>;

type PasswordFieldProps = {
  name: "password" | "confirmation";
  label: string;
  placeholder: string;
  error?: string;
  hint?: string;
};

function PasswordField({ name, label, placeholder, error, hint }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("");
  const id = `reset-${name}`;
  const descriptionId = `${id}-description`;

  return (
    <div className="login-field-group">
      <label htmlFor={id}>{label}</label>
      <div className={`login-input-shell${error ? " login-input-error" : ""}`}>
        <span className="login-leading-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="10" width="14" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </span>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="new-password"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={placeholder}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error || hint ? descriptionId : undefined}
        />
        <button
          type="button"
          className="login-password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={`Tampilkan ${label.toLowerCase()}`}
          aria-pressed={visible}
          aria-controls={id}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.5" />
            {visible && <path d="m4 4 16 16" />}
          </svg>
        </button>
      </div>
      {error ? (
        <p id={descriptionId} className="login-inline-error" role="alert">{error}</p>
      ) : hint && (
        <p id={descriptionId} className="reset-password-hint">{hint}</p>
      )}
    </div>
  );
}

function ResetPasswordFields({ action }: { action: ResetAction }) {
  const [state, formAction, pending] = useActionState(action, {});
  const [clientErrors, setClientErrors] = useState<PasswordErrors | null>(null);
  const errors = clientErrors ?? state.errors;

  function validate(event: FormEvent<HTMLFormElement>) {
    const { errors } = validatePasswords(new FormData(event.currentTarget));
    if (Object.keys(errors).length) {
      event.preventDefault();
      setClientErrors(errors);
    } else {
      setClientErrors(null);
    }
  }

  if (state.success) {
    return (
      <div className="reset-password-result">
        <p className="reset-password-success" role="status">
          Kata sandi berhasil disimpan. Masuk dengan kata sandi barumu.
        </p>
        <Link href="/login" className="login-submit-button reset-password-link">Masuk</Link>
      </div>
    );
  }

  if (state.invalidLink) return <InvalidRecoveryLink />;

  return (
    <form action={formAction} onSubmit={validate} noValidate aria-busy={pending}>
      {state.message && <p className="login-form-error" role="alert">{state.message}</p>}
      <PasswordField
        name="password"
        label="Kata sandi baru"
        placeholder="Masukkan kata sandi baru"
        hint={`Minimal ${minimumPasswordLength} karakter.`}
        error={errors?.password}
      />
      <PasswordField
        name="confirmation"
        label="Konfirmasi kata sandi baru"
        placeholder="Ulangi kata sandi baru"
        error={errors?.confirmation}
      />
      <button className="login-submit-button" type="submit" disabled={pending}>
        {pending ? "Menyimpan kata sandi…" : "Simpan Kata Sandi"}
      </button>
      <p className="login-register-prompt">
        Setelah tersimpan, masuk pakai kata sandi barumu.
      </p>
    </form>
  );
}

function InvalidRecoveryLink() {
  return (
    <div className="reset-password-result">
      <p className="login-form-error" role="alert">
        Tautan reset kata sandi tidak valid atau sudah kedaluwarsa.
      </p>
      <Link href="/lupa-kata-sandi" className="login-submit-button reset-password-link">
        Kembali ke Lupa Kata Sandi
      </Link>
    </div>
  );
}

export function ResetPasswordForm({ action }: { action: ResetAction | null }) {
  return (
    <section className="login-form-panel" aria-labelledby="reset-password-heading">
      <div className="login-form-intro">
        <h2 id="reset-password-heading">Bikin kata sandi baru.</h2>
        <p>Satu langkah lagi buat kembali ke Tempat.In.</p>
      </div>
      {action ? <ResetPasswordFields action={action} /> : <InvalidRecoveryLink />}
    </section>
  );
}
