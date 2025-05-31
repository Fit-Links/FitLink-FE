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
