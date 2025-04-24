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
  startTime: string | null;
  endTime: string | null;
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
  reservationDate: string[];
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
  type: NotificationType;
  content: string;
  sendDate: string;
  isProcessed: boolean;
};

export type NotificationDetailInfo = {
  notificationId: number;
  refId: number;
  type: NotificationType;
  content: string;
  sendDate: string;
  isProcessed: boolean;
  userDetail: Omit<DetailedMemberInfo, "memberId">;
};

export type NotificationType =
  | "연동 승인"
  | "연동 해제"
  | "예약 요청"
  | "예약 변경"
  | "예약 취소"
  | "세션";
export type NotificationQueryType =
  | "CONNECT"
  | "DISCONNECT"
  | "RESERVATION_REQUEST"
  | "RESERVATION_CHANGE_CANCEL"
  | "SESSION";

export type Gender = "MALE" | "FEMALE";

export type BaseSignupInfo = {
  name: string;
  birthDate: string;
  phoneNumber: string;
  gender: Gender;
  profileUrl: string;
};
