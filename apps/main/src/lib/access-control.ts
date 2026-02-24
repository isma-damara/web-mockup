export const ADMIN_COOKIE_NAME = "mockup_admin_key";
export const CLIENT_COOKIE_NAME = "mockup_client_share_token";

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
};

const DEFAULT_CLIENT_SHARE_TOKENS: Record<string, ClientShareTarget> = {
  "demo-client-ecommerce": {
    site: "ecommerce",
    label: "Client Ecommerce Demo",
  },
  "demo-client-catalog": {
    site: "catalog",
    label: "Client Catalog Demo",
  },
  "demo-client-government": {
    site: "government",
    label: "Client Government Demo",
  },
  "demo-client-company-profile": {
    site: "company-profile",
    label: "Client Company Profile Demo",
  },
};

// Use env in Vercel: MOCKUP_ADMIN_KEY
const FALLBACK_ADMIN_KEY = "change-this-admin-key";
const CLIENT_SHARE_TOKENS_ENV_NAME = "MOCKUP_CLIENT_SHARE_TOKENS_JSON";

type ClientShareTokenObjectInput = {
  site?: string;
  label?: string;
};

type ClientShareTokenArrayInput = {
  token?: string;
  site?: string;
  label?: string;
};

function isProtectedSiteSlug(value: string): value is ProtectedSiteSlug {
  return PROTECTED_SITE_SLUGS.includes(value as ProtectedSiteSlug);
}

function toClientShareTarget(
  input: ClientShareTokenObjectInput,
  fallbackLabel: string,
): ClientShareTarget | null {
  if (!input.site || !isProtectedSiteSlug(input.site)) {
    return null;
  }

  return {
    site: input.site,
    label: input.label?.trim() || fallbackLabel,
  };
}

function parseClientShareTokensFromEnv():
  | Record<string, ClientShareTarget>
  | null {
  const raw = process.env[CLIENT_SHARE_TOKENS_ENV_NAME]?.trim();
  if (!raw) return null;

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
          if (!token?.trim() || !value || typeof value !== "object") return null;

          const target = toClientShareTarget(
            value as ClientShareTokenObjectInput,
            token,
          );
          if (!target) return null;

          return [token.trim(), target];
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

export function getAdminAccessKey() {
  return process.env.MOCKUP_ADMIN_KEY?.trim() || FALLBACK_ADMIN_KEY;
}

export function isValidAdminKey(value: string | null | undefined) {
  return Boolean(value) && value === getAdminAccessKey();
}

export function resolveClientShareToken(token: string | null | undefined) {
  if (!token) return null;
  return CLIENT_SHARE_TOKENS[token] ?? null;
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
  | { role: "client"; site: ProtectedSiteSlug; label: string }
  | { role: "anonymous" };

export function resolveViewerSessionFromCookies(input: {
  adminKey?: string | null;
  clientShareToken?: string | null;
}): ViewerSession {
  if (isValidAdminKey(input.adminKey)) {
    return { role: "admin" };
  }

  const tokenEntry = resolveClientShareToken(input.clientShareToken);
  if (tokenEntry) {
    const site = tokenEntry.site;

    return {
      role: "client",
      site,
      label: tokenEntry.label,
    };
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
