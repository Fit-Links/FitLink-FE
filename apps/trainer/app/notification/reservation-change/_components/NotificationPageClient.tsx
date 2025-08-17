"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useState } from "react";

import ReservationChangeContainer from "./ReservationChangeContainer";
import ReservationChangeSheet from "../../_components/SheetRenderer/ReservationChangeSheet";
import { parseContent } from "../../_utils/notificationParser";

function ReservationChangeNotificationPageClient() {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
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

    setIsActionSheetOpen(true);
  };

  const info = selectedNotification
    ? parseContent(selectedNotification.content)
    : { message: "", eventDate: "", other: "" };

  return (
    <>
      <ReservationChangeContainer onNotificationClick={handleNotificationClick} />
      {selectedNotification && (
        <ReservationChangeSheet
          notificationId={selectedNotification.notificationId}
          open={isActionSheetOpen}
          onChangeOpen={setIsActionSheetOpen}
          eventDateDescription={info.eventDate || ""}
        />
      )}
    </>
  );
}

export default ReservationChangeNotificationPageClient;
