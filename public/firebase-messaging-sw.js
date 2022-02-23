importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyAqJMPevGqVwPRrOUbP80kXZee_O_Fgla4",

    authDomain: "webfcm-94f4e.firebaseapp.com",

    projectId: "webfcm-94f4e",

    storageBucket: "webfcm-94f4e.appspot.com",

    messagingSenderId: "277927657645",

    appId: "1:277927657645:web:1507322710e375524ac624",

    measurementId: "G-RHE5Z4M47K"
});
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    // const notificationTitle = 'Background Message Title';
    // const notificationOptions = {
    //     body: 'New Notification',
    //     icon: '/firebase-logo.png'
    // };

    // self.registration.showNotification(notificationTitle,
    //     notificationOptions);
});




// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";

// import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging.js"

// const firebaseConfig = {

//     apiKey: "AIzaSyAqJMPevGqVwPRrOUbP80kXZee_O_Fgla4",

//     authDomain: "webfcm-94f4e.firebaseapp.com",

//     projectId: "webfcm-94f4e",

//     storageBucket: "webfcm-94f4e.appspot.com",

//     messagingSenderId: "277927657645",

//     appId: "1:277927657645:web:1507322710e375524ac624",

//     measurementId: "G-RHE5Z4M47K"

// };
// const app = initializeApp(firebaseConfig);

// const messaging = getMessaging()
// console.log(messaging)
// messaging.backgroundMessageHandler = function (payload) {
//     console.log(payload)
// }