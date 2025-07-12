"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";
import { useNotificationStore } from "@trainer/store/notificationStore";

import Logo from "@trainer/components/Logo";
import NotificationSideBar from "@trainer/components/NotificationSideBar";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import { commonLayoutContents } from "@trainer/constants/styles";

import { NOTIFICATION_QUERY_TYPE, NOTIFICATION_TYPE } from "./_constants";
import EmptyList from "../_components/EmptyList";
import NotificationItemContainer from "../_components/NotificationItemContainer";
import NotificationListFallback from "../_components/NotificationListFallback";
import NotificationSearch from "../_components/NotificationSearch";
import ReservationCancelSheet from "../_components/SheetRenderer/ReservationCancelSheet";
import { NotificationStatus } from "../_types";
import createFilteredNotificationCount from "../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../_utils/handleNotificationFilter";
import { parseContent } from "../_utils/notificationParser";

type ReservationCancelNotificationContentProps = {
  onNotificationClick: (notification: NotificationInfo) => () => void;
};
function ReservationCancelNotificationContent({
  onNotificationClick,
}: ReservationCancelNotificationContentProps) {
  const intersectionRef = useRef(null);
  const [status, setStatus] = useState<NotificationStatus>("all");

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useSuspenseInfiniteQuery(notificationQueries.list({ type: NOTIFICATION_QUERY_TYPE }));

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect: handleIntersect,
  });

  const filteredNotificationCount = createFilteredNotificationCount(data, status);

  const hasNewNotifications = useNotificationStore((state) =>
    state.newNotificationTypes.has(NOTIFICATION_TYPE),
  );
  const setNewNotificationTypes = useNotificationStore((state) => state.setNewNotificationTypes);

  useEffect(() => {
    setNewNotificationTypes((prev) => {
      const newSet = new Set(prev);
      newSet.delete(NOTIFICATION_TYPE);

      return newSet;
    });
  }, []);

  return (
    <>
      <Header
        logo={<Logo />}
        subHeader={
          <div className="bg-background-primary pb-2">
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
          </div>
        }
      >
        <Header.Left>
          <NotificationSideBar />
        </Header.Left>
        <Header.Title content="예약 취소" />
        <Header.Right>
          <NotificationSearch />
        </Header.Right>
      </Header>
      <main className={commonLayoutContents}>
        <div className="flex items-center justify-between pb-2">
          <span className="text-body-3">{`${filteredNotificationCount}개의 알림`}</span>
          <span className="text-body-3">최신순</span>
        </div>
        {hasNewNotifications && (
          <div className="mb-4 flex w-full items-center justify-center">
            <Button
              size="sm"
              variant="negative"
              corners="pill"
              iconLeft="RotateCcw"
              onClick={() => {
                setNewNotificationTypes((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(NOTIFICATION_TYPE);

                  return newSet;
                });

                refetch();
              }}
            >
              새 알림 확인하기
            </Button>
          </div>
        )}
        {data.pages[0].data.totalElements ? (
          <ul className="flex flex-col gap-4">
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
      </main>
    </>
  );
}

function ReservationCancelNotificationPage() {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();

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

  const info = selectedNotification
    ? parseContent(selectedNotification.content)
    : { message: "", eventDate: "", other: "" };

  return (
    <>
      <Suspense fallback={<NotificationListFallback />}>
        <ReservationCancelNotificationContent onNotificationClick={handleNotificationClick} />
      </Suspense>
      {selectedNotification && (
        <ReservationCancelSheet
          notificationId={selectedNotification.notificationId}
          open={isActionSheetOpen}
          onChangeOpen={setIsActionSheetOpen}
          eventDateDescription={info.eventDate || ""}
          cancelReason={info.other || ""}
        />
      )}
    </>
  );
}

export default ReservationCancelNotificationPage;
