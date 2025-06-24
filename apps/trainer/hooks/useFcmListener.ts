import { onMessage } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { parseContent } from "@trainer/app/notification/_utils/notificationParser";
import { getMessagingInstance } from "@trainer/lib/firebaseMessaging";
import { showFcmToastForReservation } from "@trainer/lib/toastService.tsx";
import { useNotificationStore } from "@trainer/store/notificationStore";

import RouteInstance from "@trainer/constants/route";

export const useFcmListener = () => {
  let unsubscribe: (() => void) | undefined;
  const router = useRouter();
  const setHasNewNotifications = useNotificationStore((state) => state.setHasNewNotifications);

  useEffect(() => {
    getMessagingInstance().then((messaging) => {
      if (!messaging) {
        return;
      }
      unsubscribe = onMessage(messaging, (payload) => {
        const { notification } = payload;
        if (!notification) return;

        setHasNewNotifications(true);

        const { title, body } = notification;

        const parsedBody = body
          ? parseContent(body)
          : { message: null, eventDate: null, other: null };

        showFcmToastForReservation({
          title,
          body: parsedBody,
          onClick: () => router.push(RouteInstance.notification()),
        });
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
};
