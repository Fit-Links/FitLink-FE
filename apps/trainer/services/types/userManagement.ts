import {
  NoResponseData,
  PreferredWorkout,
  PtStatus,
  ResponseBase,
  SessionInfo,
} from "@5unwan/core/api/types/common";

/** PT 회원 개별 정보 */
export type PtUser = {
  memberId: number;
  name: string;
  birthDate: string;
  phoneNumber: string;
  totalCount: number;
  remainingCount: number;
};

/** PT 회원 리스트 요청  */
export type PtUserListRequestQuery = {
  q: string;
  page?: number;
  size?: number;
};
/** 응답 데이터 */
type PtUserListResponse = {
  content: PtUser[];
  totalPages: string;
  totalElements: string;
};
export type PtUserListApiResponse = ResponseBase<PtUserListResponse>;

/** PT 회원 상세 조회 요청 */
export type PtUserDetailRequestPath = { memberId: string };
/** PT 회원 상세 조회 응답 데이터 */
type PtUserDetailResponse = Omit<PtUser, "totalCount" | "remainingCount"> & {
  profilePictureUrl: string;
  sessionInfo: SessionInfo;
  workoutSchedules: PreferredWorkout[];
};
export type PtUserDetailApiResponse = ResponseBase<PtUserDetailResponse>;

/** Member 연결 해제 요청  */
export type UnlinkMemberRequestPath = { memberId: string };
// 응답
export type UnlinkMemberApiResponse = NoResponseData;

/** 전체 PT 등록수/남은 횟수 수정 요청   (경로 변수 + request body) */
export type SessionCountEditRequestPath = { memberId: string; sessionInfoId: string };
export type SessionCountEditRequestBody = { totalCount?: number; remainingCount?: number };
/** 응답 데이터 */
type SessionCountEditResponse = {
  totalCount: number;
  remainingCount: number;
};
export type SessionCountEditApiResponse = ResponseBase<SessionCountEditResponse>;

/** 특정 멤버 PT 내역 수정 */
export type TargetMemberEditPtHistoryRequestPath = { memberId: string; sessionId: string };
export type TargetMemberEditPtHistoryRequestBody = { status: PtStatus };

/** 응답 데이터 */
type TargetMemberEditPtHistoryResponse = {
  sessionId: number;
  reservationDate: string;
  sessionStatus: PtStatus;
};
export type TargetUserEditPtHistoryApiResponse = ResponseBase<TargetMemberEditPtHistoryResponse>;
