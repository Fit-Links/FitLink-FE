/* eslint-disable no-magic-numbers */
import { NextRequest, NextResponse } from "next/server";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@user/constants/token";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accessToken, refreshToken } = body;

  if (!accessToken && !refreshToken)
    return NextResponse.json({
      success: false,
    });

  const response = NextResponse.json({
    success: true,
  });

  if (accessToken) {
    response.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  }
  if (refreshToken) {
    response.cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
  }

  return response;
}
