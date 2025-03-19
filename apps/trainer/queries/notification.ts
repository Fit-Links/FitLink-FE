import { NotificationType } from "@5unwan/core/api/types/common";
import { queryOptions } from "@tanstack/react-query";

import { getNotification } from "@trainer/services/notification";

export const notificationBaseKeys = {
  all: ["notification"] as const,
};

export const notificationQueries = {
  notifications: (type: NotificationType, name?: string) =>
    queryOptions({
      queryKey: [...notificationBaseKeys.all, type, name] as const,
      queryFn: () => getNotification({ type, name }),
    }),
};
