"use server";

import { redirect } from "next/navigation";
import {
  destinationForRole,
  getAccountProfile,
  safeReturnPath,
} from "@/lib/auth/roles";
import {
  createServerSupabaseClient,
  setRememberPreference,
} from "@/lib/supabase/server";

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const remember = formData.get("remember") === "on";
  const next = safeReturnPath(formData.get("next"));
  const errors: LoginState["errors"] = {};

  if (!email) errors.email = ["Email wajib diisi."];
  else if (!emailPattern.test(email)) {
    errors.email = ["Masukkan alamat email yang valid."];
  }

  if (!password) errors.password = ["Kata sandi wajib diisi."];

  if (Object.keys(errors).length > 0) return { errors };

  const supabase = await createServerSupabaseClient(remember);
  if (!supabase) {
    return {
      message:
        "Konfigurasi autentikasi belum tersedia. Hubungi pengelola Tempat.In.",
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { message: "Email atau kata sandi yang kamu masukkan tidak sesuai." };
  }

  const profile = await getAccountProfile(supabase, data.user.id);
  if (!profile) {
    await supabase.auth.signOut();
    return {
      message:
        "Profil akun belum siap digunakan. Hubungi pengelola Tempat.In.",
    };
  }

  if (!profile.isActive) {
    await supabase.auth.signOut();
    return {
      message:
        "Akunmu sedang tidak aktif. Hubungi pengelola Tempat.In untuk bantuan.",
    };
  }

  await setRememberPreference(remember);
  redirect(destinationForRole(profile.role, next));
}

