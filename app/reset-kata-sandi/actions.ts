"use server";

import {
  createClient,
  isAuthRetryableFetchError,
  isAuthSessionMissingError,
} from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/config";
import {
  clearRecoverySession,
  getRecoverySessionKey,
  readRecoverySession,
  saveRecoverySession,
} from "./recovery-session";
import { validatePasswords, type PasswordErrors } from "./validation";

export type ResetPasswordState = {
  errors?: PasswordErrors;
  message?: string;
  invalidLink?: boolean;
  success?: boolean;
};

const retryMessage = "Kata sandi belum bisa disimpan. Coba lagi sebentar.";

export async function resetPassword(
  tokenHash: string,
  _previousState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  if (typeof tokenHash !== "string" || !tokenHash || tokenHash.length > 256) {
    return { invalidLink: true };
  }

  const { password, errors } = validatePasswords(formData);
  if (Object.keys(errors).length) return { errors };

  const config = getSupabaseConfig();
  const key = getRecoverySessionKey();
  if (!config || !key) {
    return { message: "Layanan reset kata sandi belum tersedia. Hubungi pengelola Tempat.In." };
  }

  const { auth } = createClient(config.url, config.publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
  const savedSession = await readRecoverySession(tokenHash, key);
  // Wait for submission before consuming the one-time link. Email previews can open GETs.
  const { data, error } = savedSession
    ? await auth.setSession(savedSession)
    : await auth.verifyOtp({ token_hash: tokenHash, type: "recovery" });

  if (isAuthRetryableFetchError(error) || error?.status === 429) {
    return { message: retryMessage };
  }
  if (error || !data.session) return { invalidLink: true };

  if (!savedSession) await saveRecoverySession(tokenHash, key, data.session);
  const { data: updated, error: updateError } = await auth.updateUser({ password });

  if (isAuthSessionMissingError(updateError) || updateError?.status === 401) {
    await clearRecoverySession();
    return { invalidLink: true };
  }
  if (updateError?.code === "same_password") {
    return { errors: { password: "Pilih kata sandi yang berbeda dari kata sandi sebelumnya." } };
  }
  if (updateError?.code === "weak_password") {
    return { errors: { password: "Kata sandi ini terlalu lemah. Coba kata sandi yang lebih kuat." } };
  }
  if (updateError || !updated.user) return { message: retryMessage };

  await clearRecoverySession();
  await auth.signOut({ scope: "local" });
  return { success: true };
}
