import {
  BaseSignupInfo,
  DayOfWeek,
  NoResponseData,
  PreferredWorkout,
  ResponseBase,
} from "@5unwan/core/api/types/common";

export type AvailablePtTime = {
  dayOfWeek: DayOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};
export type SignupRequest = BaseSignupInfo & {
  workoutSchedule: PreferredWorkout[];
};
export type SignupResponse = ResponseBase<{ accessToken: string; refreshToken: string }>;
export type LogoutResponse = NoResponseData;
