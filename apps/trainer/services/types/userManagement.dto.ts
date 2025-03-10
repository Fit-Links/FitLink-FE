import {
  NoResponseData,
  PreferredWorkout,
  PtStatus,
  ResponseBase,
  SessionInfo,
} from "@5unwan/core/api/types/common";

export type PtUser = {
  memberId: number;
  name: string;
  birthDate: string;
  phoneNumber: string;
  totalCount: number;
  remainingCount: number;
};

export type PtUserListRequestQuery = {
  q: string;
  page?: number;
  size?: number;
};
type PtUserListResponse = {
  content: PtUser[];
  totalPages: string;
  totalElements: string;
};
export type PtUserListApiResponse = ResponseBase<PtUserListResponse>;

export type PtUserDetailRequestPath = { memberId: string };
type PtUserDetailResponse = Omit<PtUser, "totalCount" | "remainingCount"> & {
  profilePictureUrl: string;
  sessionInfo: SessionInfo;
  workoutSchedules: PreferredWorkout[];
};
export type PtUserDetailApiResponse = ResponseBase<PtUserDetailResponse>;

export type UnlinkMemberRequestPath = { memberId: string };
export type UnlinkMemberApiResponse = NoResponseData;

export type SessionCountEditRequestPath = { memberId: string; sessionInfoId: string };
export type SessionCountEditRequestBody = { totalCount?: number; remainingCount?: number };
type SessionCountEditResponse = {
  totalCount: number;
  remainingCount: number;
};
export type SessionCountEditApiResponse = ResponseBase<SessionCountEditResponse>;

export type TargetMemberEditPtHistoryRequestPath = { memberId: string; sessionId: string };
export type TargetMemberEditPtHistoryRequestBody = { status: PtStatus };
type TargetMemberEditPtHistoryResponse = {
  sessionId: number;
  reservationDate: string;
  sessionStatus: PtStatus;
};
export type TargetUserEditPtHistoryApiResponse = ResponseBase<TargetMemberEditPtHistoryResponse>;
