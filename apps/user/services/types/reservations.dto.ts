import {
  BaseMemberInfo,
  BaseReservationDetail,
  BaseReservationListItem,
  ReservationPathParams,
  ReservationStatus,
  ResponseBase,
} from "@5unwan/core/api/types/common";

type NullableMemberInfo = { [K in keyof BaseMemberInfo]: BaseMemberInfo[K] | null };

export type ReservationStatusRequestQuery = {
  date?: string;
};
type ReservationStatusResponse = BaseReservationListItem[];
export type ReservationStatusApiResponse = ResponseBase<ReservationStatusResponse>;

export type TrainerReservationStatusPathParams = {
  date: string;
};
type TrainerReservationStatusResponse = Omit<
  BaseReservationListItem,
  "sessionInfoId" | "memberInfo"
> & {
  sessionInfoId: number | null;
  memberInfo: NullableMemberInfo;
};
export type TrainerReservationStatusApiResponse = ResponseBase<TrainerReservationStatusResponse>;

export type ReservationDetailStatusRequestPath = ReservationPathParams;
type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정">,
  BaseMemberInfo
>;
export type ReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

export type DirectReservationRequestBody = {
  trainerId: number;
  memberId: number;
  name: string;
  dates: string[];
  // priority: number;
};
type DirectReservationResponse = {
  reservationId: number;
  status: Extract<ReservationStatus, "예약 대기">;
  reservationDate: string;
};
export type DirectReservationApiResponse = ResponseBase<DirectReservationResponse>;

export type CancelReservationRequestPath = ReservationPathParams;
export type CancelReservationRequestBody = {
  cancelReason: string;
  cancelDate: string;
};
type CancelReservationResponse = {
  reservationId: number;
};
export type CancelReservationApiResponse = ResponseBase<CancelReservationResponse>;

export type ReservationChangeRequestPath = ReservationPathParams;
export type ReservationChangeRequestBody = {
  reservationDate: string;
  changeRequestDate: string;
};
type ReservationChangeResponse = {
  reservationId: number;
};
export type ReservationChangeApiResponse = ResponseBase<ReservationChangeResponse>;
