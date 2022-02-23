import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getMessaging, getToken, onMessage } from "@firebase/messaging";

import { store } from "store";
import { setFirebaseToken } from "features/Session/sessionsSlice";

export const initializeMessaging = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAqJMPevGqVwPRrOUbP80kXZee_O_Fgla4",
    authDomain: "webfcm-94f4e.firebaseapp.com",
    projectId: "webfcm-94f4e",
    storageBucket: "webfcm-94f4e.appspot.com",
    messagingSenderId: "277927657645",
    appId: "1:277927657645:web:1507322710e375524ac624",
    measurementId: "G-RHE5Z4M47K",
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
  const messaging = getMessaging();

  getToken(messaging, {
    vapidKey: "BH2_sgv9uL-FiPOcjgSJMWhNcQldX409rDakERixor3QqIDmYtjdjtSSN6VrsN33LHZVOLCvS7Im5o7nCIO3MK8",
  })
    .then((currentToken) => {
      if (currentToken) {
        store.dispatch(setFirebaseToken(currentToken));
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
  });
};
