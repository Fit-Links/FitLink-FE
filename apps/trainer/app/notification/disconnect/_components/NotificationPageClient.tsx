"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notificationBaseKeys, notificationQueries } from "@trainer/queries/notification";

import { readNotification } from "@trainer/services/notification";

import DisconnectContainer from "./DisconnectContainer";

function DisconnectNotificationPageClient() {
  const queryClient = useQueryClient();
  const readNotificationMutation = useMutation({
    mutationFn: readNotification,
    onMutate: async ({ id }) => {
      queryClient.cancelQueries({
        queryKey: notificationQueries.list({ type: "DISCONNECT" }).queryKey,
      });

      const previousNotifications = queryClient.getQueryData(
        notificationQueries.list({ type: "DISCONNECT" }).queryKey,
      );

      queryClient.setQueryData(notificationQueries.list({ type: "DISCONNECT" }).queryKey, (old) => {
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
        notificationQueries.list({ type: "DISCONNECT" }).queryKey,
        context?.previousNotifications,
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: notificationBaseKeys.lists() }),
    onSuccess: () => {},
  });
  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, isProcessed } = notification;

    if (isProcessed) return;

    readNotificationMutation.mutate({ id: notificationId });
  };

  return <DisconnectContainer onNotificationClick={handleNotificationClick} />;
}

export default DisconnectNotificationPageClient;
