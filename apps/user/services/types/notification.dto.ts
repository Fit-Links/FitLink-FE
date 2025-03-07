import { NotificationInfo, NotificationType, ResponseBase } from "@5unwan/core/api/types/common";

export type GetNotificationRequestQuery = {
  type: NotificationType;
  name?: string;
};
export type GetNotificationApiResponse = ResponseBase<{
  notificationList: NotificationInfo[];
}>;
export type ReadNotificationRequestBody = {
  id: number;
};
export type ReadNotificationApiResponse = ResponseBase<{
  notificationId: number;
}>;
