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

// 예약 상태 (한글 리터럴)
export type ReservationStatus = "예약 확정" | "예약 대기" | "예약 불가" | "수업 완료" | "휴뮤일";

// 회원 정보 (기본)
export type BaseMemberInfo = {
  memberId: number;
  name: string;
};

// 트레이너 등에서 사용하는 상세 회원 정보
export type DetailedMemberInfo = BaseMemberInfo & {
  birthdate: string;
  phoneNumber: string;
  profilePictureUrl: string;
};

// 공통 예약 리스트 항목 (트레이너, 유저 모두 사용)
export type BaseReservationListItem = {
  reservationId: number;
  sessionInfoId: number;
  isDayOff: boolean;
  dayOfWeek: DayOfWeek;
  reservationDate: string;
  status: ReservationStatus;
  memberInfo: BaseMemberInfo;
};

// 공통 예약 상세 타입 (예약 상세 조회 시)
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

// 경로(Path) 변수에 사용되는 공통 타입
export type ReservationPathParams = {
  reservationId: number;
};
