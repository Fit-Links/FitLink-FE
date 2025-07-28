import { NotificationInfo } from "@5unwan/core/api/types/common";

import NotificationItemContainer from "./NotificationItemContainer";

type NotificationsPerPageProps = {
  notifications: NotificationInfo[];
  onClick: (notification: NotificationInfo) => () => void;
};

function NotificationsPerPage({ notifications, onClick }: NotificationsPerPageProps) {
  return (
    <>
      {notifications.map((notification) => (
        <NotificationItemContainer
          key={notification.notificationId}
          notification={notification}
          onClick={onClick(notification)}
        />
      ))}
    </>
  );
}

export default NotificationsPerPage;
