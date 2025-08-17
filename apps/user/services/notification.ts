import http from "@user/app/apiCore";

import {
  GetNotificationApiResponse,
  GetNotificationRequestQuery,
  ReadNotificationApiResponse,
  ReadNotificationRequestBody,
  SendPushTokenRequestBody,
} from "./types/notification.dto";

export const getNotification = ({ page, size }: GetNotificationRequestQuery) =>
  http.get<GetNotificationApiResponse>({
    url: `/v1/notifications`,
    params: { page, size },
  });

export const readNotification = ({ id }: ReadNotificationRequestBody) =>
  http.patch<ReadNotificationApiResponse>({
    url: `/v1/notifications/${id}`,
  });

export const sendPushToken = (data: SendPushTokenRequestBody) =>
  http.post({
    url: "/v1/notifications/push-token/register",
    data,
  });
