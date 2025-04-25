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
  MyPtHistoryRequestPath,
  MyPtHistoryRequestQuery,
} from "./types/myInformation.dto";

const USER_BASE_URL = "members";

export const connectTrainer = ({ trainerCode }: ConnectTrainerRequestBody) =>
  http.post<ConnectTrainerApiResponse>({
    url: `${USER_BASE_URL}/connect`,
    data: {
      trainerCode,
    },
  });

export const disconnectTrainer = () =>
  http.post<DisconnectTrainerApiResponse>({ url: `${USER_BASE_URL}/disconnect` });

export const getMyInformation = () =>
  http.get<MyInformationApiResponse>({ url: `${USER_BASE_URL}/me` });

export const editMyInformation = ({ name, phoneNumber }: EditMyInformationRequestBody) =>
  http.patch<EditMyInformationApiResponse>({
    url: `${USER_BASE_URL}/me`,
    data: { name, phoneNumber },
  });

export const getMyInformationDetail = () =>
  http.get<MyInformationDetailApiResponse>({ url: `${USER_BASE_URL}/me/detail` });

export const editPreferredTime = (requestBody: EditPreferredTimeRequestBody) =>
  http.put<EditPreferredTimeApiResponse>({
    url: `${USER_BASE_URL}/me/workout-schedult`,
    data: requestBody,
  });

export const getMyPtHistory = (
  requestQuery: MyPtHistoryRequestQuery,
  requestPath: MyPtHistoryRequestPath,
) => {
  const { memberId } = requestPath;
  const { status, size, page } = requestQuery;

  return http.get<MyPtHistoryApiResponse>({
    url: `${USER_BASE_URL}/${memberId}/sessions`,
    params: { status, size, page },
  });
};
