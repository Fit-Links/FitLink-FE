import http, { initCoreApi } from "@5unwan/core/api/core";
import { getCookie } from "cookies-next";

import { ACCESS_TOKEN_KEY } from "@user/constants/token";
import { BASE_URL } from "@user/constants/url";

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되어 있지 않습니다.");
}

initCoreApi({
  baseUrl: BASE_URL,
  tokenProvider: async () => {
    if (typeof window === "undefined") {
      try {
        const { cookies } = await import("next/headers");

        return cookies().get(ACCESS_TOKEN_KEY)?.value ?? null;
      } catch {
        return null;
      }
    }

    return getCookie(ACCESS_TOKEN_KEY) ?? null;
  },
});

export default http;
