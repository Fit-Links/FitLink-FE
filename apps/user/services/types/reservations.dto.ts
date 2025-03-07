import {
  BaseMemberInfo,
  BaseReservationDetail,
  BaseReservationListItem,
  DayOfWeek,
  ReservationPathParams,
  ReservationStatus,
  ResponseBase,
} from "@5unwan/core/api/types/common";

export type ReservationStatusRequestQuery = {
  date?: string;
};
type ReservationStatusResponse = {
  reservations: BaseReservationListItem[];
};
export type ReservationStatusApiResponse = ResponseBase<ReservationStatusResponse>;

export type ReservationDetailStatusRequestPath = ReservationPathParams;
type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정">,
  BaseMemberInfo
>;
export type ReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

export type DirectReservationRequestBody = {
  reservations: {
    trainerId: number;
    memberId: number;
    name: string;
    date: string[];
    priority: number;
  }[];
};
type DirectReservationResponse = {
  reservation: {
    reservationId: number;
    status: Extract<ReservationStatus, "예약 대기">;
  };
};
export type DirectReservationApiResponse = ResponseBase<DirectReservationResponse>;

export type CancelReservationRequestPath = ReservationPathParams;
export type CancelReservationRequestBody = {
  cancel_reason: string;
};
type CancelReservationResponse = {
  reservationId: number;
};
export type CancelReservationApiResponse = ResponseBase<CancelReservationResponse>;

export type ReservationChangeRequestPath = ReservationPathParams;
export type ReservationChangeRequestBody = {
  reservationDate: string;
  reservationDay: DayOfWeek;
  changeDate: string;
  changeDay: DayOfWeek;
};
type ReservationChangeResponse = {
  reservationId: number;
};
export type ReservationChangeApiResponse = ResponseBase<ReservationChangeResponse>;
