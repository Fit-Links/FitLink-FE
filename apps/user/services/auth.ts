import http from "../app/apiCore";
import { LogoutApiResponse, SignupRequestBody, SignupApiResponse } from "./types/auth.dto";

export const signup = (data: SignupRequestBody) =>
  http.post<SignupApiResponse>({
    url: "/v1/auth/members/register",
    data,
  });

export const logout = () =>
  http.post<LogoutApiResponse>({
    url: "/v1/auth/logout",
  });
