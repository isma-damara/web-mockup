export const ADMIN_COOKIE_NAME = "mockup_admin_session";
export const CLIENT_COOKIE_NAME = "mockup_client_session";

export const PROTECTED_SITE_SLUGS = [
  "company-profile",
  "ecommerce",
  "government",
  "catalog",
] as const;

export type ProtectedSiteSlug = (typeof PROTECTED_SITE_SLUGS)[number];

type ClientShareTarget = {
  site: ProtectedSiteSlug;
  label: string;
  active: boolean;
  expiresAt?: string;
  sessionMaxAgeSeconds?: number;
};

export type ResolvedClientShareTarget = ClientShareTarget & {
  token: string;
  expiresAtMs?: number;
};

type ClientShareTokenObjectInput = {
  site?: string;
  label?: string;
  active?: boolean;
  expiresAt?: string;
  sessionMaxAgeSeconds?: number;
};

type ClientShareTokenArrayInput = ClientShareTokenObjectInput & {
  token?: string;
};

type SignedSessionPayload = {
  v: 1;
  role: "admin" | "client";
  iat: number;
  exp: number;
  token?: string;
};

const DEFAULT_CLIENT_SHARE_TOKENS: Record<string, ClientShareTarget> = {
  "demo-client-ecommerce": {
    site: "ecommerce",
    label: "Client Ecommerce Demo",
    active: true,
  },
  "demo-client-catalog": {
    site: "catalog",
    label: "Client Catalog Demo",
    active: true,
  },
  "demo-client-government": {
    site: "government",
    label: "Client Government Demo",
    active: true,
  },
  "demo-client-company-profile": {
    site: "company-profile",
    label: "Client Company Profile Demo",
    active: true,
  },
};

const FALLBACK_ADMIN_KEY = "change-this-admin-key";
const FALLBACK_SESSION_SECRET = "change-this-session-secret";
const CLIENT_SHARE_TOKENS_ENV_NAME = "MOCKUP_CLIENT_SHARE_TOKENS_JSON";
const ADMIN_SESSION_MAX_AGE_ENV_NAME = "MOCKUP_ADMIN_SESSION_MAX_AGE_SECONDS";
const CLIENT_SESSION_MAX_AGE_ENV_NAME = "MOCKUP_CLIENT_SESSION_MAX_AGE_SECONDS";

const DEFAULT_ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const DEFAULT_CLIENT_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

let cachedHmacKeyPromise: Promise<CryptoKey> | null = null;
let cachedHmacSecret: string | null = null;

function getUnixNowSeconds(nowMs = Date.now()) {
  return Math.floor(nowMs / 1000);
}

function isProtectedSiteSlug(value: string): value is ProtectedSiteSlug {
  return PROTECTED_SITE_SLUGS.includes(value as ProtectedSiteSlug);
}

function parsePositiveIntEnv(name: string, fallback: number) {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

export function getAdminAccessKey() {
  return process.env.MOCKUP_ADMIN_KEY?.trim() || FALLBACK_ADMIN_KEY;
}

export function getSessionSecret() {
  return process.env.MOCKUP_SESSION_SECRET?.trim() || FALLBACK_SESSION_SECRET;
}

export function getAdminSessionMaxAgeSeconds() {
  return parsePositiveIntEnv(
    ADMIN_SESSION_MAX_AGE_ENV_NAME,
    DEFAULT_ADMIN_SESSION_MAX_AGE_SECONDS,
  );
}

export function getDefaultClientSessionMaxAgeSeconds() {
  return parsePositiveIntEnv(
    CLIENT_SESSION_MAX_AGE_ENV_NAME,
    DEFAULT_CLIENT_SESSION_MAX_AGE_SECONDS,
  );
}

function parseOptionalDateString(value: string | undefined) {
  if (!value?.trim()) return { raw: undefined, ms: undefined };
  const raw = value.trim();
  const ms = Date.parse(raw);
  if (Number.isNaN(ms)) return { raw: undefined, ms: undefined };
  return { raw, ms };
}

function toClientShareTarget(
  input: ClientShareTokenObjectInput,
  fallbackLabel: string,
): ClientShareTarget | null {
  if (!input.site || !isProtectedSiteSlug(input.site)) {
    return null;
  }

  const { raw: expiresAt } = parseOptionalDateString(input.expiresAt);
  const sessionMaxAgeSeconds =
    typeof input.sessionMaxAgeSeconds === "number" &&
    Number.isFinite(input.sessionMaxAgeSeconds) &&
    input.sessionMaxAgeSeconds > 0
      ? Math.floor(input.sessionMaxAgeSeconds)
      : undefined;

  return {
    site: input.site,
    label: input.label?.trim() || fallbackLabel,
    active: input.active !== false,
    ...(expiresAt ? { expiresAt } : {}),
    ...(sessionMaxAgeSeconds ? { sessionMaxAgeSeconds } : {}),
  };
}

function parseClientShareTokensFromEnv(): Record<string, ClientShareTarget> | null {
  let raw = process.env[CLIENT_SHARE_TOKENS_ENV_NAME]?.trim();
  if (!raw) return null;

  if (
    (raw.startsWith("'") && raw.endsWith("'")) ||
    (raw.startsWith("\"") && raw.endsWith("\""))
  ) {
    raw = raw.slice(1, -1).trim();
  }

  try {
    const parsed: unknown = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      const entries = parsed
        .map((item): [string, ClientShareTarget] | null => {
          if (!item || typeof item !== "object") return null;
          const value = item as ClientShareTokenArrayInput;
          const token = value.token?.trim();
          if (!token) return null;

          const target = toClientShareTarget(value, token);
          if (!target) return null;

          return [token, target];
        })
        .filter((entry): entry is [string, ClientShareTarget] => Boolean(entry));

      return entries.length ? Object.fromEntries(entries) : null;
    }

    if (parsed && typeof parsed === "object") {
      const entries = Object.entries(parsed)
        .map(([token, value]): [string, ClientShareTarget] | null => {
          const cleanedToken = token?.trim();
          if (!cleanedToken || !value || typeof value !== "object") return null;

          const target = toClientShareTarget(
            value as ClientShareTokenObjectInput,
            cleanedToken,
          );
          if (!target) return null;

          return [cleanedToken, target];
        })
        .filter((entry): entry is [string, ClientShareTarget] => Boolean(entry));

      return entries.length ? Object.fromEntries(entries) : null;
    }
  } catch {
    console.warn(
      `[mockup-access] Invalid ${CLIENT_SHARE_TOKENS_ENV_NAME}; using fallback tokens.`,
    );
  }

  return null;
}

function getClientShareTokens() {
  return parseClientShareTokensFromEnv() ?? DEFAULT_CLIENT_SHARE_TOKENS;
}

export const CLIENT_SHARE_TOKENS = getClientShareTokens();

export function isValidAdminKey(value: string | null | undefined) {
  return Boolean(value) && value === getAdminAccessKey();
}

function resolveClientShareTokenConfig(token: string | null | undefined) {
  if (!token) return null;
  return CLIENT_SHARE_TOKENS[token] ?? null;
}

export function resolveClientShareToken(
  token: string | null | undefined,
  nowMs = Date.now(),
): ResolvedClientShareTarget | null {
  const config = resolveClientShareTokenConfig(token);
  if (!token || !config || !config.active) return null;

  const parsedDate = parseOptionalDateString(config.expiresAt);
  if (parsedDate.ms && parsedDate.ms <= nowMs) {
    return null;
  }

  return {
    token,
    ...config,
    ...(parsedDate.ms ? { expiresAtMs: parsedDate.ms } : {}),
  };
}

export function getClientSessionMaxAgeSeconds(target: ResolvedClientShareTarget) {
  return target.sessionMaxAgeSeconds ?? getDefaultClientSessionMaxAgeSeconds();
}

function toBase64UrlFromBytes(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function toBase64UrlFromString(value: string) {
  return toBase64UrlFromBytes(new TextEncoder().encode(value));
}

function fromBase64UrlToBytes(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function fromBase64UrlToString(value: string) {
  return new TextDecoder().decode(fromBase64UrlToBytes(value));
}

async function getHmacKey() {
  const secret = getSessionSecret();

  if (cachedHmacKeyPromise && cachedHmacSecret === secret) {
    return cachedHmacKeyPromise;
  }

  cachedHmacSecret = secret;
  cachedHmacKeyPromise = crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

  return cachedHmacKeyPromise;
}

async function signInput(input: string) {
  const key = await getHmacKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(input),
  );
  return toBase64UrlFromBytes(new Uint8Array(signature));
}

async function createSignedSessionValue(payload: SignedSessionPayload) {
  const header = toBase64UrlFromString(JSON.stringify({ alg: "HS256", typ: "MWS1" }));
  const body = toBase64UrlFromString(JSON.stringify(payload));
  const input = `${header}.${body}`;
  const signature = await signInput(input);
  return `${input}.${signature}`;
}

async function readSignedSessionValue(value: string | null | undefined) {
  if (!value) return null;

  const parts = value.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const input = `${header}.${body}`;

  const expectedSignature = await signInput(input);
  if (signature !== expectedSignature) return null;

  try {
    const parsed = JSON.parse(fromBase64UrlToString(body)) as Partial<SignedSessionPayload>;

    if (parsed.v !== 1) return null;
    if (parsed.role !== "admin" && parsed.role !== "client") return null;
    if (typeof parsed.iat !== "number" || typeof parsed.exp !== "number") return null;

    const nowSec = getUnixNowSeconds();
    if (parsed.exp <= nowSec) return null;

    if (parsed.role === "client" && (!parsed.token || typeof parsed.token !== "string")) {
      return null;
    }

    return parsed as SignedSessionPayload;
  } catch {
    return null;
  }
}

export async function createAdminSessionCookieValue(nowMs = Date.now()) {
  const iat = getUnixNowSeconds(nowMs);
  const exp = iat + getAdminSessionMaxAgeSeconds();

  return createSignedSessionValue({
    v: 1,
    role: "admin",
    iat,
    exp,
  });
}

export async function createClientSessionCookieValue(
  target: ResolvedClientShareTarget,
  nowMs = Date.now(),
) {
  const iat = getUnixNowSeconds(nowMs);
  const expBySession = iat + getClientSessionMaxAgeSeconds(target);
  const expByToken = target.expiresAtMs
    ? Math.floor(target.expiresAtMs / 1000)
    : undefined;
  const exp = expByToken ? Math.min(expBySession, expByToken) : expBySession;

  return createSignedSessionValue({
    v: 1,
    role: "client",
    iat,
    exp,
    token: target.token,
  });
}

export function isProtectedSitePath(pathname: string) {
  return PROTECTED_SITE_SLUGS.some(
    (slug) => pathname === `/${slug}` || pathname.startsWith(`/${slug}/`),
  );
}

export function isAllowedForClient(pathname: string, site: ProtectedSiteSlug) {
  return pathname === `/${site}` || pathname.startsWith(`/${site}/`);
}

export function normalizeInternalPath(pathname: string | null | undefined) {
  if (!pathname || !pathname.startsWith("/")) return "/";
  if (pathname.startsWith("//")) return "/";
  return pathname;
}

export type ViewerSession =
  | { role: "admin" }
  | { role: "client"; site: ProtectedSiteSlug; label: string; token: string }
  | { role: "anonymous" };

export async function resolveViewerSessionFromCookies(input: {
  adminSession?: string | null;
  clientSession?: string | null;
}): Promise<ViewerSession> {
  const adminPayload = await readSignedSessionValue(input.adminSession);
  if (adminPayload?.role === "admin") {
    return { role: "admin" };
  }

  const clientPayload = await readSignedSessionValue(input.clientSession);
  if (clientPayload?.role === "client") {
    const tokenEntry = resolveClientShareToken(clientPayload.token);
    if (tokenEntry) {
      return {
        role: "client",
        site: tokenEntry.site,
        label: tokenEntry.label,
        token: tokenEntry.token,
      };
    }
  }

  return { role: "anonymous" };
}

export function isPublicAccessUtilityPath(pathname: string) {
  return (
    pathname === "/access-denied" ||
    pathname === "/admin-access" ||
    pathname === "/logout" ||
    pathname.startsWith("/share/")
  );
}
