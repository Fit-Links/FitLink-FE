import { NotificationType } from "@5unwan/core/api/types/common";
import { Text } from "@ui/components/Text";
import React from "react";

import NotificationList from "./NotificationList";

const notificationList = [
  {
    notificationId: 1,
    type: "예약 요청" as NotificationType,
    content: "예약 내용 0",
    sendDate: "2025-04-09T17:25:15.879023",
    isProcessed: false,
  },
  {
    notificationId: 4,
    type: "예약 요청" as NotificationType,
    content: "예약 내용 3" as NotificationType,
    sendDate: "2025-04-06T17:25:15.882954",
    isProcessed: false,
  },
  {
    notificationId: 6,
    type: "세션" as NotificationType,
    content: "세션 내용 5",
    sendDate: "2025-04-04T17:25:15.884254",
    isProcessed: false,
  },
];

function NotificationContainer() {
  // const { data } = useSuspenseQuery(notificationQueries.list());

  // const {
  //   data: { notificationList },
  // } = data;

  return (
    <div>
      <div className="flex items-center justify-between">
        <Text.Body3>{`${notificationList.length}개의 알림`}</Text.Body3>
        <Text.Body3>최신순</Text.Body3>
      </div>
      <NotificationList notificationList={notificationList} />
    </div>
  );
}

export default NotificationContainer;
