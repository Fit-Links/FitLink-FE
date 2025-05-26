import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
  getMyInformation,
  getMyInformationDetail,
  getMyPtHistory,
  getMyTrainerAvailableTime,
  getTrainerAvailableTimes,
} from "@user/services/myInformation";
import {
  MyPtHistoryStatus,
  TrainerAvailableTimesRequestPath,
} from "@user/services/types/myInformation.dto";

const PT_HISTORY_PAGE_SIZE = 3;
const START_PAGE = 0;
const EMPTY_PAGE = 0;
const TO_NEXT_PAGE = 1;

export const myInformationBaseKeys = {
  all: () => ["myInformation"] as const,
  ptHistories: () => [...myInformationBaseKeys.all(), "ptHistory"] as const,
};

export const myInformationQueries = {
  summary: () =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all(), "summary"],
      queryFn: getMyInformation,
    }),
  detail: () =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all(), "detail"],
      queryFn: getMyInformationDetail,
    }),
  ptHistory: (status?: MyPtHistoryStatus) =>
    infiniteQueryOptions({
      queryKey: [...myInformationBaseKeys.ptHistories(), "history", status],
      queryFn: ({ pageParam }) =>
        getMyPtHistory({ status, page: pageParam, size: PT_HISTORY_PAGE_SIZE }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.data?.content.length === EMPTY_PAGE) {
          return undefined;
        }

        return lastPageParam + TO_NEXT_PAGE;
      },
      initialPageParam: START_PAGE,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }),
  trainerAvailableTime: (trainerId: number) =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all(), "trainerAvailableTime", trainerId],
      queryFn: () => getMyTrainerAvailableTime(trainerId),
    }),
  trainerAvailableTimes: ({ trainerId }: TrainerAvailableTimesRequestPath) =>
    queryOptions({
      queryKey: [...myInformationBaseKeys.all(), "trainerAvailableTimes"] as const,
      queryFn: () => getTrainerAvailableTimes({ trainerId }),
    }),
};
