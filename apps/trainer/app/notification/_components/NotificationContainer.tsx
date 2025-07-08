"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Fragment, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";
import { useNotificationStore } from "@trainer/store/notificationStore";

import Logo from "@trainer/components/Logo";
import NotificationSideBar from "@trainer/components/NotificationSideBar";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import { commonLayoutContents } from "@trainer/constants/styles";

import EmptyList from "./EmptyList";
import NotificationItemContainer from "./NotificationItemContainer";
import { NotificationStatus } from "../_types";
import NotificationSearch from "./NotificationSearch";
import { cn } from "../../../../../packages/ui/src/lib/utils";
import createFilteredNotificationCount from "../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../_utils/handleNotificationFilter";

type NotificationContainerProps = {
  onClick: (notification: NotificationInfo) => () => void;
};

function NotificationContainer({ onClick }: NotificationContainerProps) {
  const [status, setStatus] = useState<NotificationStatus>("all");
  const intersectionRef = useRef(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useSuspenseInfiniteQuery({
      ...notificationQueries.list({}),
    });

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect: handleIntersect,
  });

  // eslint-disable-next-line no-magic-numbers
  const hasNewNotifications = useNotificationStore((state) => state.newNotificationTypes.size > 0);
  const setNewNotificationTypes = useNotificationStore((state) => state.setNewNotificationTypes);

  const filteredNotificationCount = createFilteredNotificationCount(data, status);

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
        <Header.Title content="전체 알림" />
        <Header.Right>
          <NotificationSearch />
        </Header.Right>
      </Header>

      <main className={cn(commonLayoutContents)}>
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
                setNewNotificationTypes(new Set());
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
      </main>
    </>

    // </div>
  );
}

export default NotificationContainer;
