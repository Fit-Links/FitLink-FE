"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useState } from "react";

import DisconnectContainer from "./DisconnectContainer";

function DisconnectNotificationPageClient() {
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();

  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, type, content, sendDate, isProcessed, notificationType } = notification;
    if (notificationId !== selectedNotification?.notificationId) {
      setSelectedNotification({
        notificationId,
        type,
        content,
        sendDate,
        isProcessed,
        notificationType,
      });
    }
  };

  return <DisconnectContainer onNotificationClick={handleNotificationClick} />;
}

export default DisconnectNotificationPageClient;
