"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import React from "react";

type NotificationListProps = {
  notificationList: NotificationInfo[];
};

function NotificationList({ notificationList }: NotificationListProps) {
  // TODO[2025.03.30]: NotificationItem onClick 핸들러 구현 (알림 읽음 처리 API)
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
