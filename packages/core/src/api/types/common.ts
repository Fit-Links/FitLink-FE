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
export type PtInfo = {
  sessionId: number;
  reservationDate: string;
  status: PtStatus;
};
export type SessionInfo = {
  sessionInfoId: number;
  totalCount: number;
  remainingCount: number;
};
export type PreferredWorkout = {
  dayOfWeek: DayOfWeek;
  preferenceTimes: string[];
};
export type AvailablePtTime = {
  availableTimeId: number;
  dayOfWeek: DayOfWeek;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
};

export type ReservationStatus = "예약 확정" | "예약 대기" | "예약 불가" | "수업 완료" | "휴무일";

export type BaseMemberInfo = {
  memberId: number;
  name: string;
};

export type DetailedMemberInfo = BaseMemberInfo & {
  birthDate: string;
  phoneNumber: string;
  profilePictureUrl: string;
};

export type BaseReservationListItem = {
  reservationId: number;
  sessionInfoId: number;
  isDayOff: boolean;
  dayOfWeek: DayOfWeek;
  reservationDate: string | string[];
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

export type NotificationInfo = {
  notificationId: number;
  refId: number;
  refType: "예약" | "세션" | "트레이너 연동";
  notificationType: NotificationType;
  memberInfo: DetailedMemberInfo;
  sendDate: string;
  content: string;
  isProcessed: boolean;
};

export type NotificationType =
  | "RESERVATION_REQUESTED"
  | "RESERVATION_CANCEL_REQUEST"
  | "RESERVATION_CHANGE_REQUEST"
  | "SESSION_COMPLETED"
  | "CONNECT"
  | "DISCONNECT"
  | "RESERVATION_CHANGE_REQUEST_REFUSED"
  | "RESERVATION_APPROVE"
  | "RESERVATION_CANCEL"
  | "SESSION_DEDUCTED"
  | "SESSION_REMINDER"
  | "SESSION_CANCEL_REQUEST_APPROVED"
  | "SESSION_CANCEL_REQUEST_REFUSED"
  | "SESSION_REMAIN_5"
  | "SESSION_EDITED";

export type Gender = "MALE" | "FEMALE";

export type BaseSignupInfo = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: Gender;
  profileUrl: string;
};
