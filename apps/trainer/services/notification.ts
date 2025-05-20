import http from "@trainer/app/apiCore";

import {
  GetNotificationDetailApiResponse,
  GetNotificationDetailRequestPath,
} from "./types/notification.dto";
import {
  GetNotificationApiResponse,
  GetNotificationRequestQuery,
  ReadNotificationApiResponse,
  ReadNotificationRequestBody,
  SendPushTokenRequestBody,
} from "./types/notification.dto";

export const getNotification = (params: GetNotificationRequestQuery) =>
  http.get<GetNotificationApiResponse>({
    url: `/v1/notifications`,
    params,
  });
export const getNotificationDetail = ({ notificationId }: GetNotificationDetailRequestPath) =>
  http.get<GetNotificationDetailApiResponse>({
    url: `/v1/notifications/${notificationId}`,
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
