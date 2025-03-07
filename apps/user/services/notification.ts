import http from "@5unwan/core/api/core";

import {
  GetNotificationApiResponse,
  ReadNotificationApiResponse,
  ReadNotificationRequestBody,
} from "./types/notification.dto";

export const getNotification = () =>
  http.get<GetNotificationApiResponse>({
    url: `/v1/notifications`,
    params: {
      type: "all",
    },
  });

export const readNotification = (data: ReadNotificationRequestBody) =>
  http.patch<ReadNotificationApiResponse>({
    url: `v1/notifications`,
    data,
  });
