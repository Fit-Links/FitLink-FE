/* eslint-disable no-magic-numbers */
"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@ui/components/Header";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";

import { readNotification } from "@trainer/services/notification";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import RouteInstance from "@trainer/constants/route";

import NotificationContainer from "./_components/NotificationContainer";
import NotificationListFallback from "./_components/NotificationListFallback";
import NotificationSearch from "./_components/NotificationSearch";
import SheetRenderer from "./_components/SheetRenderer";
import { parseEventDateFromContent } from "./_utils/parser";

function parseKoreanDateString(dateStr: string) {
  // 현재 연도 사용 (필요시 인자로 받게 변경 가능)
  const currentYear = new Date().getFullYear();

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

function AllNotificationPage() {
  const [isNotificationSearchOpen, setIsNotificationSearchOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationInfo>();

  const queryClient = useQueryClient();
  const router = useRouter();
  const readNotificationMutation = useMutation({
    mutationFn: readNotification,
    onMutate: async ({ id }) => {
      queryClient.cancelQueries({ queryKey: notificationQueries.list({}).queryKey });

      const previousNotifications = queryClient.getQueryData(notificationQueries.list({}).queryKey);

      queryClient.setQueryData(notificationQueries.list({}).queryKey, (old) => {
        if (!old) return old;
        const newPages = old.pages.map((page) => {
          const newData = {
            ...page.data,
            content: page.data.content.map((val) =>
              val.notificationId === id ? { ...val, isProcessed: true } : val,
            ),
          };

          return {
            ...page,
            data: newData,
          };
        });

        return {
          ...old,
          pages: newPages,
        };
      });

      return { previousNotifications };
    },
    onError: (error, a, context) => {
      queryClient.setQueryData(
        notificationQueries.list({}).queryKey,
        context?.previousNotifications,
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() }),
  });

  const handleSelectResult = () => {
    setIsNotificationSearchOpen(false);
  };

  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, type, content, sendDate, isProcessed } = notification;

    const dateString = content.split("\n")[1].split("날짜: ")[1];

    switch (type) {
      case "트레이너 연동 해제":
        if (isProcessed) return;
        readNotificationMutation.mutate({ id: notificationId });
        break;
      case "예약 요청":
        router.push(
          RouteInstance["pending-reservations"]("", {
            selectedDate: String(parseKoreanDateString(dateString)),
            formattedSelectedDate: dateString,
          }),
        );
        break;
      case "세션":
      case "트레이너 연동":
      case "예약 변경":
      case "예약 취소":
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
        break;
    }
  };

  const ActionSheet =
    selectedNotification && selectedNotification.type && SheetRenderer[selectedNotification.type];

  return (
    <div className="flex h-full flex-col">
      <Header className="mb-4">
        <Header.Left>
          <NotificationSideBar />
        </Header.Left>
        <Header.Title content="전체 알림" />
        <Header.Right>
          <NotificationSearch
            isOpen={isNotificationSearchOpen}
            setIsOpen={setIsNotificationSearchOpen}
            onSelectResult={handleSelectResult}
          />
        </Header.Right>
      </Header>
      <Suspense fallback={<NotificationListFallback />}>
        <NotificationContainer onClick={handleNotificationClick} />
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
    </div>
  );
}

export default AllNotificationPage;
