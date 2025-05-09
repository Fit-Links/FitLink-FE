import http from "@trainer/app/apiCore";

import {
  LogoutApiResponse,
  SignupRequestBody,
  SignupApiResponse,
  GetUserVerificationStatusApiResponse,
  GetSnsVerificationTokenApiResponse,
} from "./types/auth.dto";

export const signup = (data: SignupRequestBody) =>
  http.post<SignupApiResponse>({
    url: "/v1/auth/trainers/register",
    data,
  });

export const logout = () =>
  http.post<LogoutApiResponse>({
    url: "/v1/auth/logout",
  });

export const getUserVerificationStatus = () =>
  http.get<GetUserVerificationStatusApiResponse>({
    url: "/v1/auth/status",
  });

export const getSnsVerificationToken = () =>
  http.get<GetSnsVerificationTokenApiResponse>({
    url: "/v1/auth/email-verification-token",
  });
