import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getUserVerificationStatus } from "@user/services/auth";

import RouteInstance from "@user/constants/routes";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@user/constants/token";

export async function requireAuth(nextPath = "/") {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!accessToken && !refreshToken) {
    redirect(RouteInstance.login());
  }

  if (accessToken && isTokenValid(accessToken)) {
    try {
      const { success, data } = await getUserVerificationStatus();
      if (success) {
        const { status: userStatus } = data;

        if (userStatus === "NORMAL") return;
        throw new Error("회원가입이 완료되지 않았습니다");
      }

      return;
    } catch (error) {
      redirect(RouteInstance.login());
    }
  }

  if (refreshToken) {
    redirect(`/refresh-session?next=${encodeURIComponent(nextPath)}`);
  }

  redirect(RouteInstance.login());
}

const SECONDS_TO_MILISECONDS = 1000;

// expiration date만 확인
function isTokenValid(token: string): boolean {
  if (!token) return false;

  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return false;

    const payloadJson = Buffer.from(payloadBase64, "base64").toString();
    const payload = JSON.parse(payloadJson);

    // s 단위 JWT 'exp'를 ms 단위로 변환
    return payload.exp * SECONDS_TO_MILISECONDS > Date.now();
  } catch (error) {
    return false;
  }
}
