import http from "@user/app/apiCore";

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
    url: `/v1/notifications`,
    data,
  });
