import { TRAINER_BASE_URL } from "@trainer/constants/baseUrl";

import http from "../app/apiCore";
import {
  AddAvailablePtTimeApiResponse,
  AddAvailablePtTimeRequestBody,
  AddTimeOffApiResponse,
  AddTimeOffRequestBody,
  AvailablePtTimeApiResponse,
  DeleteAvailablePtTimeParams,
  DeleteAvailableTimeApiResponse,
  DeleteTimeOffApiResponse,
  DeleteTimeOffRequestBody,
  DeleteTimeOffRequestPath,
  EditMyInformationApiResponse,
  EditMyInformationRequestBody,
  GetDayOffApiResponse,
  MyInformationApiResponse,
  TrainerCodeApiResponse,
} from "./types/myInformation.dto";

export const getMyInformation = () =>
  http.get<MyInformationApiResponse>({ url: `/v1/${TRAINER_BASE_URL}/me` });

export const editMyInformation = ({ name, phoneNumber }: EditMyInformationRequestBody) =>
  http.patch<EditMyInformationApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/me`,
    data: {
      name,
      phoneNumber,
    },
  });

export const getTrainerCode = () =>
  http.get<TrainerCodeApiResponse>({ url: `/v1/${TRAINER_BASE_URL}/me/trainer-code` });

export const getAvailablePtTime = () =>
  http.get<AvailablePtTimeApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/me/available-times`,
  });

export const deleteAvailablePtTime = ({ applyAt }: DeleteAvailablePtTimeParams) =>
  http.delete<DeleteAvailableTimeApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/me/available-times?applyAt=${applyAt}`,
  });

export const addAvailablePtTime = ({ applyAt, availableTimes }: AddAvailablePtTimeRequestBody) =>
  http.post<AddAvailablePtTimeApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/me/available-times`,
    data: { applyAt, availableTimes },
  });

/** TODO: 휴무일 추가 API에 me url 추가됨
 * Request, Response 타입 변경됨
 */
export const addTimeOff = (days: AddTimeOffRequestBody) =>
  http.post<AddTimeOffApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/me/day-off`,
    data: days,
  });

export const deleteTimeOff = (
  requestPath: DeleteTimeOffRequestPath,
  requestBody: DeleteTimeOffRequestBody,
) => {
  const { dayOffId } = requestPath;
  const { dayOfWeek, dayOfTime } = requestBody;

  return http.delete<DeleteTimeOffApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/me/day-off/${dayOffId}`,
    data: {
      dayOfWeek,
      dayOfTime,
    },
  });
};

export const getDayOff = () =>
  http.get<GetDayOffApiResponse>({
    url: `/v1/${TRAINER_BASE_URL}/me/day-off`,
  });
