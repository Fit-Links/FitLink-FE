"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { useState } from "react";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import NotificationItemContainer from "./_components/NotificationItemContainer";
import NotificationSearch from "./_components/NotificationSearch";
import SheetRenderer from "./_components/SheetRenderer";
import { parseEventDateFromContent } from "./_utils/parser";

function AllNotificationPage() {
  const [isNotificationSearchOpen, setIsNotificationSearchOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
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

    setIsActionSheetOpen(true);
  };

  const ActionSheet =
    selectedNotification && selectedNotification.type && SheetRenderer[selectedNotification.type];

  return (
    <div>
      <Header className="mb-4">
        <Header.Left>
          <NotificationSideBar />
        </Header.Left>
        <Header.Title content={"PT 수업"} />
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
            key={`notification-${notification.notificationId}`}
            notification={notification as NotificationInfo}
            onClick={handleNotificationClick(notification as NotificationInfo)}
          />
        ))}
      </ul>
      {ActionSheet &&
        ActionSheet(
          {
            notificationId: selectedNotification.notificationId,
            open: isActionSheetOpen,
            onChangeOpen: setIsActionSheetOpen,
          },
          parseEventDateFromContent(selectedNotification.content),
        )}
    </div>
  );
}

export default AllNotificationPage;

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
    type: "예약 변경",
    content:
      "홍길동 회원님의 PT 예약 변경이 요청되었습니다.\n날짜: 04.21 (월) 오후 5시 -> 04.22 (화) 오후 5시",
    sendDate: "2025-04-08T17:25:15.881664",
    isProcessed: false,
  },
  {
    notificationId: 3,
    type: "예약 취소",
    content: "홍길동 회원이 PT 예약 취소를 요청했습니다\n날짜: 1.1 (월) 오후 12시",
    sendDate: "2025-04-07T17:25:15.882358",
    isProcessed: false,
  },
  {
    notificationId: 4,
    type: "연동 승인",
    content: "홍길동 회원이 연동 승인을 요청했습니다",
    sendDate: "2025-04-06T17:25:15.882954",
    isProcessed: false,
  },
  {
    notificationId: 5,
    type: "연동 해제",
    content: "홍길동 회원이 연동을 해제했습니다",
    sendDate: "2025-04-05T17:25:15.883592",
    isProcessed: false,
  },
  {
    notificationId: 6,
    type: "세션",
    content: "홍길동 회원의 PT가 종료되었습니다\n날짜: 04.20 (일) 오후 6시",
    sendDate: "2025-04-04T17:25:15.884254",
    isProcessed: false,
  },
];
