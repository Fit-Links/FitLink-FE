import {
  BaseMemberInfo,
  BaseReservationDetail,
  BaseReservationListItem,
  DayOfWeek,
  ISODateString,
  IsoDateTimeString,
  ReservationPathParams,
  ReservationStatus,
  ResponseBase,
} from "@5unwan/core/api/types/common";

/* 예약 현황 조회 */
// 요청 파라미터: param
export type ReservationStatusParams = {
  date?: ISODateString;
};
// 응답 데이터: 예약 항목 리스트
export type ReservationStatusResponse = {
  reservations: BaseReservationListItem[];
};
export type ReservationStatusApiResponse = ResponseBase<ReservationStatusResponse>;

/* 예약 상세 조회  */
// 요청 파라미터(path param)
export type ReservationDetailStatusPathParmas = ReservationPathParams;
// 응답 데이터
export type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정">,
  BaseMemberInfo
>;
export type ReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

/* 직접 예약 */
// 요청: Request Body
export type DirectReservationRequest = {
  reservations: {
    trainerId: number;
    memberId: number;
    name: string;
    date: IsoDateTimeString[];
    priority: number;
  }[];
};
// 응답 데이터
export type DirectReservationResponse = {
  reservation: {
    reservationId: number;
    status: Extract<ReservationStatus, "예약 대기">;
  };
};
export type DirectReservationApiResponse = ResponseBase<DirectReservationResponse>;

/* 예약 취소 */
// 요청: 경로 변수와 Request Body 혼합
export type CancelReservationRequest = ReservationPathParams & {
  cancel_reason: string;
};
// 응답 데이터
export type CancelReservationResponse = {
  reservationId: number;
};
export type CancelReservationApiResponse = ResponseBase<CancelReservationResponse>;

/* 예약 변경 요청 */
// 요청: 경로 변수와 Request Body 혼합
export type ReservationChangeRequest = ReservationPathParams & {
  reservationDate: IsoDateTimeString;
  reservationDay: DayOfWeek;
  changeDate: ISODateString;
  changeDay: DayOfWeek;
};
// 응답 데이터
export type ReservationChangeResponse = {
  reservationId: number;
};
export type ReservationChangeApiResponse = ResponseBase<ReservationChangeResponse>;
