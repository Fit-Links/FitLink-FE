import { queryOptions } from "@tanstack/react-query";

import {
  getAvailablePtTime,
  getDayoff,
  getMyInformation,
  getTrainerCode,
} from "@trainer/services/myInformation";

export const myInformationBaseKeys = {
  all: ["myInformation"] as const,
};

export const myInformationQueries = {
  myInformation: () =>
    queryOptions({
      queryKey: [myInformationBaseKeys.all, "profile"] as const,
      queryFn: getMyInformation,
    }),
  trainerCode: () =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all, "trainerCode"] as const,
      queryFn: getTrainerCode,
    }),
  ptAvailableTime: () =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all, "ptAvailableTime"] as const,
      queryFn: getAvailablePtTime,
    }),
  dayoff: () =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all, "dayoff"] as const,
      queryFn: () => getDayoff(),
    }),
};
