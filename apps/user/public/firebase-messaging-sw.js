importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD_VI6GiPxFmTxPYMa9N-u9zuGBgWSOltc",
  authDomain: "fit-link-ffc73.firebaseapp.com",
  projectId: "fit-link-ffc73",
  storageBucket: "fit-link-ffc73.firebasestorage.app",
  messagingSenderId: "85685256147",
  appId: "1:85685256147:web:321577a3626a52b28fb926",
  measurementId: "G-082D1TQN3S",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { data } = payload;
  const { title, body } = data;
  
  const notificationTitle = title || "Fitlink";
  const notificationOptions = {
    body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
