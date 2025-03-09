import http from "./core";
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

/** 트레이너 연결 요청 */
export const connectTrainer = ({ trainerCode }: ConnectTrainerRequestBody) => {
  http.post<ConnectTrainerApiResponse>({
    url: `${USER_BASE_URL}/connect`,
    data: {
      trainerCode,
    },
  });
};

/** 트레이너 연결 해제 요청 */
export const disconnectTrainer = () => {
  http.post<DisconnectTrainerApiResponse>({ url: `${USER_BASE_URL}/disconnect` });
};

/** 내 정보 조회 */
export const getMyInformation = () => {
  http.get<MyInformationApiResponse>({ url: `${USER_BASE_URL}/me` });
};

/** 내 정보 수정 */
export const editMyInformation = ({ name, phoneNumber }: EditMyInformationRequestBody) => {
  http.patch<EditMyInformationApiResponse>({
    url: `${USER_BASE_URL}/me`,
    data: { name, phoneNumber },
  });
};

/** 내 정보 상세 조회 */
export const getMyInformationDetail = () => {
  http.get<MyInformationDetailApiResponse>({ url: `${USER_BASE_URL}/me/detail` });
};

/** PT 희망시간 수정 */
export const editPreferredTime = (requestBody: EditPreferredTimeRequestBody) => {
  http.put<EditPreferredTimeApiResponse>({
    url: `${USER_BASE_URL}/me/workout-schedult`,
    data: requestBody,
  });
};

/** 내 PT 내역 조회 */
export const getMyPtHistory = (
  requestQuery: MyPtHistoryRequestQuery,
  requestPath: MyPtHistoryRequestPath,
) => {
  const { memberId } = requestPath;
  const { status, size, page } = requestQuery;

  http.get<MyPtHistoryApiResponse>({
    url: `${USER_BASE_URL}/${memberId}/sessions`,
    params: { status, size, page },
  });
};
