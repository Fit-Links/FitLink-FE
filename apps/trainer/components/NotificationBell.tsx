"use client";

import { Bell } from "lucide-react";

import { useNotificationStore } from "@trainer/store/notificationStore";

export const NotificationBell = () => {
  const hasNew = useNotificationStore((state) => state.hasNewNotifications);

  return (
    <div className="relative ">
      <Bell />
      {hasNew && (
        <span className="bg-brand-primary-500 absolute -right-1 -top-1 h-3 w-3 rounded-full" />
      )}
    </div>
  );
};
