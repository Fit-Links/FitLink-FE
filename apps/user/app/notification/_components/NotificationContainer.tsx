"use client";

import { API_THROTTLE_LIMIT, throttle } from "@5unwan/core/utils/throttle";
import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import { Text } from "@ui/components/Text";
import React, { Fragment, useRef } from "react";

import { notificationQueries } from "@user/queries/notification";
import { useNotificationStore } from "@user/store/notificationStore";

import { readNotification } from "@user/services/notification";

import useIntersectionObserver from "@user/hooks/useIntersectionObserver";

import EmptyList from "./EmptyList";
import NotificationItemContainer from "./NotificationItemContainer";

function NotificationContainer() {
  const intersectionRef = useRef(null);
  const queryClient = useQueryClient();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } =
    useSuspenseInfiniteQuery(notificationQueries.list());

  const { isPending, variables, mutate } = useMutation({
    mutationFn: readNotification,
    onSettled: () => queryClient.invalidateQueries(notificationQueries.list()),
  });

  const throttled = throttle((id: number) => mutate({ id }), API_THROTTLE_LIMIT);
  const handleClick = (id: number) => () => throttled(id);

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  useIntersectionObserver({
    target: intersectionRef,
    handleIntersect: handleIntersect,
  });

  const hasNewNotifications = useNotificationStore((state) => state.hasNewNotifications);
  const setHasNewNotifications = useNotificationStore((state) => state.setHasNewNotifications);

  return (
    <div className="h-full">
      <div className="bg-background-primary sticky top-[35px] flex items-center justify-between py-2">
        <Text.Body3>{`${data.pages[0].data.totalElements}개의 알림`}</Text.Body3>
        <Text.Body3>최신순</Text.Body3>
      </div>
      {hasNewNotifications && (
        <div className="mb-4 flex w-full items-center justify-center">
          <Button
            size="sm"
            variant="negative"
            corners="pill"
            iconLeft="RotateCcw"
            onClick={() => {
              setHasNewNotifications(false);
              refetch();
            }}
          >
            새 알림 확인하기
          </Button>
        </div>
      )}
      {data.pages[0].data.totalElements ? (
        <ul className="flex flex-col items-center gap-4">
          {data.pages.map((group, index) => (
            <Fragment key={`notificationGroup-${index}`}>
              {group.data.content.map((notification) => {
                const { notificationId, isProcessed } = notification;

                return (
                  <NotificationItemContainer
                    notification={notification}
                    isCompleted={isPending && notificationId === variables.id ? true : isProcessed}
                    onClick={handleClick(notificationId)}
                    key={`notification-${notificationId}`}
                  />
                );
              })}
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
