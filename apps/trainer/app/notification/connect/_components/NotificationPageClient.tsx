"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useState } from "react";

import ConnectContainer from "./ConnectContainer";
import ConnectTrainerSheet from "../../_components/SheetRenderer/ConnectTrainerSheet";

function ConnectNotificationPageClient() {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();

  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, type, content, sendDate, isProcessed, notificationType } = notification;
    if (notificationId !== selectedNotification?.notificationId) {
      setSelectedNotification({
        notificationId,
        type,
        notificationType,
        content,
        sendDate,
        isProcessed,
      });
    }

    setIsActionSheetOpen(true);
  };

  return (
    <>
      <ConnectContainer onNotificationClick={handleNotificationClick} />
      {selectedNotification && (
        <ConnectTrainerSheet
          open={isActionSheetOpen}
          onChangeOpen={setIsActionSheetOpen}
          notificationId={selectedNotification.notificationId}
        />
      )}
    </>
  );
}

export default ConnectNotificationPageClient;
