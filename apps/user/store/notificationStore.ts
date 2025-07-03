import { create } from "zustand";

type NotificationStore = {
  hasNewNotifications: boolean;
  setHasNewNotifications: (val: boolean | ((prev: boolean) => boolean)) => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  hasNewNotifications: false,
  setHasNewNotifications: (val) =>
    set(() => ({
      hasNewNotifications:
        typeof val === "function"
          ? (val as (prev: boolean) => boolean)(get().hasNewNotifications)
          : val,
    })),
}));
