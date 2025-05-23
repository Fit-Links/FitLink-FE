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

export type GetReservationStatusRequestQuery = {
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

type GetReservationStatusResponse = {
  reservations: ModifiedReservationListItem[];
};

export type GetReservationStatusApiResponse = ResponseBase<GetReservationStatusResponse>;

export type GetReservationDetailStatusRequestPath = ReservationPathParams;
type ReservationDetailStatusResponse = BaseReservationDetail<
  Extract<ReservationStatus, "예약 확정" | "수업 완료">,
  DetailedMemberInfo
> & {
  priority: number;
};
export type GetReservationDetailStatusApiResponse = ResponseBase<ReservationDetailStatusResponse>;

export type GetReservationWaitingMembersRequestPath = {
  reservationDate: string;
};
export type ReservationWaitingMember = DetailedMemberInfo &
  Pick<BaseReservationListItem, "reservationId" | "dayOfWeek"> & {
    reservationDates: string[];
  };
type GetReservationWaitingMembersResponse = {
  waitingMembers: ReservationWaitingMember[];
};
export type GetReservationWaitingMembersApiResponse =
  ResponseBase<GetReservationWaitingMembersResponse>;

export type SetReservationDateAvailabilityRequestBody = {
  date: string;
  reservationId?: number;
};
type SetReservationDateAvailabilityResponse = {
  reservationId: number;
};
export type SetReservationDateAvailabilityApiResponse =
  ResponseBase<SetReservationDateAvailabilityResponse>;

export type CreateDirectReservationRequestBody = {
  trainerId: number;
  memberId: number;
  name: string;
  date: string[];
};
type CreateDirectReservationResponse = {
  reservation: {
    reservationId: number;
    status: Extract<ReservationStatus, "예약 확정">;
  };
};
export type CreateDirectReservationApiResponse = ResponseBase<CreateDirectReservationResponse>;

export type CreateFixedReservationRequestBody = {
  memberId: number;
  name: string;
  dates: string[];
};
type CreateFixedReservationResponse = {
  reservations: ReservationResponseBase[];
};
export type CreateFixedReservationApiResponse = ResponseBase<CreateFixedReservationResponse>;

export type CancelReservationRequestPath = ReservationPathParams;
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
};
export type ProcessPTRequestBody = {
  memberId: number;
  isJoin: boolean;
};
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
