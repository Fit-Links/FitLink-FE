import http, { initCoreApi } from "@5unwan/core/api/core";
import { getLocalStorage } from "@5unwan/core/utils/localStorage";

import { ACCESS_TOKEN_KEY } from "@trainer/constants/token";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL 환경 변수가 설정되어 있지 않습니다.");
}

/** TODO: 토큰을 어떻게 가져올 것인지 로그인 기능 담당자가 추후 구현 */
const tokenProvider = () => {
  const accessToken = getLocalStorage(ACCESS_TOKEN_KEY);

  if (typeof accessToken === "string") return accessToken;

  return null;
};

initCoreApi({ baseUrl, tokenProvider });

export default http;
