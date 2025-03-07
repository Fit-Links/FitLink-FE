import {
  BaseSignupInfo,
  NoResponseData,
  PreferredWorkout,
  ResponseBase,
} from "@5unwan/core/api/types/common";

export type SignupRequestBody = BaseSignupInfo & {
  workoutSchedule: PreferredWorkout[];
};

export type SignupApiResponse = ResponseBase<{ accessToken: string; refreshToken: string }>;

export type LogoutApiResponse = NoResponseData;
