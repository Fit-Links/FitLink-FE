import { NotificationQueryType } from "@5unwan/core/api/types/common";
import { infiniteQueryOptions, keepPreviousData, queryOptions } from "@tanstack/react-query";

import { getNotification, getNotificationDetail } from "@trainer/services/notification";

const START_PAGE = 0;
const EMPTY_PAGE = 0;
const TO_NEXT_PAGE = 1;
const NOTIFICATION_PAGE_SIZE = 10;

export const notificationBaseKeys = {
  all: ["notification"] as const,
  lists: () => [...notificationBaseKeys.all, "lists"] as const,
  details: () => [...notificationBaseKeys.all, "details"] as const,
};

export const notificationQueries = {
  list: ({ memberId, type, q }: { memberId?: number; type?: NotificationQueryType; q?: string }) =>
    infiniteQueryOptions({
      queryKey: [...notificationBaseKeys.lists(), memberId, type, q],
      queryFn: ({ pageParam }) =>
        getNotification({ page: pageParam, size: NOTIFICATION_PAGE_SIZE, memberId, type, q }),
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.data.content.length === EMPTY_PAGE) {
          return undefined;
        }

        return lastPageParam + TO_NEXT_PAGE;
      },
      initialPageParam: START_PAGE,
      staleTime: 0,
      refetchOnWindowFocus: "always",
      refetchOnMount: "always",
    }),
  detail: (notificationId: number) =>
    queryOptions({
      queryKey: [...notificationBaseKeys.details(), notificationId],
      queryFn: () => getNotificationDetail({ notificationId }),
      staleTime: Infinity,
    }),
};
