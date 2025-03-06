import http from "@5unwan/core/api/core";

import {
  GetNotificationParams,
  GetNotificationResponse,
  ReadNotificationRequest,
  ReadNotificationResponse,
} from "./types/notification.dto";

export const getNotification = (params: GetNotificationParams) =>
  http.get<GetNotificationResponse>({ url: `/v1/notifications`, params });

export const readNotification = (data: ReadNotificationRequest) =>
  http.patch<ReadNotificationResponse>({
    url: `v1/notifications`,
    data,
  });
