import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBY57-IZWhGnS0BzvKpji5OE-epMqGv8EI",
  authDomain: "church-match-0101.firebaseapp.com",
  projectId: "church-match-0101",
  storageBucket: "church-match-0101.firebasestorage.app",
  messagingSenderId: "13169289051",
  appId: "1:13169289051:web:72ac5ac33526bda1ef9c7e",
  measurementId: "G-C6RGTW6240"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// This is the VAPID key used to authorize the web push subscription
export const VAPID_KEY = "BF5yhie6ZCmHqgBQcEirGPpvxwq67wQnUJ-uvGk24BkqMfbQEKe99xxp-fjw67G3edHkD1UbV2OaNyb8urtvzaw";
