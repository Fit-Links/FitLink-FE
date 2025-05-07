// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyCVTHNnJB-6IKd1leTuGx5y-Wh9HVXjJlk",
  authDomain: "fitlink-f8698.firebaseapp.com",
  projectId: "fitlink-f8698",
  storageBucket: "fitlink-f8698.firebasestorage.app",
  messagingSenderId: "344209319378",
  appId: "1:344209319378:web:c2d06d291dde43b655140b",
  measurementId: "G-TN218GZV1J"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const firebaseApp = initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// const messaging = getMessaging(firebaseApp);

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

