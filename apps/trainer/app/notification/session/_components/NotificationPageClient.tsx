"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useState } from "react";

import SessionContainer from "./SessionContainer";
import SessionCompleteSheet from "../../_components/SheetRenderer/SessionCompleteSheet";
import { parseContent } from "../../_utils/notificationParser";

function SessionNotificationPageClient() {
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

  const info = selectedNotification
    ? parseContent(selectedNotification.content)
    : { message: "", eventDate: "", other: "" };

  return (
    <>
      <SessionContainer onNotificationClick={handleNotificationClick} />
      {selectedNotification && (
        <SessionCompleteSheet
          notificationId={selectedNotification.notificationId}
          open={isActionSheetOpen}
          onChangeOpen={setIsActionSheetOpen}
          eventDate={info.eventDate || ""}
        />
      )}
    </>
  );
}

export default SessionNotificationPageClient;
