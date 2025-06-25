import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { sendPushToken } from "@user/services/notification";

import { getDeviceToken, registerServiceWorker } from "@user/utils/fcm";

export const useRegisterFcmToken = () => {
  const { mutateAsync } = useMutation({
    mutationFn: sendPushToken,
  });

  const [status, setStatus] = useState<"pending" | "success" | "error" | "idle">("idle");
  const requestFcmPermission = useCallback(async () => {
    if (typeof window === "undefined" || typeof navigator === "undefined") return "unSupported";

    setStatus("pending");

    const permission = await Notification.requestPermission();
    try {
      if (permission === "granted") {
        registerServiceWorker();
        const token = await getDeviceToken();
        if (token) {
          await mutateAsync(
            {
              pushToken: token,
            },
            {
              onSuccess: () => {},
              onError: () => {},
            },
          );

          setStatus("success");

          return permission;
        }
        setStatus("error");

        return permission;
      } else if (permission === "denied") {
        setStatus("success");

        return permission;
      } else {
        setStatus("success");

        return permission;
      }
    } catch (e) {
      console.error(e);
      setStatus("error");

      return permission;
    }
  }, []);

  return {
    requestFcmPermission,
    status,
    isPending: status === "pending",
    isError: status === "error",
  };
};
