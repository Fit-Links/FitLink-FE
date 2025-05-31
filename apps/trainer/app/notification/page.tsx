"use client";

import { NotificationInfo } from "@5unwan/core/api/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@ui/components/Header";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

import { notificationQueries } from "@trainer/queries/notification";

import { readNotification } from "@trainer/services/notification";

import NotificationSideBar from "@trainer/components/NotificationSideBar";

import RouteInstance from "@trainer/constants/route";

import NotificationContainer from "./_components/NotificationContainer";
import NotificationListFallback from "./_components/NotificationListFallback";
import NotificationSearch from "./_components/NotificationSearch";
import SheetRenderer from "./_components/SheetRenderer";
import { parseEventDateFromContent } from "./_utils/parser";

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
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: notificationQueries.list({}).queryKey }),
  });

  const handleSelectResult = () => {
    setIsNotificationSearchOpen(false);
  };

  const handleNotificationClick = (notification: NotificationInfo) => () => {
    const { notificationId, type, content, sendDate, isProcessed } = notification;

    switch (type) {
      case "연동 해제":
        if (isProcessed) return;
        readNotificationMutation.mutate({ id: notificationId });
        break;
      case "예약 요청":
        router.push(RouteInstance["pending-reservations"]());
        break;
      case "세션":
      case "연동 승인":
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
    <div className="">
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
