import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
  getAccountProfile,
  roleDestinations,
  type AccountRole,
} from "./roles";

export async function requireRole(role: AccountRole, currentPath: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) redirect(`/login?next=${encodeURIComponent(currentPath)}`);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect(`/login?next=${encodeURIComponent(currentPath)}`);

  const profile = await getAccountProfile(supabase, user.id);
  if (!profile?.isActive) redirect("/login?status=akun-tidak-aktif");
  if (profile.role !== role) redirect(roleDestinations[profile.role]);

  return profile;
}

