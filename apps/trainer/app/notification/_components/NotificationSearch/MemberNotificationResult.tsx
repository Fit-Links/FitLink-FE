"use client";

import { NotificationInfo, NotificationQueryType } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Fragment, Suspense, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import { NotificationStatus } from "../../_types";
import createFilteredNotificationCount from "../../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../../_utils/handleNotificationFilter";
import { parseEventDateFromContent } from "../../_utils/parser";
import EmptyList from "../EmptyList";
import NotificationItemContainer from "../NotificationItemContainer";
import NotificationListFallback from "../NotificationListFallback";
import SheetRenderer from "../SheetRenderer";

type MemberNotificationResultContentProps = {
  memberId: number;
  category: NotificationQueryType | "ALL";
  status: NotificationStatus;
  onNotificationClick: (notification: NotificationInfo) => () => void;
};
function MemberNotificationResultContent({
  memberId,
  category,
  status,
  onNotificationClick,
}: MemberNotificationResultContentProps) {
  const intersectionRef = useRef(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    notificationQueries.list({ memberId, type: category !== "ALL" ? category : undefined }),
  );

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect: handleIntersect,
  });

  const filteredNotificationCount = createFilteredNotificationCount(data, status);

  return (
    <>
      <div className="my-4 flex items-center justify-between">
        <span className="text-body-3">{`${filteredNotificationCount}개의 알림`}</span>
        <span className="text-body-3">최신순</span>
      </div>
      {data.pages[0].data.totalElements ? (
        <ul>
          {data.pages.map((group, index) => (
            <Fragment key={`search-notificationGroup-${index}`}>
              {group.data.content.filter(handleNotificationFilter(status)).map((notification) => (
                <NotificationItemContainer
                  notification={notification}
                  onClick={onNotificationClick(notification)}
                  key={`search-notification-${notification.notificationId}`}
                />
              ))}
            </Fragment>
          ))}

          {/* {DUMMY_NOTIFICATION.map((notification) => (
          <NotificationItemContainer
            notification={notification as NotificationInfo}
            onClick={handleNotificationClick(notification as NotificationInfo)}
          />
        ))} */}
          <div ref={intersectionRef} />
        </ul>
      ) : (
        <EmptyList />
      )}
    </>
  );
}

type MemberNotificationResultProps = {
  memberId: number;
};
function MemberNotificationResult({ memberId }: MemberNotificationResultProps) {
  const [category, setCategory] = useState<NotificationQueryType | "ALL">("ALL");
  const [status, setStatus] = useState<NotificationStatus>("all");
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

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
    <>
      <div className="flex flex-col items-start gap-4">
        <ToggleGroup
          type="single"
          value={category}
          onValueChange={setCategory as (value: string) => void}
        >
          <ToggleGroupItem value="ALL" className="flex-shrink-0">
            전체
          </ToggleGroupItem>
          <ToggleGroupItem value="CONNECT" className="flex-shrink-0">
            트레이너 연동
          </ToggleGroupItem>
          <ToggleGroupItem value="DISCONNECT" className="flex-shrink-0">
            트레이너 연동 해제
          </ToggleGroupItem>
          <ToggleGroupItem value="RESERVATION_REQUEST" className="flex-shrink-0">
            예약 요청
          </ToggleGroupItem>
          <ToggleGroupItem value="RESERVATION_CHANGE_CANCEL" className="flex-shrink-0">
            예약 변경/취소
          </ToggleGroupItem>
          <ToggleGroupItem value="SESSION" className="flex-shrink-0">
            세션
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          type="single"
          value={status}
          onValueChange={setStatus as (value: string) => void}
        >
          <ToggleGroupItem value="all">전체</ToggleGroupItem>
          <ToggleGroupItem value="pending">미처리</ToggleGroupItem>
          <ToggleGroupItem value="complete">처리</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <Suspense fallback={<NotificationListFallback />}>
        <MemberNotificationResultContent
          category={category}
          status={status}
          memberId={memberId}
          onNotificationClick={handleNotificationClick}
        />
      </Suspense>

      {ActionSheet &&
        ActionSheet(
          {
            notificationId: selectedNotification.notificationId,
            open: isActionSheetOpen,
            onChangeOpen: setIsActionSheetOpen,
          },
          parseEventDateFromContent(selectedNotification.content),
        )}
    </>
  );
}

export default MemberNotificationResult;

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
//       "길동 회원님의 PT 예약 변경이 요청되었습니다.\n날짜: 04.21 (월) 오후 5시 -> 04.22 (화) 오후 5시",
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
