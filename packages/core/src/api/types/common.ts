export type ResponseBase<T> = {
  status: number;
  success: boolean;
  msg: string;
  data: T;
};
export type NoResponseData = ResponseBase<null>;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
export type PtStatus = "COMPLETED" | "NO_SHOW" | "NONE" | "PENDING";
export type SessionInfo = {
  sessionInfoId: number;
  totalCount: number;
  remainingCount: number;
};
export type PreferredWorkout = {
  dayOfWeek: string;
  preferenceTimes: Array<string>;
};
export type AvailablePtTime = {
  availableTimeId: number;
  dayOfWeek: DayOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};
export type Gender = "MALE" | "FEMALE";
export type BaseSignupInfo = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: Gender;
  // TODO [2025.03.06]: BE 이미지 관리 정책 확정 후 업데이트
  // profileUrl: string;
};