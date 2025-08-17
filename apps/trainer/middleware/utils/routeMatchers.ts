// middleware matcher에 사용하기 위해 static하게 유지
export const PUBLIC_TOKEN_ROUTES = ["/", "/sns-verification"];

export const PROTECTED_ROUTES = [
  "/member-management",
  "/schedule-management",
  "/my-page",
  "/notification",
];

export function isPublicTokenRoute(pathname: string): boolean {
  return PUBLIC_TOKEN_ROUTES.includes(pathname);
}

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}
