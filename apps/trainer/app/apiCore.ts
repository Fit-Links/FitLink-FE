import http, { initCoreApi } from "@5unwan/core/api/core";

import { BASE_URL } from "@trainer/constants/url";

import { provideTokens } from "@trainer/utils/token";

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되어 있지 않습니다.");
}

initCoreApi({
  baseUrl: BASE_URL,
  tokenProvider: provideTokens("accessToken"),
});

export default http;
