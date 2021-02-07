const admin = require("firebase-admin");
require("dotenv").config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
      project_id: process.env.FIREBASE_PROJECT_ID,
    }),
  });
}
const auth = admin.auth();
const firestore = admin.firestore();

module.exports = { auth, firestore }