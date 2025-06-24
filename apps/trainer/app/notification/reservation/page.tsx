/* eslint-disable no-magic-numbers */
"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Header from "@ui/components/Header";
import { ToggleGroup, ToggleGroupItem } from "@ui/components/ToggleGroup";
import { useRouter } from "next/navigation";
import { Fragment, Suspense, useRef, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import useIntersectionObserver from "@trainer/hooks/useIntersectionObserver";

import RouteInstance from "@trainer/constants/route";

import { getKoreanDate } from "@trainer/utils/date";

import EmptyList from "../_components/EmptyList";
import NotificationItemContainer from "../_components/NotificationItemContainer";
import NotificationSearch from "../_components/NotificationSearch";
import { NotificationStatus } from "../_types";
import createFilteredNotificationCount from "../_utils/createFilteredNotificationCount";
import handleNotificationFilter from "../_utils/handleNotificationFilter";

function parseKoreanDateString(dateStr: string) {
  // 현재 연도 사용 (필요시 인자로 받게 변경 가능)
  const currentYear = getKoreanDate().getFullYear();

  // 월, 일 추출
  const match = dateStr
    .replace(/[()\s]/g, "") // 괄호와 공백 제거
    .replace("오전", "AM")
    .replace("오후", "PM")
    .match(/(\d{2})\.(\d{2})[^\d]*(AM|PM)(\d{1,2})시/); // 정규식 매칭

  if (!match) {
    throw new Error("Invalid date string format");
  }

  const [monthStr, dayStr, meridiem, hourStr] = match.slice(1); // 첫 번째는 전체 match이므로 제외

  // 숫자 변환
  const month = parseInt(monthStr, 10) - 1; // JS는 0-based month
  const day = parseInt(dayStr, 10);
  let hour = parseInt(hourStr, 10);

  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  } else if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  // Date 객체 생성
  return new Date(currentYear, month, day, hour);
}

type ReservationNotificationContentProps = {
  status: NotificationStatus;
  onNotificationClick: (notification: NotificationInfo) => () => void;
};
function ReservationNotificationContent({
  status,
  onNotificationClick,
}: ReservationNotificationContentProps) {
  const intersectionRef = useRef(null);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(
    notificationQueries.list({ type: "RESERVATION_REQUEST" }),
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

function ReservationNotificationPage() {
  const [isNotificationSearchOpen, setIsNotificationSearchOpen] = useState(false);
  const [status, setStatus] = useState<NotificationStatus>("all");
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();

  const router = useRouter();

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

    const dateString = content.split("\n")[1].split("날짜: ")[1];

    router.push(
      RouteInstance["pending-reservations"]("", {
        selectedDate: String(parseKoreanDateString(dateString)),
        formattedSelectedDate: dateString,
      }),
    );
  };

  return (
    <div>
      <Header className="mb-4">
        <Header.Left>
          <NotificationSideBar />
        </Header.Left>
        <Header.Title content="PT 예약 요청" />
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
        <ReservationNotificationContent
          status={status}
          onNotificationClick={handleNotificationClick}
        />
      </Suspense>
    </div>
  );
}

export default ReservationNotificationPage;
