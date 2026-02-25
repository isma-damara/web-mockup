import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  CLIENT_COOKIE_NAME,
  createClientSessionCookieValue,
  getClientSessionMaxAgeSeconds,
  resolveClientShareToken,
} from "@/lib/access-control";

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}

type RouteContext = {
  params: Promise<{ token: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { token } = await context.params;
  const target = resolveClientShareToken(token);

  if (!target) {
    return NextResponse.redirect(new URL("/access-denied", request.url));
  }

  const response = NextResponse.redirect(new URL(`/site/${target.site}`, request.url));
  response.cookies.set(CLIENT_COOKIE_NAME, await createClientSessionCookieValue(target), {
    ...cookieOptions(),
    maxAge: getClientSessionMaxAgeSeconds(target),
  });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
