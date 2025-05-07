import http from "@user/app/apiCore";

import {
  GetNotificationApiResponse,
  ReadNotificationApiResponse,
  ReadNotificationRequestBody,
  SendPushTokenRequestBody,
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

export const sendPushToken = (data: SendPushTokenRequestBody) =>
  http.post({
    url: "/v1/notifications/push-token/register",
    data,
  });
