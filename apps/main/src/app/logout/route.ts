import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, CLIENT_COOKIE_NAME } from "@/lib/access-control";

export function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/access-denied", request.url));
  response.cookies.delete(ADMIN_COOKIE_NAME);
  response.cookies.delete(CLIENT_COOKIE_NAME);
  return response;
}
