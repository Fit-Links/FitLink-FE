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

// TODO: 알림 읽음 API 오류 (백엔드 오류)
export const readNotification = ({ id }: ReadNotificationRequestBody) =>
  http.patch<ReadNotificationApiResponse>({
    url: `/v1/notifications/${id}`,
  });

export const sendPushToken = (data: SendPushTokenRequestBody) =>
  http.post({
    url: "/v1/notifications/push-token/register",
    data,
  });
