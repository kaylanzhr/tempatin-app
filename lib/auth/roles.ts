import type { SupabaseClient } from "@supabase/supabase-js";

export const accountRoles = ["pengguna", "mitra", "admin"] as const;
export type AccountRole = (typeof accountRoles)[number];

export type AccountProfile = {
  fullName: string | null;
  role: AccountRole;
  isActive: boolean;
};

export const roleDestinations: Record<AccountRole, string> = {
  pengguna: "/pengguna",
  mitra: "/mitra",
  admin: "/admin",
};

function isAccountRole(value: unknown): value is AccountRole {
  return typeof value === "string" && accountRoles.includes(value as AccountRole);
}

export async function getAccountProfile(
  supabase: SupabaseClient,
  userId: string,
): Promise<AccountProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name,role,is_active")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data || !isAccountRole(data.role)) return null;

  return {
    fullName: typeof data.full_name === "string" ? data.full_name : null,
    role: data.role,
    isActive: data.is_active === true,
  };
}

export function safeReturnPath(value: FormDataEntryValue | string | null) {
  if (typeof value !== "string") return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

export function destinationForRole(role: AccountRole, next?: string | null) {
  if (role === "pengguna" && next) return next;
  return roleDestinations[role];
}

