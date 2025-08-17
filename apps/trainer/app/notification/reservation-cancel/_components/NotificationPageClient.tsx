"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useState } from "react";

import ReservationCancelContainer from "./ReservationCancelContainer";
import ReservationCancelSheet from "../../_components/SheetRenderer/ReservationCancelSheet";
import { parseContent } from "../../_utils/notificationParser";

function ReservationCancelNotificationPageClient() {
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
      <ReservationCancelContainer onNotificationClick={handleNotificationClick} />
      {selectedNotification && (
        <ReservationCancelSheet
          notificationId={selectedNotification.notificationId}
          open={isActionSheetOpen}
          onChangeOpen={setIsActionSheetOpen}
          eventDateDescription={info.eventDate || ""}
          cancelReason={info.other || ""}
        />
      )}
    </>
  );
}

export default ReservationCancelNotificationPageClient;
