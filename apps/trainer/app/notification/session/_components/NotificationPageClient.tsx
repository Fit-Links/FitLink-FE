"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";

import { readNotification } from "@trainer/services/notification";

import RouteInstance from "@trainer/constants/route";

import SessionContainer from "./SessionContainer";

function SessionNotificationPageClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const readNotificationMutation = useMutation({
    mutationFn: readNotification,
    onMutate: async ({ id }) => {
      queryClient.cancelQueries({
        queryKey: notificationQueries.list({ type: "SESSION" }).queryKey,
      });

      const previousNotifications = queryClient.getQueryData(
        notificationQueries.list({ type: "SESSION" }).queryKey,
      );

      queryClient.setQueryData(notificationQueries.list({ type: "SESSION" }).queryKey, (old) => {
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
        notificationQueries.list({ type: "SESSION" }).queryKey,
        context?.previousNotifications,
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() }),
    onSuccess: () => {},
  });
  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, isProcessed, notificationType } = notification;

    if (isProcessed) return;

    if (notificationType === "세션 곧 종료") {
      router.push(RouteInstance["schedule-management"]());
    } else if (notificationType === "세션 완료") {
      readNotificationMutation.mutate({ id: notificationId });
    }
  };

  return <SessionContainer onNotificationClick={handleNotificationClick} />;
}

export default SessionNotificationPageClient;
