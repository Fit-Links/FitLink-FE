import { NotificationInfo, ResponseBase } from "@5unwan/core/api/types/common";

export type GetNotificationRequestQuery = {
  page: number;
  size: number;
};
export type GetNotificationApiResponse = ResponseBase<{
  content: NotificationInfo[];
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
}>;
export type ReadNotificationRequestBody = {
  id: number;
};
export type ReadNotificationApiResponse = ResponseBase<{
  notificationId: number;
}>;
export type SendPushTokenRequestBody = {
  pushToken: string;
};
