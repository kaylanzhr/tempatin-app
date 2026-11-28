import "server-only";

import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { Session } from "@supabase/supabase-js";

const cookieName = "tempatin-reset-session";
const cookieOptions = {
  path: "/reset-kata-sandi",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
} as const;

type RecoverySession = Pick<Session, "access_token" | "refresh_token"> & { expiresAt: number };

export function getRecoverySessionKey() {
  const key = process.env.SUPABASE_RESET_SESSION_SECRET ?? "";
  return /^[0-9a-f]{64}$/i.test(key) ? Buffer.from(key, "hex") : null;
}

export async function readRecoverySession(tokenHash: string, key: Buffer) {
  const value = (await cookies()).get(cookieName)?.value;
  if (!value) return null;

  try {
    const sealed = Buffer.from(value, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", key, sealed.subarray(0, 12));
    decipher.setAAD(Buffer.from(tokenHash));
    decipher.setAuthTag(sealed.subarray(12, 28));
    const data = Buffer.concat([decipher.update(sealed.subarray(28)), decipher.final()]);
    const session: RecoverySession = JSON.parse(data.toString("utf8"));
    return session.expiresAt > Math.floor(Date.now() / 1000) ? session : null;
  } catch {
    return null;
  }
}

export async function saveRecoverySession(tokenHash: string, key: Buffer, session: Session) {
  const now = Math.floor(Date.now() / 1000);
  const expiresAt = Math.min(session.expires_at ?? now + session.expires_in, now + 15 * 60);
  const data: RecoverySession = {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expiresAt,
  };

  // Only a session verified by this reset flow can be resumed for the same link.
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  cipher.setAAD(Buffer.from(tokenHash));
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data)), cipher.final()]);
  const value = Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");

  (await cookies()).set(cookieName, value, { ...cookieOptions, maxAge: expiresAt - now });
}

export async function clearRecoverySession() {
  (await cookies()).set(cookieName, "", { ...cookieOptions, maxAge: 0 });
}
