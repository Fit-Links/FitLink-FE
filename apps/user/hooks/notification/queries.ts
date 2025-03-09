import { queryOptions } from "@tanstack/react-query";

import { getNotification } from "@user/services/notification";

const notificationQueries = {
  all: () => ["notification"],
  lists: () => [...notificationQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...notificationQueries.lists(), "all"],
      queryFn: getNotification,
    }),
};
