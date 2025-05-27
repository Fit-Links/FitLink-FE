/* eslint-disable @typescript-eslint/no-unused-vars */

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

export type CalendarParams = {
  today: string;
  type: "trainer";
};
export type CalendarResponse = {
  weekend: {
    dayOfWeek: DayOfWeek;
    date: string;
  }[];
};
export type CalendarApiResponse = ResponseBase<CalendarResponse>;

export type ReservationStatusPathParams = {
  date?: string;
};

type NullableMemberInfo = { [K in keyof BaseMemberInfo]: BaseMemberInfo[K] | null };

export type ModifiedReservationListItem = Omit<
  BaseReservationListItem,
  "sessionInfoId" | "memberInfo"
> & {
  sessionInfoId: number | null;
  memberInfo: NullableMemberInfo;
};

type ReservationStatusResponse = ModifiedReservationListItem[];
export type ReservationStatusApiResponse = ResponseBase<ReservationStatusResponse>;

export type ReservationDetailStatusRequestPath = ReservationPathParams;
type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정" | "수업 완료">,
  DetailedMemberInfo
> & {
  reservationId: number;
};
export type ReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

export type ReservationDetailPendingStatusRequestPath = { reservationDate: string };
export type ReservationDetailPendingStatus = DetailedMemberInfo &
  Pick<BaseReservationListItem, "reservationId" | "dayOfWeek"> & {
    reservationDates: string[];
  };
type ReservationDetailPendingStatusResponse = Array<ReservationDetailPendingStatus>;
export type ReservationDetailPendingStatusApiResponse =
  ResponseBase<ReservationDetailPendingStatusResponse>;

/** TODO: 예약불가 설정 API에 기존에 있던 예약 불가 설정을 취소하고 싶다면 reservationId 입력해주는 것으로 수정됨 */
export type ReservationSetNotAvailableRequestBody = {
  date: string;
  reservationId?: number;
};
type ReservationSetNotAvailableResponse = {
  reservationId: number;
};
export type ReservationSetNotAvailableApiResponse =
  ResponseBase<ReservationSetNotAvailableResponse>;
/** TODO: priority가 직접 예약 API에서 주석처리 되어있음 */
export type DirectReservationRequestBody = {
  trainerId: number;
  memberId: number;
  name: string;
  dates: string[];
};
type DirectReservationResponse = {
  reservation: {
    reservationId: number;
    status: Extract<ReservationStatus, "예약 확정">;
  };
};
export type DirectReservationApiResponse = ResponseBase<DirectReservationResponse>;

export type FixReservationRequestBody = {
  memberId: number;
  name: string;
  dates: string[];
};
type FixReservationResponse = {
  reservations: {
    reservationId: number;
    status: Extract<ReservationStatus, "고정 예약">;
  }[];
};
export type FixReservationApiResponse = ResponseBase<FixReservationResponse>;

export type CancelReservationRequestPath = ReservationPathParams;
/** TODO: 예약 취소 API에 cancelDate 필드 추가됨 */
export type CancelReservationRequestBody = {
  cancelReason: string;
  cancelDate: string;
};
type CancelReservationResponse = {
  reservationId: number;
};
export type CancelReservationApiResponse = ResponseBase<CancelReservationResponse>;

export type ApproveReservationRequestPath = ReservationPathParams;
export type ApproveReservationRequestBody = {
  memberId: number;
  reservationDate: string;
};
type ApproveReservationResponse = {
  reservationId: number;
  status: Extract<ReservationStatus, "예약 대기">;
};
export type ApproveReservationApiResponse = ResponseBase<ApproveReservationResponse>;

/** TODO: 진행한 PT처리 sessionId 대신 reservationId 사용 */
export type CompletedPtRequestPath = {
  reservationId: number;
};
export type CompletedPtRequestBody = {
  memberId: number;
  isJoin: boolean;
};
type CompletedPtResponse = {
  sessionId: number;
};
export type CompletedPtApiResponse = ResponseBase<CompletedPtResponse>;

export type ConfirmReservationChangeRequestPath = ReservationPathParams;
export type ConfirmReservationChangeRequestBody = {
  trainerId: number;
  memberId: number;
};
type ConfirmReservationChangeResponse = {
  reservationId: number;
};
export type ConfirmReservationChangeApiResponse = ResponseBase<ConfirmReservationChangeResponse>;
