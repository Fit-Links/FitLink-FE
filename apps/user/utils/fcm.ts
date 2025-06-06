"use client";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

import { sendPushToken } from "@user/services/notification";

import { firebaseConfig } from "../constants/firebase";

export async function requestFcmPermission() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  const supported = await isSupported();
  if (!supported) {
    return false;
  }
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    registerServiceWorker();
    const token = await getDeviceToken();
    if (token) {
      try {
        await sendPushToken({
          pushToken: token,
        });
      } catch {
        return false;
      }

      return permission === "granted";
    }

    return false;
  } else if (permission === "denied") {
    // console.log("알림 권한이 거부되었습니다");
    return false;
  } else {
    // console.log("사용자가 알림 권한을 결정하지 않았습니다");
    return false;
  }
}

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
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
    });
    if (token) {
      return token;
    }
  } catch (error) {
    // console.log(`토큰을 가져오는 중 에러 발생: ${error}`);
  }
}
