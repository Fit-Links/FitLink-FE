import { NextRequest, NextResponse } from "next/server";

import RouteInstance from "@trainer/constants/route";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@trainer/constants/token";

import { isProtectedRoute } from "../utils/routeMatchers";

export function handleProtectedRoute(request: NextRequest): NextResponse | void {
  const { pathname } = request.nextUrl;
  const isProtected = isProtectedRoute(pathname);

  if (!isProtected) return;

  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  if (!accessToken && !refreshToken) {
    const url = request.nextUrl.clone();
    url.pathname = RouteInstance.login();

    return NextResponse.redirect(url);
  }
}
