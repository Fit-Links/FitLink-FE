import axios from "axios";

import { BASE_ROUTE_HANDLER_URL } from "@user/constants/url";

import http from "../app/apiCore";
import {
  LogoutApiResponse,
  SignupRequestBody,
  SignupApiResponse,
  GetUserVerificationStatusApiResponse,
  GetSnsVerificationTokenApiResponse,
  SaveTokensBody,
  SaveTokensApiResponse,
  ReissueTokenApiResponse,
  ReissueTokenRequestBody,
  SaveReissuedTokensApiResponse,
} from "./types/auth.dto";

export const signup = (data: SignupRequestBody) =>
  http.post<SignupApiResponse>({
    url: "/v1/auth/members/register",
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

export const saveTokens = (data: SaveTokensBody) =>
  axios.post<SaveTokensApiResponse>("/api/auth/tokens", data);

export const reissueToken = (data: ReissueTokenRequestBody) =>
  http.post<ReissueTokenApiResponse>(
    {
      url: "/v1/auth/access-token",
      data,
    },
    "public",
  );

export const saveReissuedTokens = async () => {
  return axios.post<SaveReissuedTokensApiResponse>(
    `${BASE_ROUTE_HANDLER_URL}/api/auth/reissue-token`,
    {},
    {
      withCredentials: true,
    },
  );
};
