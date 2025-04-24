"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { useState } from "react";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import NotificationItemContainer from "../_components/NotificationItemContainer";
import NotificationSearch from "../_components/NotificationSearch";

function ReservationNotificationPage() {
  const [isNotificationSearchOpen, setIsNotificationSearchOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();

  const handleSelectResult = () => {
    setIsNotificationSearchOpen(false);
  };
  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, type, content, sendDate, isProcessed } = notification;
    if (notificationId !== selectedNotification?.notificationId) {
      setSelectedNotification({
        notificationId,
        type,
        content,
        sendDate,
        isProcessed,
      });
    }
  };

  return (
    <div>
      <Header className="mb-4">
        <Header.Left>
          <NotificationSideBar />
        </Header.Left>
        <Header.Title content={"PT 예약 요청"} />
        <Header.Right>
          <NotificationSearch
            isOpen={isNotificationSearchOpen}
            setIsOpen={setIsNotificationSearchOpen}
            onSelectResult={handleSelectResult}
          />
        </Header.Right>
      </Header>
      <ToggleGroup
        type="single"
        value={status}
        onValueChange={setStatus}
        className="w-full justify-start"
      >
        <ToggleGroupItem value="all">전체</ToggleGroupItem>
        <ToggleGroupItem value="pending">미처리</ToggleGroupItem>
        <ToggleGroupItem value="complete">처리</ToggleGroupItem>
      </ToggleGroup>
      <ul>
        {DUMMY_NOTIFICATION.map((notification) => (
          <NotificationItemContainer
            notification={notification as NotificationInfo}
            onClick={handleNotificationClick(notification as NotificationInfo)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationNotificationPage;

const DUMMY_NOTIFICATION = [
  {
    notificationId: 1,
    type: "예약 요청",
    content: "홍길동 회원님이 PT 예약을 요청하였습니다.\n날짜: 04.20 (일) 오후 6시",
    sendDate: "2025-04-09T17:25:15.879023",
    isProcessed: false,
  },
  {
    notificationId: 2,
    type: "예약 요청",
    content: "홍길동 회원님이 PT 예약을 요청하였습니다.\n날짜: 04.20 (일) 오후 6시",
    sendDate: "2025-04-09T17:25:15.879023",
    isProcessed: false,
  },
  {
    notificationId: 3,
    type: "예약 요청",
    content: "홍길동 회원님이 PT 예약을 요청하였습니다.\n날짜: 04.20 (일) 오후 6시",
    sendDate: "2025-04-09T17:25:15.879023",
    isProcessed: false,
  },
  {
    notificationId: 4,
    type: "예약 요청",
    content: "홍길동 회원님이 PT 예약을 요청하였습니다.\n날짜: 04.20 (일) 오후 6시",
    sendDate: "2025-04-09T17:25:15.879023",
    isProcessed: false,
  },
];
