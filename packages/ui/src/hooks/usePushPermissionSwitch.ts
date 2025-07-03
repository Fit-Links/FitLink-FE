"use client";

import { useEffect, useRef, useState } from "react";

import { getEnvironment } from "@ui/utils/getEnvironment";

export function usePushPermissionSwitch(
  requestPushPermission: () => Promise<NotificationPermission | "unSupported">,
) {
  const [isNotificationGranted, setIsNotificationGranted] = useState(false);
  const [isHelpDialopOpen, setIsHelpDialogOpen] = useState(false);

  const environmentRef = useRef<ReturnType<typeof getEnvironment>>("desktop-web");

  useEffect(() => {
    if (typeof Notification !== "undefined") {
      setIsNotificationGranted(Notification.permission === "granted");
    }
    if (typeof navigator !== "undefined") {
      environmentRef.current = getEnvironment();
    }
  }, []);

  useEffect(() => {
    if (isNotificationGranted) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setIsNotificationGranted(true);
        } else {
          setIsNotificationGranted(false);
        }
      });
    }
  }, [isNotificationGranted]);

  const isMobilePwa = environmentRef.current === "mobile-pwa";

  const handleToggle = (isNotificationGranted: boolean) => {
    if (Notification.permission !== "default") {
      setIsHelpDialogOpen(true);

      return;
    }
    if (!isNotificationGranted) {
      setIsHelpDialogOpen(true);

      return;
    }

    setIsNotificationGranted(isNotificationGranted);
    requestPushPermission();
  };

  const systemBasedDescription = `${isMobilePwa ? "앱 시스템 설정" : "브라우저 환경설정"}에서 [알림] 항목을 설정해주세요`;

  return {
    handleToggle,
    isNotificationGranted,
    isHelpDialopOpen,
    setIsHelpDialogOpen,
    helpDialogDescription: systemBasedDescription,
  };
}
