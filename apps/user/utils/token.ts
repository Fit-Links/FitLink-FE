import { getCookie } from "cookies-next";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@user/constants/token";

const TOKEN_MAP = Object.freeze({
  refreshToken: REFRESH_TOKEN_KEY,
  accessToken: ACCESS_TOKEN_KEY,
});

export function provideTokens(type: "refreshToken" | "accessToken") {
  return async function () {
    if (typeof window === "undefined") {
      try {
        const { cookies } = await import("next/headers");

        return cookies().get(TOKEN_MAP[type])?.value ?? null;
      } catch (error) {
        return null;
      }
    }

    // http only인 refreshToken은 JS로 불러올 수 없습니다.
    return getCookie(TOKEN_MAP[type]) ?? null;
  };
}
