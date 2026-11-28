"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";
import {
  IDLE_ACTIVITY_THROTTLE_MS,
  IDLE_CHANNEL_NAME,
  IDLE_TIMEOUT_MS,
  idleStorageKey,
  isIdleExpired,
  type IdleMetadata,
} from "@/lib/auth/idle";

type SessionMessage =
  | { type: "activity"; sessionKey: string; lastActivityAt: number }
  | { type: "logout"; sessionKey: string };

function getSessionKey(session: Session) {
  try {
    const payload = JSON.parse(
      window.atob(session.access_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    ) as { session_id?: unknown };
    if (typeof payload.session_id === "string" && payload.session_id) {
      return `${session.user.id}:${payload.session_id}`;
    }
  } catch {
    // Fallback keeps the metadata tied to this user and token lifetime without logging the token.
  }

  return `${session.user.id}:${session.expires_at ?? "unknown"}`;
}

function readMetadata(sessionKey: string): IdleMetadata | null {
  try {
    const raw = window.localStorage.getItem(idleStorageKey(sessionKey));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<IdleMetadata>;
    return typeof parsed.lastActivityAt === "number" ? parsed as IdleMetadata : null;
  } catch {
    return null;
  }
}

export function SessionManager({ children }: { children: ReactNode }) {
  const [expired, setExpired] = useState(false);
  const sessionKeyRef = useRef<string | null>(null);
  const sessionRef = useRef<Session | null>(null);
  const lastActivityRef = useRef(0);
  const lastEventRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const expiringRef = useRef(false);

  useEffect(() => {
    const supabaseClient = getBrowserSupabaseClient();
    if (!supabaseClient) return;

    let disposed = false;
    const channel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(IDLE_CHANNEL_NAME);

    function postMessage(message: SessionMessage) {
      try {
        channel?.postMessage(message);
      } catch {
        // BroadcastChannel can be unavailable in restricted browser contexts.
      }
    }

    function clearTimer() {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    function clearMetadata(sessionKey: string | null) {
      if (!sessionKey) return;
      try {
        window.localStorage.removeItem(idleStorageKey(sessionKey));
      } catch {
        // Private browsing may deny storage access; session auth still works.
      }
    }

    function saveActivity(sessionKey: string, lastActivityAt: number, broadcast = true) {
      lastActivityRef.current = lastActivityAt;
      try {
        window.localStorage.setItem(
          idleStorageKey(sessionKey),
          JSON.stringify({ lastActivityAt } satisfies IdleMetadata),
        );
      } catch {
        // The in-memory timestamp remains useful for the current tab.
      }
      if (broadcast) postMessage({ type: "activity", sessionKey, lastActivityAt });
    }

    function scheduleExpiry(checkExpiry: () => void) {
      clearTimer();
      const remaining = Math.max(0, IDLE_TIMEOUT_MS - (Date.now() - lastActivityRef.current));
      timerRef.current = window.setTimeout(checkExpiry, Math.min(remaining, 60_000));
    }

    async function signOutLocally() {
      await Promise.race([
        supabaseClient!.auth.signOut({ scope: "local" }).catch(() => undefined),
        new Promise<void>((resolve) => window.setTimeout(resolve, 3000)),
      ]);
    }

    async function expireSession(sessionKey: string, redirectWithReason: boolean) {
      if (expiringRef.current || disposed) return;
      expiringRef.current = true;
      setExpired(true);
      clearTimer();
      clearMetadata(sessionKey);
      postMessage({ type: "logout", sessionKey });
      await signOutLocally();
      if (!disposed) {
        window.location.replace(redirectWithReason ? "/login?reason=idle" : "/login");
      }
    }

    function checkExpiry() {
      const sessionKey = sessionKeyRef.current;
      if (!sessionKey || !sessionRef.current || expiringRef.current) return false;
      const metadata = readMetadata(sessionKey);
      const lastActivityAt = metadata?.lastActivityAt ?? lastActivityRef.current;
      lastActivityRef.current = lastActivityAt;
      if (isIdleExpired(lastActivityAt)) {
        void expireSession(sessionKey, true);
        return true;
      }
      scheduleExpiry(checkExpiry);
      return false;
    }

    function activateSession(session: Session) {
      const sessionKey = getSessionKey(session);
      const changedSession = sessionKeyRef.current !== sessionKey;
      sessionRef.current = session;
      sessionKeyRef.current = sessionKey;
      if (changedSession) {
        const metadata = readMetadata(sessionKey);
        if (metadata && isIdleExpired(metadata.lastActivityAt)) {
          void expireSession(sessionKey, true);
          return;
        }
        saveActivity(sessionKey, metadata?.lastActivityAt ?? Date.now(), false);
      }
      checkExpiry();
    }

    function handleActivity() {
      if (!sessionKeyRef.current || !sessionRef.current || expiringRef.current) return;
      const now = Date.now();
      if (now - lastEventRef.current < IDLE_ACTIVITY_THROTTLE_MS) return;
      lastEventRef.current = now;
      if (checkExpiry()) return;
      saveActivity(sessionKeyRef.current, now);
      scheduleExpiry(checkExpiry);
    }

    function handleVisibilityOrFocus() {
      checkExpiry();
    }

    const activityEvents = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    activityEvents.forEach((eventName) => window.addEventListener(eventName, handleActivity, { passive: true }));
    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);

    const storageListener = (event: StorageEvent) => {
      const sessionKey = sessionKeyRef.current;
      if (!sessionKey || event.key !== idleStorageKey(sessionKey) || !event.newValue) return;
      try {
        const metadata = JSON.parse(event.newValue) as Partial<IdleMetadata>;
        if (typeof metadata.lastActivityAt === "number" && metadata.lastActivityAt > lastActivityRef.current) {
          lastActivityRef.current = metadata.lastActivityAt;
          scheduleExpiry(checkExpiry);
        }
      } catch {
        // Ignore malformed metadata from an older or manually edited browser storage entry.
      }
    };
    window.addEventListener("storage", storageListener);

    const channelListener = (event: MessageEvent<SessionMessage>) => {
      const message = event.data;
      if (message.sessionKey !== sessionKeyRef.current) return;
      if (message.type === "activity" && message.lastActivityAt > lastActivityRef.current) {
        saveActivity(message.sessionKey, message.lastActivityAt, false);
        scheduleExpiry(checkExpiry);
      } else if (message.type === "logout") {
        void expireSession(message.sessionKey, true);
      }
    };
    channel?.addEventListener("message", channelListener);

    const authSubscription = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        clearTimer();
        clearMetadata(sessionKeyRef.current);
        sessionKeyRef.current = null;
        sessionRef.current = null;
        if (!disposed && !expiringRef.current && !window.location.pathname.startsWith("/login")) {
          window.location.replace("/login");
        }
        return;
      }
      activateSession(session);
    });

    void supabaseClient.auth.getSession().then(({ data }) => {
      if (!disposed && data.session) activateSession(data.session);
    });

    return () => {
      disposed = true;
      clearTimer();
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, handleActivity));
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("storage", storageListener);
      channel?.removeEventListener("message", channelListener);
      channel?.close();
      authSubscription.data.subscription.unsubscribe();
    };
  }, []);

  return <>
    {children}
    {expired && (
      <div className="fixed inset-0 z-[100] grid place-items-center bg-[#21160ed9] p-5" role="alert" aria-live="assertive">
        <div className="max-w-md rounded-2xl bg-paper p-6 text-center shadow-2xl">
          <p className="text-base font-semibold">Sesi kamu berakhir karena tidak ada aktivitas. Silakan masuk kembali.</p>
        </div>
      </div>
    )}
  </>;
}
