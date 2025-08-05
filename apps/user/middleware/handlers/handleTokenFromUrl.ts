/* eslint-disable no-magic-numbers */
import { NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@user/constants/token";

export function handleTokenFromUrl(request: NextRequest): NextResponse | void {
  const url = request.nextUrl.clone();
  const accessToken = url.searchParams.get("accessToken");
  const refreshToken = url.searchParams.get("refreshToken");

  if (!accessToken) return;

  url.searchParams.delete("accessToken");
  url.searchParams.delete("refreshToken");

  const res = NextResponse.redirect(url);

  res.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  if (refreshToken) {
    res.cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }

  return res;
}
