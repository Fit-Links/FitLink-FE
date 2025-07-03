/* eslint-disable no-magic-numbers */
"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@ui/components/Header";
import DateController from "@ui/lib/DateController";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";

import { readNotification } from "@trainer/services/notification";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import RouteInstance from "@trainer/constants/route";

import NotificationContainer from "./_components/NotificationContainer";
import NotificationListFallback from "./_components/NotificationListFallback";
import NotificationSearch from "./_components/NotificationSearch";
import SheetRenderer from "./_components/SheetRenderer";
import { parseContent } from "./_utils/notificationParser";
import { parseKoreanDateString } from "./_utils/parseKoreanDateString";

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

    const { eventDate } = parseContent(content);
    const parsedDate = parseKoreanDateString(eventDate);

    switch (type) {
      case "트레이너 연동 해제":
        if (isProcessed) return;
        readNotificationMutation.mutate({ id: notificationId });
        break;
      case "예약 요청":
        if (!parsedDate) {
          toast.error("유효하지 않은 날짜의 일정입니다.");

          return;
        }
        router.push(
          RouteInstance["pending-reservations"]("", {
            selectedDate: String(parsedDate),
            formattedSelectedDate: DateController(parsedDate).toDateTimeWithDayFormat(),
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

  const info = selectedNotification
    ? parseContent(selectedNotification.content)
    : { message: "", eventDate: "", other: "" };

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
          {
            eventDate: info.eventDate || "",
            cancelReason: info.other || "",
          },
        )}
    </div>
  );
}

export default AllNotificationPage;
