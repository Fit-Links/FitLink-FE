import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
  getMyInformation,
  getMyInformationDetail,
  getMyPtHistory,
} from "@user/services/myInformation";
import { MyPtHistoryStatus } from "@user/services/types/myInformation.dto";

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
  ptHistory: (memberId: number, status?: MyPtHistoryStatus) =>
    infiniteQueryOptions({
      queryKey: [...myInformationBaseKeys.ptHistories(), memberId, status],
      queryFn: ({ pageParam }) =>
        getMyPtHistory({ status, page: pageParam, size: PT_HISTORY_PAGE_SIZE }, { memberId }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.data.content.length === EMPTY_PAGE) {
          return undefined;
        }

        return lastPageParam + TO_NEXT_PAGE;
      },
      initialPageParam: START_PAGE,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }),
};
