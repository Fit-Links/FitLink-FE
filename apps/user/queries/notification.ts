import { queryOptions } from "@tanstack/react-query";

import { getNotification } from "@user/services/notification";

export const notificationBaseKeys = {
  all: () => ["notification"] as const,
  lists: () => [...notificationBaseKeys.all(), "list"] as const,
};

export const notificationQueries = {
  list: () =>
    queryOptions({
      queryKey: [...notificationBaseKeys.lists(), "all"],
      queryFn: getNotification,
    }),
};
