import { create } from "zustand";

type NotificationStore = {
  hasNewNotifications: boolean;
  setHasNewNotifications: (val: boolean) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  hasNewNotifications: false,
  setHasNewNotifications: (val) => set(() => ({ hasNewNotifications: val })),
}));
