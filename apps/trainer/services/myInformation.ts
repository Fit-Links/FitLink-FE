import { TRAINER_BASE_URL } from "@trainer/constants/baseUrl";

import http from "./core";
import {
  AddAvailablePtTimeApiResponse,
  AddAvailablePtTimeRequestBody,
  AddTimeOffApiResponse,
  AddTimeOffRequestBody,
  AvailablePtTimeApiResponse,
  DeleteAvailablePtTimeRequestPath,
  DeleteAvailableTimeApiResponse,
  DeleteTimeOffApiResponse,
  DeleteTimeOffRequestBody,
  DeleteTimeOffRequestPath,
  EditMyInformationApiResponse,
  EditMyInformationRequestBody,
  MyInformationApiResponse,
  TrainerCodeApiResponse,
} from "./types/myInformation.dto";

// 내 정보 조회
export const getMyInformation = () => {
  http.get<MyInformationApiResponse>({ url: `${TRAINER_BASE_URL}/me` });
};

// 내 정보 수정
export const editMyInformation = ({ name, phoneNumber }: EditMyInformationRequestBody) => {
  http.patch<EditMyInformationApiResponse>({
    url: `${TRAINER_BASE_URL}/me`,
    data: {
      name,
      phoneNumber,
    },
  });
};

// 트레이너 코드 조회
export const getTrainerCode = () => {
  http.get<TrainerCodeApiResponse>({ url: `${TRAINER_BASE_URL}/trainer-code` });
};

// PT 수업 가능 시간 조회
export const getAvailablePtTime = () => {
  http.get<AvailablePtTimeApiResponse>({ url: `${TRAINER_BASE_URL}/available-times` });
};

// PT 수업 가능 시간 삭제
export const deleteAvailablePtTime = ({ availableTimeId }: DeleteAvailablePtTimeRequestPath) => {
  http.delete<DeleteAvailableTimeApiResponse>({
    url: `${TRAINER_BASE_URL}/available-times/${availableTimeId}`,
  });
};

// PT 수업 가능 시간 추가
export const addAvailablePtTime = ({ applyAt, availableTimes }: AddAvailablePtTimeRequestBody) => {
  http.post<AddAvailablePtTimeApiResponse>({
    url: `${TRAINER_BASE_URL}/available-times`,
    data: { applyAt, availableTimes },
  });
};

// 휴무일 추가
export const addTimeOff = ({ dayOfWeek, dayOfTime }: AddTimeOffRequestBody) => {
  http.post<AddTimeOffApiResponse>({
    url: `${TRAINER_BASE_URL}/day-off`,
    data: {
      dayOfWeek,
      dayOfTime,
    },
  });
};

// 휴무일 삭제
export const deleteTimeOff = (
  requestPath: DeleteTimeOffRequestPath,
  requestBody: DeleteTimeOffRequestBody,
) => {
  const { dayOffId } = requestPath;
  const { dayOfWeek, dayOfTime } = requestBody;

  http.delete<DeleteTimeOffApiResponse>({
    url: `${TRAINER_BASE_URL}/day-off/${dayOffId}`,
    data: {
      dayOfWeek,
      dayOfTime,
    },
  });
};
