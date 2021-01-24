const firebase = require("firebase");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "chat-app-9cb30.appspot.com",
    messagingSenderId: "151353615197",
    appId: "1:151353615197:web:24c0d8626d92cada98feb4",
  });
}

firebase.initializeApp(firebaseConfig);

module.exports = { firebase }