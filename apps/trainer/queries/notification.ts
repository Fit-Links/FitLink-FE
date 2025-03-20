import { NotificationType } from "@5unwan/core/api/types/common";
import { queryOptions } from "@tanstack/react-query";

import { getNotification } from "@trainer/services/notification";

export const notificationBaseKeys = {
  all: ["notification"] as const,
  lists: () => [...notificationBaseKeys.all, "lists"] as const,
};

export const notificationQueries = {
  list: (type: NotificationType, name?: string) =>
    queryOptions({
      queryKey: [...notificationBaseKeys.lists(), type, name] as const,
      queryFn: () => getNotification({ type, name }),
    }),
};
