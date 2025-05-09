import { useMutation } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

import { sendPushToken } from "@trainer/services/notification";

const firebaseConfig = {
  apiKey: "AIzaSyCVTHNnJB-6IKd1leTuGx5y-Wh9HVXjJlk",
  authDomain: "fitlink-f8698.firebaseapp.com",
  projectId: "fitlink-f8698",
  storageBucket: "fitlink-f8698.firebasestorage.app",
  messagingSenderId: "344209319378",
  appId: "1:344209319378:web:c2d06d291dde43b655140b",
  measurementId: "G-TN218GZV1J",
};
const getFireBaseToken = async () => {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
    });

    return token;
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.error(error);

    return undefined;
  }
};
export const useFCMToken = () => {
  const mutation = useMutation({
    mutationFn: sendPushToken,
  });

  const fireBaseMessageToken = async () => {
    const fcmToken = await getFireBaseToken();
    if (fcmToken) {
      mutation.mutate({
        pushToken: fcmToken,
      });
    } else {
      if (process.env.NODE_ENV === "development")
        console.log("No registration token available. Request permission to generate one.");
    }
  };

  const initializeFCM = () => {
    try {
      initializeApp(firebaseConfig);
      fireBaseMessageToken();
    } catch (error) {
      if (process.env.NODE_ENV === "development")
        console.error("FCM 연동 중 오류가 발생했습니다", error);
    }
  };

  return initializeFCM;
};
