import { useMutation } from "@tanstack/react-query";
import { isSupported } from "firebase/messaging";
import { useState } from "react";

import { sendPushToken } from "@trainer/services/notification";

import { getDeviceToken, registerServiceWorker } from "@trainer/utils/fcm";

export const useRegisterFcmToken = () => {
  const { status, mutateAsync } = useMutation({
    mutationFn: sendPushToken,
  });
  const [isPending, setIsPending] = useState(false);
  async function requestFcmPermission() {
    if (typeof window === "undefined" || typeof navigator === "undefined") return false;

    setIsPending(true);
    const supported = await isSupported();
    if (!supported) {
      setIsPending(false);

      return false;
    }
    const permission = await Notification.requestPermission();
    try {
      if (permission === "granted") {
        registerServiceWorker();
        const token = await getDeviceToken();
        if (token) {
          await mutateAsync({
            pushToken: token,
          });

          setIsPending(false);

          return true;
        }
        setIsPending(false);

        return false;
      } else if (permission === "denied") {
        setIsPending(false);

        return false;
      } else {
        setIsPending(false);

        return false;
      }
    } catch {
      setIsPending(false);

      return false;
    }
  }

  return {
    requestFcmPermission,
    isPending: isPending || status === "pending",
  };
};
