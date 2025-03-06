import http from "@5unwan/core/api/core";

import { LogoutResponse, SignupRequest, SignupResponse } from "./types/auth.dto";

export const signup = (data: SignupRequest) =>
  http.post<SignupResponse>({
    url: "/v1/auth/members/register",
    data,
  });

export const logout = () =>
  http.post<LogoutResponse>({
    url: "/v1/auth/logout",
  });
