"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Fragment, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import EmptyList from "./EmptyList";
import NotificationItemContainer from "./NotificationItemContainer";
import { NotificationStatus } from "../_types";
import createFilteredNotificationCount from "../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../_utils/handleNotificationFilter";

type NotificationContainerProps = {
  onClick: (notification: NotificationInfo) => () => void;
};

function NotificationContainer({ onClick }: NotificationContainerProps) {
  const [status, setStatus] = useState<NotificationStatus>("all");
  const intersectionRef = useRef(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    ...notificationQueries.list({}),
  });

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect: handleIntersect,
  });

  const filteredNotificationCount = createFilteredNotificationCount(data, status);

  return (
    <div className="">
      <ToggleGroup
        type="single"
        value={status}
        onValueChange={setStatus as (value: string) => void}
        className="w-full justify-start"
      >
        <ToggleGroupItem value="all">전체</ToggleGroupItem>
        <ToggleGroupItem value="pending">미처리</ToggleGroupItem>
        <ToggleGroupItem value="complete">처리</ToggleGroupItem>
      </ToggleGroup>
      <div className="my-4 flex items-center justify-between">
        <span className="text-body-3">{`${filteredNotificationCount}개의 알림`}</span>
        <span className="text-body-3">최신순</span>
      </div>
      {data.pages[0].data.totalElements ? (
        <ul>
          {data.pages.map((group, index) => (
            <Fragment key={`notification-group-${index}`}>
              {group.data.content.filter(handleNotificationFilter(status)).map((notification) => (
                <NotificationItemContainer
                  key={`notification-${notification.notificationId}`}
                  notification={notification}
                  onClick={onClick(notification)}
                />
              ))}
            </Fragment>
          ))}
          <div ref={intersectionRef} />
        </ul>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export default NotificationContainer;

// const DUMMY_NOTIFICATION = [
//   {
//     notificationId: 1,
//     type: "예약 요청",
//     content: "홍길동 회원님이 PT 예약을 요청하였습니다.\n날짜: 04.20 (일) 오후 6시",
//     sendDate: "2025-04-09T17:25:15.879023",
//     isProcessed: false,
//   },
//   {
//     notificationId: 2,
//     type: "예약 변경",
//     content:
//       "홍길동 회원님의 PT 예약 변경이 요청되었습니다.\n날짜: 04.21 (월) 오후 5시 -> 04.22 (화) 오후 5시",
//     sendDate: "2025-04-08T17:25:15.881664",
//     isProcessed: false,
//   },
//   {
//     notificationId: 3,
//     type: "예약 취소",
//     content: "홍길동 회원이 PT 예약 취소를 요청했습니다\n날짜: 1.1 (월) 오후 12시",
//     sendDate: "2025-04-07T17:25:15.882358",
//     isProcessed: false,
//   },
//   {
//     notificationId: 4,
//     type: "연동 승인",
//     content: "홍길동 회원이 연동 승인을 요청했습니다",
//     sendDate: "2025-04-06T17:25:15.882954",
//     isProcessed: false,
//   },
//   {
//     notificationId: 5,
//     type: "연동 해제",
//     content: "홍길동 회원이 연동을 해제했습니다",
//     sendDate: "2025-04-05T17:25:15.883592",
//     isProcessed: false,
//   },
//   {
//     notificationId: 6,
//     type: "세션",
//     content: "홍길동 회원의 PT가 종료되었습니다\n날짜: 04.20 (일) 오후 6시",
//     sendDate: "2025-04-04T17:25:15.884254",
//     isProcessed: false,
//   },
// ];
