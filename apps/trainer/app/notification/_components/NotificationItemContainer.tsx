"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useQuery } from "@tanstack/react-query";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import Image from "next/image";
import { MouseEventHandler } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import NotificationItemFallback from "./NotificationItemFallback";
import { parseContent } from "../_utils/notificationParser";

type Props = {
  notification: NotificationInfo;
  onClick: MouseEventHandler<HTMLLIElement>;
};

function NotificationItemContainer({ notification, onClick }: Props) {
  const { data, isLoading, isError } = useQuery(
    notificationQueries.detail(notification.notificationId),
  );

  const { content, type, sendDate, isProcessed, notificationId } = notification;
  const { message, eventDate } = parseContent(content);

  if (isLoading || !data) {
    return (
      <NotificationItemFallback
        message={message || ""}
        eventDate={eventDate || ""}
        variant={type}
        createdAt={sendDate}
        isCompleted={isProcessed}
      />
    );
  }

  if (isError) {
    return (
      <NotificationItem
        message={message || ""}
        eventDate={eventDate || ""}
        variant={type}
        createdAt={sendDate}
        isCompleted={isProcessed}
        key={`notification-${notificationId}`}
        className="w-full"
        onClick={onClick}
      />
    );
  }
  const { profilePictureUrl, name } = data.data.userDetail;

  return (
    <NotificationItem
      message={message || ""}
      eventDate={eventDate || ""}
      variant={type}
      createdAt={sendDate}
      image={
        profilePictureUrl && (
          <Image
            width={50}
            height={50}
            src={profilePictureUrl}
            alt={`${name} 프로필`}
            className="h-full w-full"
          />
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
