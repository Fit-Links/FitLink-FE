import { NextResponse, NextRequest } from "next/server";

import { handleProtectedRoute } from "./middleware/handlers/handleProtectedRoute";
import { handleTokenFromUrl } from "./middleware/handlers/handleTokenFromUrl";
import {
  isPublicTokenRoute,
  PROTECTED_ROUTES,
  PUBLIC_TOKEN_ROUTES,
} from "./middleware/utils/routeMatchers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl.clone();

  if (isPublicTokenRoute(pathname)) {
    const tokenResponse = await handleTokenFromUrl(request);
    if (tokenResponse) return tokenResponse;
  }

  const protectedResponse = handleProtectedRoute(request);
  if (protectedResponse) return protectedResponse;

  return NextResponse.next();
}

export const config = {
  matcher: [...PUBLIC_TOKEN_ROUTES, ...PROTECTED_ROUTES],
};
