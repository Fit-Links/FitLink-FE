import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";

import { getNotification } from "@user/services/notification";

const START_PAGE = 0;
const EMPTY_PAGE = 0;
const TO_NEXT_PAGE = 1;
const NOTIFICATION_PAGE_SIZE = 10;

export const notificationBaseKeys = {
  all: () => ["notification"] as const,
  lists: () => [...notificationBaseKeys.all(), "list"] as const,
};

export const notificationQueries = {
  list: () =>
    infiniteQueryOptions({
      queryKey: [...notificationBaseKeys.lists(), "all"],
      queryFn: ({ pageParam }) =>
        getNotification({ page: pageParam, size: NOTIFICATION_PAGE_SIZE }),
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
};
