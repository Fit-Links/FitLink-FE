"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Fragment, Suspense, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import EmptyList from "../_components/EmptyList";
import NotificationItemContainer from "../_components/NotificationItemContainer";
import NotificationSearch from "../_components/NotificationSearch";
import { NotificationStatus } from "../_types";
import createFilteredNotificationCount from "../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../_utils/handleNotificationFilter";

type DisconnectNotificationContentProps = {
  status: NotificationStatus;
  onNotificationClick: (notification: NotificationInfo) => () => void;
};
function DisconnectNotificationContent({
  status,
  onNotificationClick,
}: DisconnectNotificationContentProps) {
  const intersectionRef = useRef(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    notificationQueries.list({ type: "DISCONNECT" }),
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
          <div ref={intersectionRef} />
        </ul>
      ) : (
        <EmptyList />
      )}
    </>
  );
}
function DisconnectNotificationPage() {
  const [isNotificationSearchOpen, setIsNotificationSearchOpen] = useState(false);
  const [status, setStatus] = useState<NotificationStatus>("all");
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
        <Header.Title content="연동 해제" />
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
        onValueChange={setStatus as (value: string) => void}
        className="w-full justify-start"
      >
        <ToggleGroupItem value="all">전체</ToggleGroupItem>
        <ToggleGroupItem value="pending">미처리</ToggleGroupItem>
        <ToggleGroupItem value="complete">처리</ToggleGroupItem>
      </ToggleGroup>
      <Suspense>
        <DisconnectNotificationContent
          status={status}
          onNotificationClick={handleNotificationClick}
        />
      </Suspense>
    </div>
  );
}

export default DisconnectNotificationPage;

// const DUMMY_NOTIFICATION = [
//   {
//     notificationId: 3,
//     type: "연동 해제",
//     content: "홍길동 회원이 연동을 해제했습니다",
//     sendDate: "2025-04-05T17:25:15.883592",
//     isProcessed: false,
//   },

//   {
//     notificationId: 1,
//     type: "연동 해제",
//     content: "홍길동 회원이 연동을 해제했습니다",
//     sendDate: "2025-04-05T17:25:15.883592",
//     isProcessed: false,
//   },
//   {
//     notificationId: 5,
//     type: "연동 해제",
//     content: "홍길동 회원이 연동을 해제했습니다",
//     sendDate: "2025-04-05T17:25:15.883592",
//     isProcessed: false,
//   },
// ];
