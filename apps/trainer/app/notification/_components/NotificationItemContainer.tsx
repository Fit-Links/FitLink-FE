import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import Image from "next/image";
import { MouseEventHandler } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import NotificationItemError from "./NotificationItemError";
import NotificationItemFallback from "./NotificationItemFallback";
import { parseMessageFromContent } from "../_utils/parser";

type NotificationItemContainerProps = {
  notification: NotificationInfo;
  onClick: MouseEventHandler<HTMLLIElement>;
};

function NotificationItemContainer({ notification, onClick }: NotificationItemContainerProps) {
  const { data, isPending, isError } = useQuery(
    notificationQueries.detail(notification.notificationId),
  );

  const { content, type, sendDate, isProcessed, notificationId } = notification;
  const message = parseMessageFromContent(content);

  if (isPending)
    return (
      <NotificationItemFallback
        variant={type}
        createdAt={sendDate}
        isCompleted={isProcessed}
        message={message}
      />
    );

  if (isError) return <NotificationItemError />;

  const { profilePictureUrl, name } = data.data.userDetail;

  return (
    <NotificationItem
      message={message}
      variant={type}
      createdAt={sendDate}
      image={
        profilePictureUrl && (
          <Image width={50} height={50} src={profilePictureUrl} alt={`${name} 프로필`} />
        )
      }
      isCompleted={isProcessed}
      key={`notification-${notificationId}`}
      className="w-full"
      onClick={onClick}
    />
  );
}

export default NotificationItemContainer;
