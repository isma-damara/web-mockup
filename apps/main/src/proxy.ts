import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  CLIENT_COOKIE_NAME,
  PROTECTED_SITE_SLUGS,
  SITE_PATH_PREFIX,
  isAllowedForClient,
  isProtectedSitePath,
  isPublicAccessUtilityPath,
  resolveViewerSessionFromCookies,
} from "@/lib/access-control";

function getLegacySiteMatch(pathname: string) {
  for (const slug of PROTECTED_SITE_SLUGS) {
    const legacyPrefix = `/${slug}`;
    if (pathname === legacyPrefix || pathname.startsWith(`${legacyPrefix}/`)) {
      const rest = pathname.slice(legacyPrefix.length);
      return { slug, rest };
    }
  }
  return null;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicAccessUtilityPath(pathname)) {
    return NextResponse.next();
  }

  const viewer = await resolveViewerSessionFromCookies({
    adminSession: request.cookies.get(ADMIN_COOKIE_NAME)?.value,
    clientSession: request.cookies.get(CLIENT_COOKIE_NAME)?.value,
  });

  if (viewer.role === "admin") {
    const legacyMatch = getLegacySiteMatch(pathname);
    if (legacyMatch) {
      return NextResponse.redirect(
        new URL(`${SITE_PATH_PREFIX}/${legacyMatch.slug}${legacyMatch.rest}`, request.url),
      );
    }

    return NextResponse.next();
  }

  if (viewer.role === "client") {
    const legacyMatch = getLegacySiteMatch(pathname);
    if (legacyMatch && legacyMatch.slug === viewer.site) {
      return NextResponse.redirect(
        new URL(`${SITE_PATH_PREFIX}/${legacyMatch.slug}${legacyMatch.rest}`, request.url),
      );
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL(`${SITE_PATH_PREFIX}/${viewer.site}`, request.url));
    }

    if (isAllowedForClient(pathname, viewer.site)) {
      return NextResponse.next();
    }

    if (isProtectedSitePath(pathname)) {
      return NextResponse.redirect(new URL(`${SITE_PATH_PREFIX}/${viewer.site}`, request.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/" || isProtectedSitePath(pathname)) {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map)$).*)",
  ],
};
