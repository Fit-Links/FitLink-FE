/* eslint-disable no-magic-numbers */

import { NextResponse, NextRequest } from "next/server";

import RouteInstance from "./constants/routes";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "./constants/token";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  /** TODO: login 경로는 임시 경로로 추후 sns-verification 페이지 작업자가 해당 페이지로 이동하는 로직으로 12번 라인 수정 */
  if (url.pathname === RouteInstance["sns-verification"]()) {
    const accessToken = url.searchParams.get("accessToken");
    const refreshToken = url.searchParams.get("refreshToken");

    if (accessToken) {
      url.searchParams.delete("accessToken");
      url.searchParams.delete("refreshToken");

      const res = NextResponse.redirect(url);

      /** TODO: maxAge에 설정된 시간은 협의 후 다시 설정 */
      res.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1일
        sameSite: "lax",
      });
      if (refreshToken) {
        res.cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 7일
          sameSite: "lax",
        });
      }

      return res;
    }
  }

  return NextResponse.next();
}

export const config = { matcher: [RouteInstance["login"]()] };
