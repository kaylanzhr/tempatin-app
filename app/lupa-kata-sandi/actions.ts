"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { maxEmailLength, validateEmail } from "./email";

export type ForgotPasswordState =
  | { status: "idle" }
  | { status: "invalid" | "error"; email: string; message: string }
  | { status: "accepted"; email: string };

const unavailableMessage =
  "Layanan reset kata sandi belum tersedia. Hubungi pengelola Tempat.In untuk bantuan.";
const retryMessage = "Tautan reset belum bisa dikirim. Coba lagi sebentar, ya.";

export async function requestPasswordReset(
  _previousState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const value = formData.get("email");
  const email = typeof value === "string" ? value.trim() : "";
  const emailError = validateEmail(email);
  if (emailError) {
    return {
      status: "invalid",
      email: email.slice(0, maxEmailLength),
      message: emailError,
    };
  }

  // Use the exact recovery callback URL registered in Supabase Auth.
  const configuredUrl = process.env.SUPABASE_PASSWORD_RESET_REDIRECT_URL ?? "";
  const redirectUrl = URL.canParse(configuredUrl) ? new URL(configuredUrl) : null;
  if (!redirectUrl || (redirectUrl.protocol !== "https:" && redirectUrl.protocol !== "http:")) {
    return { status: "error", email, message: unavailableMessage };
  }

  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return { status: "error", email, message: unavailableMessage };

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl.href,
    });

    // Keep unknown accounts and per-address throttling indistinguishable from acceptance.
    if (
      !error ||
      error.code === "user_not_found" ||
      error.code === "over_email_send_rate_limit"
    ) {
      return { status: "accepted", email };
    }

    if (error.status === 429) {
      return {
        status: "error",
        email,
        message: "Terlalu banyak permintaan. Tunggu sebentar sebelum mencoba lagi.",
      };
    }
  } catch {
    // Client initialization and network errors use the same retry message.
  }

  return { status: "error", email, message: retryMessage };
}
