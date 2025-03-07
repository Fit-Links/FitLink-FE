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

export type ReservationStatus = "예약 확정" | "예약 대기" | "예약 불가" | "수업 완료" | "휴뮤일";

export type BaseMemberInfo = {
  memberId: number;
  name: string;
};

export type DetailedMemberInfo = BaseMemberInfo & {
  birthdate: string;
  phoneNumber: string;
  profilePictureUrl: string;
};

export type BaseReservationListItem = {
  reservationId: number;
  sessionInfoId: number;
  isDayOff: boolean;
  dayOfWeek: DayOfWeek;
  reservationDate: string;
  status: ReservationStatus;
  memberInfo: BaseMemberInfo;
};

export type BaseReservationDetail<
  TStatus extends ReservationStatus = ReservationStatus,
  TMember = BaseMemberInfo,
> = {
  dayOfWeek: DayOfWeek;
  reservationDate: string;
  sessionId: number;
  status: TStatus;
  memberInfo: TMember;
};

export type ReservationPathParams = {
  reservationId: number;
};
