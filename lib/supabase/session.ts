import type { CookieOptions } from "@supabase/ssr";

export const REMEMBER_COOKIE = "tempatin-remember";
export const REMEMBER_MAX_AGE = 30 * 24 * 60 * 60;

export function cookieOptionsForSession(
  options: CookieOptions,
  remember: boolean,
): CookieOptions {
  const adjusted = { ...options };

  // Cookie removal must keep maxAge=0 regardless of the remember strategy.
  if (options.maxAge === 0) return adjusted;

  delete adjusted.expires;

  if (remember) adjusted.maxAge = REMEMBER_MAX_AGE;
  else delete adjusted.maxAge;

  return adjusted;
}

