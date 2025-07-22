import { NextResponse, NextRequest } from "next/server";

import { handleProtectedRoute } from "./middleware/handlers/handleProtectedRoute";
import { handleRedirectByUserRole } from "./middleware/handlers/handleRedirectByUserRole";
import { handleTokenFromUrl } from "./middleware/handlers/handleTokenFromUrl";
import {
  isPublicTokenRoute,
  PROTECTED_ROUTES,
  PUBLIC_TOKEN_ROUTES,
} from "./middleware/utils/routeMatchers";

export function middleware(request: NextRequest) {
  const { hostname, pathname } = request.nextUrl.clone();

  // 유저 Role과 url 도메인 비교 후 리다이렉트
  const roleRedirect = handleRedirectByUserRole(hostname);
  if (roleRedirect) return roleRedirect;

  if (isPublicTokenRoute(pathname)) {
    const tokenResponse = handleTokenFromUrl(request);
    if (tokenResponse) return tokenResponse;
  }

  const protectedResponse = handleProtectedRoute(request);
  if (protectedResponse) return protectedResponse;

  return NextResponse.next();
}

export const config = {
  matcher: [...PUBLIC_TOKEN_ROUTES, ...PROTECTED_ROUTES],
};
