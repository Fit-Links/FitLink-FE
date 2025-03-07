import {
  BaseMemberInfo,
  BaseReservationDetail,
  BaseReservationListItem,
  DayOfWeek,
  DetailedMemberInfo,
  ReservationPathParams,
  ReservationStatus,
  ResponseBase,
} from "@5unwan/core/api/types/common";

// 요청 파라미터 (param)
export type CalendarParams = {
  today: string;
  type: "trainer";
};
// 응답 데이터
export type CalendarResponse = {
  weekend: {
    dayOfWeek: DayOfWeek;
    date: string;
  }[];
};
export type CalendarApiResponse = ResponseBase<CalendarResponse>;

/* 예약 현황 조회 (리스트) */
// 요청 파라미터(param)
export type ReservationStatusParams = {
  date?: string;
};
// 응답 데이터
type ReservationStatusResponse = {
  reservations: Omit<BaseReservationListItem, "memberInfo" | "sessionInfoId">[] & {
    sessionInfoId: number | null;
    memberInfo: Partial<BaseMemberInfo>;
  };
};
export type ReservationStatusApiResponse = ResponseBase<ReservationStatusResponse>;

/* 예약 상세 조회 (예약 확정 또는 수업 완료 상태) */
// 요청 파라미터(path param)
export type ReservationDetailStatusPathParam = ReservationPathParams;
// 응답 데이터
type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정" | "수업 완료">,
  DetailedMemberInfo
> & {
  priority: number;
};
export type ReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

/* 예약 상세 대기 조회 */
// 요청: 경로 변수(path param)
export type ReservationDetailPendingStatusPathParams = ReservationPathParams;
// 응답 데이터
type ReservationDetailPendingStatusResponse = {
  waitingMembers: DetailedMemberInfo &
    Pick<BaseReservationListItem, "reservationId" | "dayOfWeek"> &
    {
      reservationDates: string[];
    }[];
};
export type ReservationDetailPendingStatusApiResponse =
  ResponseBase<ReservationDetailPendingStatusResponse>;

/* 예약 불가 설정 */
// 요청: Request Body
export type ReservationSetNotAvailableRequest = {
  date: string;
};
// 응답 데이터
type ReservationSetNotAvailableResponse = {
  reservationId: number;
};
export type ReservationSetNotAvailableApiResponse =
  ResponseBase<ReservationSetNotAvailableResponse>;

/* 직접 예약 */
// 요청: Request Body
export type DirectReservationRequest = {
  reservations: {
    trainerId: number;
    memberId: number;
    name: string;
    date: string[];
    priority: number;
  }[];
};
// 응답 데이터: 예약이 직접 확정된 경우 (예약 확정 상태만 포함)
type DirectReservationResponse = {
  reservation: {
    reservationId: number;
    status: Extract<ReservationStatus, "예약 확정">;
  };
};
export type DirectReservationApiResponse = ResponseBase<DirectReservationResponse>;

/* 고정 예약 */
// 요청: Request Body
export type FixReservationRequest = {
  trainerId: number;
  memberId: number;
  name: string;
  reservations: { date: string }[];
};
// 응답 데이터
type FixReservationResponse = {
  reservations: {
    reservationId: number;
  }[];
};
export type FixReservationApiResponse = ResponseBase<FixReservationResponse>;

/* 예약 취소 */
// 요청: 경로 변수와 Request Body 혼합
export type CancelReservationRequest = ReservationPathParams & {
  cancel_reason: string;
};
// 응답 데이터
type CancelReservationResponse = {
  reservationId: number;
};
export type CancelReservationApiResponse = ResponseBase<CancelReservationResponse>;

/* 예약 승인 */
// 요청: 경로 변수와 Request Body 혼합
export type ApproveReservationRequest = ReservationPathParams & {
  trainerId: number;
  memberId: number;
};
// 응답 데이터
type ApproveReservationResponse = {
  reservationId: number;
};
export type ApproveReservationApiResponse = ResponseBase<ApproveReservationResponse>;

/* 진행한 PT 처리 */
// 요청: 경로 변수와 Request Body 혼합
export type CompletedPtRequest = {
  sessionId: number;
  isJoin: boolean;
};
// 응답 데이터
type CompletedPtResponse = {
  sessionId: number;
};
export type CompletedPtApiResponse = ResponseBase<CompletedPtResponse>;

/* 예약 변경 승인 */
// 요청: 경로 변수와 Request Body 혼합
export type ConfirmReservationChangeRequest = ReservationPathParams & {
  trainerId: number;
  memberId: number;
};
// 응답 데이터
type ConfirmReservationChangeResponse = {
  reservationId: number;
};
export type ConfirmReservationChangeApiResponse = ResponseBase<ConfirmReservationChangeResponse>;
