"use client";

import { DetailedMemberInfo } from "@5unwan/core/api/types/common";
import Header from "@ui/components/Header";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { useRef, useState } from "react";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import NotificationSearch from "../_components/NotificationSearch";
import { notificationType } from "../_constants/notification";

function DisconnectNotificationPage() {
  const [isNotificationSearchOpen, setIsNotificationSearchOpen] = useState(false);
  const [status, setStatus] = useState("all");

  const selectedMemberRef = useRef<DetailedMemberInfo>();

  const handleSelectResult = () => {
    setIsNotificationSearchOpen(false);
  };
  const handleNotificationClick = (memberInformation: DetailedMemberInfo) => () => {
    selectedMemberRef.current = memberInformation;
  };

  return (
    <div>
      <Header className="mb-4">
        <Header.Left>
          <NotificationSideBar />
        </Header.Left>
        <Header.Title content={"연동 해제"} />
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
        {DUMMY_MEMBER_NOTIFICATION_RESULT.map(
          ({ notificationId, notificationType, memberInfo, message, sendDate, isProcessed }) => (
            <NotificationItem
              message={message}
              variant={notificationType as notificationType}
              createdAt={sendDate}
              avatarSrc={memberInfo.profilePictureUrl}
              memberName={memberInfo.name}
              isCompleted={isProcessed}
              key={`notification-${notificationId}`}
              className="w-full"
              onClick={handleNotificationClick(memberInfo)}
            />
          ),
        )}
      </ul>
    </div>
  );
}

export default DisconnectNotificationPage;
const DUMMY_MEMBER_NOTIFICATION_RESULT = [
  {
    notificationId: 1, //알림 ID
    refId: 1, // 연동 ID
    refType: "예약", //알람 종류 ["예약","세션","트레이너 연동"]
    notificationType: "예약 요청", // 알림종류
    memberInfo: {
      memberId: 1,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
    },
    message: "회원님이 PT 예약을 요청하였습니다.",
    sendDate: "2025-02-12T18:00",
    isProcessed: false,
  },
  {
    notificationId: 1, //알림 ID
    refId: 1, // 연동 ID
    refType: "예약", //알람 종류 ["예약","세션","트레이너 연동"]
    notificationType: "예약 변경", // 알림종류
    memberInfo: {
      memberId: 1,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
    },
    message: "회원님이 PT 예약을 요청하였습니다.",
    sendDate: "2025-02-12T18:00",
    isProcessed: false,
  },
  {
    notificationId: 1, //알림 ID
    refId: 1, // 연동 ID
    refType: "예약", //알람 종류 ["예약","세션","트레이너 연동"]
    notificationType: "예약 취소", // 알림종류
    memberInfo: {
      memberId: 1,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
    },
    message: "회원님이 PT 예약을 요청하였습니다.",
    sendDate: "2025-02-12T18:00",
    isProcessed: false,
  },
  {
    notificationId: 2, //알림 ID
    refId: 2, // 수업 ID
    refType: "세션", //알람 종류 ["예약","세션","트레이너 연동"]
    notificationType: "세션 완료", // 알림타입

    memberInfo: {
      memberId: 1,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
    },
    message: "세션이 완료 되었습니다.",
    sendDate: "2025-02-12T18:00",
    isProcessed: true,
  },
];
