"use client";

import { API_THROTTLE_LIMIT, throttle } from "@5unwan/core/utils/throttle";
import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import NotificationItem from "@ui/components/NotificationItem/NotificationItem";
import { Text } from "@ui/components/Text";
import React, { useRef } from "react";

import { notificationQueries } from "@user/queries/notification";

import { readNotification } from "@user/services/notification";

import useIntersectionObserver from "@user/hooks/useIntersectionObserver";

import EmptyList from "./EmptyList";

function NotificationContainer() {
  const intersectionRef = useRef(null);
  const queryClient = useQueryClient();

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    notificationQueries.list(),
  );

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

  return (
    <div className="h-full">
      <div className="bg-background-primary sticky top-[35px] flex items-center justify-between py-2">
        <Text.Body3>{`${data.pages[0].data.totalElements}개의 알림`}</Text.Body3>
        <Text.Body3>최신순</Text.Body3>
      </div>
      {data.pages[0].data.totalElements ? (
        <ul className="flex flex-col items-center gap-4">
          {data.pages.map((group) =>
            group.data.content.map(
              ({ notificationId, content, sendDate, isProcessed, type }, index) => (
                <NotificationItem
                  message={content}
                  createdAt={sendDate}
                  isCompleted={isPending && notificationId === variables.id ? true : isProcessed}
                  variant={type}
                  key={`${sendDate}-${index}`}
                  onClick={handleClick(notificationId)}
                  className="w-full"
                />
              ),
            ),
          )}
          <div ref={intersectionRef} />
        </ul>
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export default NotificationContainer;
