import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  CLIENT_COOKIE_NAME,
  createAdminSessionCookieValue,
  getAdminSessionMaxAgeSeconds,
  isValidAdminKey,
  normalizeInternalPath,
} from "@/lib/access-control";

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  };
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const nextPath = normalizeInternalPath(request.nextUrl.searchParams.get("next"));

  if (!isValidAdminKey(key)) {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  const response = NextResponse.redirect(new URL(nextPath || "/", request.url));
  response.cookies.set(
    ADMIN_COOKIE_NAME,
    await createAdminSessionCookieValue(),
    {
      ...cookieOptions(),
      maxAge: getAdminSessionMaxAgeSeconds(),
    },
  );
  response.cookies.delete(CLIENT_COOKIE_NAME);
  return response;
}
