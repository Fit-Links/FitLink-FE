import { NotificationInfo, NotificationType } from "@5unwan/core/api/types/common";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import React, { MouseEventHandler } from "react";

import { parseMessageFromContent } from "../_utils/parser";

type NotificationItemContainerProps = {
  notification: NotificationInfo;
  onClick: MouseEventHandler<HTMLLIElement>;
};

function NotificationItemContainer({ notification, onClick }: NotificationItemContainerProps) {
  // TODO: 알림 상세 내역 조회 API 연결
  const { name, profilePictureUrl } = DUMMY_MEMBER_DATA;
  const { content, type, sendDate, isProcessed, notificationId } = notification;
  const message = parseMessageFromContent(content);

  return (
    <NotificationItem
      message={message}
      variant={type as NotificationType}
      createdAt={sendDate}
      avatarSrc={profilePictureUrl}
      memberName={name}
      isCompleted={isProcessed}
      key={`notification-${notificationId}`}
      className="w-full"
      onClick={onClick}
    />
  );
}

export default NotificationItemContainer;

const DUMMY_MEMBER_DATA = {
  name: "홍길동",
  birthDate: "1999-10-14",
  phoneNumber: "01023212321",
  profilePictureUrl: "http://123",
};
