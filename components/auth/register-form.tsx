"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { register, type RegistrationState } from "@/app/daftar/actions";
import { Icon, type IconName } from "@/components/icon";
import {
  registrationPasswordMinimum,
  validateRegistration,
  type RegistrationErrors,
  type RegistrationFields,
} from "@/lib/auth/registration";

type FieldName = keyof RegistrationFields;
type ErrorField = keyof RegistrationErrors;

type Field = {
  name: FieldName;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  autoComplete: string;
  icon: IconName;
  hint?: string;
};

const fields: Field[] = [
  { name: "fullName", label: "Nama lengkap", placeholder: "Nama lengkap kamu", type: "text", autoComplete: "name", icon: "user" },
  { name: "email", label: "Email", placeholder: "nama@email.com", type: "email", autoComplete: "email", icon: "mail" },
  {
    name: "password",
    label: "Kata sandi",
    placeholder: "Buat kata sandi",
    type: "password",
    autoComplete: "new-password",
    icon: "lock",
    hint: `Minimal ${registrationPasswordMinimum} karakter.`,
  },
  { name: "confirmation", label: "Konfirmasi kata sandi", placeholder: "Ulangi kata sandi", type: "password", autoComplete: "new-password", icon: "lock" },
];

const initialState: RegistrationState = { status: "idle" };
const exploreHref = "/#cari-kafe";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);
  const [clientErrors, setClientErrors] = useState<RegistrationErrors>({});
  const [editedFields, setEditedFields] = useState<Set<ErrorField>>(() => new Set());
  const [agreed, setAgreed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const submitting = useRef(false);
  const complete = state.status === "verification" || state.status === "registered";

  useEffect(() => {
    submitting.current = false;
    if (state.status === "invalid") {
      focusFirstError(formRef.current, state.errors);
    } else if (state.status !== "idle") {
      feedbackRef.current?.focus();
    }
  }, [state]);

  function getError(name: ErrorField) {
    if (pending) return undefined;

    return clientErrors[name] ?? (state.status === "invalid" && !editedFields.has(name)
      ? state.errors[name]
      : undefined);
  }

  function clearErrors(...names: ErrorField[]) {
    if (state.status === "invalid") {
      setEditedFields((current) => new Set([...current, ...names]));
    }
    setClientErrors((current) => {
      if (!names.some((name) => current[name])) return current;

      const remaining = { ...current };
      for (const name of names) delete remaining[name];
      return remaining;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || submitting.current) return;

    const formData = new FormData(event.currentTarget);
    const { errors } = validateRegistration(formData);
    setClientErrors(errors);

    if (Object.keys(errors).length) {
      focusFirstError(event.currentTarget, errors);
      return;
    }

    submitting.current = true;
    setEditedFields(new Set());
    // Dispatch directly to keep the form values after a recoverable error.
    startTransition(() => formAction(formData));
  }

  const termsError = getError("terms");

  return (
    <section className="register-panel" aria-labelledby="register-heading">
      <div className="register-intro">
        <h1 id="register-heading">Mulai dari tempat yang pas.</h1>
        <p>Bikin akun dan temukan tempat nugas favoritmu.</p>
      </div>

      {complete ? (
        <div className="register-feedback register-success" ref={feedbackRef} tabIndex={-1}>
          {state.status === "verification" ? (
            <>
              <h2>Periksa emailmu</h2>
              <p>
                Cek kotak masuk dan folder spam. Jika ada email verifikasi dari Tempat.In,
                buka tautannya untuk memverifikasi alamat emailmu, lalu masuk.
                Kalau sudah punya akun, kamu bisa langsung masuk.
              </p>
              <Link href={`/login?next=${encodeURIComponent(exploreHref)}`}>Masuk</Link>
            </>
          ) : (
            <>
              <h2>Pendaftaran berhasil</h2>
              <p>Akunmu sudah aktif. Yuk, cari tempat nugas yang pas.</p>
              <Link href={exploreHref}>Jelajah Tempat</Link>
            </>
          )}
        </div>
      ) : (
        <>
          {state.status === "error" && !pending && (
            <div className="register-feedback login-form-error" ref={feedbackRef} tabIndex={-1}>
              {state.message}
            </div>
          )}

          <form ref={formRef} action={formAction} onSubmit={handleSubmit} noValidate aria-busy={pending}>
            <fieldset className="register-fields" disabled={pending}>
              {fields.map((field) => (
                <RegisterField
                  key={field.name}
                  field={field}
                  error={getError(field.name)}
                  onChange={() => {
                    if (field.name === "password") clearErrors("password", "confirmation");
                    else clearErrors(field.name);
                  }}
                />
              ))}

              <div className="register-terms">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => {
                    setAgreed(event.target.checked);
                    clearErrors("terms");
                  }}
                  required
                  aria-invalid={Boolean(termsError)}
                  aria-describedby={termsError ? "terms-error" : undefined}
                />
                <label htmlFor="terms">
                  Aku setuju dengan <Link href="/ketentuan" target="_blank">Ketentuan Layanan</Link>
                  {" dan "}<Link href="/privasi" target="_blank">Kebijakan Privasi</Link> Tempat.In.
                </label>
                {termsError && <p id="terms-error" className="login-inline-error">{termsError}</p>}
              </div>

              <button className="login-submit-button register-submit" type="submit" disabled={pending}>
                {pending ? "Sedang mendaftar..." : "Daftar"}
              </button>
            </fieldset>
          </form>

          <p className="login-register-prompt register-login-prompt">
            Sudah punya akun? <Link href="/login">Masuk</Link>
          </p>
        </>
      )}
    </section>
  );
}

function focusFirstError(form: HTMLFormElement | null, errors: RegistrationErrors) {
  const firstField = Object.keys(errors)[0];
  if (!firstField) return;

  const input = form?.elements.namedItem(firstField);
  if (input instanceof HTMLInputElement) input.focus();
}

function RegisterField({ field, error, onChange }: {
  field: Field;
  error?: string;
  onChange: () => void;
}) {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const { name, label, type, hint } = field;
  const describedBy = [error && `${name}-error`, hint && `${name}-hint`].filter(Boolean).join(" ");

  return (
    <div className="login-field-group">
      <label htmlFor={name}>{label}</label>
      <div className={`login-input-shell${error ? " login-input-error" : ""}`}>
        <span className="login-leading-icon"><Icon name={field.icon} /></span>
        <input
          id={name}
          name={name}
          type={visible ? "text" : type}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onChange();
          }}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
        {type === "password" && (
          <button
            type="button"
            className="login-password-toggle"
            onClick={() => setVisible(!visible)}
            aria-label={`${visible ? "Sembunyikan" : "Tampilkan"} ${label.toLowerCase()}`}
            aria-controls={name}
          >
            <Icon name={visible ? "eyeOff" : "eye"} />
          </button>
        )}
      </div>
      {hint && <p id={`${name}-hint`} className="register-hint">{hint}</p>}
      {error && <p id={`${name}-error`} className="login-inline-error">{error}</p>}
    </div>
  );
}
