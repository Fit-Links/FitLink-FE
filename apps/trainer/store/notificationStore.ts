import { NotificationType } from "@5unwan/core/api/types/common";
import { create } from "zustand";

type NotificationStore = {
  newNotificationTypes: Set<NotificationType>;
  setNewNotificationTypes: (
    val: Set<NotificationType> | ((prev: Set<NotificationType>) => Set<NotificationType>),
  ) => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  newNotificationTypes: new Set(),
  setNewNotificationTypes: (val) =>
    set(() => ({
      newNotificationTypes:
        typeof val === "function"
          ? (val as (prev: Set<NotificationType>) => Set<NotificationType>)(
              get().newNotificationTypes,
            )
          : val,
    })),
}));
