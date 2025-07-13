import { NotificationType } from "@5unwan/core/api/types/common";
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
  const setNewNotificationTypes = useNotificationStore((state) => state.setNewNotificationTypes);

  useEffect(() => {
    getMessagingInstance().then((messaging) => {
      if (!messaging) {
        return;
      }
      unsubscribe = onMessage(messaging, (payload) => {
        const { data } = payload;
        if (!data) return;

        const { title, body } = data;

        if (title) {
          setNewNotificationTypes((prev) => {
            const newSet = new Set(prev);
            newSet.add(title as NotificationType);

            return newSet;
          });
        }

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
