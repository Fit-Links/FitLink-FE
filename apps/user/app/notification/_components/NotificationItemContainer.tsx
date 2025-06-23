import { NotificationInfo } from "@5unwan/core/api/types/common";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import { MouseEventHandler } from "react";

import { parseContent } from "../_utils/notificationParser";

type NotificationItemContainerProps = {
  notification: NotificationInfo;
  isCompleted: boolean;
  onClick: MouseEventHandler<HTMLLIElement>;
};

function NotificationItemContainer({
  notification,
  isCompleted,
  onClick,
}: NotificationItemContainerProps) {
  const { content, type, sendDate, notificationId } = notification;

  const { message, eventDate } = parseContent(content);

  return (
    <NotificationItem
      message={message}
      eventDate={eventDate}
      createdAt={sendDate}
      isCompleted={isCompleted}
      variant={type}
      onClick={onClick}
      className="w-full"
      key={`notification-${notificationId}`}
    />
  );
}

export default NotificationItemContainer;
