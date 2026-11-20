import "server-only";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "./config";
import {
  cookieOptionsForSession,
  REMEMBER_COOKIE,
  REMEMBER_MAX_AGE,
} from "./session";

export async function createServerSupabaseClient(rememberOverride?: boolean) {
  const config = getSupabaseConfig();
  if (!config) return null;

  const cookieStore = await cookies();
  const remember =
    rememberOverride ?? cookieStore.get(REMEMBER_COOKIE)?.value === "1";

  return createServerClient(config.url, config.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(
              name,
              value,
              cookieOptionsForSession(options, remember),
            );
          });
        } catch {
          // Server Components cannot write cookies. Proxy refreshes them.
        }
      },
    },
  });
}

export async function setRememberPreference(remember: boolean) {
  const cookieStore = await cookies();
  const options: CookieOptions = {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };

  if (remember) options.maxAge = REMEMBER_MAX_AGE;

  cookieStore.set(REMEMBER_COOKIE, remember ? "1" : "0", options);
}

