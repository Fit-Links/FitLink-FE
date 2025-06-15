/* eslint-disable no-magic-numbers */
import { NextResponse } from "next/server";

import { reissueToken } from "@trainer/services/auth";

import { ACCESS_TOKEN_KEY } from "@trainer/constants/token";

import { provideTokens } from "@trainer/utils/token";

export async function POST() {
  const refreshToken = await provideTokens("refreshToken")();

  if (!refreshToken)
    return NextResponse.json({ success: false, error: "Missing refresh token", status: 401 });

  try {
    const { data, success } = await reissueToken({ refreshToken: `${refreshToken}` });

    if (!success)
      return NextResponse.json({ success: false, error: "Invalid refresh token", status: 401 });

    const { accessToken } = data;
    const response = NextResponse.json({ success: true, accessToken });

    if (accessToken) {
      response.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
    }

    return response;
  } catch {
    return NextResponse.json({ success: false, error: "Server error", status: 500 });
  }
}
