"use client";

import { useState, type ReactNode } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";

export function LogoutButton({ className, children }: { className?: string; children: ReactNode }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogout() {
    if (pending) return;
    setPending(true);
    setError(null);
    const supabase = getBrowserSupabaseClient();
    const result = supabase ? await supabase.auth.signOut({ scope: "local" }) : { error: null };
    if (result.error) {
      setError("Keluar belum berhasil. Coba lagi.");
      setPending(false);
      return;
    }
    window.location.replace("/login");
  }

  return <>
    <button type="button" className={className} onClick={handleLogout} disabled={pending} aria-busy={pending}>
      {children}
    </button>
    {error && <span className="sr-only" role="alert">{error}</span>}
  </>;
}
