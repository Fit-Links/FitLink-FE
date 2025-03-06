import { ResponseBase } from "@5unwan/core/api/types/common";

export type NotificationInfo = {
  notificationId: number;
  notificationType: string;
  refId: number;
  // TODO [2025.03.06]: 알림 status값 종류 전달 받은 후 업데이트
  status: "PROCESSING" | "COMPLETED";
  createdAt: string;
  message: string;
  isRead: boolean;
};
export type NotificationType =
  | "all"
  | "connections"
  | "sessions"
  | "reservations"
  | "connections-approval"
  | "connections-unlink"
  | "reservations-request"
  | "reservations-cancel";
export type GetNotificationParams = {
  type: NotificationType;
  name?: string;
};
export type GetNotificationResponse = ResponseBase<{
  notificationList: NotificationInfo[];
}>;
export type ReadNotificationRequest = {
  id: number;
};
export type ReadNotificationResponse = ResponseBase<{
  notificationId: number;
}>;
