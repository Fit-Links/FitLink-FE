import { NotificationInfo } from "@5unwan/core/api/types/common";

import NotificationItemContainer from "./NotificationItemContainer";

type NotificationPageProps = {
  notifications: NotificationInfo[];
  onClick: (notification: NotificationInfo) => () => void;
};

function NotificationPage({ notifications, onClick }: NotificationPageProps) {
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

export default NotificationPage;
