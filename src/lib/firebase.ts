import * as firebaseCLI from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  NODE_ENV
} from "lib/consts";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

// singleton to prevent app from initializing multiple times
export const firebaseApp = !firebaseCLI.apps.length
  ? firebaseCLI.initializeApp(firebaseConfig)
  : firebaseCLI.app();

if (NODE_ENV !== "development") {
  firebaseApp.analytics();
}

export const firebase = firebaseCLI;
