"use client";

import { NotificationInfo, NotificationQueryType } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { Fragment, Suspense, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import { notificationMap } from "../../_constants";
import { NotificationStatus } from "../../_types";
import createFilteredNotificationCount from "../../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../../_utils/handleNotificationFilter";
import { parseContent } from "../../_utils/notificationParser";
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
    const { notificationId, type, content, sendDate, isProcessed, notificationType } = notification;
    if (notificationId !== selectedNotification?.notificationId) {
      setSelectedNotification({
        notificationId,
        type,
        content,
        sendDate,
        isProcessed,
        notificationType,
      });
    }

    setIsActionSheetOpen(true);
  };

  const ActionSheet =
    selectedNotification && selectedNotification.type && SheetRenderer[selectedNotification.type];

  const info = selectedNotification
    ? parseContent(selectedNotification.content)
    : { message: "", eventDate: "", other: "" };

  return (
    <>
      <div className="flex flex-col items-start gap-4">
        <ToggleGroup
          type="single"
          value={category}
          onValueChange={setCategory as (value: string) => void}
          className="flex items-center justify-start overflow-x-auto [&::-webkit-scrollbar]:hidden"
        >
          {Object.entries(notificationMap).map(([key, { type, queryType }]) => (
            <ToggleGroupItem value={queryType} className="flex-shrink-0" key={key}>
              {type}
            </ToggleGroupItem>
          ))}
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
          {
            eventDate: info.eventDate || "",
            cancelReason: info.other || "",
          },
        )}
    </>
  );
}

export default MemberNotificationResult;
