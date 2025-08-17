"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DateController from "@ui/lib/DateController";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";

import { readNotification } from "@trainer/services/notification";

import RouteInstance from "@trainer/constants/route";

import NotificationContainer from "./NotificationContainer";
import SheetRenderer from "./SheetRenderer";
import { parseContent } from "../_utils/notificationParser";
import { parseKoreanDateString } from "../_utils/parseKoreanDateString";

function NotificationPageClient() {
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
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationQueries.list({}).queryKey,
        context?.previousNotifications,
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() }),
    onSuccess: () => {},
  });

  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, type, content, sendDate, isProcessed, notificationType } = notification;

    const { eventDate } = parseContent(content);
    const parsedDate = parseKoreanDateString(eventDate);

    switch (type) {
      case "트레이너 연동 해제":
        if (isProcessed) return;
        readNotificationMutation.mutate({ id: notificationId });
        break;
      case "예약 요청":
        if (isProcessed) return;

        readNotificationMutation.mutate({ id: notificationId });

        if (parsedDate === null) {
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
        if (isProcessed) return;

        if (notificationType === "세션 곧 종료") {
          router.push(RouteInstance["schedule-management"]());
        } else if (notificationType === "세션 완료") {
          readNotificationMutation.mutate({ id: notificationId });
        }
        break;
      case "트레이너 연동":
      case "예약 변경":
      case "예약 취소":
        if (notificationId !== selectedNotification?.notificationId) {
          setSelectedNotification({
            notificationId,
            type,
            notificationType,
            content,
            sendDate,
            isProcessed,
          });
        }
        setIsActionSheetOpen(true);
        break;
    }
  };

  // const handleNotificationClick = (notification: NotificationInfo) => () => {
  //   setSelectedNotification(notification);
  //   setIsActionSheetOpen(true);
  // };

  const ActionSheet =
    selectedNotification && selectedNotification.type && SheetRenderer[selectedNotification.type];

  const info = selectedNotification
    ? parseContent(selectedNotification.content)
    : { message: "", eventDate: "", other: "" };

  return (
    <>
      <NotificationContainer onClick={handleNotificationClick} />
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

export default NotificationPageClient;
