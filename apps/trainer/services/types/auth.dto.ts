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
