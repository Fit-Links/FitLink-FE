import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import RouteInstance from "@trainer/constants/route";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@trainer/constants/token";

export async function requireAuth(nextPath = "/") {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!accessToken && !refreshToken) {
    redirect(RouteInstance.login());
  }

  if (accessToken && isTokenValid(accessToken)) {
    return;
  }

  if (refreshToken) {
    redirect(`/refresh-session?next=${encodeURIComponent(nextPath)}`);
  }

  redirect(RouteInstance.login());
}

const SECONDS_TO_MILISECONDS = 1000;

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
