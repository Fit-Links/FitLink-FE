import http from "../app/apiCore";
import {
  ConnectTrainerApiResponse,
  ConnectTrainerRequestBody,
  DisconnectTrainerApiResponse,
  EditMyInformationApiResponse,
  EditMyInformationRequestBody,
  EditPreferredTimeApiResponse,
  EditPreferredTimeRequestBody,
  MyInformationApiResponse,
  MyInformationDetailApiResponse,
  MyPtHistoryApiResponse,
  MyPtHistoryRequestQuery,
  MyTrainerAvailableTimeApiResponse,
  TrainerAvailableTimesApiResponse,
  TrainerAvailableTimesRequestPath,
} from "./types/myInformation.dto";

const USER_BASE_URL = "members";

export const connectTrainer = ({ trainerCode }: ConnectTrainerRequestBody) =>
  http.post<ConnectTrainerApiResponse>({
    url: `/v1/${USER_BASE_URL}/connect`,
    data: {
      trainerCode,
    },
  });

export const disconnectTrainer = () =>
  http.post<DisconnectTrainerApiResponse>({ url: `/v1/${USER_BASE_URL}/disconnect` });

export const getMyInformation = () =>
  http.get<MyInformationApiResponse>({ url: `/v1/${USER_BASE_URL}/me` });

export const editMyInformation = ({ name, phoneNumber }: EditMyInformationRequestBody) =>
  http.patch<EditMyInformationApiResponse>({
    url: `/v1/${USER_BASE_URL}/me`,
    data: { name, phoneNumber },
  });

export const getMyInformationDetail = () =>
  http.get<MyInformationDetailApiResponse>({ url: `/v1/${USER_BASE_URL}/me/detail` });

export const editPreferredTime = (requestBody: EditPreferredTimeRequestBody) =>
  http.put<EditPreferredTimeApiResponse>({
    url: `/v1/${USER_BASE_URL}/me/workout-schedule`,
    data: requestBody,
  });

export const getMyPtHistory = (requestQuery: MyPtHistoryRequestQuery) => {
  const { status, size, page } = requestQuery;

  return http.get<MyPtHistoryApiResponse>({
    url: `/v1/${USER_BASE_URL}/me/sessions`,
    params: { status, size, page },
  });
};

export const getMyTrainerAvailableTime = (trainerId: number) =>
  http.get<MyTrainerAvailableTimeApiResponse>({
    url: `/v1/trainers/${trainerId}/available-times`,
  });

export const getTrainerAvailableTimes = ({ trainerId }: TrainerAvailableTimesRequestPath) =>
  http.get<TrainerAvailableTimesApiResponse>({
    url: `/v1/trainers/${trainerId}/available-times`,
  });
