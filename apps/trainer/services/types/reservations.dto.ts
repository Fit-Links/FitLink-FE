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

export type GetReservationDetailStatusRequestPath = ReservationPathParams;
type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정" | "수업 완료">,
  DetailedMemberInfo
>;
export type GetReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

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

export type DirectReservationRequestBody = {
  trainerId: number;
  memberId: number;
  name: string;
  dates: string[];
};
type CreateDirectReservationResponse = {
  reservation: {
    reservationId: number;
    status: Extract<ReservationStatus, "예약 확정">;
  };
};
export type CreateDirectReservationApiResponse = ResponseBase<CreateDirectReservationResponse>;

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
export type CreateFixedReservationApiResponse = ResponseBase<FixReservationResponse>;

export type CancelReservationRequestPath = ReservationPathParams;
/** TODO: 예약 취소 API에 cancelDate 필드 추가됨 */
export type CancelReservationRequestBody = {
  cancelReason: string;
  cancelDate: string;
};
export type CancelReservationApiResponse = ResponseBase<ReservationResponseBase>;

export type ProcessCancelReservationRequestPath = ReservationPathParams;
export type ProcessCancelReservationRequestBody = {
  memberId: number;
  isApprove: boolean;
};
export type ProcessCancelReservationApiResponse = ResponseBase<ReservationResponseBase>;

export type TerminateFixedReservationRequestPath = ReservationPathParams;
export type TerminateFixedReservationApiResponse = ResponseBase<
  (ReservationResponseBase & { reservationDate: string })[]
>;

export type ApproveReservationRequestPath = ReservationPathParams;
export type ApproveReservationRequestBody = {
  memberId: number;
  reservationDate: string;
};
export type ApproveReservationApiResponse = ResponseBase<ReservationResponseBase>;

export type ProcessPTRequestPath = {
  reservationId: number;
  status: Extract<ReservationStatus, "예약 대기">;
};

export type CompletedPtRequestPath = {
  reservationId: number;
};
export type CompletedPtRequestBody = {
  memberId: number;
  isJoin: boolean;
};
type CompletedPtResponse = {
  sessionId: number;
  status: string;
};
export type CompletedPtApiResponse = ResponseBase<CompletedPtResponse>;

export type ProcessPTResponse = {
  sessionId: number;
  status: string;
};
export type ProcessPTApiResponse = ResponseBase<ProcessPTResponse>;

export type ProcessReservationChangeRequestPath = ReservationPathParams;
export type ProcessReservationChangeRequestBody = {
  memberId: number;
  approveDate: string;
  isApprove: boolean;
};

export type ProcessReservationChangeApiResponse = ResponseBase<ReservationResponseBase>;

export type EditFixedReservationRequestPath = {
  reservationId: number;
};
export type EditFixedReservationRequestBody = {
  reservationDate: string;
  changeDate: string;
};
export type EditFixedReservationApiResponse = ResponseBase<ReservationResponseBase>;

export type ReservationResponseBase = {
  reservationId: number;
  status: ReservationStatus;
};
