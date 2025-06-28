"use client";

import { ReactNode, useEffect } from "react";

import { useNotificationStore } from "@trainer/store/notificationStore";

type NotificationProviderProps = {
  children: ReactNode;
};
function NotificationProvider({ children }: NotificationProviderProps) {
  const setNewNotificationTypes = useNotificationStore((state) => state.setNewNotificationTypes);

  useEffect(() => {
    setNewNotificationTypes(new Set());
  }, []);

  return <>{children}</>;
}

export default NotificationProvider;
