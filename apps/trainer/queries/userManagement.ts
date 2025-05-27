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
  lists: () => [...userManagementBaseKeys.all, "lists"] as const,
  infos: () => [...userManagementBaseKeys.all, "infos"] as const,
  info: (memberId: number) => [...userManagementBaseKeys.infos(), memberId] as const,
};

export const userManagementQueries = {
  /** TODO: 조회 조건 추가 시 조건 추가(q를 비워도 되는건지 여쭤보기) */
  list: (q?: string) =>
    infiniteQueryOptions({
      queryKey: [...userManagementBaseKeys.lists(), q ?? ""] as const,
      queryFn: ({ pageParam }) =>
        getPtUserList({ q: q ?? "", page: pageParam, size: PT_HISTORY_PAGE_SIZE }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.data?.content.length === EMPTY_PAGE) {
          return undefined;
        }

        return lastPageParam + TO_NEXT_PAGE;
      },
      enabled: !!q,
      initialPageParam: START_PAGE,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }),
  detail: (memberId: number) =>
    queryOptions({
      queryKey: [...userManagementBaseKeys.info(memberId)] as const,
      queryFn: () => getPtUserDetail({ memberId }),
    }),
  ptHistory: (memberId: number, status: PtStatus) =>
    infiniteQueryOptions({
      queryKey: [...userManagementBaseKeys.info(memberId), status] as const,
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
};
