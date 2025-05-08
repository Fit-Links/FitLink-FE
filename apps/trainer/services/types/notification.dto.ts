import {
  NotificationDetailInfo,
  NotificationInfo,
  NotificationQueryType,
  ResponseBase,
} from "@5unwan/core/api/types/common";

export type GetNotificationRequestQuery = {
  type?: NotificationQueryType;
  q?: string;
};
export type GetNotificationApiResponse = ResponseBase<{
  content: NotificationInfo[];
}>;
export type GetNotificationDetailRequestPath = {
  notificationId: number;
};
export type GetNotificationDetailApiResponse = ResponseBase<NotificationDetailInfo>;
export type ReadNotificationRequestBody = {
  id: number;
};
export type ReadNotificationApiResponse = ResponseBase<{
  notificationId: number;
}>;
export type SendPushTokenRequestBody = {
  pushToken: string;
};
