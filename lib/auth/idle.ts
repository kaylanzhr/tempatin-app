export const IDLE_TIMEOUT_MS = 15 * 60 * 1000;
export const IDLE_ACTIVITY_THROTTLE_MS = 1000;
export const IDLE_STORAGE_PREFIX = "tempatin-idle-session:";
export const IDLE_CHANNEL_NAME = "tempatin-auth-session";

export type IdleMetadata = {
  lastActivityAt: number;
};

export function idleStorageKey(sessionKey: string) {
  return `${IDLE_STORAGE_PREFIX}${sessionKey}`;
}

export function isIdleExpired(lastActivityAt: number, now = Date.now()) {
  return now - lastActivityAt >= IDLE_TIMEOUT_MS;
}
