"use client";

import { ReactNode, useEffect } from "react";

import { useNotificationStore } from "@user/store/notificationStore";

type NotificationProviderProps = {
  children: ReactNode;
};
function NotificationProvider({ children }: NotificationProviderProps) {
  const setHasNewNotifications = useNotificationStore((state) => state.setHasNewNotifications);

  useEffect(() => {
    setHasNewNotifications(false);
  }, []);

  return <>{children}</>;
}

export default NotificationProvider;
