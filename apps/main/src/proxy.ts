import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  CLIENT_COOKIE_NAME,
  isAllowedForClient,
  isProtectedSitePath,
  isPublicAccessUtilityPath,
  resolveViewerSessionFromCookies,
} from "@/lib/access-control";

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
    return NextResponse.next();
  }

  if (viewer.role === "client") {
    if (pathname === "/") {
      return NextResponse.redirect(new URL(`/${viewer.site}`, request.url));
    }

    if (isAllowedForClient(pathname, viewer.site)) {
      return NextResponse.next();
    }

    if (isProtectedSitePath(pathname)) {
      return NextResponse.redirect(new URL(`/${viewer.site}`, request.url));
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
