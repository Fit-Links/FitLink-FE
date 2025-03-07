import {
  NoResponseData,
  PreferredWorkout,
  PtInfo,
  PtStatus,
  ResponseBase,
  SessionInfo,
} from "@5unwan/core/api/types/common";

/** Trainer 연결 요청 */
export type ConnectTrainerRequestBody = {
  trainerCode: string;
};
type ConnectTrainerResponse = NoResponseData;
export type ConnectTrainerApiResponse = ResponseBase<ConnectTrainerResponse>;

/** Trainer 연결 해제 요청 */
type DisconnectTrainerResponse = NoResponseData;
export type DisconnectTrainerApiResponse = ResponseBase<DisconnectTrainerResponse>;

/** 내 정보 조회 */
type MyInformationResponse = {
  memberId: number;
  name: string;
  trainerId: number;
  trainerName: string;
  profilePictureUrl: string;
  sessionInfo: SessionInfo;
  workoutSchedules: (PreferredWorkout & { workoutScheduleId: string })[];
};
export type MyInformationApiResponse = ResponseBase<MyInformationResponse>;

/** 내 정보 수정 */
export type EditMyInformationRequestBody = {
  name?: string;
  phoneNumber: string;
};
type EditMyInformationResponse = NoResponseData;
export type EditMyInformationApiResponse = ResponseBase<EditMyInformationResponse>;

/** 내 정보 상세 조회 */
type MyInformationDetailResponse = {
  memberId: number;
  profilePictureUrl: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
};
export type MyInformationDetailApiResponse = ResponseBase<MyInformationDetailResponse>;

/** PT 희망시간 수정 */
export type EditPreferredTimeRequestBody = (PreferredWorkout & { workoutScheduleId: string })[];
type EditPreferredTimeResponse = (PreferredWorkout & { workoutScheduleId: string })[];
export type EditPreferredTimeApiResponse = ResponseBase<EditPreferredTimeResponse>;

/** 내 PT 내역 조회 */
export type MyPtHistoryRequestQuery = {
  status: PtStatus;
  page: number;
  size: number;
};
export type MyPtHistoryRequestPath = {
  memberId: number;
};
type MyPtHistoryResponse = {
  content: PtInfo[];
  totalPage: string;
  totalElements: string;
};
export type MyPtHistoryApiResponse = ResponseBase<MyPtHistoryResponse>;
