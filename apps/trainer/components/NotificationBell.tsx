"use client";

import { Bell } from "lucide-react";

import { useNotificationStore } from "@trainer/store/notificationStore";

export const NotificationBell = () => {
  // eslint-disable-next-line no-magic-numbers
  const hasNewNotifications = useNotificationStore((state) => state.newNotificationTypes.size > 0);

  return (
    <div className="relative ">
      <Bell />
      {hasNewNotifications && (
        <span className="bg-brand-primary-500 absolute -right-1 -top-1 h-3 w-3 rounded-full" />
      )}
    </div>
  );
};
