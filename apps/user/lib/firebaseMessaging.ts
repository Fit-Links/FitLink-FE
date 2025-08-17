import { getMessaging, getToken, isSupported } from "firebase/messaging";

import { firebaseApp } from "./firebase";

export const getMessagingInstance = async () => {
  if (typeof window === "undefined") return null;

  const supported = await isSupported();
  if (!supported) return null;

  return getMessaging(firebaseApp);
};

export function registerServiceWorker() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;

  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(() => {
      // console.log("Service Worker 등록 성공:", registration);
    })
    .catch(() => {
      // console.log("Service Worker 등록 실패:", error);
    });
}

export async function getDeviceToken() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;

  try {
    const messaging = await getMessagingInstance();
    if (!messaging) return;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_DEV_FCM_VAPID_KEY,
    });
    if (token) {
      return token;
    }
  } catch {
    // console.log(`토큰을 가져오는 중 에러 발생: ${error}`);
  }
}
