"use client";

import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_VI6GiPxFmTxPYMa9N-u9zuGBgWSOltc",
  authDomain: "fit-link-ffc73.firebaseapp.com",
  projectId: "fit-link-ffc73",
  storageBucket: "fit-link-ffc73.firebasestorage.app",
  messagingSenderId: "85685256147",
  appId: "1:85685256147:web:321577a3626a52b28fb926",
  measurementId: "G-082D1TQN3S",
};

const NO_APPS = 0;

const firebaseApp = getApps().length === NO_APPS ? initializeApp(firebaseConfig) : getApps()[0];

export { firebaseApp };
