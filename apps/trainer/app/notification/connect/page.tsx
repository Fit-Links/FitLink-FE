"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { useState } from "react";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import NotificationItemContainer from "../_components/NotificationItemContainer";
import NotificationSearch from "../_components/NotificationSearch";
import ConnectTrainerSheet from "../_components/SheetRenderer/ConnectTrainerSheet";

function ConnectNotificationPage() {
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

  return (
    <div>
      <Header className="mb-4">
        <Header.Left>
          <NotificationSideBar />
        </Header.Left>
        <Header.Title content={"연동 승인"} />
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
      {selectedNotification && (
        <ConnectTrainerSheet
          open={isActionSheetOpen}
          onChangeOpen={setIsActionSheetOpen}
          notificationId={selectedNotification.notificationId}
        />
      )}
    </div>
  );
}

export default ConnectNotificationPage;

const DUMMY_NOTIFICATION = [
  {
    notificationId: 1,
    type: "연동 승인",
    content: "홍길동 회원이 연동 승인을 요청했습니다",
    sendDate: "2025-04-06T17:25:15.882954",
    isProcessed: false,
  },
  {
    notificationId: 2,
    type: "연동 승인",
    content: "홍길동 회원이 연동 승인을 요청했습니다",
    sendDate: "2025-04-06T17:25:15.882954",
    isProcessed: false,
  },
  {
    notificationId: 3,
    type: "연동 승인",
    content: "홍길동 회원이 연동 승인을 요청했습니다",
    sendDate: "2025-04-06T17:25:15.882954",
    isProcessed: false,
  },
];
