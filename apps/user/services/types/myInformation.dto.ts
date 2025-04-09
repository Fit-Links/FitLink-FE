import {
  NoResponseData,
  PreferredWorkout,
  PtInfo,
  ResponseBase,
  SessionInfo,
} from "@5unwan/core/api/types/common";

import { TrainerConnectStatus } from "@user/app/schedule-management/_types/addReservation";

export type ConnectTrainerRequestBody = {
  trainerCode: string;
};
type ConnectTrainerResponse = NoResponseData;
export type ConnectTrainerApiResponse = ResponseBase<ConnectTrainerResponse>;

type DisconnectTrainerResponse = NoResponseData;
export type DisconnectTrainerApiResponse = ResponseBase<DisconnectTrainerResponse>;

type MyInformationResponse = {
  memberId: number;
  name: string;
  trainerId: number;
  trainerName: string;
  connectingStatus: TrainerConnectStatus;
  profilePictureUrl: string;
  sessionInfo: SessionInfo;
  workoutSchedules: (PreferredWorkout & { workoutScheduleId: string })[];
};
export type MyInformationApiResponse = ResponseBase<MyInformationResponse>;

export type EditMyInformationRequestBody = {
  name?: string;
  phoneNumber: string;
};
type EditMyInformationResponse = NoResponseData;
export type EditMyInformationApiResponse = ResponseBase<EditMyInformationResponse>;

type MyInformationDetailResponse = {
  memberId: number;
  profilePictureUrl: string;
  name: string;
  birthDate: string;
  phoneNumber: string;
};
export type MyInformationDetailApiResponse = ResponseBase<MyInformationDetailResponse>;

export type EditPreferredTimeRequestBody = (PreferredWorkout & { workoutScheduleId: string })[];
type EditPreferredTimeResponse = (PreferredWorkout & { workoutScheduleId: string })[];
export type EditPreferredTimeApiResponse = ResponseBase<EditPreferredTimeResponse>;

export type MyPtHistoryStatus =
  | "SESSION_CANCELLED"
  | "SESSION_WAITING"
  | "SESSION_NOT_ATTEND"
  | "SESSION_COMPLETED";

export type MyPtHistoryRequestQuery = {
  status?: MyPtHistoryStatus;
  page: number;
  size: number;
};
export type MyPtHistoryRequestPath = {
  memberId: number;
};
type MyPtHistoryResponse = {
  content: PtInfo[];
  totalPages: string;
  totalElements: string;
};
export type MyPtHistoryApiResponse = ResponseBase<MyPtHistoryResponse>;
