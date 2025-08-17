"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Suspense, useEffect, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";
import { useNotificationStore } from "@trainer/store/notificationStore";

import Logo from "@trainer/components/Logo";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import { commonLayoutContents } from "@trainer/constants/styles";

import EmptyList from "../../_components/EmptyList";
import NotificationSearch from "../../_components/NotificationSearch";
import NotificationSideBar from "../../_components/NotificationSideBar";
import NotificationsPerPage from "../../_components/NotificationsPerPage";
import NotificationsPerPageFallback from "../../_components/NotificationsPerPageFallback";
import { NotificationStatus } from "../../_types";
import createFilteredNotificationCount from "../../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../../_utils/handleNotificationFilter";
import { NOTIFICATION_QUERY_TYPE, NOTIFICATION_TYPE } from "../_constants";

type SessionContainerProps = {
  onNotificationClick: (notification: NotificationInfo) => () => void;
};
function SessionContainer({ onNotificationClick }: SessionContainerProps) {
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
        <Header.Title content={NOTIFICATION_TYPE} />
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
            {data.pages.map((group, pageIndex) => {
              const notifications = group.data.content.filter(handleNotificationFilter(status));

              return (
                <Suspense
                  fallback={<NotificationsPerPageFallback pageIndex={pageIndex} />}
                  key={pageIndex}
                >
                  <NotificationsPerPage
                    key={`notificationsPage-${pageIndex}`}
                    notifications={notifications}
                    onClick={onNotificationClick}
                  />
                </Suspense>
              );
            })}
            <div ref={intersectionRef} />
          </ul>
        ) : (
          <EmptyList />
        )}
      </main>
    </>
  );
}

export default SessionContainer;
