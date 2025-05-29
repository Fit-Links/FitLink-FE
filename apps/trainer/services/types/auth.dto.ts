import {
  AvailablePtTime,
  BaseSignupInfo,
  NoResponseData,
  ResponseBase,
} from "@5unwan/core/api/types/common";

export type SignupRequestBody = BaseSignupInfo & {
  availableTimes: Omit<AvailablePtTime, "availableTimeId">[];
};

export type SignupApiResponse = ResponseBase<{ accessToken: string; refreshToken: string }>;

export type LogoutApiResponse = NoResponseData;

export type GetUserVerificationStatusApiResponse = ResponseBase<{
  status: UserVerificationStatus;
  accessToken: string;
}>;

export type GetSnsVerificationTokenApiResponse = ResponseBase<{
  verificationToken: string;
}>;

export type UserVerificationStatus = "REQUIRED_REGISTER" | "REQUIRED_SMS" | "NORMAL";

export type SaveTokensBody = {
  accessToken: string;
  refreshToken: string;
};
export type SaveTokensApiResponse = {
  success: boolean;
};

export type ReissueTokenRequestBody = {
  refreshToken: string;
};
export type ReissueTokenApiResponse = ResponseBase<{
  accessToken: string;
}>;

export type SaveReissuedTokensApiResponse = {
  success: boolean;
  accessToken: string;
};
