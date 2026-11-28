"use server";

import { getAccountProfile } from "@/lib/auth/roles";
import { validateRegistration, type RegistrationErrors } from "@/lib/auth/registration";
import { createServerSupabaseClient, setRememberPreference } from "@/lib/supabase/server";

export type RegistrationState =
  | { status: "idle" }
  | { status: "invalid"; errors: RegistrationErrors }
  | { status: "error"; message: string }
  | { status: "verification" }
  | { status: "registered" };

const retryMessage = "Pendaftaran belum bisa diproses. Coba lagi sebentar lagi.";

export async function register(
  _previousState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const { fields, errors } = validateRegistration(formData);
  if (Object.keys(errors).length) return { status: "invalid", errors };

  try {
    const supabase = await createServerSupabaseClient(false);
    if (!supabase) {
      return {
        status: "error",
        message: "Konfigurasi autentikasi belum tersedia. Hubungi pengelola Tempat.In.",
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: { data: { full_name: fields.fullName } },
    });

    if (error) return handleSignupError(error.code, error.status);
    if (!data.user) return { status: "error", message: retryMessage };

    // Supabase can return an obfuscated user for an existing email without a session.
    if (!data.session) return { status: "verification" };

    const profile = await getAccountProfile(supabase, data.user.id);
    if (profile?.role !== "pengguna" || !profile.isActive) {
      await supabase.auth.signOut({ scope: "local" });
      return {
        status: "error",
        message: "Profil akun belum siap digunakan. Hubungi pengelola Tempat.In.",
      };
    }

    await setRememberPreference(false);
    return { status: "registered" };
  } catch {
    return { status: "error", message: retryMessage };
  }
}

function handleSignupError(code?: string, status?: number): RegistrationState {
  switch (code) {
    case "user_already_exists":
    case "email_exists":
      return {
        status: "error",
        message: "Pendaftaran tidak bisa dilanjutkan. Jika kamu sudah punya akun, pilih Masuk.",
      };
    case "weak_password":
      return {
        status: "invalid",
        errors: { password: "Kata sandi ini kurang kuat. Coba kata sandi yang lebih sulit ditebak." },
      };
    case "email_address_invalid":
      return {
        status: "invalid",
        errors: { email: "Alamat email ini tidak bisa digunakan. Masukkan alamat email lain." },
      };
    case "signup_disabled":
    case "email_provider_disabled":
      return {
        status: "error",
        message: "Pendaftaran dengan email sedang tidak tersedia. Hubungi pengelola Tempat.In.",
      };
    default:
      return {
        status: "error",
        message: status === 429
          ? "Terlalu banyak percobaan. Tunggu beberapa menit sebelum mencoba lagi."
          : retryMessage,
      };
  }
}
