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

export const getMyInformation = () =>
  http.get<MyInformationApiResponse>({ url: `${TRAINER_BASE_URL}/me` });

export const editMyInformation = ({ name, phoneNumber }: EditMyInformationRequestBody) =>
  http.patch<EditMyInformationApiResponse>({
    url: `${TRAINER_BASE_URL}/me`,
    data: {
      name,
      phoneNumber,
    },
  });

export const getTrainerCode = () =>
  http.get<TrainerCodeApiResponse>({ url: `${TRAINER_BASE_URL}/trainer-code` });

export const getAvailablePtTime = () =>
  http.get<AvailablePtTimeApiResponse>({ url: `${TRAINER_BASE_URL}/available-times` });

export const deleteAvailablePtTime = ({ availableTimeId }: DeleteAvailablePtTimeRequestPath) =>
  http.delete<DeleteAvailableTimeApiResponse>({
    url: `${TRAINER_BASE_URL}/available-times/${availableTimeId}`,
  });

export const addAvailablePtTime = ({ applyAt, availableTimes }: AddAvailablePtTimeRequestBody) =>
  http.post<AddAvailablePtTimeApiResponse>({
    url: `${TRAINER_BASE_URL}/available-times`,
    data: { applyAt, availableTimes },
  });

export const addTimeOff = ({ dayOfWeek, dayOfTime }: AddTimeOffRequestBody) =>
  http.post<AddTimeOffApiResponse>({
    url: `${TRAINER_BASE_URL}/day-off`,
    data: {
      dayOfWeek,
      dayOfTime,
    },
  });

export const deleteTimeOff = (
  requestPath: DeleteTimeOffRequestPath,
  requestBody: DeleteTimeOffRequestBody,
) => {
  const { dayOffId } = requestPath;
  const { dayOfWeek, dayOfTime } = requestBody;

  return http.delete<DeleteTimeOffApiResponse>({
    url: `${TRAINER_BASE_URL}/day-off/${dayOffId}`,
    data: {
      dayOfWeek,
      dayOfTime,
    },
  });
};
