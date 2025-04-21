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

export type ReservationStatusRequestQuery = {
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

type ReservationStatusResponse = {
  reservations: ModifiedReservationListItem[];
};

export type ReservationStatusApiResponse = ResponseBase<ReservationStatusResponse>;

export type ReservationDetailStatusRequestPath = ReservationPathParams;
type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정" | "수업 완료">,
  DetailedMemberInfo
> & {
  priority: number;
};
export type ReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

export type ReservationDetailPendingStatusRequestPath = ReservationPathParams;
export type ReservationDetailPendingStatus = DetailedMemberInfo &
  Pick<BaseReservationListItem, "reservationId" | "dayOfWeek"> & {
    reservationDates: string[];
  };
type ReservationDetailPendingStatusResponse = {
  waitingMembers: Array<ReservationDetailPendingStatus>;
};
export type ReservationDetailPendingStatusApiResponse =
  ResponseBase<ReservationDetailPendingStatusResponse>;

export type ReservationSetNotAvailableRequestBody = {
  date: string;
};
type ReservationSetNotAvailableResponse = {
  reservationId: number;
};
export type ReservationSetNotAvailableApiResponse =
  ResponseBase<ReservationSetNotAvailableResponse>;

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
    status: Extract<ReservationStatus, "예약 확정">;
  };
};
export type DirectReservationApiResponse = ResponseBase<DirectReservationResponse>;

export type FixReservationRequestBody = {
  trainerId: number;
  memberId: number;
  name: string;
  reservations: { date: string }[];
};
type FixReservationResponse = {
  reservations: {
    reservationId: number;
  }[];
};
export type FixReservationApiResponse = ResponseBase<FixReservationResponse>;

export type CancelReservationRequestPath = ReservationPathParams;
export type CancelReservationRequestBody = {
  cancel_reason: string;
};
type CancelReservationResponse = {
  reservationId: number;
};
export type CancelReservationApiResponse = ResponseBase<CancelReservationResponse>;

export type ApproveReservationRequestPath = ReservationPathParams;
export type ApproveReservationRequestBody = {
  trainerId: number;
  memberId: number;
};
type ApproveReservationResponse = {
  reservationId: number;
};
export type ApproveReservationApiResponse = ResponseBase<ApproveReservationResponse>;

export type CompletedPtRequestPath = {
  sessionId: number;
};
export type CompletedPtRequestBody = {
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
