"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import React from "react";

type NotificationListProps = {
  notificationList: NotificationInfo[];
};

function NotificationList({ notificationList }: NotificationListProps) {
  return (
    <ul className="flex flex-col items-center gap-4">
      {notificationList?.map(({ content, sendDate, isProcessed }, index) => (
        <NotificationItem
          message={content}
          createdAt={sendDate}
          isCompleted={isProcessed}
          variant="reserve"
          key={`${sendDate}-${index}`}
          className="w-full"
        />
      ))}
    </ul>
  );
}

export default NotificationList;
