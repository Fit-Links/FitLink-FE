import { PtStatus } from "@5unwan/core/api/types/common";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
  getPtUserDetail,
  getPtUserList,
  getTargetMemberPtHistory,
} from "@trainer/services/userManagement";

const PT_HISTORY_PAGE_SIZE = 3;
const START_PAGE = 0;
const EMPTY_PAGE = 0;
const TO_NEXT_PAGE = 1;

export const userManagementBaseKeys = {
  all: ["userManagement"] as const,
  members: () => [...userManagementBaseKeys.all, "members"] as const,
};

export const userManagementQueries = {
  targetMemberPtHistory: (memberId: number, status: PtStatus) =>
    infiniteQueryOptions({
      queryKey: [...userManagementBaseKeys.all, "targetMemberPtHistory", memberId, status],
      queryFn: ({ pageParam }) =>
        getTargetMemberPtHistory(
          { status, page: pageParam, size: PT_HISTORY_PAGE_SIZE },
          { memberId },
        ),
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
  memberList: (q: string, size: number) =>
    infiniteQueryOptions({
      queryKey: [...userManagementBaseKeys.members(), q, size],
      queryFn: ({ pageParam }) => getPtUserList({ q, page: pageParam, size }),
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
  memberDetail: (memberId: number) =>
    queryOptions({
      queryKey: [...userManagementBaseKeys.members(), memberId],
      queryFn: () => getPtUserDetail({ memberId }),
    }),
};
