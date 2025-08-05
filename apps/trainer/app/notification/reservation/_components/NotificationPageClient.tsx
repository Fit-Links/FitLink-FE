/* eslint-disable no-magic-numbers */
"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DateController from "@ui/lib/DateController";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";

import { readNotification } from "@trainer/services/notification";

import RouteInstance from "@trainer/constants/route";

import ReservationContainer from "./ReservationContainer";
import { parseContent } from "../../_utils/notificationParser";
import { parseKoreanDateString } from "../../_utils/parseKoreanDateString";

function ReservationNotificationPageClient() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const readNotificationMutation = useMutation({
    mutationFn: readNotification,
    onMutate: async ({ id }) => {
      queryClient.cancelQueries({
        queryKey: notificationQueries.list({ type: "RESERVATION_REQUEST" }).queryKey,
      });

      const previousNotifications = queryClient.getQueryData(
        notificationQueries.list({ type: "RESERVATION_REQUEST" }).queryKey,
      );

      queryClient.setQueryData(
        notificationQueries.list({ type: "RESERVATION_REQUEST" }).queryKey,
        (old) => {
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
        },
      );

      return { previousNotifications };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        notificationQueries.list({ type: "RESERVATION_REQUEST" }).queryKey,
        context?.previousNotifications,
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() }),
    onSuccess: () => {},
  });

  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, content, isProcessed } = notification;

    const { eventDate } = parseContent(content);
    const parsedDate = parseKoreanDateString(eventDate);

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
  };

  return <ReservationContainer onNotificationClick={handleNotificationClick} />;
}

export default ReservationNotificationPageClient;
