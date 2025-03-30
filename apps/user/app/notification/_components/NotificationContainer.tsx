import { NotificationInfo } from "@5unwan/core/api/types/common";
import { Text } from "@ui/components/Text";
import React from "react";

import NotificationList from "./NotificationList";

const notificationList = [
  {
    notificationId: 1, //알림 ID
    refId: 1, // 연동 ID
    refType: "예약" as NotificationInfo["refType"], //알람 종류 ["예약","세션","트레이너 연동"]
    notificationType: "예약 요청" as NotificationInfo["notificationType"], // 알림종류
    memberInfo: {
      memberId: 1,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
    },
    content: "회원님이 PT 예약을 요청하였습니다.",
    sendDate: "2025-02-12T18:00",
    isProcessed: false,
  },
  {
    notificationId: 1, //알림 ID
    refId: 1, // 연동 ID
    refType: "예약" as NotificationInfo["refType"], //알람 종류 ["예약","세션","트레이너 연동"]
    notificationType: "예약 요청" as NotificationInfo["notificationType"], // 알림종류
    memberInfo: {
      memberId: 1,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
    },
    content: "회원님이 PT 예약을 요청하였습니다.",
    sendDate: "2025-02-12T18:00",
    isProcessed: false,
  },
  {
    notificationId: 1, //알림 ID
    refId: 1, // 연동 ID
    refType: "예약" as NotificationInfo["refType"], //알람 종류 ["예약","세션","트레이너 연동"]
    notificationType: "예약 요청" as NotificationInfo["notificationType"], // 알림종류
    memberInfo: {
      memberId: 1,
      name: "홍길동",
      birthDate: "1996-07-13",
      phoneNumber: "01057145507",
      profilePictureUrl: "https://",
    },
    content: "회원님이 PT 예약을 요청하였습니다.",
    sendDate: "2025-02-12T18:00",
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
