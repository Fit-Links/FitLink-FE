import { queryOptions } from "@tanstack/react-query";

import {
  getAvailablePtTime,
  getMyInformation,
  getTrainerCode,
} from "@trainer/services/myInformation";

export const myInformationBaseKeys = {
  all: ["myInformation"] as const,
};

export const myInformationQueries = {
  myInformation: () =>
    queryOptions({
      queryKey: myInformationBaseKeys.all,
      queryFn: getMyInformation,
    }),
  trainerCode: () =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all, "trainerCode"],
      queryFn: getTrainerCode,
    }),
  ptAvailableTime: () =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all, "ptAvailableTime"],
      queryFn: getAvailablePtTime,
    }),
};
